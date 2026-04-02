import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "residual_block_forward",
  title: "Residual Block Forward Pass",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement a **ResNet-style residual block** forward pass:\n\noutput = ReLU(Linear2(ReLU(Linear1(x))) + x)\n\nGiven x [batch, dim], weights/biases for two linear layers (both dim→dim), compute the residual output.\n\n**Function signature:**\n\`\`\`python\ndef solution(x: List[List[float]], w1: List[List[float]], b1: List[float], w2: List[List[float]], b2: List[float]) -> List[List[float]]:\n\`\`\`\n\nRound to 4 decimals.`,
  function_name: "solution",
  signature: "def solution(x: List[List[float]], w1: List[List[float]], b1: List[float], w2: List[List[float]], b2: List[float]) -> List[List[float]]:",
  constraints: ["w1, w2 are square matrices of same dim as x columns"],
  examples: [{ input: { x: [[1.0,-1.0]], w1: [[1,0],[0,1]], b1: [0,0], w2: [[1,0],[0,1]], b2: [0,0] }, output: [[2.0, 0.0]], explanation: "h=relu([1,-1])=[1,0], out=[1,0], final=relu([1+1, 0+(-1)])=relu([2,-1])=[2,0]" }],
  starter_code: "def solution(x: List[List[float]], w1: List[List[float]], b1: List[float], w2: List[List[float]], b2: List[float]) -> List[List[float]]:\n    pass",
  hints: ["먼저 Linear1 → ReLU → Linear2를 순서대로 계산합니다.", "마지막에 원래 입력 x를 더하고 (skip connection) ReLU를 적용합니다."],
  solution_code: `def solution(x: List[List[float]], w1: List[List[float]], b1: List[float], w2: List[List[float]], b2: List[float]) -> List[List[float]]:
    batch = len(x)
    dim = len(x[0])
    result = []
    for bi in range(batch):
        h = [max(0.0, sum(x[bi][k] * w1[o][k] for k in range(dim)) + b1[o]) for o in range(dim)]
        out = [sum(h[k] * w2[o][k] for k in range(dim)) + b2[o] for o in range(dim)]
        result.append([round(max(0.0, out[i] + x[bi][i]), 4) for i in range(dim)])
    return result`,
  solution_explanation: "Residual connection은 깊은 네트워크의 gradient vanishing을 해결합니다. 입력을 출력에 직접 더하는 skip connection이 핵심입니다.",
  sample_tests: [
    { input: { x: [[1.0,-1.0]], w1: [[1,0],[0,1]], b1: [0,0], w2: [[1,0],[0,1]], b2: [0,0] }, expected: [[2.0, 0.0]] },
    { input: { x: [[0.0,0.0]], w1: [[1,1],[1,1]], b1: [1,1], w2: [[1,0],[0,1]], b2: [0,0] }, expected: [[1.0, 1.0]] },
  ],
  hidden_tests: [
    { input: { x: [[5.0,5.0]], w1: [[-1,0],[0,-1]], b1: [0,0], w2: [[1,0],[0,1]], b2: [0,0] }, expected: [[5.0, 5.0]], failure_category: "edge_case" },
    { input: { x: [[1.0,2.0],[3.0,4.0]], w1: [[1,0],[0,1]], b1: [0,0], w2: [[0.5,0],[0,0.5]], b2: [0,0] }, expected: [[1.5, 3.0],[4.5, 6.0]], failure_category: "standard" },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["simple_mlp_forward", "linear_layer_manual"],
  fallback_problem_ids: ["simple_mlp_forward"],
};
export default problem;
