import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "knowledge_distill_loss",
  title: "Knowledge Distillation Loss",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss_function"],
  statement_en: `Implement **knowledge distillation (KD) loss**.\n\nGiven student logits, teacher logits, and temperature T:\n1. Compute soft probabilities: softmax(logits / T) for both\n2. KL divergence: sum(teacher × log(teacher / student))\n3. Multiply by T² and average over batch\n\n**Function signature:**\n\`\`\`python\ndef solution(student: List[List[float]], teacher: List[List[float]], temperature: float) -> float:\n\`\`\`\n\nReturn rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(student: List[List[float]], teacher: List[List[float]], temperature: float) -> float:",
  constraints: ["temperature > 0"],
  examples: [{ input: { student: [[2.0,1.0]], teacher: [[2.0,1.0]], temperature: 1.0 }, output: 0.0, explanation: "Same logits → same soft probs → KL=0" }],
  starter_code: "def solution(student: List[List[float]], teacher: List[List[float]], temperature: float) -> float:\n    import math\n    pass",
  hints: ["logits를 temperature로 나눈 후 softmax를 적용합니다.", "KL(P||Q) = sum(P * log(P/Q)). P=teacher, Q=student입니다."],
  solution_code: `def solution(student: List[List[float]], teacher: List[List[float]], temperature: float) -> float:
    import math
    batch = len(student)
    total = 0.0
    for b in range(batch):
        C = len(student[b])
        ss = [x / temperature for x in student[b]]
        ts = [x / temperature for x in teacher[b]]
        sm = max(ss)
        se = [math.exp(x - sm) for x in ss]
        ssum = sum(se)
        sp = [e / ssum for e in se]
        tm = max(ts)
        te = [math.exp(x - tm) for x in ts]
        tsum = sum(te)
        tp = [e / tsum for e in te]
        kl = sum(t * (math.log(max(t, 1e-10)) - math.log(max(s, 1e-10))) for t, s in zip(tp, sp))
        total += kl
    return round(total * temperature ** 2 / batch, 6)`,
  solution_explanation: "Knowledge distillation은 큰 교사 모델의 지식을 작은 학생 모델로 전달합니다. 높은 T는 soft labels을 더 부드럽게 만듭니다.",
  sample_tests: [
    { input: { student: [[2.0,1.0]], teacher: [[2.0,1.0]], temperature: 1.0 }, expected: 0.0 },
    { input: { student: [[0.0,0.0]], teacher: [[10.0,0.0]], temperature: 1.0 }, expected: 0.328461 },
  ],
  hidden_tests: [
    { input: { student: [[1.0,1.0,1.0]], teacher: [[1.0,1.0,1.0]], temperature: 5.0 }, expected: 0.0, failure_category: "edge_case" },
    { input: { student: [[1.0,0.0],[0.0,1.0]], teacher: [[5.0,0.0],[0.0,5.0]], temperature: 2.0 }, expected: 0.369615, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["label_smoothing_loss", "batch_cross_entropy"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
