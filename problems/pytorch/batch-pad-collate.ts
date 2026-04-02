import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "batch_pad_collate",
  title: "Batch Padding and Collation",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "data_pipeline"],
  statement_en: `Implement a **collate function** that pads variable-length sequences to the same length.

In NLP and multimodal models, sequences have different lengths. Before batching, they must be padded to the maximum length in the batch.

Given:
- \`sequences\`: a list of lists (each inner list is a sequence of integers)
- \`pad_value\`: the value to use for padding (typically 0)

Pad all sequences to the length of the longest sequence. Also return an attention mask (1 for real tokens, 0 for padding).

Return [padded_sequences, attention_masks].

**Function signature:**
\`\`\`python
def solution(sequences: List[List[int]], pad_value: int) -> List[List[List[int]]]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(sequences: List[List[int]], pad_value: int) -> List[List[List[int]]]:",
  constraints: ["1 <= len(sequences) <= 100", "0 <= len(sequences[i]) <= 1000"],
  examples: [
    { input: { sequences: [[1, 2, 3], [4, 5], [6]], pad_value: 0 }, output: [[[1, 2, 3], [4, 5, 0], [6, 0, 0]], [[1, 1, 1], [1, 1, 0], [1, 0, 0]]], explanation: "Pad to max length 3, create attention masks" },
  ],
  starter_code: `def solution(sequences: List[List[int]], pad_value: int) -> List[List[List[int]]]:
    # 1. 가장 긴 시퀀스의 길이 찾기
    # 2. 모든 시퀀스를 그 길이로 패딩
    # 3. attention mask 생성 (실제 토큰=1, 패딩=0)
    pass`,
  hints: [
    "max_len = max(len(s) for s in sequences)로 최대 길이를 구합니다.",
    "각 시퀀스에 pad_value를 (max_len - len(s))개 추가합니다.",
    "attention mask는 원래 길이만큼 1, 나머지는 0입니다.",
  ],
  solution_code: `def solution(sequences: List[List[int]], pad_value: int) -> List[List[List[int]]]:
    if not sequences:
        return [[], []]
    max_len = max(len(s) for s in sequences)
    padded = []
    masks = []
    for s in sequences:
        pad_count = max_len - len(s)
        padded.append(s + [pad_value] * pad_count)
        masks.append([1] * len(s) + [0] * pad_count)
    return [padded, masks]`,
  solution_explanation: "가변 길이 시퀀스를 최대 길이로 패딩하고 attention mask를 생성합니다. Transformer 모델 학습의 필수 전처리입니다.",
  sample_tests: [
    { input: { sequences: [[1, 2, 3], [4, 5], [6]], pad_value: 0 }, expected: [[[1, 2, 3], [4, 5, 0], [6, 0, 0]], [[1, 1, 1], [1, 1, 0], [1, 0, 0]]] },
    { input: { sequences: [[1], [2]], pad_value: -1 }, expected: [[[1], [2]], [[1], [1]]] },
  ],
  hidden_tests: [
    { input: { sequences: [[1, 2, 3]], pad_value: 0 }, expected: [[[1, 2, 3]], [[1, 1, 1]]], failure_category: "single_sequence" },
    { input: { sequences: [[], [1, 2]], pad_value: 0 }, expected: [[[0, 0], [1, 2]], [[0, 0], [1, 1]]], failure_category: "empty_sequence" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["masked_mean_pooling", "custom_dataset_logic"],
  fallback_problem_ids: ["masked_mean_pooling"],
};

export default problem;
