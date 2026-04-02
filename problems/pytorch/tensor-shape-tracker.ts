import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "tensor_shape_tracker",
  title: "Tensor Shape Tracker",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Given an initial tensor shape and a sequence of shape-changing operations, compute the final shape.

Supported operations:
- **reshape**: Change to target shape. \`-1\` infers that dimension.
- **transpose**: Swap two dimensions.
- **unsqueeze**: Insert a dimension of size 1 at given position.
- **squeeze**: Remove a dimension of size 1. If \`dim\` given, only squeeze that dim.
- **flatten**: Flatten dimensions from \`start_dim\` to \`end_dim\` (inclusive).
- **permute**: Reorder dimensions.

**Function signature:**
\`\`\`python
def solution(shape: List[int], operations: List[dict]) -> List[int]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(shape: List[int], operations: List[dict]) -> List[int]:",
  constraints: [
    "1 <= len(shape) <= 8",
    "1 <= each dimension <= 10000",
    "1 <= len(operations) <= 20",
  ],
  examples: [
    {
      input: { shape: [2, 3, 4], operations: [{ type: "reshape", target: [6, 4] }] },
      output: [6, 4],
      explanation: "2*3*4 = 24 elements reshaped to (6, 4)",
    },
    {
      input: { shape: [2, 3, 4], operations: [{ type: "transpose", dim0: 0, dim1: 2 }] },
      output: [4, 3, 2],
      explanation: "Swap dim 0 and dim 2",
    },
  ],
  starter_code: `def solution(shape: List[int], operations: List[dict]) -> List[int]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 연산 타입별로 shape 리스트를 어떻게 변환할지 생각하세요.",
    "reshape에서 -1은 전체 원소 수에서 나머지 차원의 곱을 나눠서 계산합니다.",
  ],
  solution_code: `def solution(shape: List[int], operations: List[dict]) -> List[int]:
    for op in operations:
        t = op["type"]
        if t == "reshape":
            total = 1
            for s in shape:
                total *= s
            new_shape = list(op["target"])
            neg_idx = -1
            known = 1
            for i, s in enumerate(new_shape):
                if s == -1:
                    neg_idx = i
                else:
                    known *= s
            if neg_idx >= 0:
                new_shape[neg_idx] = total // known
            shape = new_shape
        elif t == "transpose":
            d0, d1 = op["dim0"], op["dim1"]
            shape = list(shape)
            shape[d0], shape[d1] = shape[d1], shape[d0]
        elif t == "unsqueeze":
            shape = list(shape)
            shape.insert(op["dim"], 1)
        elif t == "squeeze":
            d = op.get("dim")
            if d is not None:
                shape = list(shape)
                if shape[d] == 1:
                    shape.pop(d)
            else:
                shape = [s for s in shape if s != 1]
        elif t == "flatten":
            sd = op.get("start_dim", 0)
            ed = op.get("end_dim", len(shape) - 1)
            flat = 1
            for i in range(sd, ed + 1):
                flat *= shape[i]
            shape = list(shape[:sd]) + [flat] + list(shape[ed + 1:])
        elif t == "permute":
            dims = op["dims"]
            shape = [shape[d] for d in dims]
    return shape`,
  solution_explanation: "각 연산 타입에 따라 shape 리스트를 순차적으로 변환합니다. reshape의 -1 처리, flatten의 구간 곱 등이 핵심입니다.",
  sample_tests: [
    {
      input: { shape: [2, 3, 4], operations: [{ type: "reshape", target: [6, 4] }] },
      expected: [6, 4],
    },
    {
      input: { shape: [2, 3, 4], operations: [{ type: "transpose", dim0: 0, dim1: 2 }] },
      expected: [4, 3, 2],
    },
  ],
  hidden_tests: [
    {
      input: {
        shape: [2, 3, 4],
        operations: [
          { type: "unsqueeze", dim: 0 },
          { type: "flatten", start_dim: 1, end_dim: 2 },
        ],
      },
      expected: [1, 6, 4],
      failure_category: "edge_case",
    },
    {
      input: {
        shape: [1, 3, 1, 4],
        operations: [{ type: "squeeze" }],
      },
      expected: [3, 4],
      failure_category: "edge_case",
    },
    {
      input: {
        shape: [8, 16, 64],
        operations: [{ type: "reshape", target: [8, -1] }],
      },
      expected: [8, 1024],
      failure_category: "wrong_formula",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation", "conv_output_shape"],
  fallback_problem_ids: ["tensor_manipulation"],
};

export default problem;
