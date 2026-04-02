import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "merge_intervals",
  title: "Merge Intervals",
  category: "algorithm",
  difficulty: "medium",
  tags: ["sorting", "greedy"],
  statement_en: `A scheduling system receives a list of time **intervals**. Some intervals overlap and should be merged into non-overlapping intervals. Given an array \`intervals\` where \`intervals[i] = [start_i, end_i]\`, **merge all overlapping intervals** and return the merged list **sorted by start time**.

**Function signature:**
\`\`\`python
def solution(intervals: List[List[int]]) -> List[List[int]]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(intervals: List[List[int]]) -> List[List[int]]:",
  constraints: [
    "1 <= len(intervals) <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^4",
  ],
  examples: [
    {
      input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
      output: [[1, 6], [8, 10], [15, 18]],
      explanation: "[1,3] and [2,6] overlap into [1,6].",
    },
    {
      input: { intervals: [[1, 4], [4, 5]] },
      output: [[1, 5]],
      explanation: "Touching endpoints are merged.",
    },
  ],
  starter_code: `def solution(intervals: List[List[int]]) -> List[List[int]]:
    pass`,
  hints: [
    "먼저 각 구간의 시작 시각으로 정렬하세요.",
    "현재 구간의 시작이 이전 병합 구간의 끝 이하이면 겹칩니다 — 끝 시각만 갱신하면 됩니다.",
    "그렇지 않으면 새 구간을 결과에 추가합니다.",
  ],
  solution_code: `def solution(intervals: List[List[int]]) -> List[List[int]]:
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
  solution_explanation:
    "시작 시각 기준으로 정렬한 뒤, 순서대로 스캔하며 현재 구간이 마지막 병합 구간과 겹치면 끝만 확장하고, 아니면 새 구간을 추가합니다.",
  sample_tests: [
    {
      input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
      expected: [[1, 6], [8, 10], [15, 18]],
    },
    { input: { intervals: [[1, 4], [4, 5]] }, expected: [[1, 5]] },
  ],
  hidden_tests: [
    { input: { intervals: [[1, 10]] }, expected: [[1, 10]], failure_category: "single_interval" },
    {
      input: { intervals: [[3, 4], [1, 2], [5, 6]] },
      expected: [[1, 2], [3, 4], [5, 6]],
      failure_category: "no_overlap",
    },
    { input: { intervals: [[1, 4], [0, 4]] }, expected: [[0, 4]], failure_category: "contained" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["two_pointer_pair_sum"],
  fallback_problem_ids: ["two_pointer_pair_sum"],
};

export default problem;
