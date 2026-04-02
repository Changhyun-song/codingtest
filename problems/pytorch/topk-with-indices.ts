import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "topk_with_indices",
  title: "Top-K Values with Indices",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor"],
  statement_en: `Find the top-k largest values and their original indices from a list.\n\nReturn [values, indices] sorted by value descending.\n\n**Function signature:**\n\`\`\`python\ndef solution(values: List[float], k: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(values: List[float], k: int) -> List:",
  constraints: ["1 <= k <= len(values) <= 10000"],
  examples: [{ input: { values: [3.0, 1.0, 4.0, 1.0, 5.0], k: 3 }, output: [[5.0, 4.0, 3.0], [4, 2, 0]], explanation: "Top 3: 5.0@idx4, 4.0@idx2, 3.0@idx0" }],
  starter_code: "def solution(values: List[float], k: int) -> List:\n    pass",
  hints: ["enumerate로 (값, 인덱스) 쌍을 만들고 값 기준 내림차순 정렬하세요.", "상위 k개를 잘라서 값과 인덱스를 분리합니다."],
  solution_code: `def solution(values: List[float], k: int) -> List:
    indexed = sorted(enumerate(values), key=lambda x: -x[1])
    top = indexed[:k]
    return [[t[1] for t in top], [t[0] for t in top]]`,
  solution_explanation: "Top-K는 추천 시스템, beam search 등에서 핵심 연산입니다.",
  sample_tests: [
    { input: { values: [3.0, 1.0, 4.0, 1.0, 5.0], k: 3 }, expected: [[5.0, 4.0, 3.0], [4, 2, 0]] },
    { input: { values: [1.0, 2.0], k: 1 }, expected: [[2.0], [1]] },
  ],
  hidden_tests: [
    { input: { values: [5.0, 5.0, 5.0], k: 2 }, expected: [[5.0, 5.0], [0, 1]], failure_category: "edge_case" },
    { input: { values: [10.0, 20.0, 30.0, 40.0, 50.0], k: 5 }, expected: [[50.0,40.0,30.0,20.0,10.0],[4,3,2,1,0]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["top_k_frequent_tokens", "top_k_bucket_sort"],
  fallback_problem_ids: ["heap_kth_largest"],
};
export default problem;
