import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "two_sum_pairs",
  title: "Two Sum Pairs",
  category: "algorithm",
  difficulty: "easy",
  tags: ["hash", "two_sum"],
  statement_en: `Given an array of integers and a target value, return the indices of the two numbers that add up to the target.

Each input has exactly one solution, and you may not use the same element twice. Return the indices in ascending order.

**Function signature:**
\`\`\`python
def solution(nums: List[int], target: int) -> List[int]:
\`\`\`

**Performance matters!** Use O(n) time complexity.
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], target: int) -> List[int]:",
  constraints: [
    "2 <= len(nums) <= 100,000",
    "-10^9 <= nums[i] <= 10^9",
    "Exactly one valid answer exists",
  ],
  examples: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
      explanation: "nums[0] + nums[1] = 2 + 7 = 9",
    },
  ],
  starter_code: `def solution(nums: List[int], target: int) -> List[int]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "hash map에 이미 본 값과 인덱스를 저장하세요.",
    "각 숫자에 대해 (target - 숫자)가 map에 있는지 확인하세요.",
  ],
  solution_code: `def solution(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return sorted([seen[complement], i])
        seen[num] = i
    return []`,
  solution_explanation: "Hash map: 각 num에 대해 target-num이 이미 있었는지 확인. O(n) 시간, O(n) 공간.",
  sample_tests: [
    { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
    { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
  ],
  hidden_tests: [
    { input: { nums: [3, 3], target: 6 }, expected: [0, 1], failure_category: "duplicate_handling" },
    { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4], failure_category: "negative_handling" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["duplicate_detector", "frequency_counter"],
  fallback_problem_ids: ["duplicate_detector"],
};

export default problem;
