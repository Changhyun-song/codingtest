import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "broadcast_shapes",
  title: "Broadcast Shape Calculator",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Determine the resulting shape when two tensors are broadcast together.\n\nBroadcasting rules:\n1. Align shapes from the right\n2. For each dimension pair: if equal, keep; if one is 1, expand to the other; otherwise incompatible\n3. If one shape has fewer dims, prepend 1s\n\nReturn [-1] if shapes are incompatible.\n\n**Function signature:**\n\`\`\`python\ndef solution(shape_a: List[int], shape_b: List[int]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(shape_a: List[int], shape_b: List[int]) -> List[int]:",
  constraints: ["1 <= len(shape) <= 8", "1 <= each dim <= 10000"],
  examples: [{ input: { shape_a: [3, 1], shape_b: [1, 4] }, output: [3, 4], explanation: "3 vs 1 → 3, 1 vs 4 → 4" }],
  starter_code: "def solution(shape_a: List[int], shape_b: List[int]) -> List[int]:\n    pass",
  hints: ["두 shape를 오른쪽부터 정렬하세요.", "각 차원 쌍에서: 같으면 유지, 하나가 1이면 다른 값으로 확장, 둘 다 1이 아니고 다르면 비호환."],
  solution_code: `def solution(shape_a: List[int], shape_b: List[int]) -> List[int]:
    a = list(reversed(shape_a))
    b = list(reversed(shape_b))
    result = []
    for i in range(max(len(a), len(b))):
        da = a[i] if i < len(a) else 1
        db = b[i] if i < len(b) else 1
        if da == db:
            result.append(da)
        elif da == 1:
            result.append(db)
        elif db == 1:
            result.append(da)
        else:
            return [-1]
    return list(reversed(result))`,
  solution_explanation: "Broadcasting은 PyTorch의 핵심 연산입니다. 오른쪽부터 차원을 맞추고, 1인 차원은 자동 확장됩니다.",
  sample_tests: [
    { input: { shape_a: [3, 1], shape_b: [1, 4] }, expected: [3, 4] },
    { input: { shape_a: [2, 3, 4], shape_b: [4] }, expected: [2, 3, 4] },
  ],
  hidden_tests: [
    { input: { shape_a: [5, 1, 3], shape_b: [1, 4, 1] }, expected: [5, 4, 3], failure_category: "standard" },
    { input: { shape_a: [2, 3], shape_b: [4, 3] }, expected: [-1], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation", "tensor_shape_tracker"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
