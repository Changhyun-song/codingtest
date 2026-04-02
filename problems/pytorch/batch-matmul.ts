import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "batch_matmul",
  title: "Batch Matrix Multiplication",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Implement **batch matrix multiplication**: given two 3D tensors A [B, M, K] and B [B, K, N], compute the batched result [B, M, N].\n\nFor each batch: result[b] = A[b] @ B[b]\n\n**Function signature:**\n\`\`\`python\ndef solution(a: List[List[List[float]]], b: List[List[List[float]]]) -> List[List[List[float]]]:\n\`\`\`\n\nRound each value to 4 decimal places.`,
  function_name: "solution",
  signature: "def solution(a: List[List[List[float]]], b: List[List[List[float]]]) -> List[List[List[float]]]:",
  constraints: ["1 <= B <= 32", "1 <= M, K, N <= 128"],
  examples: [{ input: { a: [[[1,2],[3,4]]], b: [[[5,6],[7,8]]] }, output: [[[19,22],[43,50]]], explanation: "Standard 2x2 matrix multiply" }],
  starter_code: "def solution(a: List[List[List[float]]], b: List[List[List[float]]]) -> List[List[List[float]]]:\n    pass",
  hints: ["각 배치에 대해 표준 행렬 곱셈을 수행합니다.", "result[b][i][j] = sum(a[b][i][k] * b[b][k][j] for k)"],
  solution_code: `def solution(a: List[List[List[float]]], b: List[List[List[float]]]) -> List[List[List[float]]]:
    B = len(a)
    result = []
    for batch in range(B):
        M, K, N = len(a[batch]), len(a[batch][0]), len(b[batch][0])
        mat = []
        for i in range(M):
            row = []
            for j in range(N):
                val = sum(a[batch][i][k] * b[batch][k][j] for k in range(K))
                row.append(round(val, 4))
            mat.append(row)
        result.append(mat)
    return result`,
  solution_explanation: "배치 행렬 곱셈은 Transformer의 attention 계산에서 핵심입니다. [B,H,S,D] 텐서 연산의 기본입니다.",
  sample_tests: [
    { input: { a: [[[1,2],[3,4]]], b: [[[5,6],[7,8]]] }, expected: [[[19,22],[43,50]]] },
    { input: { a: [[[1,0],[0,1]]], b: [[[9,8],[7,6]]] }, expected: [[[9,8],[7,6]]] },
  ],
  hidden_tests: [
    { input: { a: [[[1,2,3]]], b: [[[1],[2],[3]]] }, expected: [[[14]]], failure_category: "edge_case" },
    { input: { a: [[[1,0],[0,1]],[[2,0],[0,2]]], b: [[[3,4],[5,6]],[[3,4],[5,6]]] }, expected: [[[3,4],[5,6]],[[6,8],[10,12]]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["attention_scores", "tensor_manipulation"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
