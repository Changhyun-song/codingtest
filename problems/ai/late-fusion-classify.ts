import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "late_fusion_classify",
  title: "Late Fusion Classifier",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Implement a **late fusion classifier** for multimodal inputs.\n\n1. Concatenate feature vectors from modality A and B\n2. Apply a linear layer (weights @ concat + bias)\n3. Apply softmax to get class probabilities\n\nReturn probabilities rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(feat_a: List[float], feat_b: List[float], weights: List[List[float]], bias: List[float]) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(feat_a: List[float], feat_b: List[float], weights: List[List[float]], bias: List[float]) -> List[float]:",
  constraints: ["len(weights[0]) == len(feat_a) + len(feat_b)"],
  examples: [{ input: { feat_a: [1.0, 0.0], feat_b: [0.0, 1.0], weights: [[1,0,0,0],[0,0,0,1]], bias: [0,0] }, output: [0.5, 0.5], explanation: "Concat=[1,0,0,1], logits=[1,1], softmax=[0.5,0.5]" }],
  starter_code: "def solution(feat_a: List[float], feat_b: List[float], weights: List[List[float]], bias: List[float]) -> List[float]:\n    import math\n    pass",
  hints: ["두 특징 벡터를 concatenate합니다.", "logits = weights @ concat + bias, 그 후 softmax를 적용합니다."],
  solution_code: `def solution(feat_a: List[float], feat_b: List[float], weights: List[List[float]], bias: List[float]) -> List[float]:
    import math
    concat = feat_a + feat_b
    logits = [sum(concat[k] * weights[c][k] for k in range(len(concat))) + bias[c] for c in range(len(weights))]
    m = max(logits)
    exps = [math.exp(x - m) for x in logits]
    s = sum(exps)
    return [round(e / s, 4) for e in exps]`,
  solution_explanation: "Late fusion은 각 모달리티를 독립 인코딩 후 특징을 결합합니다. 구현이 간단하고 모달리티별 사전학습 활용이 용이합니다.",
  sample_tests: [
    { input: { feat_a: [1.0, 0.0], feat_b: [0.0, 1.0], weights: [[1,0,0,0],[0,0,0,1]], bias: [0,0] }, expected: [0.5, 0.5] },
    { input: { feat_a: [1.0], feat_b: [0.0], weights: [[10,0],[0,10]], bias: [0,0] }, expected: [1.0, 0.0] },
  ],
  hidden_tests: [
    { input: { feat_a: [0.0], feat_b: [0.0], weights: [[1,1],[2,2]], bias: [0,0] }, expected: [0.5, 0.5], failure_category: "edge_case" },
    { input: { feat_a: [1.0,2.0], feat_b: [3.0], weights: [[1,0,0],[0,1,0],[0,0,1]], bias: [0,0,0] }, expected: [0.0900, 0.2447, 0.6652], failure_category: "standard" },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["multimodal_fusion", "clip_similarity"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
