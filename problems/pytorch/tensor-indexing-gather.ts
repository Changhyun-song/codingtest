import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "tensor_indexing_gather",
  title: "Tensor Gather Operation",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Implement the **gather** operation (like torch.gather).\n\nGiven a 2D data matrix and 2D index matrix, and a dimension:\n- If dim=0: output[i][j] = data[indices[i][j]][j]\n- If dim=1: output[i][j] = data[i][indices[i][j]]\n\n**Function signature:**\n\`\`\`python\ndef solution(data: List[List[float]], indices: List[List[int]], dim: int) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(data: List[List[float]], indices: List[List[int]], dim: int) -> List[List[float]]:",
  constraints: ["dim is 0 or 1", "indices are valid for the given dim"],
  examples: [{ input: { data: [[1,2],[3,4]], indices: [[0,1],[1,0]], dim: 1 }, output: [[1,2],[4,3]], explanation: "dim=1: output[i][j] = data[i][indices[i][j]]" }],
  starter_code: "def solution(data: List[List[float]], indices: List[List[int]], dim: int) -> List[List[float]]:\n    pass",
  hints: ["dim=1이면 각 행에서 indices가 가리키는 열의 값을 가져옵니다.", "dim=0이면 각 열에서 indices가 가리키는 행의 값을 가져옵니다."],
  solution_code: `def solution(data: List[List[float]], indices: List[List[int]], dim: int) -> List[List[float]]:
    result = []
    for i in range(len(indices)):
        row = []
        for j in range(len(indices[0])):
            if dim == 0:
                row.append(data[indices[i][j]][j])
            else:
                row.append(data[i][indices[i][j]])
        result.append(row)
    return result`,
  solution_explanation: "Gather는 인덱스 기반 텐서 선택 연산으로, attention 가중치 추출 등에 사용됩니다.",
  sample_tests: [
    { input: { data: [[1,2],[3,4]], indices: [[0,1],[1,0]], dim: 1 }, expected: [[1,2],[4,3]] },
    { input: { data: [[1,2],[3,4]], indices: [[0,1],[1,0]], dim: 0 }, expected: [[1,4],[3,2]] },
  ],
  hidden_tests: [
    { input: { data: [[10,20,30]], indices: [[2,0,1]], dim: 1 }, expected: [[30,10,20]], failure_category: "standard" },
    { input: { data: [[1],[2],[3]], indices: [[2],[0],[1]], dim: 0 }, expected: [[3],[1],[2]], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation", "tensor_shape_tracker"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
