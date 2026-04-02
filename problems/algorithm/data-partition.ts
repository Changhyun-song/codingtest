import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "data_partition",
  title: "Data Partition (X-Y Split)",
  category: "algorithm",
  difficulty: "medium",
  tags: ["partitioning", "optimization", "prefix_sum"],
  statement_en: `You are given an array of N integers. You need to split this array into **two non-empty contiguous parts**: a left part (X) and a right part (Y).

The **cost** of a split at position i (1 <= i < N) is defined as:

**cost(i) = |sum(X) - sum(Y)|**

where X = array[0..i-1] and Y = array[i..N-1].

Return the **minimum cost** over all possible split positions.

**Function signature:**
\`\`\`python
def solution(arr: List[int]) -> int:
\`\`\`

**Performance matters!** A naive O(N^2) approach will time out. Use prefix sums for O(N).
`,
  function_name: "solution",
  signature: "def solution(arr: List[int]) -> int:",
  constraints: [
    "2 <= len(arr) <= 300,000",
    "-1,000,000 <= arr[i] <= 1,000,000",
  ],
  examples: [
    {
      input: { arr: [3, 1, 2, 4, 3] },
      output: 1,
      explanation:
        "Split at index 3: X=[3,1,2], Y=[4,3]. |6-7|=1. This is the minimum.",
    },
    {
      input: { arr: [1, 2, 3, 4] },
      output: 2,
      explanation:
        "Split at index 2: X=[1,2], Y=[3,4]. |3-7|=4. Split at index 3: X=[1,2,3], Y=[4]. |6-4|=2. Min=2.",
    },
  ],
  starter_code: `def solution(arr: List[int]) -> int:
    # 여기에 코드를 작성하세요
    # 힌트: 전체 합을 구한 뒤 분할 지점을 순회
    pass`,
  hints: [
    "먼저 전체 합을 구한 뒤, 왼쪽에서 오른쪽으로 이동하며 left_sum을 유지하세요.",
    "분할 위치 i에서: left_sum, right_sum = total - left_sum. 비용 = |left_sum - right_sum|.",
    "시간 복잡도 O(N).",
  ],
  solution_code: `def solution(arr: List[int]) -> int:
    total = sum(arr)
    left_sum = 0
    min_cost = float('inf')
    for i in range(len(arr) - 1):
        left_sum += arr[i]
        right_sum = total - left_sum
        min_cost = min(min_cost, abs(left_sum - right_sum))
    return min_cost`,
  solution_explanation: "Prefix sum: 전체 합을 구하고 분할 지점을 순회. O(n) 시간, O(1) 공간.",
  sample_tests: [
    { input: { arr: [3, 1, 2, 4, 3] }, expected: 1 },
    { input: { arr: [1, 2, 3, 4] }, expected: 2 },
  ],
  hidden_tests: [
    {
      input: { arr: [1, 1] },
      expected: 0,
      failure_category: "edge_case",
    },
    {
      input: { arr: [-10, 5, 5] },
      expected: 0,
      failure_category: "negative_handling",
    },
    {
      input: { arr: [1000000, -1000000, 1000000] },
      expected: 1000000,
      failure_category: "overflow",
    },
    {
      input: { arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
      expected: 0,
      failure_category: "all_same",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["prefix_sum_range_query", "min_subarray_len"],
  fallback_problem_ids: ["prefix_sum_range_query"],
};

export default problem;
