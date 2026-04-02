import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "embedding_lookup",
  title: "Embedding Table Lookup",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement nn.Embedding: look up vectors from an embedding table.\n\nGiven a 2D embedding table (vocab_size x embed_dim) and a list of token IDs, return the corresponding embedding vectors.\n\n**Function signature:**\n\`\`\`python\ndef solution(table: List[List[float]], ids: List[int]) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(table: List[List[float]], ids: List[int]) -> List[List[float]]:",
  constraints: ["0 <= ids[i] < len(table)"],
  examples: [{ input: { table: [[0.1,0.2],[0.3,0.4],[0.5,0.6]], ids: [2, 0, 1] }, output: [[0.5,0.6],[0.1,0.2],[0.3,0.4]], explanation: "Look up rows 2, 0, 1 from the table" }],
  starter_code: "def solution(table: List[List[float]], ids: List[int]) -> List[List[float]]:\n    pass",
  hints: ["ids의 각 값을 table의 행 인덱스로 사용합니다.", "return [table[i] for i in ids]"],
  solution_code: `def solution(table: List[List[float]], ids: List[int]) -> List[List[float]]:
    return [table[i] for i in ids]`,
  solution_explanation: "Embedding lookup은 NLP/추천 모델의 첫 단계로, 정수 ID를 밀집 벡터로 변환합니다.",
  sample_tests: [
    { input: { table: [[0.1,0.2],[0.3,0.4],[0.5,0.6]], ids: [2, 0, 1] }, expected: [[0.5,0.6],[0.1,0.2],[0.3,0.4]] },
    { input: { table: [[1.0],[2.0],[3.0]], ids: [0, 0, 2, 1] }, expected: [[1.0],[1.0],[3.0],[2.0]] },
  ],
  hidden_tests: [
    { input: { table: [[0.0,0.0],[1.0,1.0]], ids: [1] }, expected: [[1.0,1.0]], failure_category: "edge_case" },
    { input: { table: [[0.1,0.2,0.3],[0.4,0.5,0.6],[0.7,0.8,0.9],[1.0,1.1,1.2]], ids: [3,1,0,2] }, expected: [[1.0,1.1,1.2],[0.4,0.5,0.6],[0.1,0.2,0.3],[0.7,0.8,0.9]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["one_hot_encode", "tensor_manipulation"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
