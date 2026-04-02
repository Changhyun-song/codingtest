import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "top_p_filtering",
  title: "Top-p (Nucleus) Sampling Filter",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "softmax"],
  statement_en: `Implement **top-p (nucleus) sampling**, a popular decoding strategy for language models.

Given a list of logits and a threshold \`top_p\`:
1. Convert logits to probabilities using softmax
2. Sort tokens by probability (descending)
3. Keep tokens until their cumulative probability reaches \`top_p\`
4. Zero out all other probabilities
5. Renormalize the remaining probabilities to sum to 1

**Function signature:**
\`\`\`python
def solution(logits: List[float], top_p: float) -> List[float]:
\`\`\`

**Returns:** Filtered probability distribution (same order as input logits), each value rounded to 6 decimals.
`,
  function_name: "solution",
  signature: "def solution(logits: List[float], top_p: float) -> List[float]:",
  constraints: [
    "1 <= len(logits) <= 10000",
    "0 < top_p <= 1.0",
  ],
  examples: [
    {
      input: { logits: [2.0, 1.0, 0.1], top_p: 0.8 },
      output: [0.730975, 0.269025, 0.0],
      explanation: "After softmax: [0.576, 0.212, 0.211]. Top-p=0.8: keep first two (cumsum=0.788). Renormalize.",
    },
  ],
  starter_code: `def solution(logits: List[float], top_p: float) -> List[float]:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "먼저 softmax로 확률을 구합니다. 수치 안정성을 위해 max를 빼세요.",
    "확률을 내림차순 정렬 후 누적합이 top_p에 도달할 때까지의 인덱스만 유지합니다.",
  ],
  solution_code: `def solution(logits: List[float], top_p: float) -> List[float]:
    import math
    m = max(logits)
    exps = [math.exp(x - m) for x in logits]
    total = sum(exps)
    probs = [e / total for e in exps]
    indexed = sorted(enumerate(probs), key=lambda x: -x[1])
    cumsum = 0.0
    keep = set()
    for idx, p in indexed:
        cumsum += p
        keep.add(idx)
        if cumsum >= top_p:
            break
    filtered = [probs[i] if i in keep else 0.0 for i in range(len(probs))]
    fsum = sum(filtered)
    if fsum > 0:
        filtered = [f / fsum for f in filtered]
    return [round(f, 6) for f in filtered]`,
  solution_explanation: "softmax → 내림차순 정렬 → 누적 top_p까지만 유지 → 재정규화. 다양하면서도 안정적인 텍스트 생성을 가능하게 합니다.",
  sample_tests: [
    {
      input: { logits: [2.0, 1.0, 0.1], top_p: 0.8 },
      expected: [0.730975, 0.269025, 0.0],
    },
    {
      input: { logits: [1.0, 1.0, 1.0, 1.0], top_p: 0.5 },
      expected: [0.5, 0.5, 0.0, 0.0],
    },
  ],
  hidden_tests: [
    {
      input: { logits: [10.0, 0.0, 0.0], top_p: 0.99 },
      expected: [1.0, 0.0, 0.0],
      failure_category: "edge_case",
    },
    {
      input: { logits: [0.0, 0.0], top_p: 1.0 },
      expected: [0.5, 0.5],
      failure_category: "edge_case",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["beam_search_step", "softmax_from_scratch"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
