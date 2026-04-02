import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "attention_entropy",
  title: "Attention Weight Entropy",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Compute the **entropy** of attention weight distributions.\n\nGiven attention weights [num_heads, seq_len, seq_len] (already softmaxed):\n- For each head and query position, compute H = -Σ(p × log(p))\n- Return the average entropy across all heads and positions\n\n**Function signature:**\n\`\`\`python\ndef solution(attention_weights: List[List[List[float]]]) -> float:\n\`\`\`\n\nReturn rounded to 6 decimals. Use log base e. Skip p=0 terms.`,
  function_name: "solution",
  signature: "def solution(attention_weights: List[List[List[float]]]) -> float:",
  constraints: ["Each row sums to ~1.0", "0 <= p <= 1"],
  examples: [{ input: { attention_weights: [[[0.5,0.5],[0.5,0.5]]] }, output: 0.693147, explanation: "Uniform over 2 → H=ln(2)≈0.693" }],
  starter_code: "def solution(attention_weights: List[List[List[float]]]) -> float:\n    import math\n    pass",
  hints: ["각 attention 행에서 H = -sum(p * log(p))를 계산합니다 (p>0인 경우만).", "높은 entropy = 고르게 분포 (덜 집중), 낮은 entropy = 특정 위치에 집중."],
  solution_code: `def solution(attention_weights: List[List[List[float]]]) -> float:
    import math
    total = 0.0
    count = 0
    for head in attention_weights:
        for row in head:
            h = 0.0
            for p in row:
                if p > 0:
                    h -= p * math.log(p)
            total += h
            count += 1
    return round(total / count, 6) if count > 0 else 0.0`,
  solution_explanation: "Attention entropy는 모델이 어디에 집중하는지 분석하는 도구입니다. 낮은 entropy는 특정 토큰에 강하게 attend함을 의미합니다.",
  sample_tests: [
    { input: { attention_weights: [[[0.5,0.5],[0.5,0.5]]] }, expected: 0.693147 },
    { input: { attention_weights: [[[1.0,0.0],[0.0,1.0]]] }, expected: 0.0 },
  ],
  hidden_tests: [
    { input: { attention_weights: [[[0.25,0.25,0.25,0.25]]] }, expected: 1.386294, failure_category: "standard" },
    { input: { attention_weights: [[[1.0]],[[1.0]]] }, expected: 0.0, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["attention_scores", "causal_mask_attention"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
