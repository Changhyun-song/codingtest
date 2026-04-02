import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "build_simple_cnn",
  title: "Build Simple CNN Classifier",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "cnn", "neural_network"],
  statement_en: `You are designing a small CNN **without running PyTorch**: given the input tensor shape and a sequence of layers, compute the **output shape** after the last layer.

**Input shape:** \`[batch, channels, height, width]\`.

**Layers:** each element is a dict with \`"type"\` and parameters:

- \`"conv2d"\`: \`out_channels\`, \`kernel_size\`, optional \`stride\` (default 1), \`padding\` (default 0). Spatial size: \`(h + 2*p - k) // stride + 1\` (same for width).
- \`"maxpool2d"\`: \`kernel_size\`, optional \`stride\` (default \`kernel_size\`). Spatial size: \`(h - k) // stride + 1\` (PyTorch-style with padding 0).
- \`"flatten"\`: turns \`[B, C, H, W]\` into a vector of length \`C*H*W\` (remember \`features\` for subsequent linear layers).
- \`"linear"\`: \`out_features\` — output is \`[B, out_features]\` (1D feature dim only; batch unchanged).

If the pipeline ends while still in 4D (no flatten), return \`[batch, C, H, W]\`. If a flatten occurred (possibly followed by linear layers), return \`[batch, last_feature_dim]\`.

**Function signature:**
\`\`\`python
def solution(input_shape: List[int], layers: List[dict]) -> List[int]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(input_shape: List[int], layers: List[dict]) -> List[int]:",
  constraints: [
    "batch >= 1",
    "1 <= len(layers) <= 30",
    "All spatial dimensions stay positive after each layer in test data",
  ],
  examples: [
    {
      input: {
        input_shape: [1, 3, 32, 32],
        layers: [
          { type: "conv2d", out_channels: 16, kernel_size: 3, padding: 1 },
          { type: "maxpool2d", kernel_size: 2 },
        ],
      },
      output: [1, 16, 16, 16],
      explanation: "Conv preserves 32×32 with padding=1, k=3; 2×2 pool halves spatial size.",
    },
    {
      input: {
        input_shape: [2, 1, 4, 4],
        layers: [{ type: "flatten" }, { type: "linear", out_features: 5 }],
      },
      output: [2, 5],
      explanation: "Flatten gives 1×4×4=16 features; linear maps to 5 classes → [B, 5].",
    },
  ],
  starter_code: `def solution(input_shape: List[int], layers: List[dict]) -> List[int]:
    pass`,
  hints: [
    "Conv2d 이후 채널은 out_channels로 바뀝니다. 높이·너비는 주어진 공식으로 갱신하세요.",
    "MaxPool2d에서 stride를 생략하면 커널 크기와 같다고 가정하면 됩니다.",
    "flatten 이후에는 [배치, 특징 수] 형태로 추적하고, linear는 특징 차원만 바꿉니다.",
  ],
  solution_code: `def solution(input_shape: List[int], layers: List[dict]) -> List[int]:
    batch, c, h, w = input_shape
    flat = False
    features = 0
    for layer in layers:
        t = layer["type"]
        if t == "conv2d":
            k = layer["kernel_size"]
            s = layer.get("stride", 1)
            p = layer.get("padding", 0)
            out_c = layer["out_channels"]
            h = (h + 2 * p - k) // s + 1
            w = (w + 2 * p - k) // s + 1
            c = out_c
        elif t == "maxpool2d":
            k = layer["kernel_size"]
            s = layer.get("stride", k)
            h = (h - k) // s + 1
            w = (w - k) // s + 1
        elif t == "flatten":
            features = c * h * w
            flat = True
        elif t == "linear":
            features = layer["out_features"]
    if flat:
        return [batch, features]
    return [batch, c, h, w]`,
  solution_explanation:
    "Conv/풀링은 공간 크기와 채널을 순차 갱신하고, flatten 이후에는 선형층만 특징 차원을 바꿉니다. CNN 설계 시 텐서 크기를 손으로 추적하는 흐름을 그대로 코드로 옮깁니다.",
  sample_tests: [
    {
      input: {
        input_shape: [1, 3, 32, 32],
        layers: [
          { type: "conv2d", out_channels: 16, kernel_size: 3, padding: 1 },
          { type: "maxpool2d", kernel_size: 2 },
          { type: "conv2d", out_channels: 32, kernel_size: 3, padding: 1 },
          { type: "maxpool2d", kernel_size: 2 },
          { type: "flatten" },
          { type: "linear", out_features: 10 },
        ],
      },
      expected: [1, 10],
    },
  ],
  hidden_tests: [
    {
      input: {
        input_shape: [4, 1, 28, 28],
        layers: [
          { type: "conv2d", out_channels: 8, kernel_size: 5 },
          { type: "maxpool2d", kernel_size: 2 },
          { type: "flatten" },
          { type: "linear", out_features: 64 },
          { type: "linear", out_features: 10 },
        ],
      },
      expected: [4, 10],
      failure_category: "standard",
    },
    {
      input: {
        input_shape: [2, 3, 64, 64],
        layers: [
          { type: "conv2d", out_channels: 64, kernel_size: 3, stride: 2, padding: 1 },
          { type: "conv2d", out_channels: 128, kernel_size: 3, stride: 2, padding: 1 },
          { type: "maxpool2d", kernel_size: 2 },
        ],
      },
      expected: [2, 128, 8, 8],
      failure_category: "no_flatten",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["conv_output_shape", "simple_mlp_forward"],
  fallback_problem_ids: ["conv_output_shape"],
};

export default problem;
