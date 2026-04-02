import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "manual_backward_linear",
  title: "Manual Backward Pass for Linear Layer",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "autograd"],
  statement_en: `Manually compute gradients for a linear layer.\n\nGiven x [batch, in], W [out, in], b [out]:\n- Forward: y = x @ W^T + b\n- Loss = mean(sum(y^2))\n- Compute grad_W and grad_b\n\nReturn [grad_W as 2D list, grad_b as 1D list], rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(x: List[List[float]], w: List[List[float]], b: List[float]) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(x: List[List[float]], w: List[List[float]], b: List[float]) -> List:",
  constraints: ["1 <= batch, in_dim, out_dim <= 64"],
  examples: [{ input: { x: [[1.0, 2.0]], w: [[1.0, 0.0]], b: [0.0] }, output: [[[2.0, 4.0]], [2.0]], explanation: "y=[[1]], dy=[[2]], grad_W=dy^T@x=[[2,4]], grad_b=[2]" }],
  starter_code: "def solution(x: List[List[float]], w: List[List[float]], b: List[float]) -> List:\n    pass",
  hints: ["Forward: y[b][o] = sum(x[b][i]*w[o][i]) + b[o]. Loss = sum(y^2)/batch.", "grad_y = 2*y/batch. grad_W[o][i] = sum(grad_y[b][o]*x[b][i]). grad_b[o] = sum(grad_y[b][o])."],
  solution_code: `def solution(x: List[List[float]], w: List[List[float]], b: List[float]) -> List:
    batch = len(x)
    in_dim = len(x[0])
    out_dim = len(w)
    y = [[sum(x[bi][i] * w[o][i] for i in range(in_dim)) + b[o] for o in range(out_dim)] for bi in range(batch)]
    gy = [[2.0 * y[bi][o] / batch for o in range(out_dim)] for bi in range(batch)]
    gw = [[round(sum(gy[bi][o] * x[bi][i] for bi in range(batch)), 4) for i in range(in_dim)] for o in range(out_dim)]
    gb = [round(sum(gy[bi][o] for bi in range(batch)), 4) for o in range(out_dim)]
    return [gw, gb]`,
  solution_explanation: "역전파의 핵심입니다. chain rule로 loss→y→W,b 순서로 gradient를 전파합니다.",
  sample_tests: [
    { input: { x: [[1.0, 2.0]], w: [[1.0, 0.0]], b: [0.0] }, expected: [[[2.0, 4.0]], [2.0]] },
    { input: { x: [[1.0],[1.0]], w: [[1.0]], b: [1.0] }, expected: [[[4.0]], [4.0]] },
  ],
  hidden_tests: [
    { input: { x: [[0.0, 0.0]], w: [[5.0, 5.0]], b: [10.0] }, expected: [[[0.0, 0.0]], [20.0]], failure_category: "edge_case" },
    { input: { x: [[1.0, 0.0],[0.0, 1.0]], w: [[1.0, 1.0]], b: [0.0] }, expected: [[[1.0, 1.0]], [2.0]], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["gradient_accumulation", "weight_decay_step"],
  fallback_problem_ids: ["pytorch_training_loop"],
};
export default problem;
