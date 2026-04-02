import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "dfs_max_depth",
  title: "Maximum Nesting Depth",
  category: "algorithm",
  difficulty: "easy",
  tags: ["dfs", "stack"],
  statement_en: `Given a nested list structure (represented as a Python list that can contain integers or other lists), find the maximum nesting depth.

A flat list like \`[1, 2, 3]\` has depth 1.
A list like \`[1, [2, 3]]\` has depth 2.
A list like \`[1, [2, [3]]]\` has depth 3.
An empty list \`[]\` has depth 1.

**Function signature:**
\`\`\`python
def solution(nested: list) -> int:
\`\`\`

**Key concept:** This is a natural use case for **recursion** (DFS). For each element, if it's a list, recurse into it and add 1 to the depth.
`,
  function_name: "solution",
  signature: "def solution(nested: list) -> int:",
  constraints: ["Input is a valid nested list", "Maximum depth <= 100"],
  examples: [
    { input: { nested: [1, 2, 3] }, output: 1, explanation: "Flat list, depth = 1" },
    { input: { nested: [1, [2, [3]]] }, output: 3, explanation: "3 is nested 3 levels deep" },
  ],
  starter_code: `def solution(nested: list) -> int:
    # 힌트: 재귀를 사용하세요. 원소가 리스트이면 depth+1로 재귀
    pass`,
  hints: [
    "깊이 1부터 시작합니다 (바깥 리스트 자체가 깊이 1).",
    "리스트의 각 원소에 대해: 그것도 리스트이면 재귀적으로 깊이를 구합니다.",
    "정답 = max(1, 1 + 하위 리스트의 최대 깊이).",
  ],
  solution_code: `def solution(nested: list) -> int:
    max_d = 1
    for item in nested:
        if isinstance(item, list):
            max_d = max(max_d, 1 + solution(item))
    return max_d`,
  solution_explanation: "재귀 DFS: 각 하위 리스트에 대해 재귀하고 깊이에 1을 더합니다. 최대값을 반환. O(전체 원소 수) 시간.",
  sample_tests: [
    { input: { nested: [1, 2, 3] }, expected: 1 },
    { input: { nested: [1, [2, [3]]] }, expected: 3 },
    { input: { nested: [[[[]]]] }, expected: 4 },
  ],
  hidden_tests: [
    { input: { nested: [] }, expected: 1, failure_category: "empty_input" },
    { input: { nested: [1, [2], [3, [4, [5]]]] }, expected: 4, failure_category: "multiple_branches" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dfs_island_count", "bfs_connected_components"],
  fallback_problem_ids: ["valid_parentheses"],
};

export default problem;
