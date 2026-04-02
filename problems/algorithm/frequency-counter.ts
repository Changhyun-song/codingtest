import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "frequency_counter",
  title: "Frequency Counter",
  category: "algorithm",
  difficulty: "easy",
  tags: ["hash", "frequency"],
  statement_en: `Given an array of strings, return a dictionary mapping each unique string to the number of times it appears.

**Function signature:**
\`\`\`python
def solution(words: List[str]) -> dict:
\`\`\`

**Example:**
- Input: words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
- Output: {"apple": 3, "banana": 2, "cherry": 1}
`,
  function_name: "solution",
  signature: "def solution(words: List[str]) -> dict:",
  constraints: [
    "1 <= len(words) <= 10^5",
    "1 <= len(words[i]) <= 100",
  ],
  examples: [
    {
      input: { words: ["apple", "banana", "apple", "cherry", "banana", "apple"] },
      output: { apple: 3, banana: 2, cherry: 1 },
      explanation: "Count occurrences of each word",
    },
  ],
  starter_code: `def solution(words: List[str]) -> dict:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "Python에는 collections.Counter 클래스가 내장되어 있습니다.",
    "일반 dict와 .get() 메서드로도 구현할 수 있습니다.",
  ],
  solution_code: `def solution(words: List[str]) -> dict:
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    return freq`,
  solution_explanation: "dictionary로 출현 횟수를 세기. O(n) 시간.",
  sample_tests: [
    {
      input: { words: ["apple", "banana", "apple", "cherry", "banana", "apple"] },
      expected: { apple: 3, banana: 2, cherry: 1 },
    },
    {
      input: { words: ["a", "b", "c"] },
      expected: { a: 1, b: 1, c: 1 },
    },
  ],
  hidden_tests: [
    {
      input: { words: ["x"] },
      expected: { x: 1 },
      failure_category: "single_element",
    },
    {
      input: { words: ["z", "z", "z", "z", "z"] },
      expected: { z: 5 },
      failure_category: "all_same",
    },
    {
      input: { words: [] },
      expected: {},
      failure_category: "empty_input",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["duplicate_detector", "top_k_frequent_tokens"],
  fallback_problem_ids: [],
};

export default problem;
