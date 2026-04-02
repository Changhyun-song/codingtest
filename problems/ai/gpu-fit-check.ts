import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "gpu_fit_check",
  title: "GPU Memory Fitness Checker",
  category: "ai",
  difficulty: "hard",
  tags: ["nlp"],
  statement_en: `Determine if a training configuration fits in GPU memory.\n\nRules:\n- Training memory ≈ model_params_gb × 4 (params + grads + Adam m + v)\n- Activation memory ≈ model_params_gb × 0.2 × batch_size\n- Total = training + activation\n\nReturn:\n- "fits": total < 80% of GPU memory\n- "tight": 80% <= total <= 100%\n- "oom": total > GPU memory\n\n**Function signature:**\n\`\`\`python\ndef solution(model_params_gb: float, gpu_memory_gb: float, batch_size: int) -> str:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(model_params_gb: float, gpu_memory_gb: float, batch_size: int) -> str:",
  constraints: ["all > 0"],
  examples: [{ input: { model_params_gb: 2.0, gpu_memory_gb: 24.0, batch_size: 8 }, output: "fits", explanation: "Train=8GB, Act=3.2GB, Total=11.2GB < 19.2GB (80%)" }],
  starter_code: "def solution(model_params_gb: float, gpu_memory_gb: float, batch_size: int) -> str:\n    pass",
  hints: ["먼저 총 메모리 사용량을 계산하고 GPU 메모리 대비 비율을 구합니다.", "OOM이면 gradient checkpointing, mixed precision, 또는 model parallelism을 고려합니다."],
  solution_code: `def solution(model_params_gb: float, gpu_memory_gb: float, batch_size: int) -> str:
    train_mem = model_params_gb * 4
    act_mem = model_params_gb * 0.2 * batch_size
    total = train_mem + act_mem
    ratio = total / gpu_memory_gb
    if ratio > 1:
        return "oom"
    elif ratio >= 0.8:
        return "tight"
    else:
        return "fits"`,
  solution_explanation: "GPU 메모리 적합성 판단은 학습 인프라 설계의 기본입니다. OOM 시 batch 축소, gradient checkpointing, 모델 병렬화를 검토합니다.",
  sample_tests: [
    { input: { model_params_gb: 2.0, gpu_memory_gb: 24.0, batch_size: 8 }, expected: "fits" },
    { input: { model_params_gb: 14.0, gpu_memory_gb: 80.0, batch_size: 32 }, expected: "oom" },
  ],
  hidden_tests: [
    { input: { model_params_gb: 0.5, gpu_memory_gb: 4.0, batch_size: 4 }, expected: "tight", failure_category: "standard" },
    { input: { model_params_gb: 0.1, gpu_memory_gb: 100.0, batch_size: 1 }, expected: "fits", failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["model_precision_memory", "activation_memory_est"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
