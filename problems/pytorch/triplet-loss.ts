import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "triplet_loss",
  title: "Triplet Margin Loss",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss_function"],
  statement_en: `Implement **triplet margin loss** for metric learning.\n\nGiven anchor, positive, and negative vectors:\n\nLoss = max(0, d(anchor, positive) - d(anchor, negative) + margin)\n\nwhere d is Euclidean distance.\n\n**Function signature:**\n\`\`\`python\ndef solution(anchor: List[float], positive: List[float], negative: List[float], margin: float) -> float:\n\`\`\`\n\nReturn rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(anchor: List[float], positive: List[float], negative: List[float], margin: float) -> float:",
  constraints: ["len(anchor) == len(positive) == len(negative)", "margin >= 0"],
  examples: [{ input: { anchor: [0,0], positive: [3,4], negative: [1,0], margin: 1.0 }, output: 5.0, explanation: "d_pos=5, d_neg=1, max(0, 5-1+1)=5.0" }],
  starter_code: "def solution(anchor: List[float], positive: List[float], negative: List[float], margin: float) -> float:\n    pass",
  hints: ["유클리드 거리: sqrt(sum((a-b)^2))", "loss = max(0, d_pos - d_neg + margin). 양수와 음수 샘플의 거리 차이를 학습합니다."],
  solution_code: `def solution(anchor: List[float], positive: List[float], negative: List[float], margin: float) -> float:
    d_pos = sum((a - p) ** 2 for a, p in zip(anchor, positive)) ** 0.5
    d_neg = sum((a - n) ** 2 for a, n in zip(anchor, negative)) ** 0.5
    return round(max(0.0, d_pos - d_neg + margin), 6)`,
  solution_explanation: "Triplet loss는 얼굴 인식, 검색 시스템 등에서 유사한 쌍은 가깝게, 다른 쌍은 멀게 학습시킵니다.",
  sample_tests: [
    { input: { anchor: [0,0], positive: [3,4], negative: [1,0], margin: 1.0 }, expected: 5.0 },
    { input: { anchor: [1,0], positive: [1,1], negative: [5,5], margin: 1.0 }, expected: 0.0 },
  ],
  hidden_tests: [
    { input: { anchor: [0,0,0], positive: [1,1,1], negative: [2,2,2], margin: 0.0 }, expected: 0.0, failure_category: "edge_case" },
    { input: { anchor: [0,0], positive: [0,2], negative: [0,1], margin: 0.5 }, expected: 1.5, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["contrastive_loss", "cosine_similarity"],
  fallback_problem_ids: ["cosine_similarity"],
};
export default problem;
