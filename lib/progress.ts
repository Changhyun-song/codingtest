import fs from "fs";
import path from "path";
import { UserProgress } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadProgress(): UserProgress {
  ensureDataDir();
  if (!fs.existsSync(PROGRESS_FILE)) {
    return {};
  }
  try {
    const raw = fs.readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveProgress(progress: UserProgress): void {
  ensureDataDir();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), "utf-8");
}

export function updateProblemProgress(
  problemId: string,
  update: Partial<UserProgress[string]>
): UserProgress {
  const progress = loadProgress();
  const existing = progress[problemId] ?? {
    status: "unseen",
    attempts: 0,
  };
  progress[problemId] = { ...existing, ...update };
  saveProgress(progress);
  return progress;
}
