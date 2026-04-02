import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "freeze_param_count",
  title: "Frozen vs Trainable Parameter Counter",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "neural_network"],
  statement_en: `Given a model's layer specs and a list of frozen layer indices, compute:\n- Total parameters\n- Frozen parameters\n- Trainable parameters\n\nReturn [total, frozen, trainable].\n\nParameter counting rules:\n- Linear: in*out + out (if bias=true)\n- Embedding: num_embeddings * embedding_dim\n- LayerNorm: 2 * normalized_shape\n- Conv2d: out_ch * in_ch * k * k + out_ch (if bias=true)\n\n**Function signature:**\n\`\`\`python\ndef solution(layers: List[dict], frozen_indices: List[int]) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(layers: List[dict], frozen_indices: List[int]) -> List[int]:",
  constraints: ["0 <= frozen_indices[i] < len(layers)"],
  examples: [{ input: { layers: [{"type":"Embedding","num_embeddings":1000,"embedding_dim":64},{"type":"Linear","in_features":64,"out_features":10,"bias":true}], frozen_indices: [0] }, output: [64650, 64000, 650], explanation: "Emb=64000, Linear=650. Freeze emb." }],
  starter_code: "def solution(layers: List[dict], frozen_indices: List[int]) -> List[int]:\n    pass",
  hints: ["각 레이어의 파라미터 수를 계산한 후, frozen_indices에 해당하는 레이어의 파라미터를 frozen에 누적합니다.", "Transfer learning에서 backbone 동결은 필수 기법입니다."],
  solution_code: `def solution(layers: List[dict], frozen_indices: List[int]) -> List[int]:
    frozen_set = set(frozen_indices)
    total = 0
    frozen = 0
    for i, layer in enumerate(layers):
        t = layer["type"]
        p = 0
        if t == "Linear":
            p = layer["in_features"] * layer["out_features"]
            if layer.get("bias", True):
                p += layer["out_features"]
        elif t == "Embedding":
            p = layer["num_embeddings"] * layer["embedding_dim"]
        elif t == "LayerNorm":
            p = 2 * layer["normalized_shape"]
        elif t == "Conv2d":
            k = layer["kernel_size"]
            p = layer["out_channels"] * layer["in_channels"] * k * k
            if layer.get("bias", True):
                p += layer["out_channels"]
        total += p
        if i in frozen_set:
            frozen += p
    return [total, frozen, total - frozen]`,
  solution_explanation: "파라미터 동결은 transfer learning, fine-tuning, LoRA 등에서 핵심입니다. requires_grad=False로 설정하면 해당 파라미터의 gradient는 계산되지 않습니다.",
  sample_tests: [
    { input: { layers: [{"type":"Embedding","num_embeddings":1000,"embedding_dim":64},{"type":"Linear","in_features":64,"out_features":10,"bias":true}], frozen_indices: [0] }, expected: [64650, 64000, 650] },
    { input: { layers: [{"type":"Linear","in_features":10,"out_features":10,"bias":true}], frozen_indices: [] }, expected: [110, 0, 110] },
  ],
  hidden_tests: [
    { input: { layers: [{"type":"LayerNorm","normalized_shape":768},{"type":"Linear","in_features":768,"out_features":3072,"bias":true},{"type":"Linear","in_features":3072,"out_features":768,"bias":true}], frozen_indices: [0,1] }, expected: [4723968, 2363904, 2360064], failure_category: "standard" },
    { input: { layers: [{"type":"Linear","in_features":5,"out_features":5,"bias":false}], frozen_indices: [0] }, expected: [25, 25, 0], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["model_param_counter", "model_memory_calc"],
  fallback_problem_ids: ["model_param_counter"],
};
export default problem;
