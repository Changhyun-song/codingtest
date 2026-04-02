import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "simple_mlp_forward",
  title: "Simple MLP Forward Pass",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "mlp", "forward_pass", "neural_network"],
  statement_en: `Implement the forward pass of a simple Multi-Layer Perceptron (MLP) with one hidden layer.

Given:
- \`input_vec\`: a 1D list of floats (input features)
- \`W1\`: weight matrix for hidden layer (shape: hidden_size x input_size)
- \`b1\`: bias vector for hidden layer (shape: hidden_size)
- \`W2\`: weight matrix for output layer (shape: output_size x hidden_size)
- \`b2\`: bias vector for output layer (shape: output_size)

Compute:
1. **Hidden layer**: h = ReLU(W1 @ input + b1)
2. **Output layer**: output = W2 @ h + b2

Where ReLU(x) = max(0, x) applied element-wise.

**Function signature:**
\`\`\`python
def solution(input_vec: List[float], W1: List[List[float]], b1: List[float], W2: List[List[float]], b2: List[float]) -> List[float]:
\`\`\`

**Returns:** The output vector as a list of floats.
`,
  function_name: "solution",
  signature:
    "def solution(input_vec: List[float], W1: List[List[float]], b1: List[float], W2: List[List[float]], b2: List[float]) -> List[float]:",
  constraints: [
    "1 <= input_size <= 100",
    "1 <= hidden_size <= 100",
    "1 <= output_size <= 10",
  ],
  examples: [
    {
      input: {
        input_vec: [1.0, 2.0],
        W1: [
          [0.5, -0.5],
          [0.3, 0.7],
        ],
        b1: [0.1, -0.1],
        W2: [[1.0, 1.0]],
        b2: [0.0],
      },
      output: [1.6],
      explanation:
        "h = ReLU([0.5*1-0.5*2+0.1, 0.3*1+0.7*2-0.1]) = ReLU([-0.4, 1.6]) = [0, 1.6]. out = [1*0+1*1.6+0] = [1.6]",
    },
  ],
  starter_code: `def solution(input_vec: List[float], W1: List[List[float]], b1: List[float], W2: List[List[float]], b2: List[float]) -> List[float]:
    # 여기에 코드를 작성하세요
    # 1단계: h = ReLU(W1 @ input + b1)
    # 2단계: out = W2 @ h + b2
    pass`,
  hints: [
    "행렬-벡터 곱: result[i] = sum(W[i][j] * vec[j] for j) + bias[i]",
    "ReLU: 각 원소에 대해 max(0, x)",
  ],
  solution_code: `def solution(input_vec: List[float], W1: List[List[float]], b1: List[float], W2: List[List[float]], b2: List[float]) -> List[float]:
    def matvec(W, v, b):
        return [sum(W[i][j]*v[j] for j in range(len(v))) + b[i] for i in range(len(W))]
    def relu(v):
        return [max(0, x) for x in v]
    h = relu(matvec(W1, input_vec, b1))
    return matvec(W2, h, b2)`,
  solution_explanation:
    "층마다 행렬-벡터 곱을 하고 hidden layer에 ReLU를 적용합니다. 일반적인 MLP forward pass입니다.",
  sample_tests: [
    {
      input: {
        input_vec: [1.0, 2.0],
        W1: [
          [0.5, -0.5],
          [0.3, 0.7],
        ],
        b1: [0.1, -0.1],
        W2: [[1.0, 1.0]],
        b2: [0.0],
      },
      expected: [1.6],
    },
    {
      input: {
        input_vec: [1.0],
        W1: [[2.0], [-1.0]],
        b1: [0.0, 0.0],
        W2: [[1.0, 1.0]],
        b2: [0.5],
      },
      expected: [2.5],
    },
  ],
  hidden_tests: [
    {
      input: {
        input_vec: [-1.0, -1.0],
        W1: [
          [1.0, 0.0],
          [0.0, 1.0],
        ],
        b1: [0.0, 0.0],
        W2: [[1.0, 1.0]],
        b2: [0.0],
      },
      expected: [0.0],
      failure_category: "negative_handling",
    },
    {
      input: {
        input_vec: [0.0, 0.0],
        W1: [[1.0, 1.0]],
        b1: [5.0],
        W2: [[2.0]],
        b2: [-3.0],
      },
      expected: [7.0],
      failure_category: "bias_handling",
    },
  ],
  checker_type: "vector",
  tolerance: 1e-4,
  similar_problem_ids: ["attention_scores", "tensor_manipulation", "batch_cross_entropy"],
  fallback_problem_ids: ["tensor_manipulation"],
};

export default problem;
