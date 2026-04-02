import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "multi_label_metrics",
  title: "Multi-Label Classification Metrics",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Compute **sample-averaged** precision, recall, and F1 for multi-label classification.\n\nGiven predicted labels and true labels (both as lists of sets):\n- Per sample: P = |pred ∩ true| / |pred|, R = |pred ∩ true| / |true|\n- F1 = 2PR/(P+R) or 0\n- Average across all samples\n\n**Function signature:**\n\`\`\`python\ndef solution(predictions: List[List[int]], targets: List[List[int]]) -> List[float]:\n\`\`\`\n\nReturn [precision, recall, f1], each rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(predictions: List[List[int]], targets: List[List[int]]) -> List[float]:",
  constraints: ["len(predictions) == len(targets) >= 1"],
  examples: [{ input: { predictions: [[0,1],[1,2]], targets: [[0,1,2],[1]] }, output: [0.75, 0.5, 0.555556], explanation: "Sample1: P=2/2, R=2/3. Sample2: P=1/2, R=1/1." }],
  starter_code: "def solution(predictions: List[List[int]], targets: List[List[int]]) -> List[float]:\n    pass",
  hints: ["각 샘플에서 set 연산으로 교집합 크기를 구합니다.", "precision = intersection / prediction 크기, recall = intersection / target 크기."],
  solution_code: `def solution(predictions: List[List[int]], targets: List[List[int]]) -> List[float]:
    n = len(predictions)
    tp, tr, tf = 0.0, 0.0, 0.0
    for pred, true in zip(predictions, targets):
        ps, ts = set(pred), set(true)
        common = len(ps & ts)
        p = common / len(ps) if ps else 0.0
        r = common / len(ts) if ts else 0.0
        f = 2 * p * r / (p + r) if (p + r) > 0 else 0.0
        tp += p
        tr += r
        tf += f
    return [round(tp / n, 6), round(tr / n, 6), round(tf / n, 6)]`,
  solution_explanation: "Multi-label 분류는 한 샘플에 여러 레이블이 가능한 설정입니다. 샘플 평균 F1이 표준 평가 지표입니다.",
  sample_tests: [
    { input: { predictions: [[0,1],[1,2]], targets: [[0,1,2],[1]] }, expected: [0.75, 0.5, 0.555556] },
    { input: { predictions: [[0],[0]], targets: [[0],[0]] }, expected: [1.0, 1.0, 1.0] },
  ],
  hidden_tests: [
    { input: { predictions: [[0,1,2]], targets: [[3,4,5]] }, expected: [0.0, 0.0, 0.0], failure_category: "edge_case" },
    { input: { predictions: [[0],[0,1],[0,1,2]], targets: [[0,1],[0,1],[0,1,2]] }, expected: [0.833333, 0.833333, 0.777778], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["classification_metrics", "rouge_1_score"],
  fallback_problem_ids: ["classification_metrics"],
};
export default problem;
