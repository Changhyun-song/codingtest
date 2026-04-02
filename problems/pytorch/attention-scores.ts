import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "attention_scores",
  title: "Scaled Dot-Product Attention",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "attention", "transformer", "softmax"],
  statement_en: `Implement the **scaled dot-product attention** mechanism, the core building block of the Transformer architecture.

Given Query (Q), Key (K), and Value (V) matrices, compute:

**Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V**

Where:
- Q has shape (seq_len_q, d_k)
- K has shape (seq_len_k, d_k)
- V has shape (seq_len_k, d_v)
- d_k is the dimension of keys (number of columns in Q and K)
- softmax is applied row-wise

**Function signature:**
\`\`\`python
def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:
\`\`\`

**Returns:** The attention output as a 2D list of shape (seq_len_q, d_v).

**Note:** You may use \`import math\`. PyTorch/numpy are also available but not required.
`,
  function_name: "solution",
  signature:
    "def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:",
  constraints: [
    "1 <= seq_len_q, seq_len_k <= 50",
    "1 <= d_k, d_v <= 64",
    "Q and K have the same d_k dimension",
    "K and V have the same seq_len_k",
  ],
  examples: [
    {
      input: {
        Q: [[1.0, 0.0], [0.0, 1.0]],
        K: [[1.0, 0.0], [0.0, 1.0]],
        V: [[1.0, 2.0], [3.0, 4.0]],
      },
      output: [
        [1.6457, 2.6457],
        [2.3543, 3.3543],
      ],
      explanation:
        "Scores = Q*K^T / sqrt(2), apply softmax row-wise, then multiply by V.",
    },
  ],
  starter_code: `def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:
    import math
    # 여기에 코드를 작성하세요
    # 1단계: Q * K^T 계산
    # 2단계: sqrt(d_k)로 스케일
    # 3단계: 각 행에 softmax 적용
    # 4단계: V와 곱하기
    pass`,
  hints: [
    "행렬 곱: Q(seq_q x d_k)와 K^T(d_k x seq_k)로 scores(seq_q x seq_k)를 구합니다.",
    "d_k = len(Q[0])일 때 scores를 sqrt(d_k)로 나눕니다.",
    "행 단위 softmax: 각 행에서 수치 안정성을 위해 max를 빼고 exp(x) / sum(exp(x))를 적용합니다.",
    "attention weight(seq_q x seq_k)와 V(seq_k x d_v)를 곱해 출력(seq_q x d_v)을 만듭니다.",
  ],
  solution_code: `def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]]) -> List[List[float]]:
    import math
    d_k = len(Q[0])
    scale = math.sqrt(d_k)
    seq_q, seq_k, d_v = len(Q), len(K), len(V[0])
    scores = [[sum(Q[i][d]*K[j][d] for d in range(d_k))/scale for j in range(seq_k)] for i in range(seq_q)]
    weights = []
    for row in scores:
        m = max(row)
        exps = [math.exp(x - m) for x in row]
        s = sum(exps)
        weights.append([e / s for e in exps])
    output = []
    for i in range(seq_q):
        out_row = [sum(weights[i][j]*V[j][d] for j in range(seq_k)) for d in range(d_v)]
        output.append(out_row)
    return output`,
  solution_explanation: "Q*K^T/sqrt(d_k), 행 단위 softmax, V와 곱합니다. Transformer attention의 핵심입니다.",
  sample_tests: [
    {
      input: {
        Q: [[1.0, 0.0], [0.0, 1.0]],
        K: [[1.0, 0.0], [0.0, 1.0]],
        V: [[1.0, 2.0], [3.0, 4.0]],
      },
      expected: [
        [1.6457, 2.6457],
        [2.3543, 3.3543],
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        Q: [[1.0]],
        K: [[1.0], [2.0]],
        V: [[10.0], [20.0]],
      },
      expected: [[15.7153]],
      failure_category: "wrong_formula",
    },
    {
      input: {
        Q: [[0.0, 0.0], [0.0, 0.0]],
        K: [[1.0, 0.0], [0.0, 1.0]],
        V: [[1.0, 0.0], [0.0, 1.0]],
      },
      expected: [
        [0.5, 0.5],
        [0.5, 0.5],
      ],
      failure_category: "edge_case",
    },
    {
      input: {
        Q: [[10.0, 0.0]],
        K: [[10.0, 0.0], [0.0, 10.0]],
        V: [[1.0, 0.0], [0.0, 1.0]],
      },
      expected: [[0.9993, 0.0007]],
      failure_category: "precision",
    },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["tensor_manipulation", "masked_mean_pooling"],
  fallback_problem_ids: [
    "cosine_similarity",
    "sentence_embedding_mean_pooling",
  ],
};

export default problem;
