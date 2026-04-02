import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "stratified_sampler",
  title: "Stratified Balanced Sampler",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "data_loading"],
  statement_en: `Implement a **stratified sampler** for imbalanced datasets.\n\nGiven a list of labels and samples_per_class, return a list of indices with exactly samples_per_class samples from each class (in class order, preserving original order within each class).\n\n**Function signature:**\n\`\`\`python\ndef solution(labels: List[int], samples_per_class: int) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(labels: List[int], samples_per_class: int) -> List[int]:",
  constraints: ["Each class has at least samples_per_class samples"],
  examples: [{ input: { labels: [0,0,0,1,1,2,2,2,2], samples_per_class: 2 }, output: [0,1,3,4,5,6], explanation: "2 per class: cls0=[0,1], cls1=[3,4], cls2=[5,6]" }],
  starter_code: "def solution(labels: List[int], samples_per_class: int) -> List[int]:\n    pass",
  hints: ["클래스별로 인덱스를 수집하고, 각 클래스에서 처음 samples_per_class개를 선택합니다.", "collections.defaultdict(list)를 사용하세요."],
  solution_code: `def solution(labels: List[int], samples_per_class: int) -> List[int]:
    from collections import defaultdict
    class_indices = defaultdict(list)
    for i, l in enumerate(labels):
        class_indices[l].append(i)
    result = []
    for c in sorted(class_indices.keys()):
        result.extend(class_indices[c][:samples_per_class])
    return result`,
  solution_explanation: "클래스 불균형 데이터에서 균형 잡힌 미니배치를 만들어 학습 안정성을 높입니다.",
  sample_tests: [
    { input: { labels: [0,0,0,1,1,2,2,2,2], samples_per_class: 2 }, expected: [0,1,3,4,5,6] },
    { input: { labels: [1,0,1,0,1,0], samples_per_class: 1 }, expected: [1,0] },
  ],
  hidden_tests: [
    { input: { labels: [0,0,0,0], samples_per_class: 4 }, expected: [0,1,2,3], failure_category: "edge_case" },
    { input: { labels: [2,1,0,2,1,0,2,1,0], samples_per_class: 2 }, expected: [2,5,1,4,0,3], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dynamic_batch_grouping", "custom_dataset_logic"],
  fallback_problem_ids: ["custom_dataset_logic"],
};
export default problem;
