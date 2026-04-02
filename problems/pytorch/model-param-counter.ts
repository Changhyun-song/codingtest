import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "model_param_counter",
  title: "Model Parameter Counter",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Given a list of neural network layer descriptions, count the total number of trainable parameters.

Layer types:
- **Linear**: \`in_features * out_features\` weights + \`out_features\` bias (if bias=true)
- **Conv2d**: \`out_channels * in_channels * kernel_size^2\` weights + \`out_channels\` bias (if bias=true)
- **LayerNorm**: \`2 * normalized_shape\` (gamma + beta)
- **BatchNorm2d**: \`2 * num_features\` (gamma + beta)
- **Embedding**: \`num_embeddings * embedding_dim\`

**Function signature:**
\`\`\`python
def solution(layers: List[dict]) -> int:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(layers: List[dict]) -> int:",
  constraints: [
    "1 <= len(layers) <= 100",
    "All dimension values are positive integers",
  ],
  examples: [
    {
      input: {
        layers: [
          { type: "Linear", in_features: 768, out_features: 3072, bias: true },
        ],
      },
      output: 2362368,
      explanation: "768*3072 + 3072 = 2362368",
    },
  ],
  starter_code: `def solution(layers: List[dict]) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 레이어 타입별 파라미터 수 공식을 적용하세요.",
    "Linear는 가중치(in*out) + 바이어스(out). Conv2d는 out_ch * in_ch * k * k + bias.",
  ],
  solution_code: `def solution(layers: List[dict]) -> int:
    total = 0
    for layer in layers:
        t = layer["type"]
        if t == "Linear":
            params = layer["in_features"] * layer["out_features"]
            if layer.get("bias", True):
                params += layer["out_features"]
            total += params
        elif t == "Conv2d":
            k = layer["kernel_size"]
            params = layer["out_channels"] * layer["in_channels"] * k * k
            if layer.get("bias", True):
                params += layer["out_channels"]
            total += params
        elif t == "LayerNorm":
            total += 2 * layer["normalized_shape"]
        elif t == "BatchNorm2d":
            total += 2 * layer["num_features"]
        elif t == "Embedding":
            total += layer["num_embeddings"] * layer["embedding_dim"]
    return total`,
  solution_explanation: "각 레이어 타입에 맞는 파라미터 공식을 적용하여 합산합니다. 실제 모델 설계 시 메모리/연산량 추정에 필수적인 스킬입니다.",
  sample_tests: [
    {
      input: { layers: [{ type: "Linear", in_features: 768, out_features: 3072, bias: true }] },
      expected: 2362368,
    },
    {
      input: {
        layers: [
          { type: "Embedding", num_embeddings: 30000, embedding_dim: 768 },
          { type: "LayerNorm", normalized_shape: 768 },
          { type: "Linear", in_features: 768, out_features: 768, bias: true },
        ],
      },
      expected: 23632128,
    },
  ],
  hidden_tests: [
    {
      input: {
        layers: [
          { type: "Conv2d", in_channels: 3, out_channels: 64, kernel_size: 7, bias: true },
          { type: "BatchNorm2d", num_features: 64 },
        ],
      },
      expected: 9536,
      failure_category: "wrong_formula",
    },
    {
      input: {
        layers: [{ type: "Linear", in_features: 100, out_features: 10, bias: false }],
      },
      expected: 1000,
      failure_category: "edge_case",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["simple_mlp_forward", "conv_output_shape"],
  fallback_problem_ids: ["conv_output_shape"],
};

export default problem;
