import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "relative_pos_bias",
  title: "Relative Position Bias Matrix",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Compute a **relative position bias matrix** for attention.\n\nGiven seq_len and num_buckets:\n- For each pair (i, j): relative_position = j - i\n- Bucket index = clamp(relative_position + num_buckets // 2, 0, num_buckets - 1)\n\nReturn the [seq_len, seq_len] matrix of bucket indices.\n\n**Function signature:**\n\`\`\`python\ndef solution(seq_len: int, num_buckets: int) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(seq_len: int, num_buckets: int) -> List[List[int]]:",
  constraints: ["1 <= seq_len <= 512", "2 <= num_buckets <= 32"],
  examples: [{ input: { seq_len: 3, num_buckets: 4 }, output: [[2,3,3],[1,2,3],[0,1,2]], explanation: "half=2, rel=j-i, bucket=clamp(rel+2, 0, 3)" }],
  starter_code: "def solution(seq_len: int, num_buckets: int) -> List[List[int]]:\n    pass",
  hints: ["half = num_buckets // 2. 각 (i,j) 쌍에서 j-i를 구하고 half를 더합니다.", "결과를 0과 num_buckets-1 사이로 clamp합니다."],
  solution_code: `def solution(seq_len: int, num_buckets: int) -> List[List[int]]:
    half = num_buckets // 2
    result = []
    for i in range(seq_len):
        row = []
        for j in range(seq_len):
            bucket = max(0, min(num_buckets - 1, (j - i) + half))
            row.append(bucket)
        result.append(row)
    return result`,
  solution_explanation: "Relative position bias는 T5, ALiBi 등에서 사용됩니다. 절대 위치 대신 상대 거리를 인코딩합니다.",
  sample_tests: [
    { input: { seq_len: 3, num_buckets: 4 }, expected: [[2,3,3],[1,2,3],[0,1,2]] },
    { input: { seq_len: 2, num_buckets: 2 }, expected: [[1,1],[0,1]] },
  ],
  hidden_tests: [
    { input: { seq_len: 1, num_buckets: 8 }, expected: [[4]], failure_category: "edge_case" },
    { input: { seq_len: 4, num_buckets: 6 }, expected: [[3,4,5,5],[2,3,4,5],[1,2,3,4],[0,1,2,3]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["positional_encoding", "causal_mask_attention"],
  fallback_problem_ids: ["positional_encoding"],
};
export default problem;
