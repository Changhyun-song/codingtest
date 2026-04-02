import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "positional_encoding",
  title: "Sinusoidal Positional Encoding",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "transformer", "encoding"],
  statement_en: `Implement the **sinusoidal positional encoding** from the original Transformer paper. For sequence length \`seq_len\` and model dimension \`d_model\`, build a matrix \`PE\` of shape \`(seq_len, d_model)\` with 0-based position \`pos\` and dimension index \`i\`:

- \`PE(pos, 2i) = sin(pos / 10000^(2i/d_model))\`
- \`PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))\`

Equivalently, for each index \`i\` in \`0 .. d_model-1\`, use \`angle_rate = 10000^((i // 2) * 2 / d_model)\` and \`angle = pos / angle_rate\`; use \`sin(angle)\` when \`i\` is even and \`cos(angle)\` when \`i\` is odd.

**Round each entry to 6 decimal places** before returning (as in the reference implementation).

**Function signature:**
\`\`\`python
def solution(seq_len: int, d_model: int) -> List[List[float]]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(seq_len: int, d_model: int) -> List[List[float]]:",
  constraints: ["1 <= seq_len <= 500", "1 <= d_model <= 512", "d_model is even in tests"],
  examples: [
    {
      input: { seq_len: 1, d_model: 2 },
      output: [
        [0.0, 1.0],
      ],
      explanation: "pos=0 → sin(0)=0, cos(0)=1.",
    },
  ],
  starter_code: `def solution(seq_len: int, d_model: int) -> List[List[float]]:
    pass`,
  hints: [
    "차원 인덱스 i에 대해 (i // 2)로 짝을 묶어 각각 같은 각도를 sin/cos에 공유합니다.",
    "분모 10000^(2i/d_model)는 i가 짝수·홀수 쌍에서 동일한 지수를 씁니다.",
    "반환 전 각 원소를 소수 여섯째 자리로 반올림하세요.",
  ],
  solution_code: `def solution(seq_len: int, d_model: int) -> List[List[float]]:
    import math
    pe = []
    for pos in range(seq_len):
        row = []
        for i in range(d_model):
            angle = pos / (10000 ** ((i // 2) * 2 / d_model))
            if i % 2 == 0:
                row.append(round(math.sin(angle), 6))
            else:
                row.append(round(math.cos(angle), 6))
        pe.append(row)
    return pe`,
  solution_explanation:
    "위치마다 주파수가 다른 사인·코사인을 교대로 넣어 상대적 위치 정보를 인코딩합니다. 트랜스포머의 고전적인 PE 정의와 반올림 규칙을 그대로 따릅니다.",
  sample_tests: [
    {
      input: { seq_len: 2, d_model: 4 },
      expected: [
        [0, 1, 0, 1],
        [0.841471, 0.540302, 0.01, 0.99995],
      ],
    },
  ],
  hidden_tests: [
    {
      input: { seq_len: 4, d_model: 8 },
      expected: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0.841471, 0.540302, 0.099833, 0.995004, 0.01, 0.99995, 0.001, 1],
        [0.909297, -0.416147, 0.198669, 0.980067, 0.019999, 0.9998, 0.002, 0.999998],
        [0.14112, -0.989992, 0.29552, 0.955336, 0.029996, 0.99955, 0.003, 0.999996],
      ],
      failure_category: "longer_sequence",
    },
  ],
  checker_type: "vector",
  tolerance: 0.001,
  similar_problem_ids: ["attention_scores", "multi_head_attention"],
  fallback_problem_ids: ["attention_scores"],
};

export default problem;
