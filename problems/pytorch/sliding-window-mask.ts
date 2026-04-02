import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "sliding_window_mask",
  title: "Sliding Window Attention Mask",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Generate a **sliding window attention mask** for local attention.\n\nGiven seq_len and window_size:\n- Position i can attend to positions j where |i - j| <= window_size\n- Combine with causal constraint: j <= i\n- mask[i][j] = 1 if j <= i AND |i - j| <= window_size, else 0\n\nReturn the [seq_len, seq_len] binary mask.\n\n**Function signature:**\n\`\`\`python\ndef solution(seq_len: int, window_size: int) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(seq_len: int, window_size: int) -> List[List[int]]:",
  constraints: ["1 <= window_size <= seq_len"],
  examples: [{ input: { seq_len: 4, window_size: 1 }, output: [[1,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1]], explanation: "Each token sees itself and 1 neighbor back" }],
  starter_code: "def solution(seq_len: int, window_size: int) -> List[List[int]]:\n    pass",
  hints: ["조건: j <= i (causal) AND i - j <= window_size.", "Longformer, Mistral 등이 sliding window attention을 사용합니다."],
  solution_code: `def solution(seq_len: int, window_size: int) -> List[List[int]]:
    mask = []
    for i in range(seq_len):
        row = []
        for j in range(seq_len):
            if j <= i and i - j <= window_size:
                row.append(1)
            else:
                row.append(0)
        mask.append(row)
    return mask`,
  solution_explanation: "Sliding window attention은 O(n²) → O(n×w)로 복잡도를 줄입니다. Longformer, BigBird, Mistral이 이를 사용합니다.",
  sample_tests: [
    { input: { seq_len: 4, window_size: 1 }, expected: [[1,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1]] },
    { input: { seq_len: 3, window_size: 2 }, expected: [[1,0,0],[1,1,0],[1,1,1]] },
  ],
  hidden_tests: [
    { input: { seq_len: 5, window_size: 5 }, expected: [[1,0,0,0,0],[1,1,0,0,0],[1,1,1,0,0],[1,1,1,1,0],[1,1,1,1,1]], failure_category: "edge_case" },
    { input: { seq_len: 5, window_size: 2 }, expected: [[1,0,0,0,0],[1,1,0,0,0],[1,1,1,0,0],[0,1,1,1,0],[0,0,1,1,1]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["causal_mask_attention", "relative_pos_bias"],
  fallback_problem_ids: ["causal_mask_attention"],
};
export default problem;
