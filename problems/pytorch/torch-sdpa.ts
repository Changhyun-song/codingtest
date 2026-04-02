import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_sdpa",
  title: "Scaled Dot-Product Attention",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "softmax", "linear-algebra"],
  statement_en: `Implement Scaled Dot-Product Attention from scratch using PyTorch.

Given three 2D tensors Q (Query), K (Key), and V (Value), each with shape [seq_len, d_k], compute:

1. **Scores**: scores = Q @ K^T / sqrt(d_k)
2. **Weights**: weights = softmax(scores, dim=-1)
3. **Output**: output = weights @ V

Return the output tensor as a nested list.

Note: d_k is inferred from the last dimension of Q (i.e., Q.shape[-1]).`,
  function_name: "solution",
  signature: "def solution(Q: list, K: list, V: list) -> list:",
  constraints: [
    "1 <= seq_len <= 10",
    "1 <= d_k <= 8",
    "All input values are real numbers in [-10, 10]",
    "Q, K, V are 2D lists representing tensors",
  ],
  examples: [
    {
      input: {
        Q: [[1, 0], [0, 1]],
        K: [[1, 0], [0, 1]],
        V: [[1, 2], [3, 4]],
      },
      output: [[1.66, 2.66], [2.34, 3.34]],
      explanation:
        "d_k=2, scores = identity / sqrt(2). After softmax, row0 weights ≈ [0.67, 0.33], row1 ≈ [0.33, 0.67]. Output = weights @ V.",
    },
    {
      input: {
        Q: [[1, 0]],
        K: [[1, 0], [0, 1]],
        V: [[10, 0], [0, 10]],
      },
      output: [[6.70, 3.30]],
      explanation:
        "d_k=2, scores = [[1,0]] / sqrt(2) = [[0.707, 0]]. softmax ≈ [0.670, 0.330]. output ≈ [[6.70, 3.30]].",
    },
  ],
  starter_code: `import torch
import torch.nn.functional as F

def solution(Q, K, V):
    pass`,
  hints: [
    "Q @ K.T로 내적을 구한 뒤, sqrt(d_k)로 나누어 스케일링하세요.",
    "F.softmax(scores, dim=-1)로 어텐션 가중치를 구하세요.",
    "d_k는 Q 텐서의 마지막 차원 크기(q.shape[-1])입니다.",
  ],
  solution_code: `import torch
import torch.nn.functional as F

def solution(Q, K, V):
    q = torch.tensor(Q, dtype=torch.float32)
    k = torch.tensor(K, dtype=torch.float32)
    v = torch.tensor(V, dtype=torch.float32)
    d_k = q.shape[-1]
    scores = q @ k.T / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)
    output = weights @ v
    return output.tolist()`,
  solution_explanation: `Q, K, V를 float32 텐서로 변환합니다. d_k는 Q의 마지막 차원 크기로 결정됩니다. 먼저 Q와 K의 전치행렬을 행렬곱하여 유사도 점수를 계산하고, sqrt(d_k)로 나누어 스케일링합니다. 이후 softmax를 적용하여 어텐션 가중치를 구하고, 이 가중치와 V를 행렬곱하여 최종 출력을 얻습니다. 이것이 Transformer의 핵심인 Scaled Dot-Product Attention입니다.`,
  sample_tests: [
    {
      input: {
        Q: [[1, 0], [0, 1]],
        K: [[1, 0], [0, 1]],
        V: [[1, 2], [3, 4]],
      },
      expected: [[1.66, 2.66], [2.34, 3.34]],
    },
    {
      input: {
        Q: [[1, 0]],
        K: [[1, 0], [0, 1]],
        V: [[10, 0], [0, 10]],
      },
      expected: [[6.70, 3.30]],
    },
  ],
  hidden_tests: [
    {
      input: {
        Q: [[1, 1], [0, 0]],
        K: [[1, 1], [0, 0]],
        V: [[1, 0], [0, 1]],
      },
      expected: [[0.8044, 0.1956], [0.5, 0.5]],
      failure_category: "incorrect_scaling",
    },
    {
      input: {
        Q: [[0, 0]],
        K: [[0, 0], [0, 0]],
        V: [[1, 2], [3, 4]],
      },
      expected: [[2.0, 3.0]],
      failure_category: "zero_input_edge_case",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.05,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
