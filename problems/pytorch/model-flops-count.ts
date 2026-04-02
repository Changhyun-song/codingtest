import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "model_flops_count",
  title: "Model FLOPs Estimator",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Estimate the total FLOPs for a forward pass through a list of layers.\n\nFLOPs per layer type:\n- **Linear**: 2 × in_features × out_features\n- **Conv2d**: 2 × out_ch × in_ch × k² × output_h × output_w\n- **Embedding**: num_embeddings (lookup cost)\n- Other layers: 0\n\n**Function signature:**\n\`\`\`python\ndef solution(layers: List[dict]) -> int:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(layers: List[dict]) -> int:",
  constraints: ["1 <= len(layers) <= 100"],
  examples: [{ input: { layers: [{"type":"Linear","in_features":768,"out_features":3072},{"type":"Linear","in_features":3072,"out_features":768}] }, output: 9437184, explanation: "2×768×3072 + 2×3072×768 = 9437184" }],
  starter_code: "def solution(layers: List[dict]) -> int:\n    pass",
  hints: ["각 레이어의 FLOPs 공식을 적용하여 합산합니다.", "Linear의 FLOPs = 2 × in × out (곱셈 + 덧셈)."],
  solution_code: `def solution(layers: List[dict]) -> int:
    total = 0
    for layer in layers:
        t = layer["type"]
        if t == "Linear":
            total += 2 * layer["in_features"] * layer["out_features"]
        elif t == "Conv2d":
            k = layer["kernel_size"]
            total += 2 * layer["out_channels"] * layer["in_channels"] * k * k * layer["output_height"] * layer["output_width"]
        elif t == "Embedding":
            total += layer["num_embeddings"]
    return total`,
  solution_explanation: "FLOPs 추정은 모델 효율성 분석의 기본입니다. Linear의 경우 곱셈과 덧셈을 모두 세므로 2×M×N입니다.",
  sample_tests: [
    { input: { layers: [{"type":"Linear","in_features":768,"out_features":3072},{"type":"Linear","in_features":3072,"out_features":768}] }, expected: 9437184 },
    { input: { layers: [{"type":"Embedding","num_embeddings":30000}] }, expected: 30000 },
  ],
  hidden_tests: [
    { input: { layers: [{"type":"Conv2d","in_channels":3,"out_channels":64,"kernel_size":7,"output_height":112,"output_width":112}] }, expected: 235225088, failure_category: "standard" },
    { input: { layers: [{"type":"ReLU"},{"type":"Linear","in_features":10,"out_features":10}] }, expected: 200, failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["model_param_counter", "model_memory_calc"],
  fallback_problem_ids: ["model_param_counter"],
};
export default problem;
