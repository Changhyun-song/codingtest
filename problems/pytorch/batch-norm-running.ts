import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "batch_norm_running",
  title: "BatchNorm Running Statistics",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement **BatchNorm running statistics** tracking.\n\nGiven multiple batches [batch_size, features] and a momentum value, compute the running_mean and running_var after processing all batches.\n\nUpdate rule:\n- running_mean = (1 - momentum) × running_mean + momentum × batch_mean\n- running_var = (1 - momentum) × running_var + momentum × batch_var\n\nInitial: running_mean = zeros, running_var = ones.\n\nReturn [running_mean, running_var], each value rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(batches: List[List[List[float]]], momentum: float) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(batches: List[List[List[float]]], momentum: float) -> List:",
  constraints: ["0 < momentum < 1"],
  examples: [{ input: { batches: [[[1.0,2.0],[3.0,4.0]]], momentum: 0.1 }, output: [[0.2,0.3],[1.0,1.0]], explanation: "batch_mean=[2,3], batch_var=[1,1]. running_mean=0.9*0+0.1*2=0.2" }],
  starter_code: "def solution(batches: List[List[List[float]]], momentum: float) -> List:\n    pass",
  hints: ["각 배치에서 feature별 평균과 분산을 계산합니다.", "running stats를 EMA(지수이동평균)으로 업데이트합니다."],
  solution_code: `def solution(batches: List[List[List[float]]], momentum: float) -> List:
    features = len(batches[0][0])
    rm = [0.0] * features
    rv = [1.0] * features
    for batch in batches:
        n = len(batch)
        bm = [sum(batch[b][f] for b in range(n)) / n for f in range(features)]
        bv = [sum((batch[b][f] - bm[f]) ** 2 for b in range(n)) / n for f in range(features)]
        rm = [round((1 - momentum) * rm[f] + momentum * bm[f], 4) for f in range(features)]
        rv = [round((1 - momentum) * rv[f] + momentum * bv[f], 4) for f in range(features)]
    return [rm, rv]`,
  solution_explanation: "BatchNorm의 running statistics는 추론 시 사용됩니다. momentum으로 지수이동평균을 유지합니다.",
  sample_tests: [
    { input: { batches: [[[1.0,2.0],[3.0,4.0]]], momentum: 0.1 }, expected: [[0.2,0.3],[1.0,1.0]] },
    { input: { batches: [[[0.0,10.0],[4.0,10.0]],[[10.0,0.0],[10.0,4.0]]], momentum: 0.1 }, expected: [[1.18,1.1],[1.17,1.21]] },
  ],
  hidden_tests: [
    { input: { batches: [[[5.0],[5.0]]], momentum: 0.5 }, expected: [[2.5],[0.5]], failure_category: "edge_case" },
    { input: { batches: [[[1.0,0.0],[0.0,1.0]],[[2.0,0.0],[0.0,2.0]]], momentum: 0.2 }, expected: [[0.2,0.2],[1.0,1.0]], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["layer_norm_manual", "pytorch_training_loop"],
  fallback_problem_ids: ["pytorch_training_loop"],
};
export default problem;
