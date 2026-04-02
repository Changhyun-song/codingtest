import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "quantize_dequantize",
  title: "INT8 Quantize-Dequantize Simulation",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Simulate **INT8 min-max quantization** and dequantization.\n\nGiven float weights and num_bits:\n1. scale = (max - min) / (2^bits - 1)\n2. zero_point = round(-min / scale)\n3. quantized = clamp(round(w / scale + zero_point), 0, 2^bits-1)\n4. dequantized = (quantized - zero_point) * scale\n\nReturn [dequantized_weights, mean_squared_error], rounded to 6 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(weights: List[float], num_bits: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(weights: List[float], num_bits: int) -> List:",
  constraints: ["1 <= num_bits <= 8", "len(weights) >= 1"],
  examples: [{ input: { weights: [0.0, 0.5, 1.0, -0.5], num_bits: 2 }, output: [[0.0, 0.5, 1.0, -0.5], 0.0], explanation: "Perfect quantization with 2 bits for this range" }],
  starter_code: "def solution(weights: List[float], num_bits: int) -> List:\n    pass",
  hints: ["scale = (max_w - min_w) / (2^bits - 1). zero_point로 0을 맵핑합니다.", "양자화 후 역양자화하면 원래 값과 차이(오차)가 발생합니다."],
  solution_code: `def solution(weights: List[float], num_bits: int) -> List:
    w_min = min(weights)
    w_max = max(weights)
    qmax = (1 << num_bits) - 1
    if w_max == w_min:
        return [weights, 0.0]
    scale = (w_max - w_min) / qmax
    zp = round(-w_min / scale)
    quantized = [max(0, min(qmax, round(w / scale + zp))) for w in weights]
    deq = [round((q - zp) * scale, 6) for q in quantized]
    error = round(sum((w - d) ** 2 for w, d in zip(weights, deq)) / len(weights), 6)
    return [deq, error]`,
  solution_explanation: "양자화는 모델 크기를 줄이고 추론 속도를 높이는 핵심 기법입니다. 정밀도 손실과 트레이드오프가 있습니다.",
  sample_tests: [
    { input: { weights: [0.0, 0.5, 1.0, -0.5], num_bits: 2 }, expected: [[0.0, 0.5, 1.0, -0.5], 0.0] },
    { input: { weights: [0.1, 0.3, 0.7, 0.9], num_bits: 1 }, expected: [[0.0, 0.0, 0.8, 0.8], 0.03] },
  ],
  hidden_tests: [
    { input: { weights: [1.0, 1.0, 1.0], num_bits: 8 }, expected: [[1.0, 1.0, 1.0], 0.0], failure_category: "edge_case" },
    { input: { weights: [-1.0, 0.0, 1.0], num_bits: 2 }, expected: [[-1.0, 0.0, 1.0], 0.0], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["prune_by_magnitude", "model_memory_calc"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
