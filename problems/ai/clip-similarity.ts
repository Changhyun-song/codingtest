import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "clip_similarity",
  title: "CLIP-Style Similarity Matrix",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Compute a **CLIP-style cosine similarity matrix** between image and text embeddings, scaled by a learned temperature.\n\nGiven image_embs [N, D], text_embs [N, D], and temperature τ:\n- sim[i][j] = cos_sim(image_embs[i], text_embs[j]) / τ\n\nReturn the N×N similarity matrix, values rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(image_embs: List[List[float]], text_embs: List[List[float]], temperature: float) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(image_embs: List[List[float]], text_embs: List[List[float]], temperature: float) -> List[List[float]]:",
  constraints: ["temperature > 0"],
  examples: [{ input: { image_embs: [[1,0],[0,1]], text_embs: [[1,0],[0,1]], temperature: 1.0 }, output: [[1.0,0.0],[0.0,1.0]], explanation: "Identity-like similarity" }],
  starter_code: "def solution(image_embs: List[List[float]], text_embs: List[List[float]], temperature: float) -> List[List[float]]:\n    pass",
  hints: ["코사인 유사도: dot(a,b) / (||a|| * ||b||)", "각 (image, text) 쌍의 유사도를 계산하고 temperature로 나눕니다."],
  solution_code: `def solution(image_embs: List[List[float]], text_embs: List[List[float]], temperature: float) -> List[List[float]]:
    def cos(a, b):
        dot = sum(x * y for x, y in zip(a, b))
        na = sum(x ** 2 for x in a) ** 0.5
        nb = sum(x ** 2 for x in b) ** 0.5
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)
    return [[round(cos(img, txt) / temperature, 4) for txt in text_embs] for img in image_embs]`,
  solution_explanation: "CLIP은 이미지와 텍스트를 같은 공간에 임베딩하고 코사인 유사도로 매칭합니다. temperature는 분포의 날카로움을 조절합니다.",
  sample_tests: [
    { input: { image_embs: [[1,0],[0,1]], text_embs: [[1,0],[0,1]], temperature: 1.0 }, expected: [[1.0,0.0],[0.0,1.0]] },
    { input: { image_embs: [[1,1]], text_embs: [[1,1],[1,-1]], temperature: 0.5 }, expected: [[2.0, 0.0]] },
  ],
  hidden_tests: [
    { input: { image_embs: [[3,4]], text_embs: [[3,4]], temperature: 0.07 }, expected: [[14.2857]], failure_category: "standard" },
    { input: { image_embs: [[0,0]], text_embs: [[1,1]], temperature: 1.0 }, expected: [[0.0]], failure_category: "edge_case" },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["cosine_similarity", "contrastive_info_nce"],
  fallback_problem_ids: ["cosine_similarity"],
};
export default problem;
