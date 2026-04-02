import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "max_subarray_sum",
  title: "Maximum Subarray Sum (Kadane)",
  category: "algorithm",
  difficulty: "medium",
  tags: ["dynamic_programming", "greedy"],
  statement_en: `Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum, and return that sum.

**Function signature:**
\`\`\`python
def solution(nums: List[int]) -> int:
\`\`\`

This is a classic dynamic programming / greedy problem known as **Kadane's algorithm**.

**Performance matters!** Must be O(n) time.
`,
  function_name: "solution",
  signature: "def solution(nums: List[int]) -> int:",
  constraints: [
    "1 <= len(nums) <= 300,000",
    "-10,000 <= nums[i] <= 10,000",
  ],
  examples: [
    {
      input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      output: 6,
      explanation: "Subarray [4,-1,2,1] has the largest sum = 6",
    },
  ],
  starter_code: `def solution(nums: List[int]) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 위치에서 이전 부분 배열을 이어갈지, 여기서 새로 시작할지 결정합니다.",
    "current_max = max(nums[i], current_max + nums[i])",
  ],
  solution_code: `def solution(nums: List[int]) -> int:
    max_sum = curr = nums[0]
    for num in nums[1:]:
        curr = max(num, curr + num)
        max_sum = max(max_sum, curr)
    return max_sum`,
  solution_explanation: "Kadane's algorithm: 여기서 끝나는 부분 배열의 현재 최대 합을 추적. O(n) 시간, O(1) 공간.",
  sample_tests: [
    { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6 },
    { input: { nums: [1] }, expected: 1 },
    { input: { nums: [5, 4, -1, 7, 8] }, expected: 23 },
  ],
  hidden_tests: [
    { input: { nums: [-1] }, expected: -1, failure_category: "negative_handling" },
    { input: { nums: [-2, -1, -3] }, expected: -1, failure_category: "all_negative" },
    { input: { nums: [0, 0, 0, 0] }, expected: 0, failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["data_partition", "min_subarray_len"],
  fallback_problem_ids: ["prefix_sum_range_query"],
};

export default problem;
