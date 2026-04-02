import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "missing_badge",
  title: "Missing Badge Number",
  category: "algorithm",
  difficulty: "easy",
  tags: ["math", "sum_formula"],
  statement_en: `At a company event, \`N\` employees each hold one badge. The full set of badge numbers should be \`1, 2, \\ldots, N+1\`, but **exactly one** badge is missing from the room.

You are given an array \`A\` of length \`N\` containing **distinct** integers from that range. Return the **missing** badge number.

**Function signature:**
\`\`\`python
def solution(A: List[int]) -> int:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(A: List[int]) -> int:",
  constraints: [
    "0 <= N <= 100,000",
    "Elements are distinct",
    "1 <= A[i] <= N+1",
  ],
  examples: [
    {
      input: { A: [2, 3, 1, 5] },
      output: 4,
      explanation: "Numbers 1–5 should all be present; 4 is missing.",
    },
    {
      input: { A: [1] },
      output: 2,
      explanation: "With one person, badges should be 1 and 2; 2 is missing.",
    },
  ],
  starter_code: `def solution(A: List[int]) -> int:
    pass`,
  hints: [
    "1부터 N+1까지의 합 공식을 떠올려 보세요.",
    "전체 합에서 주어진 배열의 합을 빼면 빠진 번호가 됩니다.",
    "N이 len(A)일 때, 상한은 len(A)+1입니다.",
  ],
  solution_code: `def solution(A: List[int]) -> int:
    n = len(A) + 1
    expected = n * (n + 1) // 2
    return expected - sum(A)`,
  solution_explanation:
    "완전 집합 {1,…,n}의 합은 n(n+1)/2이고, 여기서 n=len(A)+1입니다. 기대 합에서 실제 합을 빼면 빠진 번호가 나옵니다.",
  sample_tests: [
    { input: { A: [2, 3, 1, 5] }, expected: 4 },
    { input: { A: [1] }, expected: 2 },
  ],
  hidden_tests: [
    { input: { A: [] }, expected: 1, failure_category: "empty_array" },
    { input: { A: [2, 3, 4, 5] }, expected: 1, failure_category: "missing_first" },
    { input: { A: [1, 2, 3, 4] }, expected: 5, failure_category: "missing_last" },
  ],
  checker_type: "exact",
  similar_problem_ids: [],
  fallback_problem_ids: [],
};

export default problem;
