import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "lru_cache_simulator",
  title: "LRU Cache Simulator",
  category: "algorithm",
  difficulty: "medium",
  tags: ["hash", "design"],
  statement_en: `Design a **Least Recently Used (LRU) cache** simulator. You are given a positive integer \`capacity\` (maximum number of key-value pairs) and a list of \`operations\`. Each operation is one of:

- \`["put", key, value]\` — insert or update \`key\` with \`value\`. If the cache exceeds \`capacity\`, evict the **least recently used** key.
- \`["get", key]\` — return the value for \`key\` if present, and mark \`key\` as most recently used; otherwise return \`-1\`.

Return a list containing the result of **every \`get\` operation** in order (puts do not append to the output).

**Function signature:**
\`\`\`python
def solution(capacity: int, operations: List[List]) -> List[int]:
\`\`\``,
  function_name: "solution",
  signature: "def solution(capacity: int, operations: List[List]) -> List[int]:",
  constraints: [
    "1 <= capacity <= 10^4",
    "1 <= len(operations) <= 10^5",
    "Keys and values are integers in a reasonable range for testing",
  ],
  examples: [
    {
      input: {
        capacity: 2,
        operations: [
          ["put", 1, 1],
          ["put", 2, 2],
          ["get", 1],
          ["put", 3, 3],
          ["get", 2],
          ["get", 3],
        ],
      },
      output: [1, -1, 3],
      explanation:
        "After get(1), key 1 is MRU. put(3) evicts key 2; get(2) returns -1; get(3) returns 3.",
    },
  ],
  starter_code: `def solution(capacity: int, operations: List[List]) -> List[int]:
    pass`,
  hints: [
    "collections.OrderedDict의 move_to_end로 최근 사용 순서를 표현할 수 있습니다.",
    "get이 성공하면 해당 키를 맨 뒤(가장 최근)로 옮기세요.",
    "put 후 len(cache) > capacity이면 popitem(last=False)로 가장 오래된 항목을 제거하세요.",
  ],
  solution_code: `from typing import List

def solution(capacity: int, operations: List[List]) -> List[int]:
    from collections import OrderedDict
    cache = OrderedDict()
    results = []
    for op in operations:
        if op[0] == "get":
            key = op[1]
            if key in cache:
                cache.move_to_end(key)
                results.append(cache[key])
            else:
                results.append(-1)
        elif op[0] == "put":
            key, value = op[1], op[2]
            if key in cache:
                cache.move_to_end(key)
            cache[key] = value
            if len(cache) > capacity:
                cache.popitem(last=False)
    return results`,
  solution_explanation:
    "OrderedDict로 삽입 순서를 유지하고, get·put 시 move_to_end로 해당 키를 최근 사용으로 표시합니다. 용량 초과 시 popitem(last=False)로 LRU를 제거합니다. get 결과만 리스트에 모아 반환합니다.",
  sample_tests: [
    {
      input: {
        capacity: 2,
        operations: [
          ["put", 1, 1],
          ["put", 2, 2],
          ["get", 1],
          ["put", 3, 3],
          ["get", 2],
          ["get", 3],
        ],
      },
      expected: [1, -1, 3],
    },
  ],
  hidden_tests: [
    {
      input: {
        capacity: 1,
        operations: [
          ["put", 1, 1],
          ["put", 2, 2],
          ["get", 1],
          ["get", 2],
        ],
      },
      expected: [-1, 2],
      failure_category: "small_capacity",
    },
    {
      input: {
        capacity: 3,
        operations: [
          ["put", 1, 10],
          ["put", 2, 20],
          ["put", 3, 30],
          ["put", 1, 100],
          ["get", 1],
          ["get", 2],
          ["get", 3],
        ],
      },
      expected: [100, 20, 30],
      failure_category: "update_existing",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["duplicate_detector", "frequency_counter"],
  fallback_problem_ids: ["frequency_counter"],
};

export default problem;
