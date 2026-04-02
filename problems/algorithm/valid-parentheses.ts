import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "valid_parentheses",
  title: "Valid Parentheses",
  category: "algorithm",
  difficulty: "easy",
  tags: ["stack", "string"],
  statement_en: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string has valid (properly nested and matched) parentheses.

**Function signature:**
\`\`\`python
def solution(s: str) -> bool:
\`\`\`

**Rules:**
- Open brackets must be closed by the same type of brackets
- Open brackets must be closed in the correct order
- Every close bracket has a corresponding open bracket of the same type
`,
  function_name: "solution",
  signature: "def solution(s: str) -> bool:",
  constraints: [
    "0 <= len(s) <= 100,000",
    "s consists of parentheses only: ()[]{}",
  ],
  examples: [
    { input: { s: "()[]{}" }, output: true, explanation: "All brackets properly matched" },
    { input: { s: "(]" }, output: false, explanation: "Mismatched bracket types" },
  ],
  starter_code: `def solution(s: str) -> bool:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "stack 사용: 여는 괄호는 push, 닫는 괄호는 pop하고 비교.",
    "닫는 괄호를 만났는데 stack이 비어 있으면 invalid입니다.",
  ],
  solution_code: `def solution(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in '({[':
            stack.append(c)
        elif c in pairs:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0`,
  solution_explanation: "Stack-based: 여는 괄호는 push, 닫는 괄호는 pop하고 매칭. O(n) 시간, O(n) 공간.",
  sample_tests: [
    { input: { s: "()[]{}" }, expected: true },
    { input: { s: "(]" }, expected: false },
    { input: { s: "{[]}" }, expected: true },
  ],
  hidden_tests: [
    { input: { s: "" }, expected: true, failure_category: "empty_input" },
    { input: { s: "(((" }, expected: false, failure_category: "edge_case" },
    { input: { s: ")()" }, expected: false, failure_category: "boundary" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["two_sum_pairs"],
  fallback_problem_ids: [],
};

export default problem;
