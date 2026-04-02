import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_einsum_ops",
  title: "Einstein Summation Operations",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "einsum", "linear-algebra", "advanced"],
  statement_en: `Given two tensors \`A\` and \`B\` (provided as nested lists) and an Einstein summation expression string \`expr\`, compute \`torch.einsum(expr, A_tensor, B_tensor)\` and return the result.

**Einstein summation notation** is a compact way to express tensor operations:
- \`"ij,jk->ik"\`: Matrix multiplication (sum over shared index j)
- \`"ij,ij->"\`: Element-wise multiply then sum all (Frobenius inner product)
- \`"i,i->"\`: Dot product of two vectors
- \`"ij,jk->ik"\`: General matrix product

The function should convert both inputs to \`float32\` tensors, apply \`torch.einsum\`, and return the result via \`.tolist()\`. Note that scalar results (e.g., from \`"ij,ij->"\`) will be returned as a single float.`,
  function_name: "solution",
  signature: "def solution(A: list, B: list, expr: str):",
  constraints: [
    "A and B are valid nested lists representing tensors",
    "expr is a valid Einstein summation string for the given tensor shapes",
    "Tensor dimensions are at most 4x4",
    "Both tensors contain numeric values (int or float)",
  ],
  examples: [
    {
      input: {
        A: [
          [1, 2],
          [3, 4],
        ],
        B: [
          [5, 6],
          [7, 8],
        ],
        expr: "ij,jk->ik",
      },
      output: [
        [19.0, 22.0],
        [43.0, 50.0],
      ],
      explanation:
        'Matrix multiplication: row 0 = [1*5+2*7, 1*6+2*8] = [19, 22], row 1 = [3*5+4*7, 3*6+4*8] = [43, 50].',
    },
    {
      input: {
        A: [
          [1, 2],
          [3, 4],
        ],
        B: [
          [1, 0],
          [0, 1],
        ],
        expr: "ij,ij->",
      },
      output: 5.0,
      explanation:
        "Element-wise product: [[1,0],[0,4]], sum of all = 1+0+0+4 = 5.",
    },
  ],
  starter_code: `import torch

def solution(A: list, B: list, expr: str):
    # 여기에 코드를 작성하세요
    # torch.einsum을 사용하여 아인슈타인 합 연산을 수행하세요
    pass`,
  hints: [
    "torch.einsum(expr, tensor_a, tensor_b)를 직접 호출하면 됩니다.",
    "입력을 torch.tensor(..., dtype=torch.float32)로 변환하세요. 정수 입력도 float로 처리해야 일관된 결과를 얻습니다.",
    "결과가 스칼라(0차원 텐서)인 경우 .tolist()는 단일 숫자를 반환합니다. 예: 'ij,ij->' 표현식의 결과.",
  ],
  solution_code: `import torch

def solution(A: list, B: list, expr: str):
    A_t = torch.tensor(A, dtype=torch.float32)
    B_t = torch.tensor(B, dtype=torch.float32)
    result = torch.einsum(expr, A_t, B_t)
    return result.tolist()`,
  solution_explanation:
    "두 입력 리스트를 float32 텐서로 변환한 후 torch.einsum에 표현식과 함께 전달합니다. einsum은 아인슈타인 합 규약에 따라 텐서 연산을 수행합니다. 'ij,jk->ik'는 행렬 곱셈(공유 인덱스 j에 대해 합산), 'ij,ij->'는 요소별 곱 후 전체 합산, 'i,i->'는 벡터 내적을 의미합니다. 결과를 .tolist()로 변환하여 반환합니다.",
  sample_tests: [
    {
      input: {
        A: [
          [1, 2],
          [3, 4],
        ],
        B: [
          [5, 6],
          [7, 8],
        ],
        expr: "ij,jk->ik",
      },
      expected: [
        [19.0, 22.0],
        [43.0, 50.0],
      ],
    },
    {
      input: {
        A: [
          [1, 2],
          [3, 4],
        ],
        B: [
          [1, 0],
          [0, 1],
        ],
        expr: "ij,ij->",
      },
      expected: 5.0,
    },
  ],
  hidden_tests: [
    {
      input: {
        A: [1, 2, 3],
        B: [4, 5, 6],
        expr: "i,i->",
      },
      expected: 32.0,
      failure_category: "dot_product",
    },
    {
      input: {
        A: [
          [1, 2],
          [3, 4],
        ],
        B: [[5], [6]],
        expr: "ij,jk->ik",
      },
      expected: [[17.0], [39.0]],
      failure_category: "matrix_vector_multiply",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
