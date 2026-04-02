import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "masked_reduction",
  title: "Masked Tensor Reduction",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "masking"],
  statement_en: `Apply a boolean mask to a 2D matrix and compute statistics on the selected elements.\n\nGiven a 2D matrix and a binary mask (1=select, 0=ignore):\n- Count selected elements\n- Sum of selected\n- Mean of selected\n- Max of selected\n\nReturn [count, sum, mean, max], each rounded to 4 decimals.\nIf no elements are selected, return [0, 0.0, 0.0, 0.0].\n\n**Function signature:**\n\`\`\`python\ndef solution(matrix: List[List[float]], mask: List[List[int]]) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(matrix: List[List[float]], mask: List[List[int]]) -> List[float]:",
  constraints: ["matrix and mask have same shape", "mask values are 0 or 1"],
  examples: [{ input: { matrix: [[1,2,3],[4,5,6]], mask: [[1,0,1],[0,1,0]] }, output: [3, 9.0, 3.0, 5.0], explanation: "Selected: 1,3,5 → count=3, sum=9, mean=3, max=5" }],
  starter_code: "def solution(matrix: List[List[float]], mask: List[List[int]]) -> List[float]:\n    pass",
  hints: ["mask가 1인 위치의 값만 추출하세요.", "빈 선택의 경우를 먼저 처리하세요."],
  solution_code: `def solution(matrix: List[List[float]], mask: List[List[int]]) -> List[float]:
    vals = [matrix[i][j] for i in range(len(matrix)) for j in range(len(matrix[0])) if mask[i][j] == 1]
    if not vals:
        return [0, 0.0, 0.0, 0.0]
    return [len(vals), round(sum(vals), 4), round(sum(vals)/len(vals), 4), round(max(vals), 4)]`,
  solution_explanation: "마스크 기반 텐서 연산은 PyTorch에서 attention mask, padding mask 등에 필수입니다. torch.masked_select와 동일한 로직입니다.",
  sample_tests: [
    { input: { matrix: [[1,2,3],[4,5,6]], mask: [[1,0,1],[0,1,0]] }, expected: [3, 9.0, 3.0, 5.0] },
    { input: { matrix: [[10,20],[30,40]], mask: [[0,0],[0,0]] }, expected: [0, 0.0, 0.0, 0.0] },
  ],
  hidden_tests: [
    { input: { matrix: [[5.5]], mask: [[1]] }, expected: [1, 5.5, 5.5, 5.5], failure_category: "edge_case" },
    { input: { matrix: [[-1,2,-3],[4,-5,6]], mask: [[1,1,1],[1,1,1]] }, expected: [6, 3.0, 0.5, 6.0], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["tensor_manipulation", "tensor_indexing_gather"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
