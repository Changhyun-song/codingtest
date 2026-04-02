import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_multihead_split",
  title: "Multi-Head Attention Split & Merge",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "multi-head-attention", "tensor-reshape", "transformer"],
  statement_en: `Implement the tensor splitting and merging operations used in multi-head attention.

Given a combined output tensor of shape [batch, seq_len, num_heads * head_dim] and num_heads:

1. **Split into heads**: Reshape to [batch, seq_len, num_heads, head_dim], then transpose to [batch, num_heads, seq_len, head_dim].
2. **Merge back**: Transpose back to [batch, seq_len, num_heads, head_dim], then reshape to the original [batch, seq_len, num_heads * head_dim].
3. Verify the merged tensor equals the original.

Return a list: [split_shape, merged_equals_original] where split_shape is the shape after step 1 (as a list of ints), and merged_equals_original is a boolean.`,
  function_name: "solution",
  signature:
    "def solution(tensor_data: list, num_heads: int) -> list:",
  constraints: [
    "1 <= batch <= 4",
    "1 <= seq_len <= 8",
    "1 <= num_heads <= 8",
    "num_heads evenly divides the last dimension of the input tensor",
    "head_dim = last_dim / num_heads >= 1",
  ],
  examples: [
    {
      input: {
        tensor_data: [[[1, 2, 3, 4], [5, 6, 7, 8]]],
        num_heads: 2,
      },
      output: [[1, 2, 2, 2], true],
      explanation:
        "Shape [1,2,4] → split to [1,2,2,2] (B,heads,seq,head_dim). Merge back recovers original exactly.",
    },
    {
      input: {
        tensor_data: [[[1, 2, 3, 4, 5, 6]]],
        num_heads: 3,
      },
      output: [[1, 3, 1, 2], true],
      explanation:
        "Shape [1,1,6] → split to [1,3,1,2]. 3 heads, each with head_dim=2.",
    },
  ],
  starter_code: `import torch

def solution(tensor_data, num_heads):
    pass`,
  hints: [
    "view()로 마지막 차원을 [num_heads, head_dim]으로 분리하세요.",
    "transpose(1, 2)로 seq_len과 num_heads 차원을 교환하세요.",
    "다시 합칠 때는 contiguous()를 호출한 후 view()를 사용해야 합니다.",
    "torch.equal()로 두 텐서가 동일한지 비교할 수 있습니다.",
  ],
  solution_code: `import torch

def solution(tensor_data, num_heads):
    t = torch.tensor(tensor_data, dtype=torch.float32)
    B, S, D = t.shape
    head_dim = D // num_heads
    split = t.view(B, S, num_heads, head_dim).transpose(1, 2)
    merged = split.transpose(1, 2).contiguous().view(B, S, D)
    return [list(split.shape), bool(torch.equal(t, merged))]`,
  solution_explanation: `입력 텐서의 shape [B, S, D]에서 head_dim = D // num_heads로 계산합니다. view()로 마지막 차원을 [num_heads, head_dim]으로 분리한 후, transpose(1,2)로 heads 차원을 seq 차원 앞으로 이동시켜 [B, num_heads, S, head_dim] 형태를 만듭니다. 다시 합칠 때는 역순으로 transpose 후 contiguous().view()로 원래 shape로 복원합니다. view와 transpose의 조합이 정확하면 원본과 동일한 텐서가 복원되어야 합니다.`,
  sample_tests: [
    {
      input: {
        tensor_data: [[[1, 2, 3, 4], [5, 6, 7, 8]]],
        num_heads: 2,
      },
      expected: [[1, 2, 2, 2], true],
    },
    {
      input: {
        tensor_data: [[[1, 2, 3, 4, 5, 6]]],
        num_heads: 3,
      },
      expected: [[1, 3, 1, 2], true],
    },
  ],
  hidden_tests: [
    {
      input: {
        tensor_data: [
          [[1, 2], [3, 4]],
          [[5, 6], [7, 8]],
        ],
        num_heads: 1,
      },
      expected: [[2, 1, 2, 2], true],
      failure_category: "single_head_handling",
    },
    {
      input: {
        tensor_data: [[[1, 2, 3, 4, 5, 6, 7, 8]]],
        num_heads: 4,
      },
      expected: [[1, 4, 1, 2], true],
      failure_category: "many_heads_reshape",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
