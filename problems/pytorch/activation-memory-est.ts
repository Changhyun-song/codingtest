import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "activation_memory_est",
  title: "Transformer Activation Memory Estimator",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "optimization"],
  statement_en: `Estimate the **activation memory** for one transformer layer during training.\n\nComponents:\n- QKV projections: 3 × B × S × H × dtype_bytes\n- Attention scores: B × num_heads × S × S × dtype_bytes\n- Attention output: B × S × H × dtype_bytes\n- FFN intermediate: B × S × H × ffn_mult × dtype_bytes\n- FFN output: B × S × H × dtype_bytes\n- Layer norms (×2): 2 × B × S × H × dtype_bytes\n\nReturn total activation memory in MB (1 MB = 1048576 bytes), rounded to 2 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(batch: int, seq_len: int, hidden: int, num_heads: int, ffn_mult: int, dtype_bytes: int) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(batch: int, seq_len: int, hidden: int, num_heads: int, ffn_mult: int, dtype_bytes: int) -> float:",
  constraints: ["all > 0"],
  examples: [{ input: { batch: 4, seq_len: 512, hidden: 768, num_heads: 12, ffn_mult: 4, dtype_bytes: 4 }, output: 114.0, explanation: "Sum of all activation components / 1048576" }],
  starter_code: "def solution(batch: int, seq_len: int, hidden: int, num_heads: int, ffn_mult: int, dtype_bytes: int) -> float:\n    pass",
  hints: ["각 컴포넌트의 텐서 크기를 계산하고 합산합니다.", "Attention score의 S×S 항이 긴 시퀀스에서 메모리 병목이 됩니다."],
  solution_code: `def solution(batch: int, seq_len: int, hidden: int, num_heads: int, ffn_mult: int, dtype_bytes: int) -> float:
    B, S, H, db = batch, seq_len, hidden, dtype_bytes
    qkv = 3 * B * S * H * db
    attn = B * num_heads * S * S * db
    attn_out = B * S * H * db
    ffn_i = B * S * H * ffn_mult * db
    ffn_o = B * S * H * db
    ln = 2 * B * S * H * db
    total = qkv + attn + attn_out + ffn_i + ffn_o + ln
    return round(total / 1048576, 2)`,
  solution_explanation: "활성화 메모리 추정은 배치 크기와 시퀀스 길이 결정에 핵심입니다. 특히 S×S attention score는 시퀀스 길이에 O(S²)으로 증가합니다.",
  sample_tests: [
    { input: { batch: 4, seq_len: 512, hidden: 768, num_heads: 12, ffn_mult: 4, dtype_bytes: 4 }, expected: 114.0 },
    { input: { batch: 1, seq_len: 128, hidden: 256, num_heads: 4, ffn_mult: 4, dtype_bytes: 2 }, expected: 0.81 },
  ],
  hidden_tests: [
    { input: { batch: 8, seq_len: 2048, hidden: 1024, num_heads: 16, ffn_mult: 4, dtype_bytes: 2 }, expected: 576.0, failure_category: "standard" },
    { input: { batch: 1, seq_len: 1, hidden: 1, num_heads: 1, ffn_mult: 4, dtype_bytes: 4 }, expected: 0.0, failure_category: "edge_case" },
  ],
  checker_type: "float_tolerance",
  tolerance: 1.0,
  similar_problem_ids: ["model_memory_calc", "gradient_checkpoint_est"],
  fallback_problem_ids: ["model_memory_calc"],
};
export default problem;
