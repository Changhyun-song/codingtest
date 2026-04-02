import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "dynamic_batch_grouping",
  title: "Dynamic Batch Grouping by Length",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "data_loading"],
  statement_en: `Group variable-length sequences into batches with a **max_tokens** constraint.\n\n1. Sort sequences by length (ascending)\n2. Greedily add sequences to current batch\n3. A batch's token count = max_length_in_batch × num_sequences_in_batch\n4. If adding a sequence exceeds max_tokens, start a new batch\n\nReturn list of batches, each containing original indices.\n\n**Function signature:**\n\`\`\`python\ndef solution(lengths: List[int], max_tokens: int) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(lengths: List[int], max_tokens: int) -> List[List[int]]:",
  constraints: ["1 <= len(lengths) <= 10000", "max_tokens >= max(lengths)"],
  examples: [{ input: { lengths: [3, 5, 2, 7, 4], max_tokens: 10 }, output: [[2, 0], [4, 1], [3]], explanation: "Sorted: len2@idx2, len3@idx0, len4@idx4, len5@idx1, len7@idx3" }],
  starter_code: "def solution(lengths: List[int], max_tokens: int) -> List[List[int]]:\n    pass",
  hints: ["먼저 (length, original_index) 쌍을 길이 순으로 정렬합니다.", "배치에 추가할 때 max_length × (size+1)이 max_tokens를 넘으면 새 배치를 시작합니다."],
  solution_code: `def solution(lengths: List[int], max_tokens: int) -> List[List[int]]:
    indexed = sorted(enumerate(lengths), key=lambda x: x[1])
    batches = []
    batch = []
    max_len = 0
    for idx, length in indexed:
        new_max = max(max_len, length)
        if batch and new_max * (len(batch) + 1) > max_tokens:
            batches.append([i for i, _ in batch])
            batch = [(idx, length)]
            max_len = length
        else:
            batch.append((idx, length))
            max_len = new_max
    if batch:
        batches.append([i for i, _ in batch])
    return batches`,
  solution_explanation: "Dynamic batching은 NLP에서 패딩 낭비를 줄여 학습 효율을 크게 높입니다.",
  sample_tests: [
    { input: { lengths: [3, 5, 2, 7, 4], max_tokens: 10 }, expected: [[2, 0], [4, 1], [3]] },
    { input: { lengths: [1, 1, 1, 1], max_tokens: 4 }, expected: [[0, 1, 2, 3]] },
  ],
  hidden_tests: [
    { input: { lengths: [10], max_tokens: 10 }, expected: [[0]], failure_category: "edge_case" },
    { input: { lengths: [2, 4, 6, 8], max_tokens: 12 }, expected: [[0, 1], [2], [3]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["batch_pad_collate", "custom_dataset_logic"],
  fallback_problem_ids: ["custom_dataset_logic"],
};
export default problem;
