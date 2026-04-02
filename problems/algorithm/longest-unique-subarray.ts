import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "longest_unique_subarray",
  title: "Longest Unique Subarray",
  category: "algorithm",
  difficulty: "medium",
  tags: ["sliding_window", "hash"],
  statement_en: `Given an array of integers, find the length of the longest contiguous subarray where all elements are unique (no duplicates).

**Function signature:**
\`\`\`python
def solution(nums: List[int]) -> int:
\`\`\`

**Example:**
- Input: nums = [2, 3, 4, 2, 5]
- Output: 4 (the subarray [3, 4, 2, 5] has length 4)
`,
  function_name: "solution",
  signature: "def solution(nums: List[int]) -> int:",
  constraints: [
    "0 <= len(nums) <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
  ],
  examples: [
    {
      input: { nums: [2, 3, 4, 2, 5] },
      output: 4,
      explanation: "The subarray [3, 4, 2, 5] has all unique elements",
    },
    {
      input: { nums: [1, 1, 1, 1] },
      output: 1,
      explanation: "Each subarray of length > 1 has duplicates",
    },
  ],
  starter_code: `def solution(nums: List[int]) -> int:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "두 포인터로 sliding window를 사용하세요.",
    "현재 윈도우의 원소를 set으로 유지하고, 중복이 나오면 왼쪽에서 윈도우를 줄이세요.",
  ],
  solution_code: `def solution(nums: List[int]) -> int:
    seen = {}
    left = 0
    max_len = 0
    for right, val in enumerate(nums):
        if val in seen and seen[val] >= left:
            left = seen[val] + 1
        seen[val] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
  solution_explanation: "Sliding window와 hash map으로 각 원소의 마지막 인덱스를 추적. O(n) 시간.",
  sample_tests: [
    { input: { nums: [2, 3, 4, 2, 5] }, expected: 4 },
    { input: { nums: [1, 1, 1, 1] }, expected: 1 },
  ],
  hidden_tests: [
    { input: { nums: [] }, expected: 0, failure_category: "empty_input" },
    { input: { nums: [5] }, expected: 1, failure_category: "single_element" },
    {
      input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      expected: 10,
      failure_category: "edge_case",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["min_subarray_len", "duplicate_detector"],
  fallback_problem_ids: ["duplicate_detector", "frequency_counter"],
};

export default problem;
