import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "backtracking_subsets",
  title: "Generate All Subsets",
  category: "algorithm",
  difficulty: "easy",
  tags: ["backtracking"],
  statement_en: `Given a list of **distinct** integers, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the subsets in any order. Each subset should be sorted.

**Function signature:**
\`\`\`python
def solution(nums: List[int]) -> List[List[int]]:
\`\`\`

**Key concept: Backtracking**
For each element, you have two choices: include it or exclude it. This creates a binary decision tree. Explore all paths to generate all subsets.
`,
  function_name: "solution",
  signature: "def solution(nums: List[int]) -> List[List[int]]:",
  constraints: ["0 <= len(nums) <= 15", "All elements are distinct", "-10 <= nums[i] <= 10"],
  examples: [
    {
      input: { nums: [1, 2, 3] },
      output: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
      explanation: "All 2^3 = 8 subsets",
    },
  ],
  starter_code: `def solution(nums: List[int]) -> List[List[int]]:
    # 백트래킹: 각 원소에 대해 포함 또는 제외
    # 재귀적으로 부분집합을 구성
    pass`,
  hints: [
    "재귀적으로 생각하세요: 각 인덱스에서 해당 숫자를 포함하거나 건너뛸지 결정.",
    "도우미 함수 사용: backtrack(start, current_subset). 매 단계에서 current_subset을 결과에 추가하고, 남은 원소 각각을 추가 시도.",
    "기본 구조: result = []; def bt(start, path): result.append(path[:]); for i in range(start, len(nums)): bt(i+1, path + [nums[i]])",
  ],
  solution_code: `def solution(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []
    def bt(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            bt(i + 1, path + [nums[i]])
    bt(0, [])
    return result`,
  solution_explanation: "백트래킹: 각 위치에서 포함/건너뛰기로 분기. 일관된 순서를 위해 먼저 정렬. 총 O(2^n)개의 부분집합.",
  sample_tests: [
    { input: { nums: [1, 2, 3] }, expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] },
    { input: { nums: [0] }, expected: [[], [0]] },
  ],
  hidden_tests: [
    { input: { nums: [] }, expected: [[]], failure_category: "empty_input" },
    { input: { nums: [1, 2] }, expected: [[], [1], [1, 2], [2]], failure_category: "small_input" },
  ],
  checker_type: "unordered",
  similar_problem_ids: ["valid_parentheses", "dfs_max_depth"],
  fallback_problem_ids: ["valid_parentheses"],
};

export default problem;
