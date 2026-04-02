import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "missing_modality_fill",
  title: "Missing Modality Batch Handler",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "data_loading"],
  statement_en: `Handle **missing modalities** in a multimodal batch.\n\nGiven a batch where each sample has modalities (represented as feature lists). Empty list [] means the modality is missing.\n\nFor each sample:\n1. Replace missing modality features with zeros of the correct dimension\n2. Create a presence mask per modality (1=present, 0=missing)\n\nThe correct dimension for each modality is the max non-empty dimension in the batch.\n\nReturn [filled_batch, presence_masks].\n\n**Function signature:**\n\`\`\`python\ndef solution(batch: List[List[List[float]]], num_modalities: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(batch: List[List[List[float]]], num_modalities: int) -> List:",
  constraints: ["0 <= modality index < num_modalities"],
  examples: [{ input: { batch: [[[1.0, 2.0], [3.0, 4.0]], [[5.0, 6.0], []], [[], [7.0, 8.0]]], num_modalities: 2 }, output: [[[[1.0,2.0],[3.0,4.0]],[[5.0,6.0],[0.0,0.0]],[[0.0,0.0],[7.0,8.0]]],[[1,1],[1,0],[0,1]]], explanation: "Fill missing with zeros, track presence" }],
  starter_code: "def solution(batch: List[List[List[float]]], num_modalities: int) -> List:\n    pass",
  hints: ["먼저 각 모달리티의 feature 차원을 non-empty 샘플에서 결정합니다.", "Missing modality에 대한 robust한 처리는 멀티모달 모델의 핵심 도전입니다."],
  solution_code: `def solution(batch: List[List[List[float]]], num_modalities: int) -> List:
    dims = [0] * num_modalities
    for sample in batch:
        for m in range(num_modalities):
            if m < len(sample) and sample[m]:
                dims[m] = max(dims[m], len(sample[m]))
    filled = []
    masks = []
    for sample in batch:
        row = []
        mask = []
        for m in range(num_modalities):
            if m < len(sample) and sample[m]:
                row.append(sample[m])
                mask.append(1)
            else:
                row.append([0.0] * dims[m])
                mask.append(0)
        filled.append(row)
        masks.append(mask)
    return [filled, masks]`,
  solution_explanation: "실제 멀티모달 데이터에서 모달리티 누락은 흔합니다. 0으로 채우고 마스크로 추적하면 모델이 학습 중 누락을 처리할 수 있습니다.",
  sample_tests: [
    { input: { batch: [[[1.0,2.0],[3.0,4.0]],[[5.0,6.0],[]],[[],[7.0,8.0]]], num_modalities: 2 }, expected: [[[[1.0,2.0],[3.0,4.0]],[[5.0,6.0],[0.0,0.0]],[[0.0,0.0],[7.0,8.0]]],[[1,1],[1,0],[0,1]]] },
    { input: { batch: [[[1.0]]], num_modalities: 1 }, expected: [[[[1.0]]],[[1]]] },
  ],
  hidden_tests: [
    { input: { batch: [[[],[]]],  num_modalities: 2 }, expected: [[[[], []]], [[0, 0]]], failure_category: "edge_case" },
    { input: { batch: [[[1.0, 2.0, 3.0], []], [[], [4.0, 5.0]]], num_modalities: 2 }, expected: [[[[1.0,2.0,3.0],[0.0,0.0]],[[0.0,0.0,0.0],[4.0,5.0]]],[[1,0],[0,1]]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["multimodal_collate_pad", "modality_dropout_mask"],
  fallback_problem_ids: ["multimodal_collate_pad"],
};
export default problem;
