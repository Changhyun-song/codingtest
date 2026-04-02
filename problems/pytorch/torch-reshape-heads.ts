import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_reshape_heads",
  title: "Multi-Head Attention Reshape",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "reshape", "attention", "transformer"],
  statement_en: `In multi-head attention, a tensor of shape \`[batch, seq_len, hidden_dim]\` must be reshaped to \`[batch, num_heads, seq_len, head_dim]\` where \`head_dim = hidden_dim // num_heads\`.

Given a 3D list \`x\` representing a tensor of shape \`[B, S, H]\` and an integer \`num_heads\`, perform this reshape:

1. Compute \`head_dim = H // num_heads\`
2. \`view(B, S, num_heads, head_dim)\` to split the hidden dimension
3. \`transpose(1, 2)\` to move the head dimension before the sequence dimension

Return the reshaped tensor as a nested list.

This is the standard reshape used in Transformer multi-head attention implementations.`,
  function_name: "solution",
  signature: "def solution(x: list, num_heads: int) -> list:",
  constraints: [
    "x has shape [B, S, H] where B ≥ 1, S ≥ 1, H ≥ 1",
    "hidden_dim is divisible by num_heads",
    "1 ≤ num_heads ≤ hidden_dim",
  ],
  examples: [
    {
      input: {
        x: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
          ],
        ],
        num_heads: 2,
      },
      output: [
        [
          [
            [1, 2],
            [5, 6],
          ],
          [
            [3, 4],
            [7, 8],
          ],
        ],
      ],
      explanation:
        "Shape [1,2,4] → view [1,2,2,2] → transpose [1,2,2,2]. Head 0 gets dims [0:2], Head 1 gets dims [2:4].",
    },
  ],
  starter_code: `import torch

def solution(x: list, num_heads: int) -> list:
    # 여기에 코드를 작성하세요
    # [B, S, H] -> [B, num_heads, S, head_dim] 변환을 구현하세요
    pass`,
  hints: [
    "head_dim = hidden_dim // num_heads 로 계산합니다.",
    "view(B, S, num_heads, head_dim)로 hidden 차원을 분리한 후 transpose(1, 2)로 head와 seq 차원을 교환합니다.",
    ".contiguous()가 필요할 수 있습니다. transpose 후 메모리 레이아웃이 비연속적일 수 있기 때문입니다.",
  ],
  solution_code: `import torch

def solution(x: list, num_heads: int) -> list:
    t = torch.tensor(x)
    B, S, H = t.shape
    head_dim = H // num_heads
    t = t.view(B, S, num_heads, head_dim).transpose(1, 2)
    return t.contiguous().tolist()`,
  solution_explanation:
    "입력 텐서의 shape [B, S, H]에서 head_dim = H // num_heads를 계산합니다. view()로 마지막 차원을 [num_heads, head_dim]으로 분리하면 [B, S, num_heads, head_dim]이 됩니다. 그 다음 transpose(1, 2)로 S와 num_heads 차원을 교환하여 최종 shape [B, num_heads, S, head_dim]을 얻습니다. 이것은 Transformer의 Multi-Head Attention에서 표준적으로 사용되는 reshape 패턴입니다.",
  sample_tests: [
    {
      input: {
        x: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
          ],
        ],
        num_heads: 2,
      },
      expected: [
        [
          [
            [1, 2],
            [5, 6],
          ],
          [
            [3, 4],
            [7, 8],
          ],
        ],
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        x: [
          [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
        ],
        num_heads: 3,
      },
      expected: [
        [
          [
            [1, 2],
            [7, 8],
          ],
          [
            [3, 4],
            [9, 10],
          ],
          [
            [5, 6],
            [11, 12],
          ],
        ],
      ],
      failure_category: "three_heads_reshape",
    },
    {
      input: {
        x: [
          [
            [1, 2],
            [3, 4],
          ],
          [
            [5, 6],
            [7, 8],
          ],
        ],
        num_heads: 1,
      },
      expected: [
        [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        [
          [
            [5, 6],
            [7, 8],
          ],
        ],
      ],
      failure_category: "single_head_multi_batch",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
