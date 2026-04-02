import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "shape_error_finder",
  title: "Shape Mismatch Debugger",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "neural_network"],
  statement_en: `Given an input shape and a sequence of layers, find the first layer where a shape mismatch occurs.\n\nSupported layers:\n- Linear: expects last dim == in_features, outputs [..., out_features]\n- Conv2d: expects shape [C,H,W] with C==in_channels, outputs [out_ch, H', W']\n- Flatten: collapses all dims to one\n- ReLU: no shape change\n\nReturn the 0-based index of the first incompatible layer, or -1 if all layers are compatible.\n\n**Function signature:**\n\`\`\`python\ndef solution(input_shape: List[int], layers: List[dict]) -> int:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(input_shape: List[int], layers: List[dict]) -> int:",
  constraints: ["1 <= len(layers) <= 50"],
  examples: [{ input: { input_shape: [3, 32, 32], layers: [{"type":"Conv2d","in_channels":3,"out_channels":16,"kernel_size":3,"padding":1,"stride":1},{"type":"Flatten"},{"type":"Linear","in_features":16384,"out_features":10}] }, output: -1, explanation: "All layers compatible" }],
  starter_code: "def solution(input_shape: List[int], layers: List[dict]) -> int:\n    pass",
  hints: ["각 레이어를 순서대로 처리하며 현재 shape를 업데이트하세요.", "Linear은 마지막 차원을 확인, Conv2d는 채널 수와 spatial 크기를 계산합니다."],
  solution_code: `def solution(input_shape: List[int], layers: List[dict]) -> int:
    shape = list(input_shape)
    for i, layer in enumerate(layers):
        t = layer["type"]
        if t == "Linear":
            if shape[-1] != layer["in_features"]:
                return i
            shape[-1] = layer["out_features"]
        elif t == "Conv2d":
            if len(shape) < 3 or shape[0] != layer["in_channels"]:
                return i
            p = layer.get("padding", 0)
            s = layer.get("stride", 1)
            k = layer["kernel_size"]
            h = (shape[1] + 2 * p - k) // s + 1
            w = (shape[2] + 2 * p - k) // s + 1
            if h <= 0 or w <= 0:
                return i
            shape = [layer["out_channels"], h, w]
        elif t == "Flatten":
            total = 1
            for s in shape:
                total *= s
            shape = [total]
        elif t == "ReLU":
            pass
    return -1`,
  solution_explanation: "모델 디버깅의 첫 단계는 shape mismatch를 찾는 것입니다. 각 레이어의 입출력 shape를 추적하세요.",
  sample_tests: [
    { input: { input_shape: [3,32,32], layers: [{"type":"Conv2d","in_channels":3,"out_channels":16,"kernel_size":3,"padding":1,"stride":1},{"type":"Flatten"},{"type":"Linear","in_features":16384,"out_features":10}] }, expected: -1 },
    { input: { input_shape: [3,32,32], layers: [{"type":"Conv2d","in_channels":3,"out_channels":16,"kernel_size":3,"padding":0,"stride":1},{"type":"Flatten"},{"type":"Linear","in_features":1024,"out_features":10}] }, expected: 2 },
  ],
  hidden_tests: [
    { input: { input_shape: [1,8,8], layers: [{"type":"Conv2d","in_channels":3,"out_channels":8,"kernel_size":3,"padding":0,"stride":1}] }, expected: 0, failure_category: "edge_case" },
    { input: { input_shape: [64], layers: [{"type":"Linear","in_features":64,"out_features":32},{"type":"ReLU"},{"type":"Linear","in_features":32,"out_features":10}] }, expected: -1, failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["conv_output_shape", "model_param_counter"],
  fallback_problem_ids: ["conv_output_shape"],
};
export default problem;
