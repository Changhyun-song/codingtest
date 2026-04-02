import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "beam_search_step",
  title: "Beam Search Decoding Step",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention", "softmax"],
  statement_en: `Implement one step of **beam search decoding**, used in seq2seq models and LLMs.

Given:
- \`scores\`: current cumulative log-probabilities for each beam [beam_size]
- \`log_probs\`: next-token log-probabilities for each beam [beam_size][vocab_size]
- \`beam_width\`: number of beams to keep

For each beam, extend with every possible next token. Compute new cumulative scores. Keep the top \`beam_width\` candidates.

**Function signature:**
\`\`\`python
def solution(scores: List[float], log_probs: List[List[float]], beam_width: int) -> List:
\`\`\`

**Returns:** \`[beam_indices, token_indices, new_scores]\`
- beam_indices: which original beam each selected candidate came from
- token_indices: which token was selected for each candidate
- new_scores: new cumulative log-probabilities (rounded to 6 decimals), sorted descending
`,
  function_name: "solution",
  signature: "def solution(scores: List[float], log_probs: List[List[float]], beam_width: int) -> List:",
  constraints: [
    "1 <= beam_size <= 10",
    "1 <= vocab_size <= 1000",
    "1 <= beam_width <= beam_size * vocab_size",
    "All log_probs are <= 0",
  ],
  examples: [
    {
      input: {
        scores: [-0.5, -1.0],
        log_probs: [[-0.1, -2.0, -0.3], [-0.2, -0.1, -1.5]],
        beam_width: 2,
      },
      output: [[0, 0], [0, 2], [-0.6, -0.8]],
      explanation: "Best: beam0+tok0=-0.6, beam0+tok2=-0.8",
    },
  ],
  starter_code: `def solution(scores: List[float], log_probs: List[List[float]], beam_width: int) -> List:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "모든 (beam, token) 조합의 누적 점수를 계산하세요: scores[b] + log_probs[b][v].",
    "모든 후보를 점수 내림차순으로 정렬하고 상위 beam_width개를 선택합니다.",
  ],
  solution_code: `def solution(scores: List[float], log_probs: List[List[float]], beam_width: int) -> List:
    candidates = []
    for b in range(len(scores)):
        for v in range(len(log_probs[b])):
            candidates.append((scores[b] + log_probs[b][v], b, v))
    candidates.sort(key=lambda x: -x[0])
    top = candidates[:beam_width]
    beam_indices = [t[1] for t in top]
    token_indices = [t[2] for t in top]
    new_scores = [round(t[0], 6) for t in top]
    return [beam_indices, token_indices, new_scores]`,
  solution_explanation: "모든 beam×vocab 후보의 점수를 계산하고 상위 beam_width개를 유지합니다. 텍스트 생성에서 greedy보다 나은 결과를 줍니다.",
  sample_tests: [
    {
      input: {
        scores: [-0.5, -1.0],
        log_probs: [[-0.1, -2.0, -0.3], [-0.2, -0.1, -1.5]],
        beam_width: 2,
      },
      expected: [[0, 0], [0, 2], [-0.6, -0.8]],
    },
    {
      input: {
        scores: [0.0],
        log_probs: [[-1.0, -0.5, -2.0]],
        beam_width: 2,
      },
      expected: [[0, 0], [1, 0], [-0.5, -1.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        scores: [-1.0, -1.0],
        log_probs: [[-0.5, -0.5], [-0.5, -0.5]],
        beam_width: 1,
      },
      expected: [[0], [0], [-1.5]],
      failure_category: "edge_case",
    },
    {
      input: {
        scores: [0.0, -0.1, -0.2],
        log_probs: [[-0.3], [-0.2], [-0.1]],
        beam_width: 2,
      },
      expected: [[0, 2], [0, 0], [-0.3, -0.3]],
      failure_category: "standard",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["top_p_filtering", "softmax_from_scratch"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
