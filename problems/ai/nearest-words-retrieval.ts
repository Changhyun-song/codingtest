import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "nearest_words_retrieval",
  title: "Nearest Words Retrieval",
  category: "ai",
  difficulty: "medium",
  tags: ["vector", "similarity", "sorting"],
  statement_en: `Given a query word embedding and a dictionary of word embeddings, find the top-k most similar words using cosine similarity.

Return the words sorted by similarity in descending order. If two words have the same similarity, sort them alphabetically.

**Cosine similarity:** cos(A, B) = (A · B) / (||A|| * ||B||)

**Function signature:**
\`\`\`python
def solution(query: List[float], word_embeddings: dict, k: int) -> List[str]:
\`\`\`

**Parameters:**
- query: the embedding vector of the query word
- word_embeddings: a dict mapping word (str) to its embedding (List[float])
- k: number of nearest words to return

**Returns:** A list of k word strings sorted by similarity (descending).
`,
  function_name: "solution",
  signature: "def solution(query: List[float], word_embeddings: dict, k: int) -> List[str]:",
  constraints: [
    "1 <= len(word_embeddings) <= 10000",
    "1 <= k <= len(word_embeddings)",
    "All embeddings have the same dimension",
  ],
  examples: [
    {
      input: {
        query: [1.0, 0.0],
        word_embeddings: {
          cat: [0.9, 0.1],
          dog: [0.8, 0.2],
          fish: [0.0, 1.0],
        },
        k: 2,
      },
      output: ["cat", "dog"],
      explanation: "cat is most similar to [1,0], then dog",
    },
  ],
  starter_code: `def solution(query: List[float], word_embeddings: dict, k: int) -> List[str]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "query와 각 단어 embedding 사이의 cosine similarity를 계산하세요.",
    "동점 처리를 위해 (-similarity, word)로 정렬하세요.",
  ],
  solution_code: `def solution(query: List[float], word_embeddings: dict, k: int) -> List[str]:
    import math
    def cosine_sim(a, b):
        dot = sum(x * y for x, y in zip(a, b))
        na = math.sqrt(sum(x ** 2 for x in a))
        nb = math.sqrt(sum(x ** 2 for x in b))
        return dot / (na * nb) if na * nb > 0 else 0.0
    sims = [(word, cosine_sim(query, vec)) for word, vec in word_embeddings.items()]
    sims.sort(key=lambda x: (-x[1], x[0]))
    return [w for w, _ in sims[:k]]`,
  solution_explanation: "단어마다 cosine similarity를 계산하고 (-sim, word)로 정렬한 뒤 상위 k개를 취합니다.",
  sample_tests: [
    {
      input: {
        query: [1.0, 0.0],
        word_embeddings: {
          cat: [0.9, 0.1],
          dog: [0.8, 0.2],
          fish: [0.0, 1.0],
        },
        k: 2,
      },
      expected: ["cat", "dog"],
    },
  ],
  hidden_tests: [
    {
      input: {
        query: [1.0, 1.0],
        word_embeddings: {
          a: [1.0, 0.0],
          b: [0.0, 1.0],
          c: [1.0, 1.0],
        },
        k: 3,
      },
      expected: ["c", "a", "b"],
      failure_category: "ranking_order",
    },
    {
      input: {
        query: [1.0, 0.0, 0.0],
        word_embeddings: {
          x: [1.0, 0.0, 0.0],
          y: [-1.0, 0.0, 0.0],
        },
        k: 2,
      },
      expected: ["x", "y"],
      failure_category: "negative_handling",
    },
  ],
  checker_type: "ordered_list",
  similar_problem_ids: ["cosine_similarity", "recommendation_ranking"],
  fallback_problem_ids: ["cosine_similarity"],
};

export default problem;
