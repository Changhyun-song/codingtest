import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "cross_modal_project",
  title: "Cross-Modal Feature Projection",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "attention"],
  statement_en: `Project features from one modality into a shared space using a linear projection, then L2-normalize.\n\nGiven features [N, D_in] and projection matrix [D_out, D_in]:\n1. projected = features @ projection^T\n2. L2-normalize each vector\n\nReturn the normalized projected features, rounded to 6 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(features: List[List[float]], projection: List[List[float]]) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(features: List[List[float]], projection: List[List[float]]) -> List[List[float]]:",
  constraints: ["D_out <= D_in typically, but not required"],
  examples: [{ input: { features: [[3.0,4.0]], projection: [[1,0],[0,1]] }, output: [[0.6,0.8]], explanation: "Identity projection, then L2 normalize: [3,4]/5=[0.6,0.8]" }],
  starter_code: "def solution(features: List[List[float]], projection: List[List[float]]) -> List[List[float]]:\n    pass",
  hints: ["features @ projection^T로 투영합니다.", "각 벡터를 L2 norm으로 나누어 정규화합니다."],
  solution_code: `def solution(features: List[List[float]], projection: List[List[float]]) -> List[List[float]]:
    d_out = len(projection)
    result = []
    for feat in features:
        proj = [sum(feat[k] * projection[d][k] for k in range(len(feat))) for d in range(d_out)]
        norm = sum(x ** 2 for x in proj) ** 0.5
        if norm > 0:
            proj = [round(x / norm, 6) for x in proj]
        else:
            proj = [0.0] * d_out
        result.append(proj)
    return result`,
  solution_explanation: "멀티모달 모델에서 다른 모달리티의 특징을 공유 공간에 투영하고 정규화합니다. CLIP, ALIGN 등에서 사용됩니다.",
  sample_tests: [
    { input: { features: [[3.0,4.0]], projection: [[1,0],[0,1]] }, expected: [[0.6,0.8]] },
    { input: { features: [[1.0,0.0],[0.0,1.0]], projection: [[1,1]] }, expected: [[1.0],[1.0]] },
  ],
  hidden_tests: [
    { input: { features: [[0.0,0.0]], projection: [[1,0]] }, expected: [[0.0]], failure_category: "edge_case" },
    { input: { features: [[1.0,2.0,3.0]], projection: [[1,0,0],[0,1,0]] }, expected: [[0.447214,0.894427]], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["clip_similarity", "cosine_similarity"],
  fallback_problem_ids: ["cosine_similarity"],
};
export default problem;
