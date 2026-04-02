import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "binary_search",
  title: "Binary Search",
  category: "algorithm",
  difficulty: "easy",
  tags: ["binary_search"],
  statement_en: `Given a sorted array of integers in ascending order and a target value, return the index of the target if found. If not found, return -1.

You must implement this with O(log n) time complexity.

**Function signature:**
\`\`\`python
def solution(nums: List[int], target: int) -> int:
\`\`\`

**Example:**
- Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
- Output: 4 (nums[4] = 9)
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], target: int) -> int:",
  constraints: [
    "1 <= len(nums) <= 10^5",
    "nums is sorted in ascending order",
    "All elements are unique",
  ],
  examples: [
    {
      input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
      output: 4,
      explanation: "nums[4] = 9",
    },
    {
      input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
      output: -1,
      explanation: "2 is not in the array",
    },
  ],
  starter_code: `def solution(nums: List[int], target: int) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "두 포인터 사용: left = 0, right = len(nums) - 1.",
    "가운데 원소를 target과 비교해 어느 절반을 탐색할지 결정하세요.",
  ],
  solution_code: `def solution(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  solution_explanation: "전형적인 binary search(left/right 포인터). O(log n) 시간.",
  sample_tests: [
    { input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, expected: 4 },
    { input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, expected: -1 },
  ],
  hidden_tests: [
    {
      input: { nums: [5], target: 5 },
      expected: 0,
      failure_category: "single_element",
    },
    {
      input: { nums: [1, 3, 5, 7, 9], target: 1 },
      expected: 0,
      failure_category: "boundary",
    },
    {
      input: { nums: [1, 3, 5, 7, 9], target: 9 },
      expected: 4,
      failure_category: "boundary",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["prefix_sum_range_query"],
  fallback_problem_ids: [],
};

export default problem;
