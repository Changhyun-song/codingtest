import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "multimodal_collate_pad",
  title: "Multimodal Collate with Padding",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "data_loading"],
  statement_en: `Implement a **collate function** for multimodal (image + text) batches.\n\nGiven image features (all same dimension) and variable-length text sequences:\n1. Keep image features as-is\n2. Pad text sequences to max length with pad_token\n3. Create attention masks (1=real, 0=padding)\n\nReturn [images, padded_texts, text_masks].\n\n**Function signature:**\n\`\`\`python\ndef solution(images: List[List[float]], texts: List[List[int]], pad_token: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(images: List[List[float]], texts: List[List[int]], pad_token: int) -> List:",
  constraints: ["len(images) == len(texts)", "texts may have different lengths"],
  examples: [{ input: { images: [[1.0,2.0],[3.0,4.0]], texts: [[10,20,30],[40]], pad_token: 0 }, output: [[[1.0,2.0],[3.0,4.0]],[[10,20,30],[40,0,0]],[[1,1,1],[1,0,0]]], explanation: "Pad shorter text to length 3" }],
  starter_code: "def solution(images: List[List[float]], texts: List[List[int]], pad_token: int) -> List:\n    pass",
  hints: ["max_len = max(len(t) for t in texts)로 최대 길이를 구합니다.", "각 text를 max_len까지 pad_token으로 채우고, mask는 원본 길이만큼 1을 넣습니다."],
  solution_code: `def solution(images: List[List[float]], texts: List[List[int]], pad_token: int) -> List:
    if not texts:
        return [images, [], []]
    max_len = max(len(t) for t in texts)
    padded = [t + [pad_token] * (max_len - len(t)) for t in texts]
    masks = [[1] * len(t) + [0] * (max_len - len(t)) for t in texts]
    return [images, padded, masks]`,
  solution_explanation: "멀티모달 collate는 CLIP, VLM 등의 데이터 파이프라인 핵심입니다. 모달리티별 다른 전처리와 패딩이 필요합니다.",
  sample_tests: [
    { input: { images: [[1.0,2.0],[3.0,4.0]], texts: [[10,20,30],[40]], pad_token: 0 }, expected: [[[1.0,2.0],[3.0,4.0]],[[10,20,30],[40,0,0]],[[1,1,1],[1,0,0]]] },
    { input: { images: [[1.0]], texts: [[5,6]], pad_token: -1 }, expected: [[[1.0]],[[5,6]],[[1,1]]] },
  ],
  hidden_tests: [
    { input: { images: [[0.0]], texts: [[1]], pad_token: 0 }, expected: [[[0.0]],[[1]],[[1]]], failure_category: "edge_case" },
    { input: { images: [[1.0,2.0],[3.0,4.0],[5.0,6.0]], texts: [[1],[2,3],[4,5,6,7]], pad_token: 0 }, expected: [[[1.0,2.0],[3.0,4.0],[5.0,6.0]],[[1,0,0,0],[2,3,0,0],[4,5,6,7]],[[1,0,0,0],[1,1,0,0],[1,1,1,1]]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["batch_pad_collate", "dynamic_batch_grouping"],
  fallback_problem_ids: ["batch_pad_collate"],
};
export default problem;
