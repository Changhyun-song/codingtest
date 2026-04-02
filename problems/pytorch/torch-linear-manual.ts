import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_linear_manual",
  title: "Manual Linear Layer with nn.Parameter",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "nn.Module", "linear", "forward"],
  statement_en: `Implement a custom linear layer **without** using \`nn.Linear\`. Given input \`x\`, weight matrix \`W\`, and bias vector \`b\`, compute \`x @ W^T + b\`.

You must implement this as a proper \`nn.Module\` subclass:
1. Define a class that inherits from \`nn.Module\`.
2. Store the weight and bias as \`nn.Parameter\` objects in \`__init__\`.
3. Implement the \`forward\` method to compute \`x @ self.weight.T + self.bias\`.
4. Instantiate the module, pass x through it, and return the result as a nested list.

This replicates the behavior of \`nn.Linear(in_features, out_features)\`.`,
  function_name: "solution",
  signature: "def solution(x: list, weight: list, bias: list) -> list:",
  constraints: [
    "x is a 2D list of shape [batch, in_features]",
    "weight is a 2D list of shape [out_features, in_features]",
    "bias is a 1D list of shape [out_features]",
    "Computation: x @ weight.T + bias",
  ],
  examples: [
    {
      input: { x: [[1, 2]], weight: [[3, 4], [5, 6]], bias: [1, 1] },
      output: [[12, 18]],
      explanation:
        "x @ W.T = [1,2] @ [[3,5],[4,6]] = [11,17], + bias [1,1] = [12,18].",
    },
    {
      input: {
        x: [[1, 0], [0, 1]],
        weight: [[2, 0], [0, 3]],
        bias: [0, 0],
      },
      output: [[2, 0], [0, 3]],
      explanation:
        "Identity-like input times diagonal weight produces the weight's diagonal values.",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x: list, weight: list, bias: list) -> list:
    # nn.Module을 상속받는 커스텀 Linear 클래스를 만드세요
    # nn.Parameter로 weight와 bias를 저장하세요
    # forward에서 x @ self.weight.T + self.bias를 계산하세요
    pass`,
  hints: [
    "nn.Module을 상속하고 __init__에서 super().__init__()을 호출하세요.",
    "nn.Parameter(torch.tensor(...))로 학습 가능한 파라미터를 만들 수 있습니다.",
    "forward 메서드에서 x @ self.weight.T + self.bias를 반환하세요.",
    "모델 인스턴스를 함수처럼 호출하면 forward가 실행됩니다: model(input_tensor).",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(x: list, weight: list, bias: list) -> list:
    class MyLinear(nn.Module):
        def __init__(self, w, b):
            super().__init__()
            self.weight = nn.Parameter(torch.tensor(w, dtype=torch.float32))
            self.bias = nn.Parameter(torch.tensor(b, dtype=torch.float32))
        def forward(self, x):
            return x @ self.weight.T + self.bias
    model = MyLinear(weight, bias)
    out = model(torch.tensor(x, dtype=torch.float32))
    return out.tolist()`,
  solution_explanation:
    "nn.Module을 상속하는 MyLinear 클래스를 정의합니다. __init__에서 weight와 bias를 nn.Parameter로 감싸서 저장하면 PyTorch가 자동으로 학습 가능한 파라미터로 인식합니다. forward 메서드에서 입력 x와 weight의 전치를 행렬 곱한 후 bias를 더합니다. 이것은 nn.Linear의 내부 동작과 동일합니다.",
  sample_tests: [
    {
      input: { x: [[1, 2]], weight: [[3, 4], [5, 6]], bias: [1, 1] },
      expected: [[12, 18]],
    },
    {
      input: {
        x: [[1, 0], [0, 1]],
        weight: [[2, 0], [0, 3]],
        bias: [0, 0],
      },
      expected: [[2, 0], [0, 3]],
    },
  ],
  hidden_tests: [
    {
      input: {
        x: [[1, 1, 1]],
        weight: [[1, 1, 1], [2, 2, 2]],
        bias: [0, 0],
      },
      expected: [[3, 6]],
      failure_category: "multi_output_features",
    },
    {
      input: {
        x: [[2, 3], [4, 5]],
        weight: [[1, 0], [0, 1]],
        bias: [10, 20],
      },
      expected: [[12, 23], [14, 25]],
      failure_category: "batch_with_bias",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
