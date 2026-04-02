import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "array_rotation",
  title: "Security Code Rotator",
  category: "algorithm",
  difficulty: "easy",
  tags: ["array", "modular_arithmetic"],
  statement_en: `A security system uses rotating codes. Given an array \`A\` of \`N\` integers and a non-negative integer \`K\`, **rotate** the array \`K\` times to the **right**.

Each rotation shifts every element one position to the right; the last element moves to the front. Return the resulting array.

**Function signature:**
\`\`\`python
def solution(A: List[int], K: int) -> List[int]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(A: List[int], K: int) -> List[int]:",
  constraints: [
    "0 <= N, K <= 100",
    "-1000 <= A[i] <= 1000",
  ],
  examples: [
    {
      input: { A: [3, 8, 9, 7, 6], K: 3 },
      output: [9, 7, 6, 3, 8],
      explanation: "Three right rotations move the last three elements to the front.",
    },
    {
      input: { A: [1, 2, 3, 4], K: 4 },
      output: [1, 2, 3, 4],
      explanation: "K equals the length, so the array returns to its original order.",
    },
  ],
  starter_code: `def solution(A: List[int], K: int) -> List[int]:
    pass`,
  hints: [
    "빈 배열이면 그대로 반환하세요.",
    "길이 N에 대해 실제 회전 횟수는 K % N으로 줄일 수 있습니다.",
    "오른쪽으로 K칸 이동은 뒤쪽 K개를 잘라 앞에 붙이는 것과 같습니다.",
  ],
  solution_code: `def solution(A: List[int], K: int) -> List[int]:
    if not A:
        return A
    K = K % len(A)
    if K == 0:
        return A[:]
    return A[-K:] + A[:-K]`,
  solution_explanation:
    "K를 len(A)로 나눈 나머지만큼만 회전하면 되고, 결과는 A[-K:]와 A[:-K]를 이어 붙인 배열입니다.",
  sample_tests: [
    { input: { A: [3, 8, 9, 7, 6], K: 3 }, expected: [9, 7, 6, 3, 8] },
    { input: { A: [1, 2, 3, 4], K: 4 }, expected: [1, 2, 3, 4] },
  ],
  hidden_tests: [
    { input: { A: [], K: 5 }, expected: [], failure_category: "empty" },
    { input: { A: [1], K: 100 }, expected: [1], failure_category: "single_element" },
    { input: { A: [1, 2, 3], K: 0 }, expected: [1, 2, 3], failure_category: "zero_rotation" },
  ],
  checker_type: "exact",
  similar_problem_ids: [],
  fallback_problem_ids: [],
};

export default problem;
