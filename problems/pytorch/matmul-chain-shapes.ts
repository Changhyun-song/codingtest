import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "matmul_chain_shapes",
  title: "Matrix Multiplication Chain Validator",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "shape_reasoning"],
  statement_en: `Validate a chain of matrix multiplications and compute the output shape.\n\nGiven a list of 2D matrix shapes [[rows, cols], ...], check if A1 @ A2 @ ... @ An is valid.\n\n- If valid: return [final_rows, final_cols]\n- If invalid: return [-1, index_of_first_error]\n\nA multiplication at step i fails when shapes[i-1][1] != shapes[i][0].\n\n**Function signature:**\n\`\`\`python\ndef solution(shapes: List[List[int]]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(shapes: List[List[int]]) -> List[int]:",
  constraints: ["1 <= len(shapes) <= 100", "each shape is [rows, cols]"],
  examples: [{ input: { shapes: [[2,3],[3,4],[4,5]] }, output: [2,5], explanation: "2x3 @ 3x4 → 2x4, 2x4 @ 4x5 → 2x5" }],
  starter_code: "def solution(shapes: List[List[int]]) -> List[int]:\n    pass",
  hints: ["순서대로 곱셈 가능 여부를 확인하세요: 이전 열 수 == 다음 행 수.", "첫 번째 불일치 지점의 인덱스를 반환합니다."],
  solution_code: `def solution(shapes: List[List[int]]) -> List[int]:
    if not shapes:
        return []
    r, c = shapes[0]
    for i in range(1, len(shapes)):
        if c != shapes[i][0]:
            return [-1, i]
        c = shapes[i][1]
    return [r, c]`,
  solution_explanation: "행렬 곱셈 체인의 shape 추론은 transformer 모델 디버깅의 기본입니다. einsum이나 multi-head attention에서 shape 오류를 찾을 때 필수 능력입니다.",
  sample_tests: [
    { input: { shapes: [[2,3],[3,4],[4,5]] }, expected: [2,5] },
    { input: { shapes: [[2,3],[5,4]] }, expected: [-1, 1] },
  ],
  hidden_tests: [
    { input: { shapes: [[10,10]] }, expected: [10,10], failure_category: "edge_case" },
    { input: { shapes: [[768,64],[64,64],[64,768],[768,3072],[3072,768]] }, expected: [768, 768], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["batch_matmul", "shape_error_finder"],
  fallback_problem_ids: ["broadcast_shapes"],
};
export default problem;
