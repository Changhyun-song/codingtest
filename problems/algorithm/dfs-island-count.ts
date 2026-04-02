import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "dfs_island_count",
  title: "Number of Islands",
  category: "algorithm",
  difficulty: "easy",
  tags: ["dfs", "graph"],
  statement_en: `You are given a map represented as a 2D grid. Each cell is either **1 (land)** or **0 (water)**.

An **island** is a group of land cells (1) that are connected **horizontally or vertically** (up, down, left, right — NOT diagonally).

Count and return the total number of islands.

**Example visualization:**
\`\`\`
1 1 0 0 0      Island A: top-left (4 cells)
1 1 0 0 0      Island B: center (1 cell)
0 0 1 0 0      Island C: bottom-right (2 cells)
0 0 0 1 1      → Answer: 3
\`\`\`

**Approach:** Start from any unvisited land cell. Use DFS to "flood-fill" the entire island (mark all connected land as visited). Each time you start a new flood-fill, that's one more island.

**Function signature:**
\`\`\`python
def solution(grid: List[List[int]]) -> int:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(grid: List[List[int]]) -> int:",
  constraints: ["1 <= rows, cols <= 300", "grid[i][j] is 0 or 1"],
  examples: [
    {
      input: { grid: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] },
      output: 3,
      explanation: "Three islands: top-left 2x2, center 1x1, bottom-right 1x2",
    },
  ],
  starter_code: `def solution(grid: List[List[int]]) -> int:
    pass`,
  hints: [
    "모든 셀을 순회합니다. 1을 찾으면 섬 카운트를 증가시키고 해당 셀에서 DFS를 시작.",
    "DFS: 현재 셀을 0으로 표시(방문 처리), 그 다음 상하좌우 4방향의 이웃 중 1인 곳을 재귀 방문.",
    "DFS가 끝나면 해당 섬의 모든 셀이 0으로 표시되어 다시 세지 않습니다.",
  ],
  solution_code: `def solution(grid: List[List[int]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return
        grid[r][c] = 0
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                count += 1
                dfs(r, c)
    return count`,
  solution_explanation: "DFS 플러드 필: 미방문 1을 찾을 때마다 섬 카운트 후 DFS로 연결된 1을 모두 0으로 표시. O(행×열) 시간.",
  sample_tests: [
    { input: { grid: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] }, expected: 3 },
    { input: { grid: [[1,1,1],[0,0,0],[1,1,1]] }, expected: 2 },
  ],
  hidden_tests: [
    { input: { grid: [[0]] }, expected: 0, failure_category: "no_island" },
    { input: { grid: [[1]] }, expected: 1, failure_category: "single_cell" },
    { input: { grid: [[1,0,1,0,1]] }, expected: 3, failure_category: "single_row" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["bfs_connected_components", "dfs_max_depth"],
  fallback_problem_ids: ["bfs_connected_components"],
};

export default problem;
