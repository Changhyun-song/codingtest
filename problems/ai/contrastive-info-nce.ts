import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "contrastive_info_nce",
  title: "InfoNCE Contrastive Loss",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "loss_function"],
  statement_en: `Compute **InfoNCE (CLIP-style) contrastive loss**.\n\nGiven an N×N similarity matrix where diagonal entries are positive pairs:\n1. Image→Text loss: cross-entropy where target = row index (per row)\n2. Text→Image loss: cross-entropy where target = col index (per col)\n3. Final loss = (i2t_loss + t2i_loss) / 2\n\n**Function signature:**\n\`\`\`python\ndef solution(sim: List[List[float]]) -> float:\n\`\`\`\n\nReturn rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(sim: List[List[float]]) -> float:",
  constraints: ["sim is N×N, N >= 1"],
  examples: [{ input: { sim: [[10.0,0.0],[0.0,10.0]] }, output: 0.000045, explanation: "High diagonal similarity → very low loss" }],
  starter_code: "def solution(sim: List[List[float]]) -> float:\n    import math\n    pass",
  hints: ["각 행에서 cross-entropy: -sim[i][i] + log(sum(exp(sim[i][j]))).", "열 방향도 동일하게 계산하고 두 방향의 평균을 냅니다."],
  solution_code: `def solution(sim: List[List[float]]) -> float:
    import math
    n = len(sim)
    loss = 0.0
    for i in range(n):
        m = max(sim[i])
        lse = math.log(sum(math.exp(s - m) for s in sim[i])) + m
        loss += -sim[i][i] + lse
    for j in range(n):
        col = [sim[i][j] for i in range(n)]
        m = max(col)
        lse = math.log(sum(math.exp(s - m) for s in col)) + m
        loss += -sim[j][j] + lse
    return round(loss / (2 * n), 6)`,
  solution_explanation: "InfoNCE는 CLIP, SimCLR 등 대조 학습의 핵심 손실 함수입니다. 양의 쌍은 가깝게, 음의 쌍은 멀게 학습합니다.",
  sample_tests: [
    { input: { sim: [[10.0,0.0],[0.0,10.0]] }, expected: 0.000045 },
    { input: { sim: [[0.0,0.0],[0.0,0.0]] }, expected: 0.693147 },
  ],
  hidden_tests: [
    { input: { sim: [[5.0]] }, expected: 0.0, failure_category: "edge_case" },
    { input: { sim: [[1.0,0.5,0.0],[0.5,1.0,0.5],[0.0,0.5,1.0]] }, expected: 0.764488, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["clip_similarity", "contrastive_loss"],
  fallback_problem_ids: ["cosine_similarity"],
};
export default problem;
