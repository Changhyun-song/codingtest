import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_attention_mask",
  title: "Create Attention Mask",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "mask", "transformer"],
  statement_en: `Given a list of actual sequence **lengths** in a batch and a **max_len** value, create an attention mask tensor.

The mask should be **1** for valid (non-padding) positions and **0** for padding positions.

For each sequence \`i\` with length \`lengths[i]\`, positions \`0\` through \`lengths[i]-1\` should be 1, and positions \`lengths[i]\` through \`max_len-1\` should be 0.

Return the 2D mask as a list of lists (integers).`,
  function_name: "solution",
  signature: "def solution(lengths: list, max_len: int) -> list:",
  constraints: [
    "1 <= len(lengths) <= 10",
    "1 <= lengths[i] <= max_len",
    "1 <= max_len <= 20",
  ],
  examples: [
    {
      input: { lengths: [3, 2, 4], max_len: 4 },
      output: [
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 1],
      ],
      explanation:
        "Sequence 0 has length 3 → first 3 positions are 1. Sequence 1 has length 2 → first 2 positions are 1. Sequence 2 has length 4 → all positions are 1.",
    },
    {
      input: { lengths: [1, 1], max_len: 3 },
      output: [
        [1, 0, 0],
        [1, 0, 0],
      ],
      explanation:
        "Both sequences have length 1, so only the first position is 1.",
    },
  ],
  starter_code: `import torch

def solution(lengths: list, max_len: int) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.zeros(batch_size, max_len, dtype=torch.long)로 0으로 초기화된 마스크를 만드세요.",
    "각 시퀀스 i에 대해 mask[i, :lengths[i]] = 1로 유효 위치를 설정하세요.",
    "또는 torch.arange(max_len)과 브로드캐스팅을 활용하면 반복문 없이도 구현할 수 있습니다.",
  ],
  solution_code: `import torch

def solution(lengths: list, max_len: int) -> list:
    batch_size = len(lengths)
    mask = torch.zeros(batch_size, max_len, dtype=torch.long)
    for i, l in enumerate(lengths):
        mask[i, :l] = 1
    return mask.tolist()`,
  solution_explanation:
    "batch_size x max_len 크기의 0 텐서를 만든 뒤, 각 시퀀스의 실제 길이만큼 앞부분을 1로 채웁니다. 이렇게 생성된 어텐션 마스크는 Transformer 모델에서 패딩 토큰을 무시하기 위해 사용됩니다. .tolist()로 정수 리스트 형태로 반환합니다.",
  sample_tests: [
    {
      input: { lengths: [3, 2, 4], max_len: 4 },
      expected: [
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 1],
      ],
    },
    {
      input: { lengths: [1, 1], max_len: 3 },
      expected: [
        [1, 0, 0],
        [1, 0, 0],
      ],
    },
  ],
  hidden_tests: [
    {
      input: { lengths: [5, 3, 1, 4], max_len: 5 },
      expected: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
      ],
      failure_category: "mask_boundary",
    },
    {
      input: { lengths: [2], max_len: 2 },
      expected: [[1, 1]],
      failure_category: "single_sequence",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
