import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_collate_pad",
  title: "Collate and Pad Sequences",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "collate", "padding", "data-loading"],
  statement_en: `Implement a collate function that pads variable-length sequences to the same length.

Given a list of **sequences** (each is a list of ints, potentially different lengths) and a **pad_value** (int), pad all sequences with \`pad_value\` so they all have the same length as the longest sequence.

Return the padded batch as a 2D list (list of lists).`,
  function_name: "solution",
  signature: "def solution(sequences: list, pad_value: int) -> list:",
  constraints: [
    "1 <= len(sequences) <= 10",
    "1 <= len(each sequence) <= 10",
    "Each element is an integer",
    "pad_value is an integer",
  ],
  examples: [
    {
      input: { sequences: [[1, 2, 3], [4, 5], [6]], pad_value: 0 },
      output: [
        [1, 2, 3],
        [4, 5, 0],
        [6, 0, 0],
      ],
      explanation:
        "The longest sequence has length 3. Shorter sequences are padded with 0.",
    },
    {
      input: { sequences: [[1], [2], [3]], pad_value: -1 },
      output: [[1], [2], [3]],
      explanation:
        "All sequences already have the same length, so no padding is needed.",
    },
  ],
  starter_code: `import torch

def solution(sequences: list, pad_value: int) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "가장 긴 시퀀스의 길이를 먼저 구하세요: max(len(s) for s in sequences).",
    "각 시퀀스에 pad_value를 (max_len - len(s))개만큼 뒤에 추가하면 됩니다.",
    "패딩된 리스트를 torch.tensor()로 변환한 뒤 .tolist()로 반환하세요.",
  ],
  solution_code: `import torch

def solution(sequences: list, pad_value: int) -> list:
    max_len = max(len(s) for s in sequences)
    padded = [s + [pad_value] * (max_len - len(s)) for s in sequences]
    batch = torch.tensor(padded)
    return batch.tolist()`,
  solution_explanation:
    "먼저 가장 긴 시퀀스의 길이를 구합니다. 각 시퀀스 뒤에 pad_value를 필요한 만큼 추가하여 모든 시퀀스를 같은 길이로 맞춥니다. 이를 torch.tensor로 변환한 뒤 .tolist()로 2D 리스트로 반환합니다. 이 패턴은 NLP에서 배치 생성 시 collate_fn으로 자주 사용됩니다.",
  sample_tests: [
    {
      input: { sequences: [[1, 2, 3], [4, 5], [6]], pad_value: 0 },
      expected: [
        [1, 2, 3],
        [4, 5, 0],
        [6, 0, 0],
      ],
    },
    {
      input: { sequences: [[1], [2], [3]], pad_value: -1 },
      expected: [[1], [2], [3]],
    },
  ],
  hidden_tests: [
    {
      input: { sequences: [[10, 20], [30, 40, 50, 60]], pad_value: 0 },
      expected: [
        [10, 20, 0, 0],
        [30, 40, 50, 60],
      ],
      failure_category: "padding_length",
    },
    {
      input: {
        sequences: [[1, 2], [3], [4, 5, 6, 7, 8]],
        pad_value: -100,
      },
      expected: [
        [1, 2, -100, -100, -100],
        [3, -100, -100, -100, -100],
        [4, 5, 6, 7, 8],
      ],
      failure_category: "pad_value_handling",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
