import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "throughput_estimate",
  title: "Training Throughput Estimator",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Estimate training throughput for a distributed setup.\n\nGiven:\n- batch_size: per-GPU micro batch size\n- num_gpus: number of GPUs\n- gradient_accumulation: accumulation steps\n- step_time_ms: time for one forward+backward (ms)\n- seq_len: sequence length per sample\n\nCompute:\n- effective_batch_size = batch_size × num_gpus × gradient_accumulation\n- samples_per_second = batch_size × num_gpus × 1000 / step_time_ms\n- tokens_per_second = samples_per_second × seq_len\n\nReturn [effective_batch, samples_per_sec, tokens_per_sec], rounded to 2.\n\n**Function signature:**\n\`\`\`python\ndef solution(batch_size: int, num_gpus: int, gradient_accumulation: int, step_time_ms: float, seq_len: int) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(batch_size: int, num_gpus: int, gradient_accumulation: int, step_time_ms: float, seq_len: int) -> List[float]:",
  constraints: ["step_time_ms > 0"],
  examples: [{ input: { batch_size: 32, num_gpus: 4, gradient_accumulation: 2, step_time_ms: 150, seq_len: 512 }, output: [256, 853.33, 436906.67], explanation: "Eff=32×4×2=256. SPS=128×1000/150=853.33. TPS=853.33×512" }],
  starter_code: "def solution(batch_size: int, num_gpus: int, gradient_accumulation: int, step_time_ms: float, seq_len: int) -> List[float]:\n    pass",
  hints: ["gradient_accumulation은 effective batch만 키우고, 실제 처리속도(samples/sec)는 변하지 않습니다.", "MFU(Model FLOPs Utilization) 개선이 실제 throughput 최적화의 핵심입니다."],
  solution_code: `def solution(batch_size: int, num_gpus: int, gradient_accumulation: int, step_time_ms: float, seq_len: int) -> List[float]:
    eff = batch_size * num_gpus * gradient_accumulation
    sps = round(batch_size * num_gpus * 1000 / step_time_ms, 2)
    tps = round(sps * seq_len, 2)
    return [float(eff), sps, tps]`,
  solution_explanation: "Throughput 계산은 학습 시간과 비용을 예측하는 기본입니다. Gradient accumulation은 메모리를 절약하지만 throughput은 변경하지 않습니다.",
  sample_tests: [
    { input: { batch_size: 32, num_gpus: 4, gradient_accumulation: 2, step_time_ms: 150, seq_len: 512 }, expected: [256, 853.33, 436906.67] },
    { input: { batch_size: 8, num_gpus: 1, gradient_accumulation: 8, step_time_ms: 200, seq_len: 1024 }, expected: [64, 40.0, 40960.0] },
  ],
  hidden_tests: [
    { input: { batch_size: 1, num_gpus: 1, gradient_accumulation: 1, step_time_ms: 1000, seq_len: 1 }, expected: [1, 1.0, 1.0], failure_category: "edge_case" },
    { input: { batch_size: 16, num_gpus: 8, gradient_accumulation: 4, step_time_ms: 80, seq_len: 2048 }, expected: [512, 1600.0, 3276800.0], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 1.0,
  similar_problem_ids: ["model_precision_memory", "activation_memory_est"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
