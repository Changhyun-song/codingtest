import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "word_analogy",
  title: "Word Embedding Analogy",
  category: "ai",
  difficulty: "medium",
  tags: ["embedding", "vector", "analogy", "similarity"],
  statement_en: `Implement the classic **word analogy** task using word embeddings.

Given word embeddings as a dictionary mapping words to their vector representations, solve analogies of the form:

**"A is to B as C is to ?"**

The answer is found by computing: **target_vector = B - A + C**

Then finding the word in the vocabulary whose embedding is most similar to target_vector (using cosine similarity), excluding A, B, and C from the candidates.

**Function signature:**
\`\`\`python
def solution(embeddings: dict, word_a: str, word_b: str, word_c: str) -> str:
\`\`\`

**Parameters:**
- embeddings: dict mapping word (str) to vector (List[float])
- word_a, word_b, word_c: the three words in the analogy "A is to B as C is to ?"

**Returns:** The word that best completes the analogy.

**Example:** "man" is to "king" as "woman" is to "queen"
- target = embedding("king") - embedding("man") + embedding("woman")
- Find the word closest to target (excluding man, king, woman) -> "queen"
`,
  function_name: "solution",
  signature:
    "def solution(embeddings: dict, word_a: str, word_b: str, word_c: str) -> str:",
  constraints: [
    "3 < len(embeddings) <= 10,000",
    "All vectors have the same dimension",
    "word_a, word_b, word_c are all in embeddings",
  ],
  examples: [
    {
      input: {
        embeddings: {
          man: [1.0, 0.0, 0.0, 1.0],
          woman: [1.0, 0.0, 1.0, 0.0],
          king: [0.0, 1.0, 0.0, 1.0],
          queen: [0.0, 1.0, 1.0, 0.0],
          child: [0.5, 0.0, 0.5, 0.5],
        },
        word_a: "man",
        word_b: "king",
        word_c: "woman",
      },
      output: "queen",
      explanation:
        "king - man + woman = [-1,1,0,0] + [1,0,1,0] = [0,1,1,0] = queen",
    },
  ],
  starter_code: `def solution(embeddings: dict, word_a: str, word_b: str, word_c: str) -> str:
    # 여기에 코드를 작성하세요
    # 1단계: target 벡터 = embeddings[word_b] - embeddings[word_a] + embeddings[word_c]
    # 2단계: target과 cosine similarity가 가장 큰 단어 찾기 (a, b, c 제외)
    pass`,
  hints: [
    "target = B_vec - A_vec + C_vec를 원소별로 계산하세요.",
    "cosine similarity: dot(u,v) / (norm(u) * norm(v))",
    "모든 단어를 순회하며 A, B, C는 건너뛰고, target과 cosine similarity가 가장 큰 단어를 찾으세요.",
  ],
  solution_code: `def solution(embeddings: dict, word_a: str, word_b: str, word_c: str) -> str:
    import math
    va, vb, vc = embeddings[word_a], embeddings[word_b], embeddings[word_c]
    target = [b - a + c for a, b, c in zip(va, vb, vc)]
    def cosine_sim(u, v):
        dot = sum(x * y for x, y in zip(u, v))
        nu = math.sqrt(sum(x ** 2 for x in u))
        nv = math.sqrt(sum(x ** 2 for x in v))
        return dot / (nu * nv) if nu * nv > 0 else 0.0
    exclude = {word_a, word_b, word_c}
    best_word, best_sim = None, -2
    for word, vec in embeddings.items():
        if word in exclude:
            continue
        sim = cosine_sim(target, vec)
        if sim > best_sim:
            best_sim = sim
            best_word = word
    return best_word`,
  solution_explanation: "target = B - A + C를 계산한 뒤, target과 cosine similarity가 가장 큰 단어를 찾습니다.",
  sample_tests: [
    {
      input: {
        embeddings: {
          man: [1.0, 0.0, 0.0, 1.0],
          woman: [1.0, 0.0, 1.0, 0.0],
          king: [0.0, 1.0, 0.0, 1.0],
          queen: [0.0, 1.0, 1.0, 0.0],
          child: [0.5, 0.0, 0.5, 0.5],
        },
        word_a: "man",
        word_b: "king",
        word_c: "woman",
      },
      expected: "queen",
    },
  ],
  hidden_tests: [
    {
      input: {
        embeddings: {
          paris: [1.0, 0.0, 1.0],
          france: [1.0, 1.0, 0.0],
          tokyo: [0.0, 0.0, 1.0],
          japan: [0.0, 1.0, 0.0],
          berlin: [0.5, 0.5, 0.5],
        },
        word_a: "paris",
        word_b: "france",
        word_c: "tokyo",
      },
      expected: "japan",
      failure_category: "wrong_formula",
    },
    {
      input: {
        embeddings: {
          a: [1.0, 0.0],
          b: [0.0, 1.0],
          c: [-1.0, 0.0],
          d: [0.0, -1.0],
          e: [0.5, 0.5],
        },
        word_a: "a",
        word_b: "b",
        word_c: "c",
      },
      expected: "d",
      failure_category: "negative_handling",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: [
    "nearest_words_retrieval",
    "cosine_similarity",
    "sentence_embedding_mean_pooling",
  ],
  fallback_problem_ids: ["cosine_similarity", "nearest_words_retrieval"],
};

export default problem;
