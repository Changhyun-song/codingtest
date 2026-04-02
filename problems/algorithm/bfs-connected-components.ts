import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "bfs_connected_components",
  title: "BFS Connected Components",
  category: "algorithm",
  difficulty: "medium",
  tags: ["bfs", "graph"],
  statement_en: `Given \`n\` nodes labeled from 0 to n-1 and a list of undirected edges, return the number of connected components in the graph.

**Function signature:**
\`\`\`python
def solution(n: int, edges: List[List[int]]) -> int:
\`\`\`

**Example:**
- Input: n = 5, edges = [[0, 1], [1, 2], [3, 4]]
- Output: 2
  - Component 1: {0, 1, 2}
  - Component 2: {3, 4}
`,
  function_name: "solution",
  signature: "def solution(n: int, edges: List[List[int]]) -> int:",
  constraints: [
    "1 <= n <= 10^4",
    "0 <= len(edges) <= n*(n-1)/2",
    "edges[i] = [u, v] where 0 <= u, v < n",
  ],
  examples: [
    {
      input: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] },
      output: 2,
      explanation: "Two components: {0,1,2} and {3,4}",
    },
  ],
  starter_code: `def solution(n: int, edges: List[List[int]]) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "인접 리스트를 만든 뒤, 방문하지 않은 노드마다 BFS 또는 DFS를 하세요.",
    "새로운 탐색을 시작할 때마다 component 개수를 1 증가시키세요.",
  ],
  solution_code: `def solution(n: int, edges: List[List[int]]) -> int:
    from collections import deque
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    visited = [False] * n
    count = 0
    for i in range(n):
        if not visited[i]:
            count += 1
            queue = deque([i])
            visited[i] = True
            while queue:
                node = queue.popleft()
                for nb in adj[node]:
                    if not visited[nb]:
                        visited[nb] = True
                        queue.append(nb)
    return count`,
  solution_explanation: "방문하지 않은 노드에서 BFS. BFS 시작마다 새 component. O(V + E) 시간.",
  sample_tests: [
    { input: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] }, expected: 2 },
    { input: { n: 3, edges: [[0, 1], [1, 2], [0, 2]] }, expected: 1 },
  ],
  hidden_tests: [
    {
      input: { n: 1, edges: [] },
      expected: 1,
      failure_category: "single_element",
    },
    {
      input: { n: 4, edges: [] },
      expected: 4,
      failure_category: "disconnected",
    },
    {
      input: { n: 6, edges: [[0, 1], [2, 3], [4, 5]] },
      expected: 3,
      failure_category: "edge_case",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["longest_unique_subarray"],
  fallback_problem_ids: ["duplicate_detector"],
};

export default problem;
