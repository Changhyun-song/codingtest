import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_mlp_forward",
  title: "Two-Layer MLP Forward Pass",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "nn.Module", "MLP", "forward"],
  statement_en: `Implement a 2-layer Multi-Layer Perceptron (MLP) and run a forward pass.

The architecture is: **Linear(in, hidden) → ReLU → Linear(hidden, out)**

Given:
- \`x\`: input tensor (2D list, shape [batch, in_features])
- \`w1\`, \`b1\`: weights and bias for the first linear layer
- \`w2\`, \`b2\`: weights and bias for the second linear layer

Steps:
1. Create two \`nn.Linear\` layers with the correct dimensions.
2. Manually set their weights and biases using the provided values (use \`torch.no_grad()\` and \`.copy_()\`).
3. Run the forward pass: \`x → linear1 → relu → linear2\`.
4. Return the output as a nested list.

Note: \`w1\` has shape [hidden, in_features] and \`w2\` has shape [out, hidden].`,
  function_name: "solution",
  signature:
    "def solution(x: list, w1: list, b1: list, w2: list, b2: list) -> list:",
  constraints: [
    "x is a 2D list [batch, in_features]",
    "w1 is [hidden, in_features], b1 is [hidden]",
    "w2 is [out, hidden], b2 is [out]",
    "Use ReLU activation between the two layers",
  ],
  examples: [
    {
      input: {
        x: [[1.0, 2.0]],
        w1: [[0.5, 0.5], [0.5, 0.5]],
        b1: [0, 0],
        w2: [[1, 1]],
        b2: [0],
      },
      output: [[3.0]],
      explanation:
        "Layer1: [1*0.5+2*0.5, 1*0.5+2*0.5]=[1.5,1.5], ReLU=[1.5,1.5], Layer2: [1.5+1.5]=[3.0].",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x: list, w1: list, b1: list, w2: list, b2: list) -> list:
    # nn.Linear 두 개를 만들고 weight/bias를 수동으로 설정하세요
    # forward: linear1 -> relu -> linear2
    pass`,
  hints: [
    "nn.Linear(in_features, out_features)로 레이어를 생성하세요. w1의 shape에서 차원을 알 수 있습니다.",
    "torch.no_grad() 블록 안에서 layer.weight.copy_(tensor)로 가중치를 설정하세요.",
    "F.relu() 또는 torch.relu()로 ReLU 활성화를 적용하세요.",
    "nn.Linear의 weight shape은 [out_features, in_features]입니다.",
  ],
  solution_code: `import torch
import torch.nn as nn
import torch.nn.functional as F

def solution(x: list, w1: list, b1: list, w2: list, b2: list) -> list:
    w1_t = torch.tensor(w1, dtype=torch.float32)
    b1_t = torch.tensor(b1, dtype=torch.float32)
    w2_t = torch.tensor(w2, dtype=torch.float32)
    b2_t = torch.tensor(b2, dtype=torch.float32)
    hidden, in_f = w1_t.shape
    out_f = w2_t.shape[0]
    layer1 = nn.Linear(in_f, hidden)
    layer2 = nn.Linear(hidden, out_f)
    with torch.no_grad():
        layer1.weight.copy_(w1_t)
        layer1.bias.copy_(b1_t)
        layer2.weight.copy_(w2_t)
        layer2.bias.copy_(b2_t)
    x_t = torch.tensor(x, dtype=torch.float32)
    out = layer2(F.relu(layer1(x_t)))
    return out.tolist()`,
  solution_explanation:
    "w1의 shape [hidden, in_features]에서 각 레이어의 차원을 파악합니다. nn.Linear를 생성한 후 torch.no_grad() 블록에서 .copy_()를 사용해 가중치를 수동으로 설정합니다. 순전파는 입력을 첫 번째 Linear에 통과시킨 후 ReLU를 적용하고, 그 결과를 두 번째 Linear에 통과시킵니다. ReLU는 음수를 0으로 만드는 활성화 함수입니다.",
  sample_tests: [
    {
      input: {
        x: [[1.0, 2.0]],
        w1: [[0.5, 0.5], [0.5, 0.5]],
        b1: [0, 0],
        w2: [[1, 1]],
        b2: [0],
      },
      expected: [[3.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        x: [[-1.0, 2.0]],
        w1: [[1, 0], [0, 1]],
        b1: [0, 0],
        w2: [[1, -1]],
        b2: [0],
      },
      expected: [[-2.0]],
      failure_category: "relu_negative_handling",
    },
    {
      input: {
        x: [[1, 2, 3]],
        w1: [[1, 0, 0], [0, 1, 0]],
        b1: [1, 1],
        w2: [[1], [1]],
        b2: [0],
      },
      expected: [[5.0]],
      failure_category: "dimension_change_with_bias",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
