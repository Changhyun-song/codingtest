import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "cross_attention_weight",
  title: "Cross-Attention Score Computation",
  category: "ai",
  difficulty: "hard",
  tags: ["nlp", "attention"],
  statement_en: `Compute **cross-attention** between query and key-value sequences.\n\nGiven query [N_q, D], key [N_k, D], value [N_k, D_v]:\n1. Compute attention scores: Q @ K^T / sqrt(D)\n2. Apply softmax per query position\n3. Compute weighted sum: attn_weights @ V\n\nReturn the output [N_q, D_v], each element rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(query: List[List[float]], key: List[List[float]], value: List[List[float]]) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(query: List[List[float]], key: List[List[float]], value: List[List[float]]) -> List[List[float]]:",
  constraints: ["query and key have same last dim"],
  examples: [{ input: { query: [[1,1]], key: [[1,1],[1,1]], value: [[1,0],[0,1]] }, output: [[0.5,0.5]], explanation: "Equal scores → softmax=[0.5,0.5] → output=[0.5,0.5]" }],
  starter_code: "def solution(query: List[List[float]], key: List[List[float]], value: List[List[float]]) -> List[List[float]]:\n    import math\n    pass",
  hints: ["score = (Q @ K^T) / sqrt(D_key). 각 행에 softmax를 적용합니다.", "Cross-attention은 decoder가 encoder 출력을 참조할 때 사용됩니다."],
  solution_code: `def solution(query: List[List[float]], key: List[List[float]], value: List[List[float]]) -> List[List[float]]:
    import math
    d = len(query[0])
    scale = math.sqrt(d)
    nq, nk, dv = len(query), len(key), len(value[0])
    scores = [[sum(query[i][k] * key[j][k] for k in range(d)) / scale for j in range(nk)] for i in range(nq)]
    for i in range(nq):
        m = max(scores[i])
        exps = [math.exp(s - m) for s in scores[i]]
        t = sum(exps)
        scores[i] = [e / t for e in exps]
    return [[round(sum(scores[i][j] * value[j][k] for j in range(nk)), 4) for k in range(dv)] for i in range(nq)]`,
  solution_explanation: "Cross-attention은 Transformer decoder, VLM, 멀티모달 모델의 핵심입니다. Query가 다른 시퀀스(encoder output)를 참조합니다.",
  sample_tests: [
    { input: { query: [[1,1]], key: [[1,1],[1,1]], value: [[1,0],[0,1]] }, expected: [[0.5,0.5]] },
    { input: { query: [[1,0],[0,1]], key: [[1,0]], value: [[5]] }, expected: [[5.0],[5.0]] },
  ],
  hidden_tests: [
    { input: { query: [[1,0]], key: [[1,0],[0,1]], value: [[1,0],[0,1]] }, expected: [[0.7311,0.2689]], failure_category: "standard" },
    { input: { query: [[0,0]], key: [[1,0],[0,1]], value: [[10,20],[30,40]] }, expected: [[20.0,30.0]], failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["attention_scores", "multi_head_attention"],
  fallback_problem_ids: ["attention_scores"],
};
export default problem;
