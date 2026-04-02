import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "sentence_embedding_mean_pooling",
  title: "Sentence Embedding by Mean Pooling",
  category: "ai",
  difficulty: "medium",
  tags: ["embedding", "pooling", "vector"],
  statement_en: `Given a list of token embeddings (each a list of floats) and an attention mask (a list of 0s and 1s), compute the sentence embedding using mean pooling.

Mean pooling averages only the embeddings of tokens where the attention mask is 1.

For each dimension d:
**sentence_embedding[d] = sum(embedding[i][d] * mask[i] for all i) / sum(mask)**

**Function signature:**
\`\`\`python
def solution(embeddings: List[List[float]], attention_mask: List[int]) -> List[float]:
\`\`\`

**Returns:** A list of floats representing the sentence embedding.
`,
  function_name: "solution",
  signature: "def solution(embeddings: List[List[float]], attention_mask: List[int]) -> List[float]:",
  constraints: [
    "1 <= len(embeddings) <= 512",
    "1 <= len(embeddings[0]) <= 768",
    "attention_mask[i] is 0 or 1",
    "At least one mask value is 1",
  ],
  examples: [
    {
      input: {
        embeddings: [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
        attention_mask: [1, 1, 0],
      },
      output: [2.0, 3.0],
      explanation: "Average of first two embeddings: [(1+3)/2, (2+4)/2] = [2.0, 3.0]",
    },
  ],
  starter_code: `def solution(embeddings: List[List[float]], attention_mask: List[int]) -> List[float]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 embedding에 mask 값을 곱한 뒤 합산하고, mask 총합으로 나눕니다.",
    "mask가 0인 경우(padding token)를 처리하세요.",
  ],
  solution_code: `def solution(embeddings: List[List[float]], attention_mask: List[int]) -> List[float]:
    dim = len(embeddings[0])
    mask_sum = sum(attention_mask)
    result = [0.0] * dim
    for i, mask in enumerate(attention_mask):
        if mask:
            for d in range(dim):
                result[d] += embeddings[i][d]
    return [x / mask_sum for x in result]`,
  solution_explanation: "mask=1인 위치의 embedding만 합산한 뒤 mask 개수로 나눕니다. 시간 복잡도 O(seq_len * dim).",
  sample_tests: [
    {
      input: {
        embeddings: [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
        attention_mask: [1, 1, 0],
      },
      expected: [2.0, 3.0],
    },
    {
      input: {
        embeddings: [[10.0], [20.0], [30.0]],
        attention_mask: [1, 1, 1],
      },
      expected: [20.0],
    },
  ],
  hidden_tests: [
    {
      input: {
        embeddings: [[1.0, 2.0, 3.0]],
        attention_mask: [1],
      },
      expected: [1.0, 2.0, 3.0],
      failure_category: "single_element",
    },
    {
      input: {
        embeddings: [[0.5, -0.5], [1.5, -1.5], [0.0, 0.0]],
        attention_mask: [1, 0, 1],
      },
      expected: [0.25, -0.25],
      failure_category: "normalization",
    },
  ],
  checker_type: "vector",
  tolerance: 1e-6,
  similar_problem_ids: ["cosine_similarity", "masked_mean_pooling"],
  fallback_problem_ids: ["cosine_similarity"],
};

export default problem;
