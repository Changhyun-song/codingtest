import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "padding_mask_build",
  title: "Attention Padding Mask Builder",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Build a proper **padding mask** for attention computation.\n\nGiven a batch of sequence lengths and the maximum sequence length:\n1. Create a 2D attention mask [batch, max_len] where 1=valid, 0=padding\n2. Create a 3D pairwise mask [batch, max_len, max_len] where mask[b][i][j]=1 only if BOTH positions i and j are valid\n\nReturn [attention_mask_2d, pairwise_mask_3d].\n\n**Function signature:**\n\`\`\`python\ndef solution(seq_lengths: List[int], max_len: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(seq_lengths: List[int], max_len: int) -> List:",
  constraints: ["1 <= seq_lengths[i] <= max_len"],
  examples: [{ input: { seq_lengths: [2, 3], max_len: 3 }, output: [[[1,1,0],[1,1,1]],[[[1,1,0],[1,1,0],[0,0,0]],[[1,1,1],[1,1,1],[1,1,1]]]], explanation: "Seq1: len=2, Seq2: len=3 (full)" }],
  starter_code: "def solution(seq_lengths: List[int], max_len: int) -> List:\n    pass",
  hints: ["2D mask: position < seq_length이면 1.", "3D pairwise mask: mask_2d[b][i] AND mask_2d[b][j]를 외적으로 계산합니다."],
  solution_code: `def solution(seq_lengths: List[int], max_len: int) -> List:
    mask_2d = [[1 if j < sl else 0 for j in range(max_len)] for sl in seq_lengths]
    mask_3d = [[[mask_2d[b][i] * mask_2d[b][j] for j in range(max_len)] for i in range(max_len)] for b in range(len(seq_lengths))]
    return [mask_2d, mask_3d]`,
  solution_explanation: "Padding mask는 Transformer 학습에서 필수입니다. 잘못된 mask는 padding 토큰이 attention에 영향을 주어 성능을 크게 저하시킵니다.",
  sample_tests: [
    { input: { seq_lengths: [2, 3], max_len: 3 }, expected: [[[1,1,0],[1,1,1]],[[[1,1,0],[1,1,0],[0,0,0]],[[1,1,1],[1,1,1],[1,1,1]]]] },
    { input: { seq_lengths: [1], max_len: 2 }, expected: [[[1,0]],[[[1,0],[0,0]]]] },
  ],
  hidden_tests: [
    { input: { seq_lengths: [3], max_len: 3 }, expected: [[[1,1,1]],[[[1,1,1],[1,1,1],[1,1,1]]]], failure_category: "edge_case" },
    { input: { seq_lengths: [1,2,1], max_len: 2 }, expected: [[[1,0],[1,1],[1,0]],[[[1,0],[0,0]],[[1,1],[1,1]],[[1,0],[0,0]]]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["causal_mask_attention", "batch_pad_collate"],
  fallback_problem_ids: ["batch_pad_collate"],
};
export default problem;
