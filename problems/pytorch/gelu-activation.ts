import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "gelu_activation",
  title: "GELU Activation Function",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement the **GELU (Gaussian Error Linear Unit)** activation function used in modern Transformers (BERT, GPT, etc.).

The approximate formula is:
**GELU(x) = 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x³)))**

**Function signature:**
\`\`\`python
def solution(x: List[float]) -> List[float]:
\`\`\`

**Returns:** A list of GELU-activated values, each rounded to 6 decimal places.
`,
  function_name: "solution",
  signature: "def solution(x: List[float]) -> List[float]:",
  constraints: [
    "1 <= len(x) <= 10000",
    "-100 <= x[i] <= 100",
  ],
  examples: [
    {
      input: { x: [0.0, 1.0, -1.0] },
      output: [0.0, 0.841192, -0.158808],
      explanation: "GELU(0)=0, GELU(1)≈0.8412, GELU(-1)≈-0.1588",
    },
  ],
  starter_code: `def solution(x: List[float]) -> List[float]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "math.tanh와 math.sqrt를 사용하세요. sqrt(2/pi)를 먼저 계산합니다.",
    "공식을 한 줄로 구현 가능: 0.5 * v * (1 + tanh(sqrt(2/pi) * (v + 0.044715 * v**3)))",
  ],
  solution_code: `def solution(x: List[float]) -> List[float]:
    import math
    c = math.sqrt(2.0 / math.pi)
    result = []
    for v in x:
        gelu = 0.5 * v * (1.0 + math.tanh(c * (v + 0.044715 * v ** 3)))
        result.append(round(gelu, 6))
    return result`,
  solution_explanation: "GELU는 ReLU보다 부드러운 활성화 함수로, BERT/GPT 등 최신 Transformer에서 표준으로 사용됩니다.",
  sample_tests: [
    {
      input: { x: [0.0, 1.0, -1.0] },
      expected: [0.0, 0.841192, -0.158808],
    },
    {
      input: { x: [2.0, -2.0, 0.5] },
      expected: [1.9546, -0.0454, 0.345714],
    },
  ],
  hidden_tests: [
    {
      input: { x: [0.0] },
      expected: [0.0],
      failure_category: "edge_case",
    },
    {
      input: { x: [10.0, -10.0, 3.0, -0.5] },
      expected: [10.0, -0.0, 2.9964, -0.154286],
      failure_category: "boundary",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["softmax_from_scratch", "layer_norm_manual"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
