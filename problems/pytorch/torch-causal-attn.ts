import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_causal_attn",
  title: "Causal Attention Mask",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "masking", "transformer"],
  statement_en: `Implement causal (autoregressive) attention masking.

Given a 2D attention score matrix of shape [seq_len, seq_len], apply a causal mask so that each position can only attend to itself and previous positions (i.e., position i can attend to positions 0..i).

Steps:
1. Create an upper-triangular boolean mask (diagonal=1) where True indicates positions to block.
2. Fill blocked positions with -infinity.
3. Apply softmax along the last dimension.
4. Replace any NaN values with 0.

Return the resulting attention weight matrix as a nested list.`,
  function_name: "solution",
  signature: "def solution(scores: list) -> list:",
  constraints: [
    "1 <= seq_len <= 10",
    "scores is a square 2D list [seq_len x seq_len]",
    "All score values are real numbers in [-100, 100]",
  ],
  examples: [
    {
      input: { scores: [[1, 2], [3, 4]] },
      output: [[1.0, 0.0], [0.2689, 0.7311]],
      explanation:
        "After masking: [[1, -inf], [3, 4]]. Row 0 softmax: [1.0, 0.0]. Row 1 softmax([3,4]): [0.2689, 0.7311].",
    },
    {
      input: { scores: [[5, 5, 5], [5, 5, 5], [5, 5, 5]] },
      output: [[1.0, 0.0, 0.0], [0.5, 0.5, 0.0], [0.3333, 0.3333, 0.3333]],
      explanation:
        "After masking: [[5,-inf,-inf],[5,5,-inf],[5,5,5]]. Row 0: only one valid → [1,0,0]. Row 1: two equal → [0.5,0.5,0]. Row 2: three equal → [1/3,1/3,1/3].",
    },
  ],
  starter_code: `import torch
import torch.nn.functional as F

def solution(scores):
    pass`,
  hints: [
    "torch.triu(torch.ones(n, n), diagonal=1).bool()로 상삼각 마스크를 만들 수 있습니다.",
    "masked_fill(mask, float('-inf'))로 마스킹된 위치를 -inf로 채우세요.",
    "softmax 후 NaN이 생길 수 있으므로 torch.nan_to_num으로 처리하세요.",
  ],
  solution_code: `import torch
import torch.nn.functional as F

def solution(scores):
    s = torch.tensor(scores, dtype=torch.float32)
    seq_len = s.shape[0]
    mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1).bool()
    s = s.masked_fill(mask, float('-inf'))
    weights = F.softmax(s, dim=-1)
    weights = torch.nan_to_num(weights, 0.0)
    return weights.tolist()`,
  solution_explanation: `입력 스코어를 텐서로 변환한 후, torch.triu로 상삼각 불리언 마스크를 생성합니다 (diagonal=1이므로 대각선은 포함하지 않음). 마스크가 True인 위치(미래 토큰)를 -inf로 채워 softmax에서 확률 0이 되도록 합니다. softmax를 적용한 후 혹시 발생할 수 있는 NaN을 0으로 치환합니다. 이것이 GPT 등 디코더 모델에서 사용하는 인과적(causal) 어텐션 마스킹 방식입니다.`,
  sample_tests: [
    {
      input: { scores: [[1, 2], [3, 4]] },
      expected: [[1.0, 0.0], [0.2689, 0.7311]],
    },
    {
      input: { scores: [[5, 5, 5], [5, 5, 5], [5, 5, 5]] },
      expected: [[1.0, 0.0, 0.0], [0.5, 0.5, 0.0], [0.3333, 0.3333, 0.3333]],
    },
  ],
  hidden_tests: [
    {
      input: { scores: [[0, 0], [0, 0]] },
      expected: [[1.0, 0.0], [0.5, 0.5]],
      failure_category: "uniform_scores",
    },
    {
      input: { scores: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
      expected: [
        [1.0, 0.0, 0.0],
        [0.2689, 0.7311, 0.0],
        [0.09, 0.2447, 0.6652],
      ],
      failure_category: "incorrect_masking",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
