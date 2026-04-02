import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "top_k_bucket_sort",
  title: "Top K Frequent Elements",
  category: "algorithm",
  difficulty: "medium",
  tags: ["hash", "sorting", "bucket_sort"],
  statement_en: `Given an array of integers \`nums\` and an integer \`k\`, return the **k most frequent elements**. Your solution should aim for **O(n)** time — for example using **bucket sort** by frequency (better than sorting all unique elements in **O(n log n)** when done naively).

**Function signature:**
\`\`\`python
def solution(nums: List[int], k: int) -> List[int]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], k: int) -> List[int]:",
  constraints: [
    "1 <= len(nums) <= 10^5",
    "k is in the range [1, number of unique elements in nums]",
    "-10^4 <= nums[i] <= 10^4",
  ],
  examples: [
    {
      input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
      output: [1, 2],
      explanation: "Frequencies: 1 appears 3 times, 2 appears 2 times (top 2).",
    },
    { input: { nums: [1], k: 1 }, output: [1], explanation: "Only one element." },
  ],
  starter_code: `def solution(nums: List[int], k: int) -> List[int]:
    pass`,
  hints: [
    "각 숫자의 빈도를 세고, 빈도를 인덱스로 하는 버킷 배열을 만들 수 있습니다.",
    "빈도가 높은 버킷부터 내려가며 원소를 모으면 O(n)에 가깝게 처리할 수 있습니다.",
    "collections.Counter로 빈도를 구한 뒤 버킷에 넣는 방식을 쓰세요.",
  ],
  solution_code: `def solution(nums: List[int], k: int) -> List[int]:
    from collections import Counter
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    result = []
    for freq in range(len(buckets) - 1, -1, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
  solution_explanation:
    "Counter로 빈도를 세고, 인덱스를 빈도로 하는 버킷 리스트에 숫자를 넣습니다. 가장 큰 빈도부터 버킷을 순회하며 k개가 될 때까지 답에 추가하면 O(n)입니다. 동일 빈도일 때 순서는 문제에서 순서 무관으로 검증할 수 있습니다.",
  sample_tests: [
    { input: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expected: [1, 2] },
    { input: { nums: [1], k: 1 }, expected: [1] },
  ],
  hidden_tests: [
    {
      input: { nums: [4, 4, 4, 4, 5, 5, 5, 6, 6, 7], k: 3 },
      expected: [4, 5, 6],
      failure_category: "standard",
    },
    {
      input: { nums: [1, 2, 3, 4, 5], k: 5 },
      expected: [1, 2, 3, 4, 5],
      failure_category: "all_same_freq",
    },
  ],
  checker_type: "unordered",
  similar_problem_ids: ["top_k_frequent_tokens", "heap_kth_largest"],
  fallback_problem_ids: ["duplicate_detector"],
};

export default problem;
