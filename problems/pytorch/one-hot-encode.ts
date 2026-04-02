import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "one_hot_encode",
  title: "One-Hot Encoding",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor"],
  statement_en: `Convert a list of class indices to one-hot encoded vectors.\n\nGiven indices and num_classes, return a 2D list where each row is a one-hot vector.\n\n**Function signature:**\n\`\`\`python\ndef solution(indices: List[int], num_classes: int) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(indices: List[int], num_classes: int) -> List[List[int]]:",
  constraints: ["1 <= len(indices) <= 10000", "0 <= indices[i] < num_classes"],
  examples: [{ input: { indices: [0, 2, 1], num_classes: 3 }, output: [[1,0,0],[0,0,1],[0,1,0]], explanation: "Each index becomes a vector with 1 at that position" }],
  starter_code: "def solution(indices: List[int], num_classes: int) -> List[List[int]]:\n    pass",
  hints: ["각 인덱스마다 길이 num_classes인 0 벡터를 만들고, 해당 위치에 1을 넣으세요.", "리스트 컴프리헨션으로 한 줄 구현 가능합니다."],
  solution_code: `def solution(indices: List[int], num_classes: int) -> List[List[int]]:
    result = []
    for idx in indices:
        row = [0] * num_classes
        row[idx] = 1
        result.append(row)
    return result`,
  solution_explanation: "One-hot 인코딩은 분류 문제에서 레이블을 벡터로 변환하는 기본 연산입니다.",
  sample_tests: [
    { input: { indices: [0, 2, 1], num_classes: 3 }, expected: [[1,0,0],[0,0,1],[0,1,0]] },
    { input: { indices: [3], num_classes: 5 }, expected: [[0,0,0,1,0]] },
  ],
  hidden_tests: [
    { input: { indices: [0, 0, 0], num_classes: 2 }, expected: [[1,0],[1,0],[1,0]], failure_category: "edge_case" },
    { input: { indices: [4, 2, 0, 3, 1], num_classes: 5 }, expected: [[0,0,0,0,1],[0,0,1,0,0],[1,0,0,0,0],[0,0,0,1,0],[0,1,0,0,0]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
