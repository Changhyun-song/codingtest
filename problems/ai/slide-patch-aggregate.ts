import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "slide_patch_aggregate",
  title: "WSI Slide-Level Patch Aggregation",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Aggregate **patch-level embeddings** into slide-level representations for whole slide image (WSI) classification.\n\nGiven patch embeddings [N_patches, D] and an aggregation method:\n- "mean": average of all patches\n- "max": element-wise max across patches\n- "attention": weighted sum using attention scores (scores = embedding @ query, then softmax)\n\nFor "attention", also provide a query vector [D].\nReturn the slide-level embedding [D], rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(patches: List[List[float]], method: str, query: List[float]) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(patches: List[List[float]], method: str, query: List[float]) -> List[float]:",
  constraints: ["len(patches) >= 1"],
  examples: [{ input: { patches: [[1,2],[3,4],[5,6]], method: "mean", query: [] }, output: [3.0,4.0], explanation: "Mean of [1,3,5]=3, [2,4,6]=4" }],
  starter_code: "def solution(patches: List[List[float]], method: str, query: List[float]) -> List[float]:\n    import math\n    pass",
  hints: ["mean: 각 차원별 평균. max: 각 차원별 최대값.", "attention: score = patch · query, softmax(scores), weighted sum."],
  solution_code: `def solution(patches: List[List[float]], method: str, query: List[float]) -> List[float]:
    import math
    n = len(patches)
    d = len(patches[0])
    if method == "mean":
        return [round(sum(patches[i][j] for i in range(n)) / n, 4) for j in range(d)]
    elif method == "max":
        return [round(max(patches[i][j] for i in range(n)), 4) for j in range(d)]
    elif method == "attention":
        scores = [sum(patches[i][j] * query[j] for j in range(d)) for i in range(n)]
        m = max(scores)
        exps = [math.exp(s - m) for s in scores]
        total = sum(exps)
        weights = [e / total for e in exps]
        return [round(sum(weights[i] * patches[i][j] for i in range(n)), 4) for j in range(d)]
    return []`,
  solution_explanation: "WSI 분류에서 patch aggregation은 핵심입니다. Attention-based MIL(Multiple Instance Learning)은 ABMIL로 병리학에서 표준이 되었습니다.",
  sample_tests: [
    { input: { patches: [[1,2],[3,4],[5,6]], method: "mean", query: [] }, expected: [3.0,4.0] },
    { input: { patches: [[1,2],[3,4],[5,6]], method: "max", query: [] }, expected: [5.0,6.0] },
  ],
  hidden_tests: [
    { input: { patches: [[1.0,0.0],[0.0,1.0]], method: "attention", query: [1.0,0.0] }, expected: [0.7311,0.2689], failure_category: "standard" },
    { input: { patches: [[5.0]], method: "mean", query: [] }, expected: [5.0], failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["masked_mean_pooling", "attention_scores"],
  fallback_problem_ids: ["masked_mean_pooling"],
};
export default problem;
