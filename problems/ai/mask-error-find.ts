import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "mask_error_find",
  title: "Attention Mask Error Detector",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Verify if **padding attention masks** are correct.\n\nGiven masks and true sequence lengths, check each sample's 1D padding mask.\nCorrect mask: mask[i] = 1 if i < seq_length, else 0.\n\nReturn for each sample:\n- "correct" if mask is right\n- "error_at_INDEX" if position INDEX is the first wrong position\n\n**Function signature:**\n\`\`\`python\ndef solution(masks: List[List[int]], seq_lengths: List[int]) -> List[str]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(masks: List[List[int]], seq_lengths: List[int]) -> List[str]:",
  constraints: ["len(masks) == len(seq_lengths)"],
  examples: [{ input: { masks: [[1,1,0,0],[1,0,0,0]], seq_lengths: [2,2] }, output: ["correct","error_at_1"], explanation: "Sample 1: pos 1 should be 1 but is 0" }],
  starter_code: "def solution(masks: List[List[int]], seq_lengths: List[int]) -> List[str]:\n    pass",
  hints: ["각 샘플의 예상 마스크를 만들고 실제 마스크와 비교합니다.", "잘못된 마스크는 padding 토큰이 attention에 참여하여 학습을 오염시킵니다."],
  solution_code: `def solution(masks: List[List[int]], seq_lengths: List[int]) -> List[str]:
    results = []
    for mask, sl in zip(masks, seq_lengths):
        expected = [1 if i < sl else 0 for i in range(len(mask))]
        if mask == expected:
            results.append("correct")
        else:
            for i in range(len(mask)):
                if mask[i] != expected[i]:
                    results.append(f"error_at_{i}")
                    break
    return results`,
  solution_explanation: "Attention mask 오류는 NLP 모델의 흔한 버그입니다. 잘못된 마스크는 모델이 padding에 attend하거나 실제 토큰을 무시하게 만듭니다.",
  sample_tests: [
    { input: { masks: [[1,1,0,0],[1,0,0,0]], seq_lengths: [2,2] }, expected: ["correct","error_at_1"] },
    { input: { masks: [[1,1,1]], seq_lengths: [3] }, expected: ["correct"] },
  ],
  hidden_tests: [
    { input: { masks: [[0]], seq_lengths: [1] }, expected: ["error_at_0"], failure_category: "edge_case" },
    { input: { masks: [[1,1,1,0],[1,1,0,1]], seq_lengths: [3,3] }, expected: ["correct","error_at_2"], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["padding_mask_build", "causal_mask_attention"],
  fallback_problem_ids: ["causal_mask_attention"],
};
export default problem;
