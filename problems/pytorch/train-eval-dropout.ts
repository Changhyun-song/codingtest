import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "train_eval_dropout",
  title: "Train vs Eval Mode Output",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "debugging"],
  statement_en: `Compute the output of a simple network in both **train** and **eval** modes.\n\nGiven input values, dropout mask (for train mode), dropout prob p, and a linear layer (weights, bias):\n\nTrain mode: output = Linear(Dropout(input, mask, p))\nEval mode: output = Linear(input)\n\nDropout in train: x * mask / (1-p)\nReturn [train_output, eval_output], each rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(x: List[float], mask: List[int], p: float, weights: List[List[float]], bias: List[float]) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(x: List[float], mask: List[int], p: float, weights: List[List[float]], bias: List[float]) -> List:",
  constraints: ["len(x) == len(mask)", "weights shape matches"],
  examples: [{ input: { x: [1.0,2.0], mask: [1,0], p: 0.5, weights: [[1,1]], bias: [0] }, output: [[2.0],[3.0]], explanation: "Train: dropout=[2,0], linear=2. Eval: linear=1+2=3" }],
  starter_code: "def solution(x: List[float], mask: List[int], p: float, weights: List[List[float]], bias: List[float]) -> List:\n    pass",
  hints: ["Train: 먼저 dropout을 적용 (mask * scale), 그 다음 linear.", "Eval: dropout 없이 바로 linear. model.train()과 model.eval()의 차이가 핵심입니다."],
  solution_code: `def solution(x: List[float], mask: List[int], p: float, weights: List[List[float]], bias: List[float]) -> List:
    scale = 1.0 / (1.0 - p) if p < 1.0 else 0.0
    dropped = [x[i] * mask[i] * scale for i in range(len(x))]
    def linear(inp):
        return [round(sum(inp[j] * weights[o][j] for j in range(len(inp))) + bias[o], 4) for o in range(len(weights))]
    return [linear(dropped), linear(x)]`,
  solution_explanation: "train/eval 모드 전환은 가장 흔한 PyTorch 버그 원인입니다. Dropout과 BatchNorm은 모드에 따라 동작이 다릅니다. model.eval()을 빼먹으면 추론 결과가 달라집니다.",
  sample_tests: [
    { input: { x: [1.0,2.0], mask: [1,0], p: 0.5, weights: [[1,1]], bias: [0] }, expected: [[2.0],[3.0]] },
    { input: { x: [4.0], mask: [1], p: 0.0, weights: [[2]], bias: [1] }, expected: [[9.0],[9.0]] },
  ],
  hidden_tests: [
    { input: { x: [1.0,1.0,1.0], mask: [0,0,0], p: 0.5, weights: [[1,1,1]], bias: [0] }, expected: [[0.0],[3.0]], failure_category: "edge_case" },
    { input: { x: [2.0,3.0], mask: [1,1], p: 0.25, weights: [[1,0],[0,1]], bias: [0,0] }, expected: [[2.6667,4.0],[2.0,3.0]], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["dropout_forward", "batch_norm_running"],
  fallback_problem_ids: ["dropout_forward"],
};
export default problem;
