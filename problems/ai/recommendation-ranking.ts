import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "recommendation_ranking",
  title: "Recommendation Ranking",
  category: "ai",
  difficulty: "medium",
  tags: ["ranking", "sorting", "similarity"],
  statement_en: `You are building a recommendation system. Given a user profile vector and a list of item vectors with their IDs, rank the items by their similarity to the user profile.

Use **dot product** as the similarity score: score(user, item) = sum(u_i * v_i)

Return the item IDs sorted by score in descending order. If two items have the same score, sort by item ID in ascending alphabetical order.

**Function signature:**
\`\`\`python
def solution(user_profile: List[float], items: dict) -> List[str]:
\`\`\`

**Parameters:**
- user_profile: a list of floats representing the user's preference vector
- items: a dict mapping item_id (str) to item_vector (List[float])

**Returns:** A list of item IDs sorted by relevance (descending dot product score).
`,
  function_name: "solution",
  signature: "def solution(user_profile: List[float], items: dict) -> List[str]:",
  constraints: [
    "1 <= len(items) <= 10000",
    "All vectors have the same dimension",
    "1 <= dimension <= 100",
  ],
  examples: [
    {
      input: {
        user_profile: [1.0, 2.0],
        items: {
          movie_a: [3.0, 1.0],
          movie_b: [1.0, 3.0],
          movie_c: [2.0, 2.0],
        },
      },
      output: ["movie_b", "movie_c", "movie_a"],
      explanation: "Scores: movie_a=5, movie_b=7, movie_c=6. Sorted desc: b,c,a",
    },
  ],
  starter_code: `def solution(user_profile: List[float], items: dict) -> List[str]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 항목에 대해 dot product를 계산하세요.",
    "동점 처리를 위해 (-score, item_id)로 정렬하세요.",
  ],
  solution_code: `def solution(user_profile: List[float], items: dict) -> List[str]:
    scores = []
    for item_id, vec in items.items():
        score = sum(u * v for u, v in zip(user_profile, vec))
        scores.append((item_id, score))
    scores.sort(key=lambda x: (-x[1], x[0]))
    return [item_id for item_id, _ in scores]`,
  solution_explanation: "항목마다 dot product 점수를 계산하고 (-score, item_id)로 정렬합니다.",
  sample_tests: [
    {
      input: {
        user_profile: [1.0, 2.0],
        items: {
          movie_a: [3.0, 1.0],
          movie_b: [1.0, 3.0],
          movie_c: [2.0, 2.0],
        },
      },
      expected: ["movie_b", "movie_c", "movie_a"],
    },
  ],
  hidden_tests: [
    {
      input: {
        user_profile: [1.0, 0.0],
        items: {
          a: [1.0, 0.0],
          b: [1.0, 0.0],
        },
      },
      expected: ["a", "b"],
      failure_category: "tie_breaking",
    },
    {
      input: {
        user_profile: [-1.0, -1.0],
        items: {
          x: [1.0, 1.0],
          y: [-1.0, -1.0],
          z: [0.0, 0.0],
        },
      },
      expected: ["y", "z", "x"],
      failure_category: "negative_handling",
    },
  ],
  checker_type: "ordered_list",
  similar_problem_ids: ["nearest_words_retrieval", "cosine_similarity"],
  fallback_problem_ids: ["cosine_similarity"],
};

export default problem;
