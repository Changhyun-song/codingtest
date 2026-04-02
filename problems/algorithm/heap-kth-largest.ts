import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "heap_kth_largest",
  title: "Kth Largest Element",
  category: "algorithm",
  difficulty: "easy",
  tags: ["heap", "sorting"],
  statement_en: `Given an unsorted array of integers, find the **kth largest** element.

For example, in \`[3, 2, 1, 5, 6, 4]\` with k=2, the 2nd largest element is **5**.

**Function signature:**
\`\`\`python
def solution(nums: List[int], k: int) -> int:
\`\`\`

**Note:** You can solve this by sorting (simple), or using a heap (optimal). For learning purposes, both approaches are acceptable.

**Concept to learn:** A **heap** (or priority queue) efficiently tracks the smallest/largest elements. Python's \`heapq\` module provides a min-heap.
`,
  function_name: "solution",
  signature: "def solution(nums: List[int], k: int) -> int:",
  constraints: ["1 <= k <= len(nums) <= 100,000", "-10^4 <= nums[i] <= 10^4"],
  examples: [
    { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, output: 5, explanation: "Sorted: [1,2,3,4,5,6]. 2nd largest = 5" },
    { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, output: 4, explanation: "Sorted: [1,2,2,3,3,4,5,5,6]. 4th largest = 4" },
  ],
  starter_code: `def solution(nums: List[int], k: int) -> int:
    # 간단한 방법: 정렬 후 nums[-k] 반환
    # 더 나은 방법: heapq로 크기 k의 힙 유지
    pass`,
  hints: [
    "가장 간단한 방법: 배열을 내림차순 정렬 후 k번째 원소를 반환.",
    "더 나은 방법: Python의 heapq를 사용. 크기 k의 최소 힙을 유지하면 힙의 꼭대기가 k번째로 큰 원소.",
    "import heapq; 크기 k의 힙 유지: 각 원소를 push하고, 힙 크기 > k이면 가장 작은 것을 pop.",
  ],
  solution_code: `def solution(nums: List[int], k: int) -> int:
    import heapq
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
  solution_explanation: "크기 k의 최소 힙: 각 원소를 push하고 크기 > k이면 pop. 루트가 k번째로 큰 원소. O(n log k) 시간. 단순 정렬: O(n log n).",
  sample_tests: [
    { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, expected: 5 },
    { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, expected: 4 },
  ],
  hidden_tests: [
    { input: { nums: [1], k: 1 }, expected: 1, failure_category: "single_element" },
    { input: { nums: [7, 7, 7, 7], k: 2 }, expected: 7, failure_category: "duplicates" },
    { input: { nums: [-1, -2, -3], k: 1 }, expected: -1, failure_category: "negative" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["top_k_frequent_tokens"],
  fallback_problem_ids: ["top_k_frequent_tokens"],
};

export default problem;
