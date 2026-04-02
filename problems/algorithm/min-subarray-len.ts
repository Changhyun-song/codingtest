import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "min_subarray_len",
  title: "Minimum Subarray Length",
  category: "algorithm",
  difficulty: "medium",
  tags: ["sliding_window", "prefix_sum"],
  statement_en: `Given an array of positive integers and a target value, find the minimal length of a contiguous subarray whose sum is greater than or equal to the target. If no such subarray exists, return 0.

**Function signature:**
\`\`\`python
def solution(nums: List[int], target: int) -> int:
\`\`\`

**Example:**
- Input: nums = [2, 3, 1, 2, 4, 3], target = 7
- Output: 2 (the subarray [4, 3] has sum 7 with length 2)
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], target: int) -> int:",
  constraints: [
    "1 <= len(nums) <= 10^5",
    "1 <= nums[i] <= 10^4",
    "1 <= target <= 10^9",
  ],
  examples: [
    {
      input: { nums: [2, 3, 1, 2, 4, 3], target: 7 },
      output: 2,
      explanation: "Subarray [4,3] has sum >= 7 with minimum length 2",
    },
  ],
  starter_code: `def solution(nums: List[int], target: int) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "sliding window 방식을 사용하세요.",
    "오른쪽 포인터를 늘리고, 합이 target을 만족하면 왼쪽에서 줄입니다.",
  ],
  solution_code: `def solution(nums: List[int], target: int) -> int:
    left = 0
    curr_sum = 0
    min_len = float('inf')
    for right in range(len(nums)):
        curr_sum += nums[right]
        while curr_sum >= target:
            min_len = min(min_len, right - left + 1)
            curr_sum -= nums[left]
            left += 1
    return 0 if min_len == float('inf') else min_len`,
  solution_explanation: "Sliding window: 오른쪽을 확장하고, 합 >= target이면 왼쪽을 축소. O(n) 시간.",
  sample_tests: [
    { input: { nums: [2, 3, 1, 2, 4, 3], target: 7 }, expected: 2 },
    { input: { nums: [1, 1, 1, 1, 1], target: 11 }, expected: 0 },
  ],
  hidden_tests: [
    {
      input: { nums: [1, 2, 3, 4, 5], target: 15 },
      expected: 5,
      failure_category: "edge_case",
    },
    {
      input: { nums: [10], target: 5 },
      expected: 1,
      failure_category: "single_element",
    },
    {
      input: { nums: [1, 4, 4], target: 4 },
      expected: 1,
      failure_category: "boundary",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["longest_unique_subarray", "prefix_sum_range_query"],
  fallback_problem_ids: ["prefix_sum_range_query"],
};

export default problem;
