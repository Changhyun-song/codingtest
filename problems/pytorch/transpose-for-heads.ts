import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "transpose_for_heads",
  title: "Reshape Tensor for Multi-Head Attention",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Reshape a 3D tensor from [batch, seq_len, d_model] to [batch, num_heads, seq_len, d_head] where d_head = d_model / num_heads.\n\nThis is the standard reshape+transpose used in multi-head attention.\n\n**Function signature:**\n\`\`\`python\ndef solution(tensor: List[List[List[float]]], num_heads: int) -> List[List[List[List[float]]]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(tensor: List[List[List[float]]], num_heads: int) -> List[List[List[List[float]]]]:",
  constraints: ["d_model % num_heads == 0"],
  examples: [{ input: { tensor: [[[1,2,3,4],[5,6,7,8]]], num_heads: 2 }, output: [[[[1,2],[5,6]],[[3,4],[7,8]]]], explanation: "Split d_model=4 into 2 heads of d_head=2, then transpose" }],
  starter_code: "def solution(tensor: List[List[List[float]]], num_heads: int) -> List[List[List[List[float]]]]:\n    pass",
  hints: ["d_head = d_model // num_heads. 각 토큰의 벡터를 num_heads개로 분할합니다.", "결과 shape: [batch, num_heads, seq_len, d_head]. 각 head가 독립적으로 attention합니다."],
  solution_code: `def solution(tensor: List[List[List[float]]], num_heads: int) -> List[List[List[List[float]]]]:
    batch = len(tensor)
    seq_len = len(tensor[0])
    d_model = len(tensor[0][0])
    d_head = d_model // num_heads
    result = []
    for b in range(batch):
        heads = []
        for h in range(num_heads):
            head = []
            for s in range(seq_len):
                head.append(tensor[b][s][h * d_head:(h + 1) * d_head])
            heads.append(head)
        result.append(heads)
    return result`,
  solution_explanation: "Multi-head attention의 핵심 reshape입니다. [B,S,D] → [B,H,S,D/H]로 변환하여 각 head가 독립적으로 attention을 수행합니다.",
  sample_tests: [
    { input: { tensor: [[[1,2,3,4],[5,6,7,8]]], num_heads: 2 }, expected: [[[[1,2],[5,6]],[[3,4],[7,8]]]] },
    { input: { tensor: [[[1,2,3],[4,5,6]]], num_heads: 1 }, expected: [[[[1,2,3],[4,5,6]]]] },
  ],
  hidden_tests: [
    { input: { tensor: [[[1,2,3,4,5,6]]], num_heads: 3 }, expected: [[[[1,2]],[[3,4]],[[5,6]]]], failure_category: "standard" },
    { input: { tensor: [[[1,2],[3,4]],[[5,6],[7,8]]], num_heads: 2 }, expected: [[[[1],[3]],[[2],[4]]],[[[5],[7]],[[6],[8]]]], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["multi_head_attention", "attention_scores"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
