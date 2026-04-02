import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "string_palindrome",
  title: "Palindrome Check",
  category: "algorithm",
  difficulty: "easy",
  tags: ["string", "two_pointers"],
  statement_en: `Given a string, determine if it is a palindrome. A palindrome reads the same forwards and backwards.

Consider only alphanumeric characters and ignore case.

**Function signature:**
\`\`\`python
def solution(s: str) -> bool:
\`\`\`

**Examples:**
- "racecar" → true
- "hello" → false
- "A man a plan a canal Panama" → true (ignore spaces and case)
`,
  function_name: "solution",
  signature: "def solution(s: str) -> bool:",
  constraints: ["0 <= len(s) <= 100,000", "s contains printable ASCII characters"],
  examples: [
    { input: { s: "racecar" }, output: true, explanation: "racecar reversed is racecar" },
    { input: { s: "A man a plan a canal Panama" }, output: true, explanation: "Ignoring spaces and case: amanaplanacanalpanama is a palindrome" },
  ],
  starter_code: `def solution(s: str) -> bool:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "먼저 영숫자가 아닌 문자를 제거하고 소문자로 변환하세요.",
    "그 다음 문자열을 뒤집어서 비교하거나, 양 끝에서 투 포인터를 사용하세요.",
    "투 포인터: 인덱스 0과 끝에서 시작하여 안쪽으로 이동하며 문자를 비교합니다.",
  ],
  solution_code: `def solution(s: str) -> bool:
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]`,
  solution_explanation: "영숫자만 필터링하고 소문자로 변환 후 뒤집은 문자열과 비교합니다. O(n) 시간, O(n) 공간. 투 포인터 방식은 O(1) 공간.",
  sample_tests: [
    { input: { s: "racecar" }, expected: true },
    { input: { s: "hello" }, expected: false },
    { input: { s: "A man a plan a canal Panama" }, expected: true },
  ],
  hidden_tests: [
    { input: { s: "" }, expected: true, failure_category: "empty_input" },
    { input: { s: "a" }, expected: true, failure_category: "single_char" },
    { input: { s: "ab" }, expected: false, failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["valid_parentheses"],
  fallback_problem_ids: ["duplicate_detector"],
};

export default problem;
