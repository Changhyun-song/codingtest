import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "multi_head_attention",
  title: "Multi-Head Attention (Simplified)",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "attention", "transformer", "multi_head"],
  statement_en: `Implement a simplified **multi-head attention** mechanism.

Given Q, K, V matrices and the number of heads \`num_heads\`:

1. Split Q, K, V into \`num_heads\` heads along the last dimension
   - If Q has shape (seq_len, d_model), each head gets (seq_len, d_model/num_heads)
2. Apply **scaled dot-product attention** to each head independently:
   - scores = Q_h @ K_h^T / sqrt(d_k) where d_k = d_model / num_heads
   - weights = softmax(scores) row-wise
   - head_output = weights @ V_h
3. Concatenate all head outputs along the last dimension

**Function signature:**
\`\`\`python
def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]], num_heads: int) -> List[List[float]]:
\`\`\`

**Returns:** Concatenated multi-head attention output of shape (seq_len, d_model).
`,
  function_name: "solution",
  signature:
    "def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]], num_heads: int) -> List[List[float]]:",
  constraints: [
    "1 <= seq_len <= 20",
    "d_model is divisible by num_heads",
    "1 <= num_heads <= 8",
  ],
  examples: [
    {
      input: {
        Q: [
          [1.0, 0.0, 0.0, 1.0],
          [0.0, 1.0, 1.0, 0.0],
        ],
        K: [
          [1.0, 0.0, 0.0, 1.0],
          [0.0, 1.0, 1.0, 0.0],
        ],
        V: [
          [1.0, 2.0, 3.0, 4.0],
          [5.0, 6.0, 7.0, 8.0],
        ],
        num_heads: 2,
      },
      output: [
        [2.119, 3.119, 4.119, 5.119],
        [3.881, 4.881, 5.881, 6.881],
      ],
      explanation: "Split into 2 heads of dim 2, apply attention independently, concatenate.",
    },
  ],
  starter_code: `def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]], num_heads: int) -> List[List[float]]:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "분할: d_k = d_model // num_heads일 때 head_i는 열 [i*d_k : (i+1)*d_k]를 가집니다.",
    "각 분할에 대해 single-head attention을 독립적으로 적용합니다.",
    "결과를 열 방향으로 concatenate합니다.",
  ],
  solution_code: `def solution(Q: List[List[float]], K: List[List[float]], V: List[List[float]], num_heads: int) -> List[List[float]]:
    import math
    seq_len = len(Q)
    d_model = len(Q[0])
    d_k = d_model // num_heads
    
    def attention(Qh, Kh, Vh, dk):
        sq, sk = len(Qh), len(Kh)
        scale = math.sqrt(dk)
        scores = [[sum(Qh[i][d]*Kh[j][d] for d in range(dk))/scale for j in range(sk)] for i in range(sq)]
        weights = []
        for row in scores:
            m = max(row)
            exps = [math.exp(x - m) for x in row]
            s = sum(exps)
            weights.append([e/s for e in exps])
        dv = len(Vh[0])
        return [[sum(weights[i][j]*Vh[j][d] for j in range(sk)) for d in range(dv)] for i in range(sq)]
    
    head_outputs = []
    for h in range(num_heads):
        start, end = h * d_k, (h + 1) * d_k
        Qh = [[Q[i][d] for d in range(start, end)] for i in range(seq_len)]
        Kh = [[K[i][d] for d in range(start, end)] for i in range(len(K))]
        Vh = [[V[i][d] for d in range(start, end)] for i in range(len(V))]
        head_outputs.append(attention(Qh, Kh, Vh, d_k))
    
    result = []
    for i in range(seq_len):
        row = []
        for h in range(num_heads):
            row.extend(head_outputs[h][i])
        result.append(row)
    return result`,
  solution_explanation: "Q/K/V를 head별로 나누고 head마다 scaled dot-product attention을 적용한 뒤 출력을 concatenate합니다.",
  sample_tests: [
    {
      input: {
        Q: [
          [1.0, 0.0, 0.0, 1.0],
          [0.0, 1.0, 1.0, 0.0],
        ],
        K: [
          [1.0, 0.0, 0.0, 1.0],
          [0.0, 1.0, 1.0, 0.0],
        ],
        V: [
          [1.0, 2.0, 3.0, 4.0],
          [5.0, 6.0, 7.0, 8.0],
        ],
        num_heads: 2,
      },
      expected: [
        [2.119, 3.119, 4.119, 5.119],
        [3.881, 4.881, 5.881, 6.881],
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        Q: [[1.0, 2.0]],
        K: [
          [1.0, 2.0],
          [3.0, 4.0],
        ],
        V: [
          [10.0, 20.0],
          [30.0, 40.0],
        ],
        num_heads: 1,
      },
      expected: [[24.52, 34.52]],
      failure_category: "single_head",
    },
    {
      input: {
        Q: [[0.0, 0.0, 0.0, 0.0]],
        K: [
          [1.0, 0.0, 0.0, 1.0],
          [0.0, 1.0, 1.0, 0.0],
        ],
        V: [
          [1.0, 2.0, 3.0, 4.0],
          [5.0, 6.0, 7.0, 8.0],
        ],
        num_heads: 2,
      },
      expected: [[3.0, 4.0, 5.0, 6.0]],
      failure_category: "zero_query",
    },
  ],
  checker_type: "vector",
  tolerance: 0.05,
  similar_problem_ids: ["attention_scores", "simple_mlp_forward"],
  fallback_problem_ids: ["attention_scores"],
};

export default problem;
