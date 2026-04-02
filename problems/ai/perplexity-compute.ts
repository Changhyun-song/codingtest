import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "perplexity_compute",
  title: "Language Model Perplexity",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp"],
  statement_en: `Compute the **perplexity** of a language model given log probabilities.\n\nPerplexity = exp(-1/N × Σ log_probs)\n\nwhere N is the number of tokens and log_probs[i] is the log probability assigned to the i-th token.\n\n**Function signature:**\n\`\`\`python\ndef solution(log_probs: List[float]) -> float:\n\`\`\`\n\nReturn rounded to 4 decimals.`,
  function_name: "solution",
  signature: "def solution(log_probs: List[float]) -> float:",
  constraints: ["log_probs[i] <= 0", "len(log_probs) >= 1"],
  examples: [{ input: { log_probs: [-1.0, -1.0, -1.0] }, output: 2.7183, explanation: "exp(-(-3)/3) = exp(1) ≈ 2.7183" }],
  starter_code: "def solution(log_probs: List[float]) -> float:\n    import math\n    pass",
  hints: ["평균 log probability를 구하고 부호를 바꿔 exp를 취합니다.", "PPL이 낮을수록 모델의 예측력이 좋습니다."],
  solution_code: `def solution(log_probs: List[float]) -> float:
    import math
    avg = sum(log_probs) / len(log_probs)
    return round(math.exp(-avg), 4)`,
  solution_explanation: "Perplexity는 언어 모델 평가의 표준 지표입니다. 직관적으로 '다음 토큰에 대한 평균 선택지 수'를 의미합니다.",
  sample_tests: [
    { input: { log_probs: [-1.0, -1.0, -1.0] }, expected: 2.7183 },
    { input: { log_probs: [0.0, 0.0] }, expected: 1.0 },
  ],
  hidden_tests: [
    { input: { log_probs: [-2.3026] }, expected: 10.0, failure_category: "standard" },
    { input: { log_probs: [-0.6931, -0.6931, -0.6931, -0.6931] }, expected: 2.0, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["temperature_scale", "beam_search_step"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
