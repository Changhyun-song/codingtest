import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "rouge_1_score",
  title: "ROUGE-1 F1 Score",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Compute the **ROUGE-1 F1 score** between a hypothesis and reference.\n\nROUGE-1 measures unigram overlap:\n- Precision = |common_unigrams| / |hypothesis_unigrams|\n- Recall = |common_unigrams| / |reference_unigrams|\n- F1 = 2 × P × R / (P + R), or 0 if P+R=0\n\nTokenize by splitting on whitespace. Use multiset intersection for counts.\n\n**Function signature:**\n\`\`\`python\ndef solution(hypothesis: str, reference: str) -> float:\n\`\`\`\n\nReturn F1 rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(hypothesis: str, reference: str) -> float:",
  constraints: ["Non-empty strings"],
  examples: [{ input: { hypothesis: "the cat sat", reference: "the cat sat on the mat" }, output: 0.666667, explanation: "Common=3, P=3/3=1, R=3/6=0.5, F1=2*1*0.5/1.5=0.667" }],
  starter_code: "def solution(hypothesis: str, reference: str) -> float:\n    pass",
  hints: ["각 문장을 공백으로 split하여 토큰 리스트를 만듭니다.", "Counter를 사용하여 multiset intersection의 합을 구합니다."],
  solution_code: `def solution(hypothesis: str, reference: str) -> float:
    from collections import Counter
    h_tokens = hypothesis.split()
    r_tokens = reference.split()
    h_count = Counter(h_tokens)
    r_count = Counter(r_tokens)
    common = sum((h_count & r_count).values())
    if common == 0:
        return 0.0
    p = common / len(h_tokens)
    r = common / len(r_tokens)
    f1 = 2 * p * r / (p + r)
    return round(f1, 6)`,
  solution_explanation: "ROUGE-1은 요약 평가의 표준 지표입니다. 생성된 텍스트와 참조 텍스트의 단어 수준 겹침을 측정합니다.",
  sample_tests: [
    { input: { hypothesis: "the cat sat", reference: "the cat sat on the mat" }, expected: 0.666667 },
    { input: { hypothesis: "hello world", reference: "hello world" }, expected: 1.0 },
  ],
  hidden_tests: [
    { input: { hypothesis: "a b c", reference: "d e f" }, expected: 0.0, failure_category: "edge_case" },
    { input: { hypothesis: "a a a b", reference: "a b b b" }, expected: 0.5, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["multi_label_metrics", "classification_metrics"],
  fallback_problem_ids: ["bag_of_words"],
};
export default problem;
