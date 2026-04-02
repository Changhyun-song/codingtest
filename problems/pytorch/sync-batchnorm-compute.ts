import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "sync_batchnorm_compute",
  title: "Synchronized BatchNorm Statistics",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "distributed"],
  statement_en: `Compute **synchronized batch normalization** statistics across multiple GPUs.\n\nGiven local means, local variances, and local sample counts from each GPU, compute the global mean and variance.\n\nGlobal mean = weighted average of local means.\nGlobal variance = weighted_avg(local_var) + weighted_avg(local_mean²) - global_mean²\n(This is the parallel variance formula.)\n\nReturn [global_mean, global_var], each element rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(local_means: List[List[float]], local_vars: List[List[float]], local_counts: List[int]) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(local_means: List[List[float]], local_vars: List[List[float]], local_counts: List[int]) -> List:",
  constraints: ["all counts > 0", "all lists same dimension"],
  examples: [{ input: { local_means: [[1.0, 2.0], [3.0, 4.0]], local_vars: [[0.5, 0.5], [0.5, 0.5]], local_counts: [4, 4] }, output: [[2.0, 3.0], [1.5, 1.5]], explanation: "Global mean=[2,3]. Global var uses parallel variance formula." }],
  starter_code: "def solution(local_means: List[List[float]], local_vars: List[List[float]], local_counts: List[int]) -> List:\n    pass",
  hints: ["Global mean = Σ(local_mean × count) / Σcount", "분산의 병렬 결합: Var = E[V_local] + E[M_local²] - M_global²"],
  solution_code: `def solution(local_means: List[List[float]], local_vars: List[List[float]], local_counts: List[int]) -> List:
    n = len(local_means)
    d = len(local_means[0])
    total = sum(local_counts)
    g_mean = [round(sum(local_means[i][j] * local_counts[i] for i in range(n)) / total, 4) for j in range(d)]
    g_var = []
    for j in range(d):
        wv = sum(local_vars[i][j] * local_counts[i] for i in range(n)) / total
        wm2 = sum(local_means[i][j]**2 * local_counts[i] for i in range(n)) / total
        g_var.append(round(wv + wm2 - g_mean[j]**2, 4))
    return [g_mean, g_var]`,
  solution_explanation: "SyncBatchNorm은 분산 학습에서 정확한 BN 통계를 위해 필수입니다. 로컬 통계를 병렬 분산 공식으로 결합합니다.",
  sample_tests: [
    { input: { local_means: [[1.0, 2.0], [3.0, 4.0]], local_vars: [[0.5, 0.5], [0.5, 0.5]], local_counts: [4, 4] }, expected: [[2.0, 3.0], [1.5, 1.5]] },
    { input: { local_means: [[0.0]], local_vars: [[1.0]], local_counts: [10] }, expected: [[0.0], [1.0]] },
  ],
  hidden_tests: [
    { input: { local_means: [[2.0], [4.0], [6.0]], local_vars: [[1.0], [1.0], [1.0]], local_counts: [2, 2, 2] }, expected: [[4.0], [3.6667]], failure_category: "standard" },
    { input: { local_means: [[10.0, 20.0]], local_vars: [[0.0, 0.0]], local_counts: [1] }, expected: [[10.0, 20.0], [0.0, 0.0]], failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["batch_norm_running", "all_reduce_sim"],
  fallback_problem_ids: ["batch_norm_running"],
};
export default problem;
