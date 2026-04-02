import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_boolean_mask",
  title: "Boolean Masking and Selection",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "masking", "boolean-indexing"],
  statement_en: `Given a 2D list of numeric values and a threshold, perform boolean masking operations:

1. Create a boolean mask where each element is \`1\` if the value is **strictly greater than** the threshold, and \`0\` otherwise.
2. Use \`torch.masked_select\` to extract only the values where the mask is \`True\`.
3. Compute the sum of all selected (masked) values.

Return a list with three elements: \`[mask_as_nested_list, selected_values_list, sum_value]\`

- The mask should be returned as integers (0 or 1), not booleans.
- The selected values follow row-major order.`,
  function_name: "solution",
  signature: "def solution(data: list, threshold: float) -> list:",
  constraints: [
    "data is a 2D list with shape [N, M] where 1 ≤ N, M ≤ 5",
    "All values are integers or floats",
    "threshold is a number",
  ],
  examples: [
    {
      input: {
        data: [
          [1, 5, 3],
          [7, 2, 8],
        ],
        threshold: 4,
      },
      output: [
        [
          [0, 1, 0],
          [1, 0, 1],
        ],
        [5.0, 7.0, 8.0],
        20.0,
      ],
      explanation:
        "Values > 4 are 5, 7, 8. Mask marks these positions as 1. Sum = 5 + 7 + 8 = 20.",
    },
  ],
  starter_code: `import torch

def solution(data: list, threshold: float) -> list:
    # 여기에 코드를 작성하세요
    # 1. 불리언 마스크 생성 (값 > threshold)
    # 2. torch.masked_select로 값 추출
    # 3. 합계 계산
    pass`,
  hints: [
    "비교 연산자 >를 텐서에 직접 사용하면 불리언 텐서가 생성됩니다: mask = t > threshold",
    "torch.masked_select(t, mask)는 mask가 True인 위치의 값을 1D 텐서로 반환합니다.",
    "mask를 정수로 변환하려면 .int()를 사용하세요. 합계는 .sum()으로 구할 수 있습니다.",
  ],
  solution_code: `import torch

def solution(data: list, threshold: float) -> list:
    t = torch.tensor(data, dtype=torch.float32)
    mask = t > threshold
    selected = torch.masked_select(t, mask)
    mask_int = mask.int()
    return [mask_int.tolist(), selected.tolist(), float(selected.sum())]`,
  solution_explanation:
    "데이터를 float32 텐서로 변환한 후, > 연산자로 threshold보다 큰 위치의 불리언 마스크를 생성합니다. torch.masked_select로 해당 위치의 값을 추출하고, .sum()으로 합계를 구합니다. 마스크는 .int()로 정수(0/1)로 변환하여 반환합니다.",
  sample_tests: [
    {
      input: {
        data: [
          [1, 5, 3],
          [7, 2, 8],
        ],
        threshold: 4,
      },
      expected: [
        [
          [0, 1, 0],
          [1, 0, 1],
        ],
        [5.0, 7.0, 8.0],
        20.0,
      ],
    },
    {
      input: {
        data: [
          [10, 20],
          [30, 40],
        ],
        threshold: 25,
      },
      expected: [
        [
          [0, 0],
          [1, 1],
        ],
        [30.0, 40.0],
        70.0,
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        data: [
          [10, 1],
          [2, 10],
        ],
        threshold: 5,
      },
      expected: [
        [
          [1, 0],
          [0, 1],
        ],
        [10.0, 10.0],
        20.0,
      ],
      failure_category: "basic_masking",
    },
    {
      input: {
        data: [
          [3, 6, 9],
          [1, 2, 3],
        ],
        threshold: 3,
      },
      expected: [
        [
          [0, 1, 1],
          [0, 0, 0],
        ],
        [6.0, 9.0],
        15.0,
      ],
      failure_category: "boundary_value",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
