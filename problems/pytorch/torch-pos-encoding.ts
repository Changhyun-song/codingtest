import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_pos_encoding",
  title: "Sinusoidal Positional Encoding",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "positional-encoding", "transformer", "trigonometry"],
  statement_en: `Implement sinusoidal positional encoding as described in "Attention Is All You Need" (Vaswani et al., 2017).

For a given max_len and d_model, compute the positional encoding matrix PE of shape [max_len, d_model] where:

- PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
- PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))

Here, pos is the position index (0 to max_len-1) and i is the dimension index.

Return the positional encoding matrix as a nested list.`,
  function_name: "solution",
  signature: "def solution(max_len: int, d_model: int) -> list:",
  constraints: [
    "1 <= max_len <= 20",
    "2 <= d_model <= 16",
    "d_model is always even",
  ],
  examples: [
    {
      input: { max_len: 2, d_model: 4 },
      output: [
        [0.0, 1.0, 0.0, 1.0],
        [0.8415, 0.5403, 0.01, 1.0],
      ],
      explanation:
        "Position 0: all sin(0)=0 and cos(0)=1. Position 1: div_term=[1, 0.01], so [sin(1), cos(1), sin(0.01), cos(0.01)] ≈ [0.8415, 0.5403, 0.01, 1.0].",
    },
  ],
  starter_code: `import torch
import math

def solution(max_len, d_model):
    pass`,
  hints: [
    "div_term을 계산할 때 torch.exp(torch.arange(0, d_model, 2) * -(math.log(10000.0) / d_model))를 사용하세요.",
    "짝수 인덱스(0::2)에는 sin, 홀수 인덱스(1::2)에는 cos를 적용합니다.",
    "position을 unsqueeze(1)로 열 벡터로 만들어 브로드캐스팅하세요.",
    "10000^(2i/d_model) = exp(2i * ln(10000) / d_model)로 계산하면 수치적으로 안정적입니다.",
  ],
  solution_code: `import torch
import math

def solution(max_len, d_model):
    pe = torch.zeros(max_len, d_model)
    position = torch.arange(0, max_len, dtype=torch.float32).unsqueeze(1)
    div_term = torch.exp(torch.arange(0, d_model, 2, dtype=torch.float32) * -(math.log(10000.0) / d_model))
    pe[:, 0::2] = torch.sin(position * div_term)
    pe[:, 1::2] = torch.cos(position * div_term)
    return pe.tolist()`,
  solution_explanation: `먼저 [max_len, d_model] 크기의 0 텐서를 생성합니다. position은 [0, 1, ..., max_len-1]을 열 벡터로 만들고, div_term은 10000^(2i/d_model)의 역수를 exp와 log를 사용해 수치적으로 안정적으로 계산합니다. 짝수 차원에는 sin(position * div_term), 홀수 차원에는 cos(position * div_term)를 적용합니다. 이 인코딩은 상대적 위치 관계를 선형 변환으로 표현할 수 있게 해주며, 학습 없이도 위치 정보를 제공합니다.`,
  sample_tests: [
    {
      input: { max_len: 2, d_model: 4 },
      expected: [
        [0.0, 1.0, 0.0, 1.0],
        [0.8415, 0.5403, 0.01, 1.0],
      ],
    },
  ],
  hidden_tests: [
    {
      input: { max_len: 3, d_model: 2 },
      expected: [
        [0.0, 1.0],
        [0.8415, 0.5403],
        [0.9093, -0.4161],
      ],
      failure_category: "wrong_frequency_computation",
    },
    {
      input: { max_len: 1, d_model: 6 },
      expected: [[0.0, 1.0, 0.0, 1.0, 0.0, 1.0]],
      failure_category: "zero_position_edge_case",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
