import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "weight_init_variance",
  title: "Weight Initialization Variance Calculator",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Compute the **theoretical variance** of weights for different initialization schemes.\n\nGiven fan_in, fan_out, and init_type:\n- "xavier_normal": Var = 2 / (fan_in + fan_out)\n- "kaiming_normal": Var = 2 / fan_in\n- "xavier_uniform": Var = 2 / (fan_in + fan_out)  (same as normal for Glorot)\n- "kaiming_uniform": Var = 2 / fan_in\n\nReturn variance rounded to 6 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(fan_in: int, fan_out: int, init_type: str) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(fan_in: int, fan_out: int, init_type: str) -> float:",
  constraints: ["fan_in, fan_out > 0"],
  examples: [{ input: { fan_in: 256, fan_out: 128, init_type: "xavier_normal" }, output: 0.005208, explanation: "2/(256+128) = 0.005208" }],
  starter_code: "def solution(fan_in: int, fan_out: int, init_type: str) -> float:\n    pass",
  hints: ["Xavier는 입출력 크기 모두 고려하고, Kaiming은 입력 크기만 고려합니다.", "좋은 초기화는 각 레이어의 출력 분산을 1에 가깝게 유지합니다."],
  solution_code: `def solution(fan_in: int, fan_out: int, init_type: str) -> float:
    if init_type in ("xavier_normal", "xavier_uniform"):
        return round(2.0 / (fan_in + fan_out), 6)
    elif init_type in ("kaiming_normal", "kaiming_uniform"):
        return round(2.0 / fan_in, 6)
    return 0.0`,
  solution_explanation: "가중치 초기화는 학습 안정성의 기본입니다. Xavier(Glorot)는 sigmoid/tanh에, Kaiming(He)은 ReLU에 최적화되어 있습니다.",
  sample_tests: [
    { input: { fan_in: 256, fan_out: 128, init_type: "xavier_normal" }, expected: 0.005208 },
    { input: { fan_in: 256, fan_out: 128, init_type: "kaiming_normal" }, expected: 0.007813 },
  ],
  hidden_tests: [
    { input: { fan_in: 768, fan_out: 768, init_type: "xavier_uniform" }, expected: 0.001302, failure_category: "standard" },
    { input: { fan_in: 1, fan_out: 1, init_type: "kaiming_normal" }, expected: 2.0, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["linear_layer_manual", "dead_neuron_check"],
  fallback_problem_ids: ["linear_layer_manual"],
};
export default problem;
