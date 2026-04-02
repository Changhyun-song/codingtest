import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "model_memory_calc",
  title: "GPU Memory Estimator",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "optimization"],
  statement_en: `Estimate GPU memory usage for model training.\n\nGiven layers and optimizer type, compute:\n- total_params from layers (same rules as model_param_counter)\n- memory = params × bytes_per_param × multiplier\n  - multiplier: SGD = 2 (params + grads), Adam = 4 (params + grads + m + v)\n  - bytes_per_param = 4 (float32)\n\nReturn [total_params, memory_bytes].\n\n**Function signature:**\n\`\`\`python\ndef solution(layers: List[dict], optimizer: str) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(layers: List[dict], optimizer: str) -> List[int]:",
  constraints: ["optimizer is 'sgd' or 'adam'"],
  examples: [{ input: { layers: [{"type":"Linear","in_features":100,"out_features":10,"bias":true}], optimizer: "adam" }, output: [1010, 16160], explanation: "params=100*10+10=1010, memory=1010*4*4=16160" }],
  starter_code: "def solution(layers: List[dict], optimizer: str) -> List[int]:\n    pass",
  hints: ["먼저 총 파라미터 수를 계산합니다 (Linear, Conv2d, LayerNorm, Embedding 등).", "Adam은 파라미터의 4배(params+grads+m+v), SGD는 2배(params+grads) 메모리가 필요합니다."],
  solution_code: `def solution(layers: List[dict], optimizer: str) -> List[int]:
    total = 0
    for layer in layers:
        t = layer["type"]
        if t == "Linear":
            total += layer["in_features"] * layer["out_features"]
            if layer.get("bias", True):
                total += layer["out_features"]
        elif t == "Conv2d":
            k = layer["kernel_size"]
            total += layer["out_channels"] * layer["in_channels"] * k * k
            if layer.get("bias", True):
                total += layer["out_channels"]
        elif t == "LayerNorm":
            total += 2 * layer["normalized_shape"]
        elif t == "Embedding":
            total += layer["num_embeddings"] * layer["embedding_dim"]
    mult = 4 if optimizer == "adam" else 2
    return [total, total * 4 * mult]`,
  solution_explanation: "GPU 메모리 추정은 대규모 모델 학습 계획에 필수입니다. Adam은 SGD 대비 2배의 추가 메모리가 필요합니다.",
  sample_tests: [
    { input: { layers: [{"type":"Linear","in_features":100,"out_features":10,"bias":true}], optimizer: "adam" }, expected: [1010, 16160] },
    { input: { layers: [{"type":"Embedding","num_embeddings":1000,"embedding_dim":64}], optimizer: "sgd" }, expected: [64000, 512000] },
  ],
  hidden_tests: [
    { input: { layers: [{"type":"LayerNorm","normalized_shape":768}], optimizer: "adam" }, expected: [1536, 24576], failure_category: "standard" },
    { input: { layers: [{"type":"Linear","in_features":10,"out_features":10,"bias":false}], optimizer: "sgd" }, expected: [100, 800], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["model_param_counter", "model_flops_count"],
  fallback_problem_ids: ["model_param_counter"],
};
export default problem;
