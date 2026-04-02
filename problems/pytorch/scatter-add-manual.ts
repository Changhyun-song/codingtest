import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "scatter_add_manual",
  title: "Scatter Add Operation",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Implement **scatter_add**: accumulate values into an output tensor at given indices.\n\nGiven:\n- values: 1D list of floats\n- indices: 1D list of ints (same length as values)\n- size: output tensor size\n\nFor each (value, index) pair, add value to output[index].\nReturn the output tensor, rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(values: List[float], indices: List[int], size: int) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(values: List[float], indices: List[int], size: int) -> List[float]:",
  constraints: ["0 <= indices[i] < size", "len(values) == len(indices)"],
  examples: [{ input: { values: [1.0,2.0,3.0,4.0], indices: [0,1,0,2], size: 3 }, output: [4.0,2.0,4.0], explanation: "idx0: 1+3=4, idx1: 2, idx2: 4" }],
  starter_code: "def solution(values: List[float], indices: List[int], size: int) -> List[float]:\n    pass",
  hints: ["크기 size의 0 벡터를 만들고, 각 (value, index) 쌍에 대해 result[index] += value.", "scatter_add는 GNN의 message passing, 임베딩 집계 등에 핵심적으로 사용됩니다."],
  solution_code: `def solution(values: List[float], indices: List[int], size: int) -> List[float]:
    result = [0.0] * size
    for v, i in zip(values, indices):
        result[i] += v
    return [round(x, 4) for x in result]`,
  solution_explanation: "Scatter add는 torch.scatter_add_의 핵심 로직입니다. GNN에서 이웃 노드 메시지를 집계하거나, 가변 길이 시퀀스를 인덱스 기반으로 합산할 때 사용됩니다.",
  sample_tests: [
    { input: { values: [1.0,2.0,3.0,4.0], indices: [0,1,0,2], size: 3 }, expected: [4.0,2.0,4.0] },
    { input: { values: [1.5,2.5], indices: [0,0], size: 2 }, expected: [4.0,0.0] },
  ],
  hidden_tests: [
    { input: { values: [1.0], indices: [4], size: 5 }, expected: [0.0,0.0,0.0,0.0,1.0], failure_category: "edge_case" },
    { input: { values: [0.1,0.2,0.3,0.4,0.5,0.6], indices: [0,1,2,0,1,2], size: 3 }, expected: [0.5,0.7,0.9], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["tensor_indexing_gather", "masked_reduction"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
