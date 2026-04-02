import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_batchnorm_stats",
  title: "Manual Batch Normalization Statistics",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "batch-normalization", "statistics", "normalization"],
  statement_en: `Compute batch normalization statistics manually for a 2D input tensor of shape [batch_size, num_features].

For each feature (column), compute:
1. Mean across the batch dimension
2. Variance across the batch dimension (population variance, not sample variance)
3. Normalized output using the formula: (x - mean) / sqrt(variance + eps)

Return a list of three elements: [means, variances, normalized_output], where each is a nested list matching the appropriate shape.`,
  function_name: "solution",
  signature: "def solution(x_data: list, eps: float) -> list:",
  constraints: [
    "x_data is a 2D list of shape [batch_size, num_features]",
    "batch_size >= 1",
    "eps > 0 (small constant for numerical stability)",
    "Use population variance (unbiased=False), not sample variance",
  ],
  examples: [
    {
      input: { x_data: [[1, 2], [3, 4], [5, 6]], eps: 1e-5 },
      output: [
        [3.0, 4.0],
        [2.6667, 2.6667],
        [
          [-1.2247, -1.2247],
          [0.0, 0.0],
          [1.2247, 1.2247],
        ],
      ],
      explanation:
        "Per-feature mean is [3,4], population variance is [8/3, 8/3] ≈ [2.6667, 2.6667], and each column is normalized to zero mean and unit variance.",
    },
  ],
  starter_code: `import torch

def solution(x_data, eps):
    pass`,
  hints: [
    "torch.var()에서 unbiased=False를 사용하여 모집단 분산을 계산하세요.",
    "dim=0을 지정하면 배치 차원에 대해 통계를 계산합니다.",
    "분산이 0인 경우 eps가 0으로 나누는 것을 방지합니다.",
  ],
  solution_code: `import torch

def solution(x_data, eps):
    x = torch.tensor(x_data, dtype=torch.float32)
    mean = x.mean(dim=0)
    var = x.var(dim=0, unbiased=False)
    normalized = (x - mean) / torch.sqrt(var + eps)
    return [mean.tolist(), var.tolist(), normalized.tolist()]`,
  solution_explanation:
    "배치 정규화의 핵심은 각 특성(feature)별로 평균과 분산을 계산하여 정규화하는 것입니다. dim=0으로 배치 차원에 대해 mean과 var를 계산하고, unbiased=False로 모집단 분산(N으로 나눔)을 사용합니다. 정규화 공식 (x - mean) / sqrt(var + eps)를 적용하면 각 특성이 평균 0, 분산 1에 가까운 분포를 갖게 됩니다. eps는 분산이 0일 때 0으로 나누는 것을 방지합니다.",
  sample_tests: [
    {
      input: { x_data: [[1, 2], [3, 4], [5, 6]], eps: 1e-5 },
      expected: [
        [3.0, 4.0],
        [2.6667, 2.6667],
        [
          [-1.2247, -1.2247],
          [0.0, 0.0],
          [1.2247, 1.2247],
        ],
      ],
    },
    {
      input: { x_data: [[0, 0], [0, 0]], eps: 1e-5 },
      expected: [
        [0.0, 0.0],
        [0.0, 0.0],
        [
          [0.0, 0.0],
          [0.0, 0.0],
        ],
      ],
    },
  ],
  hidden_tests: [
    {
      input: { x_data: [[1, 10], [2, 20], [3, 30]], eps: 0.001 },
      expected: [
        [2.0, 20.0],
        [0.6667, 66.6667],
        [
          [-1.2247, -1.2247],
          [0.0, 0.0],
          [1.2247, 1.2247],
        ],
      ],
      failure_category: "incorrect_normalization",
    },
    {
      input: { x_data: [[5, 5], [5, 5], [5, 5]], eps: 1e-5 },
      expected: [
        [5.0, 5.0],
        [0.0, 0.0],
        [
          [0.0, 0.0],
          [0.0, 0.0],
          [0.0, 0.0],
        ],
      ],
      failure_category: "zero_variance_handling",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
