import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "protein_distance_map",
  title: "Protein Residue Contact Map",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Create a **contact map** from 3D protein residue coordinates.\n\nGiven a list of 3D coordinates [N, 3] and a distance threshold:\n- Compute pairwise Euclidean distances\n- contact[i][j] = 1 if distance < threshold, else 0\n\nReturn the N×N binary contact map.\n\n**Function signature:**\n\`\`\`python\ndef solution(coords: List[List[float]], threshold: float) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(coords: List[List[float]], threshold: float) -> List[List[int]]:",
  constraints: ["1 <= N <= 500"],
  examples: [{ input: { coords: [[0,0,0],[1,0,0],[5,0,0]], threshold: 2.0 }, output: [[1,1,0],[1,1,0],[0,0,1]], explanation: "d(0,1)=1<2, d(0,2)=5>=2, d(1,2)=4>=2" }],
  starter_code: "def solution(coords: List[List[float]], threshold: float) -> List[List[int]]:\n    pass",
  hints: ["유클리드 거리: sqrt(sum((a[d]-b[d])^2 for d in range(3)))", "거리 < threshold이면 1, 아니면 0 (자기 자신과의 거리는 0이므로 1)."],
  solution_code: `def solution(coords: List[List[float]], threshold: float) -> List[List[int]]:
    n = len(coords)
    result = []
    for i in range(n):
        row = []
        for j in range(n):
            d = sum((coords[i][k] - coords[j][k]) ** 2 for k in range(3)) ** 0.5
            row.append(1 if d < threshold else 0)
        result.append(row)
    return result`,
  solution_explanation: "단백질 접촉 지도는 구조 예측(AlphaFold)의 핵심 타겟입니다. 가까운 잔기 쌍을 식별합니다.",
  sample_tests: [
    { input: { coords: [[0,0,0],[1,0,0],[5,0,0]], threshold: 2.0 }, expected: [[1,1,0],[1,1,0],[0,0,1]] },
    { input: { coords: [[0,0,0],[3,4,0]], threshold: 5.0 }, expected: [[1,0],[0,1]] },
  ],
  hidden_tests: [
    { input: { coords: [[0,0,0]], threshold: 1.0 }, expected: [[1]], failure_category: "edge_case" },
    { input: { coords: [[0,0,0],[1,1,1],[2,2,2],[10,10,10]], threshold: 3.0 }, expected: [[1,1,0,0],[1,1,1,0],[0,1,1,0],[0,0,0,1]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["bio_one_hot", "sequence_align_score"],
  fallback_problem_ids: ["cosine_similarity"],
};
export default problem;
