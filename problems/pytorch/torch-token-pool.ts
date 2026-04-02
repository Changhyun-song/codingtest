import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_token_pool",
  title: "Mean Pooling with Attention Mask",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "pooling", "attention-mask", "nlp"],
  statement_en: `Implement mean pooling over valid tokens using an attention mask, commonly used to get sentence embeddings from transformer outputs.

Given:
- hidden_states: a 3D tensor of shape [batch, seq_len, hidden_dim] representing token embeddings.
- attention_mask: a 2D tensor of shape [batch, seq_len] where 1 indicates a valid token and 0 indicates a padding token.

For each sample in the batch, compute the mean of hidden states only over valid (non-padded) tokens:
  pooled = sum(hidden * mask) / sum(mask)  (per hidden dimension)

Return the pooled output of shape [batch, hidden_dim] as a nested list.`,
  function_name: "solution",
  signature:
    "def solution(hidden_states: list, attention_mask: list) -> list:",
  constraints: [
    "1 <= batch <= 4",
    "1 <= seq_len <= 8",
    "1 <= hidden_dim <= 8",
    "attention_mask contains only 0 and 1",
    "Each sample has at least one valid token (sum of mask >= 1)",
  ],
  examples: [
    {
      input: {
        hidden_states: [[[1, 2], [3, 4], [0, 0]]],
        attention_mask: [[1, 1, 0]],
      },
      output: [[2.0, 3.0]],
      explanation:
        "Only tokens 0 and 1 are valid. Sum=[1+3, 2+4]=[4,6], count=2. Mean=[2.0, 3.0].",
    },
    {
      input: {
        hidden_states: [[[1, 1], [2, 2], [3, 3]]],
        attention_mask: [[1, 1, 1]],
      },
      output: [[2.0, 2.0]],
      explanation:
        "All tokens valid. Sum=[6,6], count=3. Mean=[2.0, 2.0].",
    },
  ],
  starter_code: `import torch

def solution(hidden_states, attention_mask):
    pass`,
  hints: [
    "attention_mask를 unsqueeze(-1)로 [batch, seq_len, 1] 형태로 만들어 hidden_states와 곱하세요.",
    "dim=1로 sum하여 시퀀스 차원을 합산하세요.",
    "mask의 합계로 나눌 때 clamp(min=1)을 사용해 0으로 나누기를 방지하세요.",
    "마스크와 hidden_states의 원소별 곱을 먼저 구한 뒤 합산하는 것이 핵심입니다.",
  ],
  solution_code: `import torch

def solution(hidden_states, attention_mask):
    h = torch.tensor(hidden_states, dtype=torch.float32)
    m = torch.tensor(attention_mask, dtype=torch.float32).unsqueeze(-1)
    summed = (h * m).sum(dim=1)
    counts = m.sum(dim=1).clamp(min=1)
    pooled = summed / counts
    return pooled.tolist()`,
  solution_explanation: `hidden_states와 attention_mask를 텐서로 변환합니다. mask를 unsqueeze(-1)로 확장하여 [batch, seq_len, 1] 형태를 만들면 hidden_dim 차원과 브로드캐스팅됩니다. hidden * mask로 패딩 토큰을 0으로 만들고, dim=1로 합산합니다. mask의 합계(유효 토큰 수)로 나누어 평균을 구하며, clamp(min=1)로 모든 토큰이 패딩인 극단적 경우를 방지합니다. 이 방식은 BERT, Sentence-BERT 등에서 문장 임베딩을 만드는 표준 기법입니다.`,
  sample_tests: [
    {
      input: {
        hidden_states: [[[1, 2], [3, 4], [0, 0]]],
        attention_mask: [[1, 1, 0]],
      },
      expected: [[2.0, 3.0]],
    },
    {
      input: {
        hidden_states: [[[1, 1], [2, 2], [3, 3]]],
        attention_mask: [[1, 1, 1]],
      },
      expected: [[2.0, 2.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        hidden_states: [
          [[10, 20], [30, 40]],
          [[5, 5], [0, 0]],
        ],
        attention_mask: [[1, 1], [1, 0]],
      },
      expected: [
        [20.0, 30.0],
        [5.0, 5.0],
      ],
      failure_category: "multi_batch_handling",
    },
    {
      input: {
        hidden_states: [[[1, 0], [0, 1], [1, 1]]],
        attention_mask: [[1, 0, 1]],
      },
      expected: [[1.0, 0.5]],
      failure_category: "sparse_mask",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
