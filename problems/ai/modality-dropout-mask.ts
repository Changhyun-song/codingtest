import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "modality_dropout_mask",
  title: "Modality-Level Dropout Mask",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Generate a **modality-level dropout mask** for multimodal training.\n\nGiven batch_size, number of modalities, and a pre-generated random matrix [batch, modalities] (0.0-1.0):\n- If random[b][m] < drop_rate: mask that modality (set to 0)\n- Never drop ALL modalities for a sample (at least one must be 1)\n- If all would be dropped, keep the one with highest random value\n\nReturn the binary mask [batch, modalities].\n\n**Function signature:**\n\`\`\`python\ndef solution(random_vals: List[List[float]], drop_rate: float) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(random_vals: List[List[float]], drop_rate: float) -> List[List[int]]:",
  constraints: ["0 <= drop_rate < 1"],
  examples: [{ input: { random_vals: [[0.1, 0.8], [0.05, 0.03]], drop_rate: 0.3 }, output: [[0, 1], [1, 0]], explanation: "Row0: 0.1<0.3→drop, 0.8≥0.3→keep. Row1: both<0.3, keep max(0.05)=idx0" }],
  starter_code: "def solution(random_vals: List[List[float]], drop_rate: float) -> List[List[int]]:\n    pass",
  hints: ["먼저 drop_rate 기준으로 마스크를 만들고, 모두 0인 행은 가장 높은 random 값의 모달리티를 복원합니다.", "모달리티 dropout은 한 모달리티에 과의존하는 것을 방지합니다."],
  solution_code: `def solution(random_vals: List[List[float]], drop_rate: float) -> List[List[int]]:
    result = []
    for row in random_vals:
        mask = [0 if v < drop_rate else 1 for v in row]
        if sum(mask) == 0:
            best = max(range(len(row)), key=lambda i: row[i])
            mask[best] = 1
        result.append(mask)
    return result`,
  solution_explanation: "Modality dropout은 멀티모달 학습에서 단일 모달리티 의존을 줄입니다. 실전에서 missing modality에 대한 robustness를 높이는 핵심 기법입니다.",
  sample_tests: [
    { input: { random_vals: [[0.1, 0.8], [0.05, 0.03]], drop_rate: 0.3 }, expected: [[0, 1], [1, 0]] },
    { input: { random_vals: [[0.5, 0.5, 0.5]], drop_rate: 0.3 }, expected: [[1, 1, 1]] },
  ],
  hidden_tests: [
    { input: { random_vals: [[0.9]], drop_rate: 0.5 }, expected: [[1]], failure_category: "edge_case" },
    { input: { random_vals: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]], drop_rate: 0.35 }, expected: [[0, 0, 1], [1, 1, 1]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dropout_forward", "multimodal_fusion"],
  fallback_problem_ids: ["dropout_forward"],
};
export default problem;
