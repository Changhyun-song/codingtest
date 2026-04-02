import { execFile, execFileSync } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";
import { TestCase } from "./types";

interface PythonResult {
  test_index: number;
  output: unknown;
  time_ms: number;
  error: string | null;
}

interface PythonResponse {
  results: PythonResult[];
}

const TIMEOUT_DEFAULT = 10000;
const TIMEOUT_PYTORCH = 30000;

function findPython(): string {
  if (process.env.PYTHON_PATH && fs.existsSync(process.env.PYTHON_PATH)) {
    return process.env.PYTHON_PATH;
  }

  const home = os.homedir();
  const knownPaths =
    process.platform === "win32"
      ? [
          path.join(home, "AppData", "Local", "Programs", "Python", "Python313", "python.exe"),
          path.join(home, "AppData", "Local", "Programs", "Python", "Python312", "python.exe"),
          path.join(home, "AppData", "Local", "Programs", "Python", "Python311", "python.exe"),
          path.join(home, "AppData", "Local", "Programs", "Python", "Python310", "python.exe"),
          "C:\\Python312\\python.exe",
          "C:\\Python311\\python.exe",
          "C:\\Python310\\python.exe",
        ]
      : [];

  for (const p of knownPaths) {
    if (fs.existsSync(p)) {
      try {
        const out = execFileSync(p, ["--version"], {
          timeout: 5000,
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "pipe"],
        });
        if (out && out.includes("Python")) return p;
      } catch {
        continue;
      }
    }
  }

  const candidates =
    process.platform === "win32"
      ? ["python", "python3", "py"]
      : ["python3", "python"];

  for (const cmd of candidates) {
    try {
      const out = execFileSync(cmd, ["--version"], {
        timeout: 5000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      if (out && out.includes("Python")) {
        if (process.platform === "win32") {
          try {
            const w = execFileSync("where", [cmd], {
              timeout: 3000,
              encoding: "utf-8",
              stdio: ["pipe", "pipe", "pipe"],
            });
            if (w.includes("WindowsApps")) continue;
          } catch {}
        }
        return cmd;
      }
    } catch {
      continue;
    }
  }

  throw new Error(
    "Python not found. Install Python 3.10+ and add to PATH, or set PYTHON_PATH env variable."
  );
}

let cachedPythonCmd: string | null = null;

function getPythonCmd(): string {
  if (cachedPythonCmd) return cachedPythonCmd;
  cachedPythonCmd = findPython();
  return cachedPythonCmd;
}

export function checkTorchAvailability(): Promise<{ available: boolean; version?: string; error?: string }> {
  return new Promise((resolve) => {
    let pythonCmd: string;
    try {
      pythonCmd = getPythonCmd();
    } catch {
      resolve({ available: false, error: "Python not found" });
      return;
    }
    execFile(
      pythonCmd,
      ["-c", "import torch; print(torch.__version__)"],
      { timeout: 15000 },
      (error, stdout) => {
        if (error) {
          resolve({ available: false, error: "torch not installed. Run: pip install torch" });
        } else {
          resolve({ available: true, version: stdout.trim() });
        }
      }
    );
  });
}

export async function runPythonTests(
  code: string,
  functionName: string,
  testCases: TestCase[],
  executionMode?: string
): Promise<PythonResult[]> {
  let pythonCmd: string;
  try {
    pythonCmd = getPythonCmd();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return testCases.map((_, i) => ({
      test_index: i,
      output: null,
      time_ms: 0,
      error: msg,
    }));
  }

  const scriptPath = path.join(process.cwd(), "scripts", "run_code.py");

  const mode = executionMode || "python_concept";
  const payload = JSON.stringify({
    code,
    function_name: functionName,
    test_cases: testCases.map((tc) => ({ input: tc.input })),
    mode,
  });

  // Write payload to temp file to avoid shell argument length limits
  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, `codility_payload_${Date.now()}.json`);
  fs.writeFileSync(tmpFile, payload, "utf-8");

  return new Promise((resolve) => {
    execFile(
      pythonCmd,
      [scriptPath, payload],
      { timeout: mode === "pytorch_real" ? TIMEOUT_PYTORCH : TIMEOUT_DEFAULT, maxBuffer: 10 * 1024 * 1024 },
      (error, stdout, stderr) => {
        try { fs.unlinkSync(tmpFile); } catch {}

        if (error) {
          if (error.killed) {
            const tms = mode === "pytorch_real" ? TIMEOUT_PYTORCH : TIMEOUT_DEFAULT;
            resolve(
              testCases.map((_, i) => ({
                test_index: i,
                output: null,
                time_ms: tms,
                error: `Time limit exceeded (${tms / 1000}s)`,
              }))
            );
            return;
          }

          const errMsg = stderr?.trim() || error.message || "Unknown execution error";
          if (
            errMsg.includes("is not recognized") ||
            errMsg.includes("not found") ||
            errMsg.includes("ENOENT") ||
            (error as NodeJS.ErrnoException).code === "ENOENT"
          ) {
            cachedPythonCmd = null;
            resolve(
              testCases.map((_, i) => ({
                test_index: i,
                output: null,
                time_ms: 0,
                error:
                  "Python not found. Install Python 3.10+ from python.org and add to PATH.",
              }))
            );
            return;
          }

          resolve(
            testCases.map((_, i) => ({
              test_index: i,
              output: null,
              time_ms: 0,
              error: errMsg.split("\n").slice(-3).join("\n"),
            }))
          );
          return;
        }

        try {
          const parsed: PythonResponse = JSON.parse(stdout.trim());
          resolve(parsed.results);
        } catch {
          resolve(
            testCases.map((_, i) => ({
              test_index: i,
              output: null,
              time_ms: 0,
              error: `Failed to parse output: ${stdout.substring(0, 200)}`,
            }))
          );
        }
      }
    );
  });
}
