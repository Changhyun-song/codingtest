import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "contrastive_loss",
  title: "Contrastive Loss (SimCLR-style)",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "self_supervised"],
  statement_en: `Implement a simplified **contrastive loss** used in self-supervised learning (SimCLR-style).

Given:
- \`anchor\`: a feature vector (list of floats)
- \`positive\`: a feature vector from the same class/augmentation
- \`negatives\`: a list of feature vectors from different classes
- \`temperature\`: a float (typically 0.5 or 0.07)

Compute the NT-Xent (Normalized Temperature-scaled Cross Entropy) loss:

1. Compute cosine similarity between anchor and positive: sim_pos
2. Compute cosine similarity between anchor and each negative: sim_neg_i
3. Loss = -log(exp(sim_pos/temp) / (exp(sim_pos/temp) + sum(exp(sim_neg_i/temp))))

**Function signature:**
\`\`\`python
def solution(anchor: List[float], positive: List[float], negatives: List[List[float]], temperature: float) -> float:
\`\`\`

Return rounded to 6 decimal places.
`,
  function_name: "solution",
  signature: "def solution(anchor: List[float], positive: List[float], negatives: List[List[float]], temperature: float) -> float:",
  constraints: ["len(anchor) == len(positive) == len(negatives[i])", "temperature > 0", "1 <= len(negatives) <= 100"],
  examples: [
    { input: { anchor: [1.0, 0.0], positive: [1.0, 0.0], negatives: [[0.0, 1.0]], temperature: 1.0 }, output: 0.313262, explanation: "sim_pos=1.0, sim_neg=0.0, loss = -log(e^1 / (e^1 + e^0))" },
  ],
  starter_code: `def solution(anchor: List[float], positive: List[float], negatives: List[List[float]], temperature: float) -> float:
    import math
    # 1. cosine similarity 계산 (내적 / (norm_a * norm_b))
    # 2. temperature로 나누기
    # 3. NT-Xent loss 계산: -log(exp(sim_pos/t) / (exp(sim_pos/t) + sum(exp(sim_neg/t))))
    pass`,
  hints: [
    "cosine similarity = dot(a,b) / (norm(a) * norm(b)). norm = sqrt(sum(x^2)).",
    "수치 안정성을 위해 모든 similarity/temperature 값에서 최대값을 빼고 exp를 계산하세요.",
    "loss = -log(exp(sim_pos/t) / (exp(sim_pos/t) + sum(exp(sim_neg_i/t))))",
  ],
  solution_code: `def solution(anchor: List[float], positive: List[float], negatives: List[List[float]], temperature: float) -> float:
    import math
    def dot(a, b):
        return sum(x * y for x, y in zip(a, b))
    def norm(a):
        return math.sqrt(sum(x * x for x in a))
    def cosine_sim(a, b):
        na, nb = norm(a), norm(b)
        if na == 0 or nb == 0:
            return 0.0
        return dot(a, b) / (na * nb)
    
    sim_pos = cosine_sim(anchor, positive) / temperature
    sim_negs = [cosine_sim(anchor, neg) / temperature for neg in negatives]
    
    max_val = max(sim_pos, max(sim_negs) if sim_negs else sim_pos)
    exp_pos = math.exp(sim_pos - max_val)
    exp_negs = sum(math.exp(s - max_val) for s in sim_negs)
    
    loss = -math.log(exp_pos / (exp_pos + exp_negs))
    return round(loss, 6)`,
  solution_explanation: "SimCLR의 NT-Xent loss를 구현합니다. Self-supervised learning의 핵심 손실 함수입니다. Cosine similarity + temperature scaling + cross-entropy.",
  sample_tests: [
    { input: { anchor: [1.0, 0.0], positive: [1.0, 0.0], negatives: [[0.0, 1.0]], temperature: 1.0 }, expected: 0.313262 },
    { input: { anchor: [1.0, 0.0], positive: [0.0, 1.0], negatives: [[1.0, 0.0]], temperature: 1.0 }, expected: 1.313262 },
  ],
  hidden_tests: [
    { input: { anchor: [1.0, 1.0], positive: [1.0, 1.0], negatives: [[-1.0, -1.0]], temperature: 0.5 }, expected: 0.018150, failure_category: "low_temperature" },
    { input: { anchor: [3.0, 4.0], positive: [6.0, 8.0], negatives: [[-3.0, -4.0], [0.0, 5.0]], temperature: 1.0 }, expected: 0.353689, failure_category: "multiple_negatives" },
  ],
  checker_type: "float_tolerance",
  similar_problem_ids: ["cosine_similarity", "softmax_from_scratch"],
  fallback_problem_ids: ["cosine_similarity"],
};

export default problem;
