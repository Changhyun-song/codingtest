import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "causal_mask_attention",
  title: "Causal Masked Self-Attention",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Implement **causal (autoregressive) masked self-attention**.\n\nGiven Q, K, V matrices [seq_len, d]:\n1. Compute scores = Q @ K^T / sqrt(d_k)\n2. Apply causal mask: set scores[i][j] = -inf where j > i\n3. Softmax per row\n4. Output = weights @ V\n\nReturn output rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:",
  constraints: ["1 <= seq_len <= 128", "1 <= d_k, d_v <= 64"],
  examples: [{ input: { Q: [[1,0],[0,1]], K: [[1,0],[0,1]], V: [[10,20],[30,40]] }, output: [[10.0,20.0],[23.396,33.396]], explanation: "Position 0 only attends to itself; position 1 attends to both" }],
  starter_code: "def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:\n    import math\n    pass",
  hints: ["score[i][j] = dot(Q[i], K[j]) / sqrt(d_k). j > i인 위치에 -inf를 넣습니다.", "softmax에서 -inf는 0이 됩니다. 이것이 미래 토큰을 보지 못하게 하는 핵심입니다."],
  solution_code: `def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:
    import math
    seq = len(Q)
    dk = len(Q[0])
    scale = math.sqrt(dk)
    scores = [[sum(Q[i][d] * K[j][d] for d in range(dk)) / scale for j in range(seq)] for i in range(seq)]
    for i in range(seq):
        for j in range(seq):
            if j > i:
                scores[i][j] = float('-inf')
    dv = len(V[0])
    result = []
    for i in range(seq):
        m = max(scores[i])
        exps = [math.exp(s - m) if s != float('-inf') else 0.0 for s in scores[i]]
        total = sum(exps)
        w = [e / total for e in exps]
        result.append([round(sum(w[j] * V[j][d] for j in range(seq)), 4) for d in range(dv)])
    return result`,
  solution_explanation: "Causal mask는 GPT 같은 자동회귀 모델의 핵심입니다. 각 토큰은 자신과 이전 토큰만 참조할 수 있습니다.",
  sample_tests: [
    { input: { Q: [[1,0],[0,1]], K: [[1,0],[0,1]], V: [[10,20],[30,40]] }, expected: [[10.0,20.0],[23.396,33.396]] },
    { input: { Q: [[1]], K: [[1]], V: [[5]] }, expected: [[5.0]] },
  ],
  hidden_tests: [
    { input: { Q: [[0,0],[0,0],[0,0]], K: [[0,0],[0,0],[0,0]], V: [[1,0],[0,1],[0,0]] }, expected: [[1.0,0.0],[0.5,0.5],[0.3333,0.3333]], failure_category: "standard" },
    { input: { Q: [[1,0],[1,0]], K: [[1,0],[0,1]], V: [[100,0],[0,100]] }, expected: [[100.0,0.0],[66.9672,33.0328]], failure_category: "precision" },
  ],
  checker_type: "vector",
  tolerance: 0.02,
  similar_problem_ids: ["attention_scores", "kv_cache_attention"],
  fallback_problem_ids: ["attention_scores"],
};
export default problem;
