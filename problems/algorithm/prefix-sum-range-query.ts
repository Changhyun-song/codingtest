import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "prefix_sum_range_query",
  title: "Prefix Sum Range Query",
  category: "algorithm",
  difficulty: "easy",
  tags: ["prefix_sum"],
  statement_en: `Given an array of integers and a list of range queries, each defined by a pair [left, right] (0-indexed, inclusive), return a list of sums for each query.

**Function signature:**
\`\`\`python
def solution(nums: List[int], queries: List[List[int]]) -> List[int]:
\`\`\`

**Example:**
- Input: nums = [1, 2, 3, 4, 5], queries = [[0, 2], [1, 3], [0, 4]]
- Output: [6, 9, 15]
  - sum(nums[0..2]) = 1+2+3 = 6
  - sum(nums[1..3]) = 2+3+4 = 9
  - sum(nums[0..4]) = 1+2+3+4+5 = 15
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], queries: List[List[int]]) -> List[int]:",
  constraints: [
    "1 <= len(nums) <= 10^5",
    "1 <= len(queries) <= 10^4",
    "0 <= left <= right < len(nums)",
  ],
  examples: [
    {
      input: { nums: [1, 2, 3, 4, 5], queries: [[0, 2], [1, 3], [0, 4]] },
      output: [6, 9, 15],
      explanation: "Use prefix sums for efficient range queries",
    },
  ],
  starter_code: `def solution(nums: List[int], queries: List[List[int]]) -> List[int]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "prefix[i] = sum(nums[0..i-1])인 prefix sum 배열을 만드세요.",
    "그러면 구간 합 = prefix[right+1] - prefix[left].",
  ],
  solution_code: `def solution(nums: List[int], queries: List[List[int]]) -> List[int]:
    prefix = [0] * (len(nums) + 1)
    for i in range(len(nums)):
        prefix[i + 1] = prefix[i] + nums[i]
    return [prefix[r + 1] - prefix[l] for l, r in queries]`,
  solution_explanation: "prefix sum 배열을 만든 뒤, 구간 합 = prefix[r+1] - prefix[l]. O(n + q) 시간.",
  sample_tests: [
    {
      input: { nums: [1, 2, 3, 4, 5], queries: [[0, 2], [1, 3], [0, 4]] },
      expected: [6, 9, 15],
    },
    {
      input: { nums: [10, 20, 30], queries: [[0, 0], [2, 2]] },
      expected: [10, 30],
    },
  ],
  hidden_tests: [
    {
      input: { nums: [5], queries: [[0, 0]] },
      expected: [5],
      failure_category: "single_element",
    },
    {
      input: { nums: [-1, -2, -3, 4, 5], queries: [[0, 4], [0, 2]] },
      expected: [3, -6],
      failure_category: "negative_handling",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["min_subarray_len"],
  fallback_problem_ids: [],
};

export default problem;
