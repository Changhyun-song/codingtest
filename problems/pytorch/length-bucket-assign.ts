import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "length_bucket_assign",
  title: "Length-Based Bucket Assignment",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "data_loading"],
  statement_en: `Assign sequences to **length-based buckets** for efficient batching.\n\nGiven sequence lengths and bucket boundaries [b0, b1, ...], assign each sequence to a bucket:\n- Bucket 0: length < b0\n- Bucket 1: b0 <= length < b1\n- ...\n- Last bucket: length >= last boundary\n\nReturn the bucket index for each sequence.\n\n**Function signature:**\n\`\`\`python\ndef solution(lengths: List[int], boundaries: List[int]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(lengths: List[int], boundaries: List[int]) -> List[int]:",
  constraints: ["boundaries sorted ascending"],
  examples: [{ input: { lengths: [5, 15, 25, 50, 100], boundaries: [10, 20, 50] }, output: [0, 1, 2, 3, 3], explanation: "5<10→0, 15<20→1, 25<50→2, 50≥50→3, 100≥50→3" }],
  starter_code: "def solution(lengths: List[int], boundaries: List[int]) -> List[int]:\n    pass",
  hints: ["각 길이에 대해 경계값을 순회하며 첫 번째로 length < boundary인 인덱스를 찾습니다.", "길이 기반 배칭은 패딩을 최소화하여 학습 효율을 높입니다."],
  solution_code: `def solution(lengths: List[int], boundaries: List[int]) -> List[int]:
    result = []
    for l in lengths:
        bucket = len(boundaries)
        for i, b in enumerate(boundaries):
            if l < b:
                bucket = i
                break
        result.append(bucket)
    return result`,
  solution_explanation: "길이 기반 버킷 배칭은 NLP에서 패딩 낭비를 줄이는 핵심 기법입니다. BERT, GPT 학습에서 throughput을 크게 향상시킵니다.",
  sample_tests: [
    { input: { lengths: [5, 15, 25, 50, 100], boundaries: [10, 20, 50] }, expected: [0, 1, 2, 3, 3] },
    { input: { lengths: [1, 2, 3], boundaries: [2] }, expected: [0, 1, 1] },
  ],
  hidden_tests: [
    { input: { lengths: [100], boundaries: [10, 20, 30, 40, 50] }, expected: [5], failure_category: "standard" },
    { input: { lengths: [0, 1, 9, 10], boundaries: [10] }, expected: [0, 0, 0, 1], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dynamic_batch_grouping", "batch_pad_collate"],
  fallback_problem_ids: ["batch_pad_collate"],
};
export default problem;
