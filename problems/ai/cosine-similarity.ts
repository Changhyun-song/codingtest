import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "cosine_similarity",
  title: "Cosine Similarity",
  category: "ai",
  difficulty: "easy",
  tags: ["vector", "similarity", "dot_product"],
  statement_en: `Write a function that computes the cosine similarity between two vectors.

Cosine similarity measures the cosine of the angle between two non-zero vectors. It is defined as:

**cos(A, B) = (A · B) / (||A|| * ||B||)**

where A · B is the dot product, and ||A|| is the Euclidean norm of vector A.

**Function signature:**
\`\`\`python
def solution(vec_a: List[float], vec_b: List[float]) -> float:
\`\`\`

**Returns:** A float value representing the cosine similarity between -1.0 and 1.0.
`,
  function_name: "solution",
  signature: "def solution(vec_a: List[float], vec_b: List[float]) -> float:",
  constraints: [
    "1 <= len(vec_a) == len(vec_b) <= 10000",
    "Each element is a float in range [-1000.0, 1000.0]",
    "Neither vector is a zero vector",
  ],
  examples: [
    {
      input: { vec_a: [1, 0, 0], vec_b: [0, 1, 0] },
      output: 0.0,
      explanation: "Orthogonal vectors have cosine similarity of 0",
    },
    {
      input: { vec_a: [1, 0], vec_b: [1, 0] },
      output: 1.0,
      explanation: "Identical direction vectors have cosine similarity of 1",
    },
  ],
  starter_code: `def solution(vec_a: List[float], vec_b: List[float]) -> float:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "dot product: sum(a*b for a,b in zip(vec_a, vec_b))",
    "norm: math.sqrt(sum(x**2 for x in vec))",
  ],
  solution_code: `def solution(vec_a: List[float], vec_b: List[float]) -> float:
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = sum(a ** 2 for a in vec_a) ** 0.5
    norm_b = sum(b ** 2 for b in vec_b) ** 0.5
    return dot / (norm_a * norm_b)`,
  solution_explanation: "dot product를 두 norm의 곱으로 나눕니다. 시간 복잡도 O(n).",
  sample_tests: [
    { input: { vec_a: [1, 0], vec_b: [1, 0] }, expected: 1.0 },
    { input: { vec_a: [1, 0], vec_b: [0, 1] }, expected: 0.0 },
  ],
  hidden_tests: [
    {
      input: { vec_a: [1, 2, 3], vec_b: [4, 5, 6] },
      expected: 0.9746318461970762,
      failure_category: "wrong_formula",
    },
    {
      input: { vec_a: [-1, 0, 1], vec_b: [1, 0, -1] },
      expected: -1.0,
      failure_category: "negative_handling",
    },
    {
      input: { vec_a: [0.001, 0.002], vec_b: [0.003, 0.004] },
      expected: 0.9838699100999074,
      failure_category: "precision",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 1e-6,
  similar_problem_ids: ["sentence_embedding_mean_pooling", "nearest_words_retrieval"],
  fallback_problem_ids: [],
};

export default problem;
