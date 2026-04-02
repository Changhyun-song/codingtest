import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "top_k_frequent_tokens",
  title: "Top K Frequent Tokens",
  category: "algorithm",
  difficulty: "medium",
  tags: ["hash", "frequency", "sorting"],
  statement_en: `Given a list of tokens (strings) and an integer k, return the k most frequent tokens sorted by frequency in descending order. If two tokens have the same frequency, sort them lexicographically (alphabetically).

**Function signature:**
\`\`\`python
def solution(tokens: List[str], k: int) -> List[str]:
\`\`\`

**Example:**
- Input: tokens = ["the", "day", "is", "the", "the", "is"], k = 2
- Output: ["the", "is"]
`,
  function_name: "solution",
  signature: "def solution(tokens: List[str], k: int) -> List[str]:",
  constraints: [
    "1 <= len(tokens) <= 10^5",
    "1 <= k <= number of unique tokens",
  ],
  examples: [
    {
      input: { tokens: ["the", "day", "is", "the", "the", "is"], k: 2 },
      output: ["the", "is"],
      explanation: "'the' appears 3 times, 'is' appears 2 times",
    },
  ],
  starter_code: `def solution(tokens: List[str], k: int) -> List[str]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "먼저 빈도를 세고, (-count, word) 순으로 정렬하세요.",
    "collections.Counter에는 most_common() 메서드가 있습니다.",
  ],
  solution_code: `def solution(tokens: List[str], k: int) -> List[str]:
    from collections import Counter
    counts = Counter(tokens)
    return [w for w, c in sorted(counts.items(), key=lambda x: (-x[1], x[0]))][:k]`,
  solution_explanation: "Counter로 빈도를 세고, 동률일 때는 단어 lexicographic 순으로 정렬한 뒤 k개를 취함.",
  sample_tests: [
    {
      input: { tokens: ["the", "day", "is", "the", "the", "is"], k: 2 },
      expected: ["the", "is"],
    },
    {
      input: { tokens: ["a", "b", "c", "a", "b", "a"], k: 3 },
      expected: ["a", "b", "c"],
    },
  ],
  hidden_tests: [
    {
      input: { tokens: ["x", "y", "z"], k: 3 },
      expected: ["x", "y", "z"],
      failure_category: "tie_breaking",
    },
    {
      input: { tokens: ["b", "a", "b", "a"], k: 2 },
      expected: ["a", "b"],
      failure_category: "tie_breaking",
    },
    {
      input: { tokens: ["only"], k: 1 },
      expected: ["only"],
      failure_category: "single_element",
    },
  ],
  checker_type: "ordered_list",
  similar_problem_ids: ["frequency_counter", "duplicate_detector"],
  fallback_problem_ids: ["frequency_counter"],
};

export default problem;
