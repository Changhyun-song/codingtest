import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "two_pointer_pair_sum",
  title: "Pair Sum in Sorted Array",
  category: "algorithm",
  difficulty: "easy",
  tags: ["two_pointers", "sorting"],
  statement_en: `Given a **sorted** array of integers and a target value, find if there exist two numbers in the array that add up to the target.

If such a pair exists, return \`true\`. Otherwise, return \`false\`.

**Function signature:**
\`\`\`python
def solution(nums: List[int], target: int) -> bool:
\`\`\`

**Key insight:** Since the array is sorted, you can use two pointers — one at the start, one at the end — and move them inward based on the current sum.

**Performance matters!** Aim for O(n) time, O(1) space.
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], target: int) -> bool:",
  constraints: ["1 <= len(nums) <= 100,000", "Array is sorted in ascending order", "-10^9 <= nums[i] <= 10^9"],
  examples: [
    { input: { nums: [1, 2, 3, 4, 6], target: 6 }, output: true, explanation: "2 + 4 = 6" },
    { input: { nums: [1, 2, 3, 4, 6], target: 12 }, output: false, explanation: "No pair sums to 12" },
  ],
  starter_code: `def solution(nums: List[int], target: int) -> bool:
    # 힌트: 투 포인터 사용 - left는 0에서, right는 끝에서 시작
    pass`,
  hints: [
    "포인터를 인덱스 0(왼쪽)과 마지막 인덱스(오른쪽)에 놓으세요.",
    "nums[left] + nums[right] == target이면 찾은 것! 합이 너무 작으면 left를 오른쪽으로, 너무 크면 right를 왼쪽으로 이동.",
    "left >= right가 될 때까지 계속합니다. 쌍을 못 찾으면 False를 반환합니다.",
  ],
  solution_code: `def solution(nums: List[int], target: int) -> bool:
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return True
        elif s < target:
            left += 1
        else:
            right -= 1
    return False`,
  solution_explanation: "양 끝에서 투 포인터. 합이 target보다 작으면 left 증가(더 큰 값 필요), 크면 right 감소(더 작은 값 필요). O(n) 시간, O(1) 공간.",
  sample_tests: [
    { input: { nums: [1, 2, 3, 4, 6], target: 6 }, expected: true },
    { input: { nums: [1, 2, 3, 4, 6], target: 12 }, expected: false },
    { input: { nums: [1, 3, 5, 7], target: 8 }, expected: true },
  ],
  hidden_tests: [
    { input: { nums: [1, 1], target: 2 }, expected: true, failure_category: "duplicate" },
    { input: { nums: [1], target: 2 }, expected: false, failure_category: "single_element" },
    { input: { nums: [-3, -1, 0, 2, 4], target: 1 }, expected: true, failure_category: "negative_numbers" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["two_sum_pairs"],
  fallback_problem_ids: ["two_sum_pairs"],
};

export default problem;
