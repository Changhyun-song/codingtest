import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "multimodal_fusion",
  title: "Multi-Modal Feature Fusion",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "multimodal", "projection"],
  statement_en: `In multimodal learning, image and text features often live in different spaces. **Project** each modality with a linear map, **fuse** by element-wise addition, then apply **ReLU**.

For each modality, compute \`proj = W @ x + b\` (standard matrix–vector product: row \`i\` of \`W\` dotted with \`x\`, plus \`b[i]\`). Image and text projections must have the **same length** (common embedding size). Fusion: \`out[i] = ReLU(img_proj[i] + text_proj[i])\` where \`ReLU(z) = max(0, z)\`.

**Function signature:**
\`\`\`python
def solution(img_features: List[float], text_features: List[float], W_img: List[List[float]], b_img: List[float], W_text: List[List[float]], b_text: List[float]) -> List[float]:
\`\`\`
`,
  function_name: "solution",
  signature:
    "def solution(img_features: List[float], text_features: List[float], W_img: List[List[float]], b_img: List[float], W_text: List[List[float]], b_text: List[float]) -> List[float]:",
  constraints: [
    "W_img has shape (common_dim × len(img_features))",
    "W_text has shape (common_dim × len(text_features))",
    "b_img and b_text have length common_dim",
  ],
  examples: [
    {
      input: {
        img_features: [1.0, 0.0],
        text_features: [1.0, 0.0],
        W_img: [
          [1.0, 0.0],
          [0.0, 1.0],
        ],
        b_img: [0.0, 0.0],
        W_text: [
          [1.0, 0.0],
          [0.0, 1.0],
        ],
        b_text: [0.0, 0.0],
      },
      output: [2.0, 0.0],
      explanation: "Both projections equal the input; sum then ReLU → [2, 0].",
    },
  ],
  starter_code: `def solution(img_features: List[float], text_features: List[float], W_img: List[List[float]], b_img: List[float], W_text: List[List[float]], b_text: List[float]) -> List[float]:
    pass`,
  hints: [
    "선형층: result[i] = sum(W[i][j] * x[j]) + b[i] 형태로 구현하세요.",
    "두 모달리티의 투영 벡터 길이가 같아야 원소별 덧셈이 가능합니다.",
    "합산 뒤 각 좌표에 max(0, x)를 적용합니다.",
  ],
  solution_code: `def solution(img_features: List[float], text_features: List[float], W_img: List[List[float]], b_img: List[float], W_text: List[List[float]], b_text: List[float]) -> List[float]:
    def linear(W, x, b):
        return [sum(W[i][j] * x[j] for j in range(len(x))) + b[i] for i in range(len(W))]
    img_proj = linear(W_img, img_features, b_img)
    text_proj = linear(W_text, text_features, b_text)
    fused = [max(0, a + b) for a, b in zip(img_proj, text_proj)]
    return fused`,
  solution_explanation:
    "이미지·텍스트를 각각 선형 투영한 뒤 더하고 ReLU로 비선형성을 줍니다. 멀티모달 융합에서 흔한 ‘공통 차원 투영 + 가산 + 활성화’ 패턴입니다.",
  sample_tests: [
    {
      input: {
        img_features: [1.0, 2.0],
        text_features: [3.0, 4.0, 5.0],
        W_img: [
          [1.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
        ],
        b_img: [0.0, 0.0, 0.0],
        W_text: [
          [1.0, 0.0, 0.0],
          [0.0, 1.0, 0.0],
          [0.0, 0.0, 1.0],
        ],
        b_text: [0.0, 0.0, 0.0],
      },
      expected: [4.0, 6.0, 8.0],
    },
  ],
  hidden_tests: [
    {
      input: {
        img_features: [1.0, 2.0, 3.0],
        text_features: [0.5, 1.0],
        W_img: [
          [1.0, 0.0, 0.0],
          [0.0, 1.0, 0.0],
          [0.0, 0.0, 1.0],
          [1.0, 1.0, 1.0],
        ],
        b_img: [0.0, 0.0, 0.0, 0.0],
        W_text: [
          [1.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [0.5, 0.5],
        ],
        b_text: [0.0, 0.0, 0.0, 0.0],
      },
      expected: [1.5, 3.0, 4.5, 6.75],
      failure_category: "higher_dim",
    },
    {
      input: {
        img_features: [1.0],
        text_features: [1.0],
        W_img: [[-2.0]],
        b_img: [0.0],
        W_text: [[1.0]],
        b_text: [0.0],
      },
      expected: [0.0],
      failure_category: "relu_zero",
    },
  ],
  checker_type: "vector",
  tolerance: 0.001,
  similar_problem_ids: ["simple_mlp_forward", "masked_mean_pooling"],
  fallback_problem_ids: ["simple_mlp_forward"],
};

export default problem;
