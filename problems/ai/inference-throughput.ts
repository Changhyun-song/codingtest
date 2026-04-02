import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "inference_throughput",
  title: "Inference Throughput Calculator",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Estimate inference throughput given model FLOPs and GPU specs.\n\nGiven:\n- flops_per_sample: FLOPs for one forward pass\n- batch_size: inference batch size\n- gpu_tflops: GPU compute capacity in TFLOPS\n\nCompute:\n- time_per_batch_ms = (flops_per_sample × batch_size) / (gpu_tflops × 1e12) × 1000\n- samples_per_second = batch_size / (time_per_batch_ms / 1000)\n\nReturn [time_per_batch_ms, samples_per_second], rounded to 2 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(flops_per_sample: float, batch_size: int, gpu_tflops: float) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(flops_per_sample: float, batch_size: int, gpu_tflops: float) -> List[float]:",
  constraints: ["all > 0"],
  examples: [{ input: { flops_per_sample: 1e9, batch_size: 32, gpu_tflops: 100 }, output: [0.32, 100000.0], explanation: "32e9 / 100e12 = 3.2e-4s = 0.32ms" }],
  starter_code: "def solution(flops_per_sample: float, batch_size: int, gpu_tflops: float) -> List[float]:\n    pass",
  hints: ["총 FLOPs = per_sample × batch_size. 시간 = 총FLOPs / GPU연산력.", "실제로는 메모리 대역폭이 병목이 되어 이론치보다 느립니다."],
  solution_code: `def solution(flops_per_sample: float, batch_size: int, gpu_tflops: float) -> List[float]:
    total = flops_per_sample * batch_size
    time_s = total / (gpu_tflops * 1e12)
    time_ms = round(time_s * 1000, 2)
    sps = round(batch_size / time_s, 2) if time_s > 0 else 0
    return [time_ms, sps]`,
  solution_explanation: "Inference throughput 추정은 서빙 인프라 설계에 핵심입니다. 실제로는 MFU(Model FLOPs Utilization)가 50-70% 수준이므로 이론치의 절반 정도입니다.",
  sample_tests: [
    { input: { flops_per_sample: 1e9, batch_size: 32, gpu_tflops: 100 }, expected: [0.32, 100000.0] },
    { input: { flops_per_sample: 10e9, batch_size: 8, gpu_tflops: 50 }, expected: [1.6, 5000.0] },
  ],
  hidden_tests: [
    { input: { flops_per_sample: 1e6, batch_size: 1, gpu_tflops: 1 }, expected: [0.0, 1000000.0], failure_category: "edge_case" },
    { input: { flops_per_sample: 100e9, batch_size: 64, gpu_tflops: 312 }, expected: [20.51, 3120.0], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 1.0,
  similar_problem_ids: ["throughput_estimate", "model_precision_memory"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
