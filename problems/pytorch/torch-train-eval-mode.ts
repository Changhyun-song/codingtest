import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_train_eval_mode",
  title: "Train vs Eval Mode: Dropout Behavior",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "dropout", "train-eval-mode", "regularization"],
  statement_en: `Given a 2D input tensor and a dropout rate, apply nn.Dropout in eval mode and verify that the output is identical to the input.

In PyTorch, nn.Dropout behaves differently depending on the model's mode:
- In train mode, it randomly zeroes elements with probability p and scales the rest by 1/(1-p).
- In eval mode, it does nothing — the output is identical to the input.

Your task:
1. Convert the input list to a float32 tensor.
2. Create an nn.Dropout layer with the given dropout_rate.
3. Set the layer to eval mode using .eval().
4. Pass the input tensor through the dropout layer.
5. Return [output.tolist(), is_equal] where is_equal is a boolean indicating whether the output exactly matches the input.`,
  function_name: "solution",
  signature: "def solution(x_data: list, dropout_rate: float) -> list:",
  constraints: [
    "x_data is a 2D list of numbers",
    "0 < dropout_rate < 1",
    "In eval mode, nn.Dropout passes input through unchanged",
  ],
  examples: [
    {
      input: { x_data: [[1, 2, 3], [4, 5, 6]], dropout_rate: 0.5 },
      output: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], true],
      explanation:
        "In eval mode, dropout is disabled so the output equals the input exactly.",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x_data, dropout_rate):
    pass`,
  hints: [
    "nn.Dropout은 eval 모드에서 입력을 변경하지 않습니다.",
    "model.eval()을 호출하면 드롭아웃이 비활성화됩니다.",
    "torch.equal()을 사용하여 두 텐서가 동일한지 확인할 수 있습니다.",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(x_data, dropout_rate):
    x = torch.tensor(x_data, dtype=torch.float32)
    drop = nn.Dropout(p=dropout_rate)
    drop.eval()
    out = drop(x)
    return [out.tolist(), bool(torch.equal(out, x))]`,
  solution_explanation:
    "nn.Dropout은 train 모드에서는 확률 p로 요소를 0으로 만들고 나머지를 1/(1-p)로 스케일링하지만, eval 모드에서는 입력을 그대로 통과시킵니다. drop.eval()을 호출하여 eval 모드로 전환하면 드롭아웃이 비활성화되어 출력이 입력과 정확히 동일합니다. torch.equal()로 두 텐서의 동일성을 확인합니다.",
  sample_tests: [
    {
      input: { x_data: [[1, 2, 3], [4, 5, 6]], dropout_rate: 0.5 },
      expected: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], true],
    },
    {
      input: { x_data: [[0.0, 10.0]], dropout_rate: 0.9 },
      expected: [[[0.0, 10.0]], true],
    },
  ],
  hidden_tests: [
    {
      input: { x_data: [[1, 1, 1, 1, 1]], dropout_rate: 0.99 },
      expected: [[[1.0, 1.0, 1.0, 1.0, 1.0]], true],
      failure_category: "high_dropout_rate_eval",
    },
    {
      input: { x_data: [[100, 200], [300, 400]], dropout_rate: 0.5 },
      expected: [[[100.0, 200.0], [300.0, 400.0]], true],
      failure_category: "large_values_eval",
    },
  ],
  checker_type: "exact",
  tolerance: 0,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
