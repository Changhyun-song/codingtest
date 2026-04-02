import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "reshape_with_infer",
  title: "Reshape with Dimension Inference",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "shape_reasoning"],
  statement_en: `Implement reshape with -1 dimension inference (like torch.reshape or numpy.reshape).\n\nGiven input_shape and target_shape (may contain exactly one -1):\n- If target_shape has no -1: verify total elements match, return target_shape or [-1] if invalid\n- If target_shape has one -1: infer the missing dimension, return the resolved shape\n- If target_shape has multiple -1s: return [-1] (invalid)\n\n**Function signature:**\n\`\`\`python\ndef solution(input_shape: List[int], target_shape: List[int]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(input_shape: List[int], target_shape: List[int]) -> List[int]:",
  constraints: ["all dims > 0 except -1 for inference"],
  examples: [{ input: { input_shape: [2,3,4], target_shape: [6,-1] }, output: [6,4], explanation: "total=24, known=6, inferred=24/6=4" }],
  starter_code: "def solution(input_shape: List[int], target_shape: List[int]) -> List[int]:\n    pass",
  hints: ["먼저 input의 전체 원소 수(곱)를 계산합니다.", "-1이 하나 있으면: 나머지 차원의 곱으로 나누어 추론합니다."],
  solution_code: `def solution(input_shape: List[int], target_shape: List[int]) -> List[int]:
    total = 1
    for s in input_shape:
        total *= s
    neg = target_shape.count(-1)
    if neg > 1:
        return [-1]
    if neg == 0:
        t = 1
        for s in target_shape:
            t *= s
        return list(target_shape) if t == total else [-1]
    known = 1
    for s in target_shape:
        if s != -1:
            known *= s
    if known == 0 or total % known != 0:
        return [-1]
    return [total // known if s == -1 else s for s in target_shape]`,
  solution_explanation: "view(-1)이나 reshape(-1, seq_len) 같은 PyTorch 코드에서 -1은 자동 추론을 의미합니다. 이 로직을 이해하는 것은 디버깅에 필수입니다.",
  sample_tests: [
    { input: { input_shape: [2,3,4], target_shape: [6,-1] }, expected: [6,4] },
    { input: { input_shape: [2,3], target_shape: [3,3] }, expected: [-1] },
  ],
  hidden_tests: [
    { input: { input_shape: [12], target_shape: [3,-1] }, expected: [3,4], failure_category: "standard" },
    { input: { input_shape: [6], target_shape: [-1,-1] }, expected: [-1], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["broadcast_shapes", "shape_error_finder"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
