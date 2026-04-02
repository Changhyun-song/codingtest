import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "duplicate_detector",
  title: "Duplicate Detector",
  category: "algorithm",
  difficulty: "easy",
  tags: ["hash", "frequency"],
  statement_en: `Given an array of integers, determine if it contains any duplicates.

Return \`True\` if any value appears at least twice in the array, and \`False\` if every element is distinct.

**Function signature:**
\`\`\`python
def solution(nums: List[int]) -> bool:
\`\`\`

**Example:**
- Input: nums = [1, 2, 3, 1]
- Output: True (because 1 appears twice)
`,
  function_name: "solution",
  signature: "def solution(nums: List[int]) -> bool:",
  constraints: [
    "1 <= len(nums) <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
  ],
  examples: [
    { input: { nums: [1, 2, 3, 1] }, output: true, explanation: "1 appears twice" },
    { input: { nums: [1, 2, 3, 4] }, output: false, explanation: "All elements are distinct" },
  ],
  starter_code: `def solution(nums: List[int]) -> bool:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "O(1) 조회가 가능한 자료구조를 생각해 보세요.",
    "set은 고유한 원소만 담습니다. 리스트 길이와 set의 크기를 비교하세요.",
  ],
  solution_code: `def solution(nums: List[int]) -> bool:
    return len(nums) != len(set(nums))`,
  solution_explanation: "set으로 변환한 뒤 길이를 비교. O(n) 시간, O(n) 공간.",
  sample_tests: [
    { input: { nums: [1, 2, 3, 1] }, expected: true },
    { input: { nums: [1, 2, 3, 4] }, expected: false },
  ],
  hidden_tests: [
    { input: { nums: [1] }, expected: false, failure_category: "single_element" },
    { input: { nums: [1000000000, -1000000000, 1000000000] }, expected: true, failure_category: "edge_case" },
    { input: { nums: [0, 0, 0, 0] }, expected: true, failure_category: "all_same" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["frequency_counter", "longest_unique_subarray"],
  fallback_problem_ids: [],
};

export default problem;
