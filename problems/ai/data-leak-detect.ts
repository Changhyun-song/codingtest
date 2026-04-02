import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "data_leak_detect",
  title: "Data Leakage Detector in ML Pipeline",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Detect **data leakage** in a machine learning pipeline.\n\nGiven a list of preprocessing steps, each with:\n- name: step name\n- fit_on: "all" or "train" (data used for fitting)\n- apply_on: "all" or "train" or "test"\n\nA step causes leakage if fit_on == "all" (fitting uses test data).\n\nReturn the list of leaking step names.\n\n**Function signature:**\n\`\`\`python\ndef solution(steps: List[dict]) -> List[str]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(steps: List[dict]) -> List[str]:",
  constraints: ["each step has name, fit_on, apply_on"],
  examples: [{ input: { steps: [{"name":"scaler","fit_on":"all","apply_on":"all"},{"name":"pca","fit_on":"train","apply_on":"all"}] }, output: ["scaler"], explanation: "Scaler fits on all data including test → leakage" }],
  starter_code: "def solution(steps: List[dict]) -> List[str]:\n    pass",
  hints: ["fit_on=='all'인 단계는 test 데이터 정보가 전처리에 유출됩니다.", "실전에서 StandardScaler를 전체 데이터에 fit하는 것이 대표적인 leakage입니다."],
  solution_code: `def solution(steps: List[dict]) -> List[str]:
    return [s["name"] for s in steps if s["fit_on"] == "all"]`,
  solution_explanation: "Data leakage는 ML에서 가장 흔한 실수입니다. train 데이터로만 fit하고 test에 transform만 적용해야 합니다.",
  sample_tests: [
    { input: { steps: [{"name":"scaler","fit_on":"all","apply_on":"all"},{"name":"pca","fit_on":"train","apply_on":"all"}] }, expected: ["scaler"] },
    { input: { steps: [{"name":"norm","fit_on":"train","apply_on":"all"}] }, expected: [] },
  ],
  hidden_tests: [
    { input: { steps: [{"name":"a","fit_on":"all","apply_on":"all"},{"name":"b","fit_on":"all","apply_on":"train"},{"name":"c","fit_on":"train","apply_on":"all"}] }, expected: ["a","b"], failure_category: "standard" },
    { input: { steps: [] }, expected: [], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["patient_split_check", "classification_metrics"],
  fallback_problem_ids: ["classification_metrics"],
};
export default problem;
