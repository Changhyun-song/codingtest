import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "edit_distance",
  title: "Edit Distance (Levenshtein)",
  category: "algorithm",
  difficulty: "medium",
  tags: ["dynamic_programming", "string"],
  statement_en: `Compute the **edit distance** (Levenshtein distance) between two strings.

The edit distance is the minimum number of operations to transform string \`a\` into string \`b\`, where each operation is:
- **Insert** a character
- **Delete** a character
- **Replace** a character

This is fundamental in NLP (spell checking, sequence alignment) and bioinformatics (DNA sequence comparison).

**Function signature:**
\`\`\`python
def solution(a: str, b: str) -> int:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(a: str, b: str) -> int:",
  constraints: ["0 <= len(a), len(b) <= 1000"],
  examples: [
    { input: { a: "kitten", b: "sitting" }, output: 3, explanation: "kitten -> sitten (replace k->s) -> sittin (replace e->i) -> sitting (insert g)" },
    { input: { a: "abc", b: "abc" }, output: 0, explanation: "Same string, no edits needed" },
  ],
  starter_code: `def solution(a: str, b: str) -> int:
    # DP 테이블 사용
    # dp[i][j] = a[:i]를 b[:j]로 변환하는 최소 연산 수
    # 기저: dp[0][j] = j, dp[i][0] = i
    pass`,
  hints: [
    "dp[i][j]는 a의 처음 i글자를 b의 처음 j글자로 바꾸는 최소 연산 수입니다.",
    "a[i-1] == b[j-1]이면 dp[i][j] = dp[i-1][j-1]. 아니면 min(삽입, 삭제, 교체) + 1.",
    "삽입: dp[i][j-1]+1, 삭제: dp[i-1][j]+1, 교체: dp[i-1][j-1]+1. 세 값의 최솟값을 선택.",
  ],
  solution_code: `def solution(a: str, b: str) -> int:
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
  solution_explanation: "2D DP 테이블을 사용한 Levenshtein distance. NLP(맞춤법 검사), 바이오(DNA 시퀀스 비교)에서 핵심 알고리즘. O(m*n) 시간/공간.",
  sample_tests: [
    { input: { a: "kitten", b: "sitting" }, expected: 3 },
    { input: { a: "abc", b: "abc" }, expected: 0 },
    { input: { a: "", b: "hello" }, expected: 5 },
  ],
  hidden_tests: [
    { input: { a: "a", b: "b" }, expected: 1, failure_category: "single_replace" },
    { input: { a: "", b: "" }, expected: 0, failure_category: "both_empty" },
    { input: { a: "abcdef", b: "azced" }, expected: 3, failure_category: "mixed_ops" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dp_coin_change", "string_palindrome"],
  fallback_problem_ids: ["dp_climbing_stairs"],
};

export default problem;
