import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_indexing_ops",
  title: "Gather Elements by Column Index",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "indexing", "gather"],
  statement_en: `Given a 2D list \`data\` of shape \`[N, C]\` and a 1D list \`col_indices\` of length \`N\`, use \`torch.gather\` to select one element per row.

For each row \`i\`, select the element at column \`col_indices[i]\`.

Return a 1D list of the selected values.

**How torch.gather works:**
\`torch.gather(input, dim, index)\` gathers values along the specified dimension. When \`dim=1\`, it selects elements along columns. The index tensor must have the same number of dimensions as the input.`,
  function_name: "solution",
  signature: "def solution(data: list, col_indices: list) -> list:",
  constraints: [
    "data is a 2D list with shape [N, C] where 1 ≤ N ≤ 10, 1 ≤ C ≤ 10",
    "col_indices is a 1D list of length N",
    "0 ≤ col_indices[i] < C for all i",
  ],
  examples: [
    {
      input: {
        data: [
          [10, 20, 30],
          [40, 50, 60],
        ],
        col_indices: [2, 0],
      },
      output: [30, 40],
      explanation:
        "Row 0: column index 2 → 30. Row 1: column index 0 → 40.",
    },
  ],
  starter_code: `import torch

def solution(data: list, col_indices: list) -> list:
    # 여기에 코드를 작성하세요
    # torch.gather를 사용하여 각 행에서 지정된 열의 값을 선택하세요
    pass`,
  hints: [
    "torch.gather(input, dim, index)에서 dim=1은 열 방향 인덱싱을 의미합니다.",
    "index 텐서는 input과 같은 차원 수를 가져야 합니다. unsqueeze(1)로 [N] → [N, 1] 변환하세요.",
    "결과 shape이 [N, 1]이므로 squeeze(1)로 [N]으로 변환 후 .tolist()를 호출하세요.",
  ],
  solution_code: `import torch

def solution(data: list, col_indices: list) -> list:
    t = torch.tensor(data)
    idx = torch.tensor(col_indices).unsqueeze(1)
    result = torch.gather(t, 1, idx).squeeze(1)
    return result.tolist()`,
  solution_explanation:
    "먼저 data와 col_indices를 텐서로 변환합니다. col_indices를 unsqueeze(1)로 [N, 1] 형태로 만들어 gather의 index로 사용합니다. torch.gather(t, 1, idx)는 dim=1(열 방향)에서 idx가 가리키는 위치의 값을 수집합니다. 결과는 [N, 1] 형태이므로 squeeze(1)로 1D 텐서로 만든 후 .tolist()로 반환합니다.",
  sample_tests: [
    {
      input: {
        data: [
          [10, 20, 30],
          [40, 50, 60],
        ],
        col_indices: [2, 0],
      },
      expected: [30, 40],
    },
    {
      input: {
        data: [
          [1, 2],
          [3, 4],
        ],
        col_indices: [0, 1],
      },
      expected: [1, 4],
    },
  ],
  hidden_tests: [
    {
      input: {
        data: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ],
        col_indices: [3, 1, 2],
      },
      expected: [4, 6, 11],
      failure_category: "multi_row_gather",
    },
    {
      input: {
        data: [
          [100, 200],
          [300, 400],
        ],
        col_indices: [0, 1],
      },
      expected: [100, 400],
      failure_category: "basic_gather",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
