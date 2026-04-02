import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_layer_norm",
  title: "Layer Normalization",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "normalization", "statistics"],
  statement_en: `Implement Layer Normalization using basic PyTorch operations (do not use nn.LayerNorm).

Given a 2D input tensor of shape [batch, features] and a small epsilon value:

For each sample (row), normalize the features:
  output = (x - mean) / sqrt(var + eps)

Use the population variance (unbiased=False, dividing by N, not N-1). No learnable parameters (gamma=1, beta=0).

Return the normalized tensor as a nested list.`,
  function_name: "solution",
  signature: "def solution(x_data: list, eps: float) -> list:",
  constraints: [
    "1 <= batch <= 8",
    "1 <= features <= 16",
    "1e-8 <= eps <= 1e-2",
    "All input values are real numbers in [-100, 100]",
  ],
  examples: [
    {
      input: { x_data: [[1.0, 2.0, 3.0]], eps: 1e-5 },
      output: [[-1.2247, 0.0, 1.2247]],
      explanation:
        "mean=2.0, var(unbiased=False)=2/3≈0.6667, std≈0.8165. Normalized: [(1-2)/0.8165, 0, (3-2)/0.8165] ≈ [-1.2247, 0, 1.2247].",
    },
    {
      input: { x_data: [[0.0, 0.0, 0.0]], eps: 1e-5 },
      output: [[0.0, 0.0, 0.0]],
      explanation:
        "All values identical → mean=0, var=0, normalized = 0/sqrt(eps) ≈ 0 for each element.",
    },
  ],
  starter_code: `import torch

def solution(x_data, eps):
    pass`,
  hints: [
    "x.mean(dim=-1, keepdim=True)로 각 행의 평균을 구하세요.",
    "x.var(dim=-1, unbiased=False, keepdim=True)로 모분산을 구하세요. unbiased=False가 중요합니다!",
    "keepdim=True를 사용해야 브로드캐스팅이 올바르게 동작합니다.",
    "torch.sqrt(var + eps)로 분모를 계산하세요.",
  ],
  solution_code: `import torch

def solution(x_data, eps):
    x = torch.tensor(x_data, dtype=torch.float32)
    mean = x.mean(dim=-1, keepdim=True)
    var = x.var(dim=-1, unbiased=False, keepdim=True)
    out = (x - mean) / torch.sqrt(var + eps)
    return out.tolist()`,
  solution_explanation: `입력 데이터를 float32 텐서로 변환합니다. 각 행(샘플)에 대해 평균과 분산을 계산합니다. 여기서 unbiased=False를 사용하여 모분산(N으로 나눔)을 구합니다. keepdim=True로 차원을 유지해 브로드캐스팅이 올바르게 동작하도록 합니다. (x - mean) / sqrt(var + eps)로 정규화하며, eps는 분산이 0일 때 0으로 나누는 것을 방지합니다. 이것이 nn.LayerNorm의 내부 동작 원리입니다.`,
  sample_tests: [
    {
      input: { x_data: [[1.0, 2.0, 3.0]], eps: 1e-5 },
      expected: [[-1.2247, 0.0, 1.2247]],
    },
    {
      input: { x_data: [[0.0, 0.0, 0.0]], eps: 1e-5 },
      expected: [[0.0, 0.0, 0.0]],
    },
  ],
  hidden_tests: [
    {
      input: { x_data: [[4.0, 4.0]], eps: 1e-5 },
      expected: [[0.0, 0.0]],
      failure_category: "zero_variance",
    },
    {
      input: {
        x_data: [
          [1.0, 3.0],
          [2.0, 4.0],
        ],
        eps: 1e-5,
      },
      expected: [
        [-1.0, 1.0],
        [-1.0, 1.0],
      ],
      failure_category: "batch_normalization",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
