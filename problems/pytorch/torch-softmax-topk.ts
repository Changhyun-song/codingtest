import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_softmax_topk",
  title: "Softmax and Top-K Selection",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "softmax", "topk", "probability"],
  statement_en: `Given a 2D list of logits with shape \`[batch, num_classes]\` and an integer \`k\`:

1. Apply \`F.softmax(dim=-1)\` to convert logits to probabilities.
2. Use \`torch.topk\` to find the top-k highest probabilities and their indices for each row.
3. Return \`[top_values_list, top_indices_list]\` where each is a nested list preserving the batch dimension.

The softmax function converts raw scores (logits) into a probability distribution where all values sum to 1. Top-k then selects the k largest probabilities per row.`,
  function_name: "solution",
  signature: "def solution(logits: list, k: int) -> list:",
  constraints: [
    "logits has shape [B, C] where 1 ≤ B ≤ 4, 2 ≤ C ≤ 10",
    "1 ≤ k ≤ C",
    "Logit values are floats",
  ],
  examples: [
    {
      input: { logits: [[1.0, 2.0, 3.0]], k: 2 },
      output: [[[0.6652, 0.2447]], [[2, 1]]],
      explanation:
        "softmax([1,2,3]) ≈ [0.0900, 0.2447, 0.6652]. Top-2: values=[0.6652, 0.2447] at indices=[2, 1].",
    },
  ],
  starter_code: `import torch
import torch.nn.functional as F

def solution(logits: list, k: int) -> list:
    # 여기에 코드를 작성하세요
    # 1. softmax 적용
    # 2. topk로 상위 k개 선택
    pass`,
  hints: [
    "F.softmax(tensor, dim=-1)로 마지막 차원에 softmax를 적용하세요.",
    "torch.topk(tensor, k, dim=-1)은 (values, indices) 튜플을 반환합니다.",
    "values와 indices 모두 .tolist()로 변환하여 [values_list, indices_list] 형태로 반환하세요.",
  ],
  solution_code: `import torch
import torch.nn.functional as F

def solution(logits: list, k: int) -> list:
    t = torch.tensor(logits)
    probs = F.softmax(t, dim=-1)
    values, indices = torch.topk(probs, k, dim=-1)
    return [values.tolist(), indices.tolist()]`,
  solution_explanation:
    "로짓 텐서에 F.softmax(dim=-1)을 적용하여 각 행을 확률 분포로 변환합니다. softmax는 e^x_i / Σe^x_j로 계산되어 모든 값이 0~1 사이이고 합이 1이 됩니다. torch.topk로 각 행에서 가장 큰 k개의 확률값과 해당 인덱스를 추출하여 반환합니다.",
  sample_tests: [
    {
      input: { logits: [[1.0, 2.0, 3.0]], k: 2 },
      expected: [[[0.6652, 0.2447]], [[2, 1]]],
    },
  ],
  hidden_tests: [
    {
      input: {
        logits: [
          [2.0, 1.0, 0.5],
          [0.1, 0.2, 0.7],
        ],
        k: 1,
      },
      expected: [[[0.6285], [0.4639]], [[0], [2]]],
      failure_category: "multi_batch_topk",
    },
    {
      input: { logits: [[1.0, 1.0, 1.0, 1.0]], k: 2 },
      expected: [[[0.25, 0.25]], [[0, 1]]],
      failure_category: "uniform_distribution",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
