import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "sequence_align_score",
  title: "Needleman-Wunsch Alignment Score",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Compute the optimal global alignment score using the **Needleman-Wunsch** algorithm.\n\nGiven two sequences and scoring: match_score, mismatch_penalty (negative), gap_penalty (negative):\n- dp[i][j] = max of:\n  - dp[i-1][j-1] + (match if s1[i]==s2[j] else mismatch)\n  - dp[i-1][j] + gap\n  - dp[i][j-1] + gap\n\nReturn the optimal alignment score.\n\n**Function signature:**\n\`\`\`python\ndef solution(seq1: str, seq2: str, match: int, mismatch: int, gap: int) -> int:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(seq1: str, seq2: str, match: int, mismatch: int, gap: int) -> int:",
  constraints: ["1 <= len(seq) <= 500", "mismatch <= 0", "gap <= 0"],
  examples: [{ input: { seq1: "ATGC", seq2: "ATGC", match: 1, mismatch: -1, gap: -2 }, output: 4, explanation: "Perfect match: 4 × 1 = 4" }],
  starter_code: "def solution(seq1: str, seq2: str, match: int, mismatch: int, gap: int) -> int:\n    pass",
  hints: ["2D DP 테이블을 만듭니다. dp[i][j]는 seq1[:i]와 seq2[:j]의 최적 정렬 점수입니다.", "초기화: dp[i][0] = i*gap, dp[0][j] = j*gap. 세 방향(대각, 위, 왼쪽)에서 최대값을 취합니다."],
  solution_code: `def solution(seq1: str, seq2: str, match: int, mismatch: int, gap: int) -> int:
    m, n = len(seq1), len(seq2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i * gap
    for j in range(n + 1):
        dp[0][j] = j * gap
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            sc = match if seq1[i - 1] == seq2[j - 1] else mismatch
            dp[i][j] = max(dp[i - 1][j - 1] + sc, dp[i - 1][j] + gap, dp[i][j - 1] + gap)
    return dp[m][n]`,
  solution_explanation: "Needleman-Wunsch는 바이오인포매틱스의 기본 알고리즘으로, 두 시퀀스의 최적 전역 정렬을 찾습니다.",
  sample_tests: [
    { input: { seq1: "ATGC", seq2: "ATGC", match: 1, mismatch: -1, gap: -2 }, expected: 4 },
    { input: { seq1: "AT", seq2: "AG", match: 2, mismatch: -1, gap: -1 }, expected: 1 },
  ],
  hidden_tests: [
    { input: { seq1: "A", seq2: "T", match: 1, mismatch: -1, gap: -2 }, expected: -1, failure_category: "edge_case" },
    { input: { seq1: "GATTACA", seq2: "GCATGCU", match: 1, mismatch: -1, gap: -1 }, expected: 0, failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["edit_distance", "protein_distance_map"],
  fallback_problem_ids: ["dp_climbing_stairs"],
};
export default problem;
