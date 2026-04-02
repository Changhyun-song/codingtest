import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "label_smoothing_loss",
  title: "Label Smoothing Cross-Entropy",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss_function"],
  statement_en: `Implement **cross-entropy loss with label smoothing**.\n\nGiven logits [batch, C], integer targets, and smoothing factor ε:\n1. Compute softmax → log probabilities\n2. Smooth targets: target_prob = (1-ε) × one_hot + ε/C\n3. Loss = -sum(target_prob × log_prob) per sample\n4. Return mean loss, rounded to 6 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(logits: List[List[float]], targets: List[int], smoothing: float) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(logits: List[List[float]], targets: List[int], smoothing: float) -> float:",
  constraints: ["0 <= smoothing < 1", "0 <= targets[i] < C"],
  examples: [{ input: { logits: [[2.0,1.0,0.1]], targets: [0], smoothing: 0.0 }, output: 0.417,  explanation: "Standard CE without smoothing" }],
  starter_code: "def solution(logits: List[List[float]], targets: List[int], smoothing: float) -> float:\n    import math\n    pass",
  hints: ["먼저 softmax로 확률을 구하고 log를 취합니다 (수치 안정성: max 빼기).", "label smoothing은 one-hot 타겟을 (1-ε)*one_hot + ε/C로 부드럽게 만듭니다."],
  solution_code: `def solution(logits: List[List[float]], targets: List[int], smoothing: float) -> float:
    import math
    batch = len(logits)
    C = len(logits[0])
    total = 0.0
    for i in range(batch):
        m = max(logits[i])
        exps = [math.exp(x - m) for x in logits[i]]
        s = sum(exps)
        log_probs = [math.log(e / s) for e in exps]
        loss = 0.0
        for c in range(C):
            tp = (1.0 - smoothing) * (1.0 if c == targets[i] else 0.0) + smoothing / C
            loss -= tp * log_probs[c]
        total += loss
    return round(total / batch, 6)`,
  solution_explanation: "Label smoothing은 모델의 과신(overconfidence)을 방지하여 일반화 성능을 높입니다.",
  sample_tests: [
    { input: { logits: [[2.0,1.0,0.1]], targets: [0], smoothing: 0.0 }, expected: 0.417 },
    { input: { logits: [[1.0,1.0]], targets: [0], smoothing: 0.0 }, expected: 0.693147 },
  ],
  hidden_tests: [
    { input: { logits: [[2.0,1.0,0.1]], targets: [0], smoothing: 0.1 }, expected: 0.513567, failure_category: "standard" },
    { input: { logits: [[0.0,0.0,0.0]], targets: [1], smoothing: 0.0 }, expected: 1.098612, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["batch_cross_entropy", "focal_loss_compute"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
