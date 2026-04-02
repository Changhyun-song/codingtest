import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "patient_split_check",
  title: "Patient-Level Data Leakage Detector",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Detect **patient-level data leakage** in train/test splits.\n\nGiven sample-to-patient mappings for train and test sets, check if any patient has samples in BOTH sets.\n\nReturn:\n- leaked_patients: sorted list of patient IDs that appear in both sets\n- leak_ratio: fraction of test samples from leaked patients, rounded to 4 decimals\n\nReturn [leaked_patients, leak_ratio].\n\n**Function signature:**\n\`\`\`python\ndef solution(train_patients: List[str], test_patients: List[str]) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(train_patients: List[str], test_patients: List[str]) -> List:",
  constraints: ["each entry is a patient ID string"],
  examples: [{ input: { train_patients: ["P1","P1","P2","P3"], test_patients: ["P2","P4","P4"] }, output: [["P2"], 0.3333], explanation: "P2 in both. 1/3 of test samples are leaked." }],
  starter_code: "def solution(train_patients: List[str], test_patients: List[str]) -> List:\n    pass",
  hints: ["train과 test의 patient 집합의 교집합을 구합니다.", "leak_ratio = (leaked patient의 test 샘플 수) / (전체 test 샘플 수)."],
  solution_code: `def solution(train_patients: List[str], test_patients: List[str]) -> List:
    train_set = set(train_patients)
    test_set = set(test_patients)
    leaked = sorted(train_set & test_set)
    leaked_count = sum(1 for p in test_patients if p in train_set)
    ratio = round(leaked_count / len(test_patients), 4) if test_patients else 0.0
    return [leaked, ratio]`,
  solution_explanation: "의료 AI에서 patient-level leakage는 치명적입니다. 같은 환자의 다른 슬라이드/시퀀스가 train/test에 나뉘면 성능이 과대평가됩니다.",
  sample_tests: [
    { input: { train_patients: ["P1","P1","P2","P3"], test_patients: ["P2","P4","P4"] }, expected: [["P2"], 0.3333] },
    { input: { train_patients: ["A","B"], test_patients: ["C","D"] }, expected: [[], 0.0] },
  ],
  hidden_tests: [
    { input: { train_patients: ["X"], test_patients: ["X"] }, expected: [["X"], 1.0], failure_category: "edge_case" },
    { input: { train_patients: ["P1","P2","P3","P1"], test_patients: ["P2","P3","P4","P5","P3"] }, expected: [["P2","P3"], 0.6], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["stratified_sampler", "classification_metrics"],
  fallback_problem_ids: ["classification_metrics"],
};
export default problem;
