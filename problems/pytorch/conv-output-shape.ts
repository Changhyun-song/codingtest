import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "conv_output_shape",
  title: "CNN Output Shape Calculator",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "deep_learning"],
  statement_en: `Calculate the **output spatial dimensions** after a sequence of Conv2d and MaxPool2d layers.

Given:
- \`input_size\`: [H, W] of the input image
- \`layers\`: list of layer configs, each is a dict with:
  - \`type\`: "conv" or "pool"
  - \`kernel_size\`: int
  - \`stride\`: int (default 1)
  - \`padding\`: int (default 0)

The output size formula for both Conv2d and MaxPool2d is:
\`\`\`
output_size = floor((input_size + 2*padding - kernel_size) / stride) + 1
\`\`\`

Apply each layer sequentially and return the final [H, W].

**Function signature:**
\`\`\`python
def solution(input_size: List[int], layers: List[dict]) -> List[int]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(input_size: List[int], layers: List[dict]) -> List[int]:",
  constraints: ["input_size values >= 1", "1 <= len(layers) <= 20", "kernel_size >= 1"],
  examples: [
    { input: { input_size: [32, 32], layers: [{ type: "conv", kernel_size: 3, stride: 1, padding: 1 }] }, output: [32, 32], explanation: "3x3 conv with padding=1, stride=1 preserves size" },
    { input: { input_size: [28, 28], layers: [{ type: "conv", kernel_size: 5, stride: 1, padding: 0 }, { type: "pool", kernel_size: 2, stride: 2, padding: 0 }] }, output: [12, 12], explanation: "28->24 (conv5) -> 12 (pool2)" },
  ],
  starter_code: `def solution(input_size: List[int], layers: List[dict]) -> List[int]:
    # 각 레이어에 대해 output = floor((input + 2*padding - kernel) / stride) + 1
    # Conv2d와 MaxPool2d 모두 같은 공식
    pass`,
  hints: [
    "공식: output = (input + 2*padding - kernel_size) // stride + 1",
    "각 레이어를 순서대로 적용하며 H와 W를 각각 계산하세요.",
    "stride의 기본값은 1, padding의 기본값은 0입니다. dict.get()으로 기본값을 처리하세요.",
  ],
  solution_code: `def solution(input_size: List[int], layers: List[dict]) -> List[int]:
    h, w = input_size
    for layer in layers:
        k = layer["kernel_size"]
        s = layer.get("stride", 1)
        p = layer.get("padding", 0)
        h = (h + 2 * p - k) // s + 1
        w = (w + 2 * p - k) // s + 1
    return [h, w]`,
  solution_explanation: "Conv2d/MaxPool2d 출력 크기 공식을 순차 적용합니다. CNN 설계 시 필수적인 계산입니다. O(레이어 수) 시간.",
  sample_tests: [
    { input: { input_size: [32, 32], layers: [{ type: "conv", kernel_size: 3, stride: 1, padding: 1 }] }, expected: [32, 32] },
    { input: { input_size: [28, 28], layers: [{ type: "conv", kernel_size: 5, stride: 1, padding: 0 }, { type: "pool", kernel_size: 2, stride: 2, padding: 0 }] }, expected: [12, 12] },
  ],
  hidden_tests: [
    { input: { input_size: [224, 224], layers: [{ type: "conv", kernel_size: 7, stride: 2, padding: 3 }, { type: "pool", kernel_size: 3, stride: 2, padding: 1 }] }, expected: [56, 56], failure_category: "resnet_style" },
    { input: { input_size: [8, 8], layers: [{ type: "conv", kernel_size: 3, stride: 1, padding: 0 }, { type: "conv", kernel_size: 3, stride: 1, padding: 0 }, { type: "conv", kernel_size: 3, stride: 1, padding: 0 }] }, expected: [2, 2], failure_category: "multiple_convs" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation", "simple_mlp_forward"],
  fallback_problem_ids: ["tensor_manipulation"],
};

export default problem;
