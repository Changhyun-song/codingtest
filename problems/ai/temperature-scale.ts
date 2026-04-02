import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "temperature_scale",
  title: "Temperature Scaling for Logits",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp", "softmax"],
  statement_en: `Apply **temperature scaling** to logits and compute softmax.\n\nGiven logits and temperature T:\n1. Scale: logits_scaled = logits / T\n2. Apply softmax\n\nHigher T → softer distribution, lower T → sharper distribution.\n\n**Function signature:**\n\`\`\`python\ndef solution(logits: List[float], temperature: float) -> List[float]:\n\`\`\`\n\nReturn probabilities rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(logits: List[float], temperature: float) -> List[float]:",
  constraints: ["temperature > 0", "1 <= len(logits) <= 1000"],
  examples: [{ input: { logits: [2.0, 1.0, 0.1], temperature: 1.0 }, output: [0.659001, 0.242433, 0.098566], explanation: "Standard softmax at T=1" }],
  starter_code: "def solution(logits: List[float], temperature: float) -> List[float]:\n    import math\n    pass",
  hints: ["logits를 temperature로 나눈 후 softmax를 적용합니다.", "수치 안정성을 위해 max를 빼고 exp를 계산하세요."],
  solution_code: `def solution(logits: List[float], temperature: float) -> List[float]:
    import math
    scaled = [x / temperature for x in logits]
    m = max(scaled)
    exps = [math.exp(x - m) for x in scaled]
    s = sum(exps)
    return [round(e / s, 6) for e in exps]`,
  solution_explanation: "Temperature scaling은 모델 calibration과 텍스트 생성의 다양성 조절에 핵심입니다.",
  sample_tests: [
    { input: { logits: [2.0, 1.0, 0.1], temperature: 1.0 }, expected: [0.659001, 0.242433, 0.098566] },
    { input: { logits: [1.0, 1.0], temperature: 0.1 }, expected: [0.5, 0.5] },
  ],
  hidden_tests: [
    { input: { logits: [10.0, 0.0], temperature: 100.0 }, expected: [0.524979, 0.475021], failure_category: "standard" },
    { input: { logits: [0.0], temperature: 1.0 }, expected: [1.0], failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["softmax_from_scratch", "top_p_filtering"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
