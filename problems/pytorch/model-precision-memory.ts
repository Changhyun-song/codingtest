import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "model_precision_memory",
  title: "Model Memory by Precision Calculator",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Calculate model weight memory for different numerical precisions.\n\nGiven param_count_millions and precision, compute memory in GB.\n- fp32: 4 bytes/param\n- fp16/bf16: 2 bytes/param\n- int8: 1 byte/param\n- int4: 0.5 bytes/param\n\nReturn memory in GB rounded to 2 decimals.\n1 GB = 1024^3 bytes.\n\n**Function signature:**\n\`\`\`python\ndef solution(param_count_millions: float, precision: str) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(param_count_millions: float, precision: str) -> float:",
  constraints: ["param_count_millions > 0"],
  examples: [{ input: { param_count_millions: 7000, precision: "fp16" }, output: 13.04, explanation: "7B params × 2 bytes / 1024³ = 13.04 GB" }],
  starter_code: "def solution(param_count_millions: float, precision: str) -> float:\n    pass",
  hints: ["bytes_per_param 맵: fp32=4, fp16/bf16=2, int8=1, int4=0.5", "이 계산은 GPU 선택과 서빙 인프라 설계에 핵심입니다."],
  solution_code: `def solution(param_count_millions: float, precision: str) -> float:
    params = param_count_millions * 1e6
    bmap = {"fp32": 4, "fp16": 2, "bf16": 2, "int8": 1, "int4": 0.5}
    return round(params * bmap.get(precision, 4) / (1024**3), 2)`,
  solution_explanation: "모델 크기 계산은 GPU 메모리 플래닝의 기본입니다. 7B 모델은 FP16으로 ~14GB, INT4로 ~3.3GB가 필요합니다.",
  sample_tests: [
    { input: { param_count_millions: 7000, precision: "fp16" }, expected: 13.04 },
    { input: { param_count_millions: 7000, precision: "int4" }, expected: 3.26 },
  ],
  hidden_tests: [
    { input: { param_count_millions: 125, precision: "fp32" }, expected: 0.47, failure_category: "standard" },
    { input: { param_count_millions: 70000, precision: "fp16" }, expected: 130.39, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.02,
  similar_problem_ids: ["model_memory_calc", "quantize_dequantize"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
