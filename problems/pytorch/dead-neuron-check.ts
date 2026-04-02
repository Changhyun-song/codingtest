import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "dead_neuron_check",
  title: "Dead ReLU Neuron Detector",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "neural_network"],
  statement_en: `Detect **dead neurons** in a ReLU network layer.\n\nGiven weights [neurons, in_dim], bias [neurons], and multiple input samples [samples, in_dim]:\n- Compute h = ReLU(x @ W^T + b) for each sample\n- A neuron is "dead" if its output is 0 for ALL samples\n\nReturn sorted list of dead neuron indices.\n\n**Function signature:**\n\`\`\`python\ndef solution(weights: List[List[float]], bias: List[float], inputs: List[List[float]]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(weights: List[List[float]], bias: List[float], inputs: List[List[float]]) -> List[int]:",
  constraints: ["1 <= neurons, in_dim <= 256", "1 <= samples <= 100"],
  examples: [{ input: { weights: [[1,0],[-1,0],[0,1]], bias: [0,-10,0], inputs: [[1,1],[2,2],[-1,3]] }, output: [1], explanation: "Neuron 1 always outputs ≤ 0" }],
  starter_code: "def solution(weights: List[List[float]], bias: List[float], inputs: List[List[float]]) -> List[int]:\n    pass",
  hints: ["각 뉴런에 대해 모든 입력 샘플의 출력(선형변환+bias)이 ≤ 0인지 확인합니다.", "하나라도 양수 출력이 있으면 해당 뉴런은 살아 있습니다."],
  solution_code: `def solution(weights: List[List[float]], bias: List[float], inputs: List[List[float]]) -> List[int]:
    num_neurons = len(weights)
    in_dim = len(weights[0])
    alive = [False] * num_neurons
    for x in inputs:
        for n in range(num_neurons):
            if not alive[n]:
                val = sum(x[i] * weights[n][i] for i in range(in_dim)) + bias[n]
                if val > 0:
                    alive[n] = True
    return [i for i in range(num_neurons) if not alive[i]]`,
  solution_explanation: "Dead ReLU는 큰 음수 bias나 나쁜 초기화로 발생합니다. 학습이 진행되지 않는 뉴런을 탐지하는 것이 중요합니다.",
  sample_tests: [
    { input: { weights: [[1,0],[-1,0],[0,1]], bias: [0,-10,0], inputs: [[1,1],[2,2],[-1,3]] }, expected: [1] },
    { input: { weights: [[1,1]], bias: [0], inputs: [[-1,-1]] }, expected: [] },
  ],
  hidden_tests: [
    { input: { weights: [[-1],[-1]], bias: [-1,-1], inputs: [[1],[2],[3]] }, expected: [0,1], failure_category: "standard" },
    { input: { weights: [[1]], bias: [0], inputs: [[0]] }, expected: [0], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["simple_mlp_forward", "residual_block_forward"],
  fallback_problem_ids: ["simple_mlp_forward"],
};
export default problem;
