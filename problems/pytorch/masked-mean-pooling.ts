import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "masked_mean_pooling",
  title: "Masked Mean Pooling (Pure Python)",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pooling", "embedding", "masking"],
  statement_en: `Implement masked mean pooling for a batch of sequences.

You are given:
- \`token_embeddings\`: a 3D list of shape (batch_size, seq_len, hidden_dim) — the embedding of each token
- \`attention_mask\`: a 2D list of shape (batch_size, seq_len) — 1 for real tokens, 0 for padding

For each sample in the batch, compute the mean of only the non-masked token embeddings:

For each batch b and dimension d:
**output[b][d] = sum(token_embeddings[b][i][d] * attention_mask[b][i] for all i) / sum(attention_mask[b])**

**Function signature:**
\`\`\`python
def solution(token_embeddings: List[List[List[float]]], attention_mask: List[List[int]]) -> List[List[float]]:
\`\`\`

**Returns:** A 2D list of shape (batch_size, hidden_dim).

Note: You may use pure Python (no PyTorch required). If you want to use PyTorch, \`import torch\` is available.
`,
  function_name: "solution",
  signature: "def solution(token_embeddings: List[List[List[float]]], attention_mask: List[List[int]]) -> List[List[float]]:",
  constraints: [
    "1 <= batch_size <= 32",
    "1 <= seq_len <= 512",
    "1 <= hidden_dim <= 768",
    "At least one mask value per batch is 1",
  ],
  examples: [
    {
      input: {
        token_embeddings: [
          [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
          [[10.0, 20.0], [30.0, 40.0], [50.0, 60.0]],
        ],
        attention_mask: [[1, 1, 0], [1, 1, 1]],
      },
      output: [
        [2.0, 3.0],
        [30.0, 40.0],
      ],
      explanation: "Batch 0: mean of first 2 tokens. Batch 1: mean of all 3 tokens.",
    },
  ],
  starter_code: `def solution(token_embeddings: List[List[List[float]]], attention_mask: List[List[int]]) -> List[List[float]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "배치별로 순회한 뒤 차원별로 처리하세요.",
    "각 차원에서 가중 embedding을 합산하고 mask 합으로 나눕니다.",
    "원하면 numpy나 torch로 벡터화할 수 있습니다.",
  ],
  solution_code: `def solution(token_embeddings: List[List[List[float]]], attention_mask: List[List[int]]) -> List[List[float]]:
    batch_size = len(token_embeddings)
    hidden_dim = len(token_embeddings[0][0])
    result = []
    for b in range(batch_size):
        mask_sum = sum(attention_mask[b])
        emb = [0.0] * hidden_dim
        for i, m in enumerate(attention_mask[b]):
            if m:
                for d in range(hidden_dim):
                    emb[d] += token_embeddings[b][i][d]
        result.append([x / mask_sum for x in emb])
    return result`,
  solution_explanation: "배치마다 mask=1인 embedding만 합산하고 mask 개수로 나눕니다.",
  sample_tests: [
    {
      input: {
        token_embeddings: [
          [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
        ],
        attention_mask: [[1, 1, 0]],
      },
      expected: [[2.0, 3.0]],
    },
    {
      input: {
        token_embeddings: [
          [[10.0, 20.0], [30.0, 40.0], [50.0, 60.0]],
        ],
        attention_mask: [[1, 1, 1]],
      },
      expected: [[30.0, 40.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        token_embeddings: [[[5.0, 10.0]]],
        attention_mask: [[1]],
      },
      expected: [[5.0, 10.0]],
      failure_category: "single_element",
    },
    {
      input: {
        token_embeddings: [
          [[1.0, -1.0], [2.0, -2.0], [0.0, 0.0]],
          [[-3.0, 3.0], [0.0, 0.0], [6.0, -6.0]],
        ],
        attention_mask: [[1, 0, 1], [0, 1, 1]],
      },
      expected: [
        [0.5, -0.5],
        [3.0, -3.0],
      ],
      failure_category: "normalization",
    },
  ],
  checker_type: "vector",
  tolerance: 1e-5,
  similar_problem_ids: ["sentence_embedding_mean_pooling"],
  fallback_problem_ids: ["sentence_embedding_mean_pooling", "cosine_similarity"],
};

export default problem;
