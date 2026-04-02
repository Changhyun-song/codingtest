import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "union_find_groups",
  title: "Friend Circles (Union-Find)",
  category: "algorithm",
  difficulty: "medium",
  tags: ["graph", "hash"],
  statement_en: `There are \`n\` people labeled 0 to n-1. You are given a list of friendship pairs. Two people are in the same friend circle if they are friends directly or indirectly (through a chain of friends).

Return the **number of friend circles**.

**Function signature:**
\`\`\`python
def solution(n: int, friendships: List[List[int]]) -> int:
\`\`\`

**Key concept: Union-Find (Disjoint Set)**
- \`find(x)\`: find the root/representative of x's group
- \`union(x, y)\`: merge the groups of x and y
- Count the number of distinct roots = number of groups

This is similar to counting connected components, but Union-Find is a different technique that's useful when edges arrive dynamically.
`,
  function_name: "solution",
  signature: "def solution(n: int, friendships: List[List[int]]) -> int:",
  constraints: ["1 <= n <= 100,000", "0 <= len(friendships) <= 200,000"],
  examples: [
    { input: { n: 5, friendships: [[0,1],[1,2],[3,4]] }, output: 2, explanation: "Group1: {0,1,2}, Group2: {3,4}" },
    { input: { n: 4, friendships: [[0,1],[2,3],[1,2]] }, output: 1, explanation: "All connected through chain" },
  ],
  starter_code: `def solution(n: int, friendships: List[List[int]]) -> int:
    # Union-Find:
    # parent = list(range(n))  # 각 사람이 자신의 부모
    # def find(x): x의 그룹 루트 찾기
    # def union(x, y): 그룹 합치기
    # 마지막에 고유한 루트 수를 세기
    pass`,
  hints: [
    "모든 i에 대해 parent[i] = i로 초기화. find(x)는 parent[x] == x가 될 때까지 부모를 따라갑니다.",
    "union(x, y): parent[find(x)] = find(y)로 설정하여 두 그룹을 합칩니다.",
    "모든 union 후, find(i) == i를 만족하는 i의 수를 셉니다. 그것이 그룹 수입니다.",
  ],
  solution_code: `def solution(n: int, friendships: List[List[int]]) -> int:
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py:
            parent[px] = py
    for a, b in friendships:
        union(a, b)
    return len(set(find(i) for i in range(n)))`,
  solution_explanation: "경로 압축이 있는 Union-Find. 각 친구 관계를 union하고 고유 루트 수를 셈. 거의 O(n) 상각 시간.",
  sample_tests: [
    { input: { n: 5, friendships: [[0,1],[1,2],[3,4]] }, expected: 2 },
    { input: { n: 4, friendships: [[0,1],[2,3],[1,2]] }, expected: 1 },
  ],
  hidden_tests: [
    { input: { n: 1, friendships: [] }, expected: 1, failure_category: "single_person" },
    { input: { n: 3, friendships: [] }, expected: 3, failure_category: "no_friendships" },
    { input: { n: 4, friendships: [[0,1],[1,2],[2,3],[3,0]] }, expected: 1, failure_category: "cycle" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["bfs_connected_components", "dfs_island_count"],
  fallback_problem_ids: ["bfs_connected_components"],
};

export default problem;
