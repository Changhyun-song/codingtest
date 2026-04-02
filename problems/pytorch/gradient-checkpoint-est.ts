import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "gradient_checkpoint_est",
  title: "Gradient Checkpointing Memory Estimator",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Estimate activation memory savings from **gradient checkpointing**.\n\nGiven:\n- num_layers: total transformer layers\n- act_per_layer_mb: activation memory per layer in MB\n- checkpoint_every: checkpoint interval\n\nWithout checkpointing: all layers stored → num_layers × act_per_layer\nWith checkpointing:\n- Stored checkpoints: ceil(num_layers / checkpoint_every)\n- Peak recompute segment: checkpoint_every layers\n- Peak memory = (num_checkpoints + checkpoint_every) × act_per_layer\n\nReturn [without_mb, with_mb, savings_percent], all rounded to 2 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(num_layers: int, act_per_layer_mb: float, checkpoint_every: int) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(num_layers: int, act_per_layer_mb: float, checkpoint_every: int) -> List[float]:",
  constraints: ["1 <= checkpoint_every <= num_layers"],
  examples: [{ input: { num_layers: 24, act_per_layer_mb: 100, checkpoint_every: 6 }, output: [2400.0, 1000.0, 58.33], explanation: "Without: 2400MB. With: (4+6)×100=1000MB. Savings: 58.33%" }],
  starter_code: "def solution(num_layers: int, act_per_layer_mb: float, checkpoint_every: int) -> List[float]:\n    pass",
  hints: ["체크포인트 수 = ceil(layers/interval). 피크 메모리 = 체크포인트 + 현재 세그먼트.", "최적 interval = sqrt(num_layers)로 메모리를 O(sqrt(N))으로 줄일 수 있습니다."],
  solution_code: `def solution(num_layers: int, act_per_layer_mb: float, checkpoint_every: int) -> List[float]:
    without = num_layers * act_per_layer_mb
    n_ckpt = -(-num_layers // checkpoint_every)
    with_cp = (n_ckpt + checkpoint_every) * act_per_layer_mb
    savings = round((1 - with_cp / without) * 100, 2) if without > 0 else 0.0
    return [round(without, 2), round(with_cp, 2), savings]`,
  solution_explanation: "Gradient checkpointing은 메모리-연산 트레이드오프의 대표 기법입니다. 활성화를 저장하지 않고 backprop 시 재계산하여 메모리를 절약합니다.",
  sample_tests: [
    { input: { num_layers: 24, act_per_layer_mb: 100, checkpoint_every: 6 }, expected: [2400.0, 1000.0, 58.33] },
    { input: { num_layers: 12, act_per_layer_mb: 50, checkpoint_every: 4 }, expected: [600.0, 350.0, 41.67] },
  ],
  hidden_tests: [
    { input: { num_layers: 32, act_per_layer_mb: 200, checkpoint_every: 8 }, expected: [6400.0, 2400.0, 62.5], failure_category: "standard" },
    { input: { num_layers: 1, act_per_layer_mb: 100, checkpoint_every: 1 }, expected: [100.0, 200.0, -100.0], failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.1,
  similar_problem_ids: ["model_memory_calc", "model_precision_memory"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
