import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "sparse_bio_encode",
  title: "Sparse Biological Feature Encoder",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp"],
  statement_en: `Encode **sparse biological features** into a dense vector.\n\nGiven:\n- feature_indices: list of active feature indices\n- feature_values: corresponding values\n- total_features: total number of possible features\n\nReturn a dense vector of length total_features with values at the given indices (0 elsewhere).\n\n**Function signature:**\n\`\`\`python\ndef solution(feature_indices: List[int], feature_values: List[float], total_features: int) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(feature_indices: List[int], feature_values: List[float], total_features: int) -> List[float]:",
  constraints: ["0 <= feature_indices[i] < total_features"],
  examples: [{ input: { feature_indices: [0, 3, 7], feature_values: [1.5, 2.0, 0.5], total_features: 8 }, output: [1.5,0,0,2.0,0,0,0,0.5], explanation: "Place values at given indices" }],
  starter_code: "def solution(feature_indices: List[int], feature_values: List[float], total_features: int) -> List[float]:\n    pass",
  hints: ["0 벡터를 만들고 인덱스 위치에 값을 넣습니다.", "유전체/단백체 데이터는 대부분 sparse합니다."],
  solution_code: `def solution(feature_indices: List[int], feature_values: List[float], total_features: int) -> List[float]:
    result = [0.0] * total_features
    for idx, val in zip(feature_indices, feature_values):
        result[idx] = val
    return result`,
  solution_explanation: "바이오 데이터(유전자 발현, 단백질 abundance)는 대부분 sparse합니다. sparse→dense 변환은 ML 파이프라인의 첫 단계입니다.",
  sample_tests: [
    { input: { feature_indices: [0, 3, 7], feature_values: [1.5, 2.0, 0.5], total_features: 8 }, expected: [1.5,0,0,2.0,0,0,0,0.5] },
    { input: { feature_indices: [], feature_values: [], total_features: 3 }, expected: [0,0,0] },
  ],
  hidden_tests: [
    { input: { feature_indices: [0], feature_values: [100.0], total_features: 1 }, expected: [100.0], failure_category: "edge_case" },
    { input: { feature_indices: [2,4,6,8], feature_values: [0.1,0.2,0.3,0.4], total_features: 10 }, expected: [0,0,0.1,0,0.2,0,0.3,0,0.4,0], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["bio_one_hot", "one_hot_encode"],
  fallback_problem_ids: ["one_hot_encode"],
};
export default problem;
