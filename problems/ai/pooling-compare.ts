import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "pooling_compare",
  title: "CLS vs Mean Pooling Comparison",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp", "attention"],
  statement_en: `Compare **CLS token pooling** vs **mean pooling** for sentence representation.\n\nGiven token embeddings and an attention mask:\n- CLS pooling: return the first token's embedding\n- Mean pooling: compute mean of non-masked token embeddings\n\nReturn [cls_result, mean_result], mean values rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(embeddings: List[List[float]], mask: List[int]) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(embeddings: List[List[float]], mask: List[int]) -> List:",
  constraints: ["mask[0] is always 1 (CLS token)"],
  examples: [{ input: { embeddings: [[1,2],[3,4],[5,6],[0,0]], mask: [1,1,1,0] }, output: [[1,2],[3.0,4.0]], explanation: "CLS=[1,2]. Mean of non-masked: [(1+3+5)/3,(2+4+6)/3]=[3,4]" }],
  starter_code: "def solution(embeddings: List[List[float]], mask: List[int]) -> List:\n    pass",
  hints: ["CLS: 첫 번째 토큰 임베딩. Mean: mask=1인 토큰의 차원별 평균.", "일반적으로 mean pooling이 문장 유사도에서 더 좋은 성능을 보입니다."],
  solution_code: `def solution(embeddings: List[List[float]], mask: List[int]) -> List:
    cls_pool = embeddings[0]
    d = len(embeddings[0])
    c = sum(mask)
    mean_pool = [round(sum(embeddings[i][j] * mask[i] for i in range(len(embeddings))) / max(c, 1), 4) for j in range(d)]
    return [cls_pool, mean_pool]`,
  solution_explanation: "CLS pooling은 BERT에서 사용되지만, Sentence-BERT 등은 mean pooling이 문장 표현에 더 효과적임을 보여주었습니다.",
  sample_tests: [
    { input: { embeddings: [[1,2],[3,4],[5,6],[0,0]], mask: [1,1,1,0] }, expected: [[1,2],[3.0,4.0]] },
    { input: { embeddings: [[10],[20]], mask: [1,1] }, expected: [[10],[15.0]] },
  ],
  hidden_tests: [
    { input: { embeddings: [[5.0, 5.0]], mask: [1] }, expected: [[5.0,5.0],[5.0,5.0]], failure_category: "edge_case" },
    { input: { embeddings: [[1,0,0],[0,1,0],[0,0,1],[0,0,0]], mask: [1,1,1,0] }, expected: [[1,0,0],[0.3333,0.3333,0.3333]], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["masked_mean_pooling", "sentence_embedding_mean_pooling"],
  fallback_problem_ids: ["sentence_embedding_mean_pooling"],
};
export default problem;
