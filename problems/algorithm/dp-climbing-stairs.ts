import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "dp_climbing_stairs",
  title: "Climbing Stairs",
  category: "algorithm",
  difficulty: "easy",
  tags: ["dynamic_programming"],
  statement_en: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb **1 or 2 steps**. In how many distinct ways can you climb to the top?

**Function signature:**
\`\`\`python
def solution(n: int) -> int:
\`\`\`

**This is the classic introduction to Dynamic Programming!**

Think about it: to reach step \`n\`, you either came from step \`n-1\` (took 1 step) or step \`n-2\` (took 2 steps). So the number of ways to reach step \`n\` = ways(n-1) + ways(n-2).

This is essentially the Fibonacci sequence!
`,
  function_name: "solution",
  signature: "def solution(n: int) -> int:",
  constraints: ["1 <= n <= 45"],
  examples: [
    { input: { n: 2 }, output: 2, explanation: "Two ways: (1+1) or (2)" },
    { input: { n: 3 }, output: 3, explanation: "Three ways: (1+1+1), (1+2), (2+1)" },
    { input: { n: 5 }, output: 8, explanation: "Like Fibonacci: 1,2,3,5,8" },
  ],
  starter_code: `def solution(n: int) -> int:
    # 생각해보기: ways(n) = ways(n-1) + ways(n-2)
    # 기저 조건: ways(1) = 1, ways(2) = 2
    pass`,
  hints: [
    "본질적으로 피보나치 수열입니다. ways(1)=1, ways(2)=2, ways(n)=ways(n-1)+ways(n-2).",
    "재귀 대신 간단한 반복문을 사용하면 시간초과를 피할 수 있습니다. 이전 두 값만 추적하세요.",
    "prev2, prev1 = 1, 2 → 3부터 n까지 반복하며 갱신: prev2, prev1 = prev1, prev2 + prev1",
  ],
  solution_code: `def solution(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1`,
  solution_explanation: "상향식 DP: 마지막 두 값만 유지. ways(n) = ways(n-1) + ways(n-2). O(n) 시간, O(1) 공간.",
  sample_tests: [
    { input: { n: 2 }, expected: 2 },
    { input: { n: 3 }, expected: 3 },
    { input: { n: 5 }, expected: 8 },
  ],
  hidden_tests: [
    { input: { n: 1 }, expected: 1, failure_category: "base_case" },
    { input: { n: 10 }, expected: 89, failure_category: "medium_input" },
    { input: { n: 45 }, expected: 1836311903, failure_category: "large_input" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dp_coin_change", "max_subarray_sum"],
  fallback_problem_ids: ["max_subarray_sum"],
};

export default problem;
