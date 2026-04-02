import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "custom_dataset_logic",
  title: "Custom Dataset Indexing",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "data_pipeline"],
  statement_en: `Simulate PyTorch's \`Dataset.__getitem__\` logic.

Given:
- \`data\`: a list of [feature_list, label] pairs
- \`indices\`: a list of indices to retrieve (simulating a DataLoader batch)
- \`transform\`: a string indicating what transform to apply: "none", "normalize", or "flatten"

For each index, retrieve the data point and apply the transform:
- "none": return as-is
- "normalize": divide each feature value by the max absolute value in that feature list (if max is 0, keep as 0)
- "flatten": if features are nested lists, flatten them to 1D

Return a list of [transformed_features, label] for each index.

**Function signature:**
\`\`\`python
def solution(data: List, indices: List[int], transform: str) -> List:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(data: List, indices: List[int], transform: str) -> List:",
  constraints: ["0 <= indices[i] < len(data)", "transform is one of: none, normalize, flatten"],
  examples: [
    { input: { data: [[[1.0, 2.0], 0], [[3.0, 4.0], 1]], indices: [0, 1], transform: "none" }, output: [[[1.0, 2.0], 0], [[3.0, 4.0], 1]], explanation: "No transform applied" },
    { input: { data: [[[2.0, -4.0], 1]], indices: [0], transform: "normalize" }, output: [[[0.5, -1.0], 1]], explanation: "Divide by max(|2|, |-4|) = 4" },
  ],
  starter_code: `def solution(data: List, indices: List[int], transform: str) -> List:
    # PyTorch Dataset의 __getitem__ 로직을 시뮬레이션
    # 각 index에 대해 데이터를 가져오고 transform 적용
    pass`,
  hints: [
    "각 index로 data[idx]에서 [features, label]을 가져옵니다.",
    "normalize: max_abs = max(abs(x) for x in features). 0이 아니면 각 값을 max_abs로 나눕니다.",
    "flatten: isinstance(item, list)로 중첩 리스트를 감지하고 재귀적으로 펼칩니다.",
  ],
  solution_code: `def solution(data: List, indices: List[int], transform: str) -> List:
    def flatten_list(lst):
        result = []
        for item in lst:
            if isinstance(item, list):
                result.extend(flatten_list(item))
            else:
                result.append(item)
        return result
    
    result = []
    for idx in indices:
        features, label = data[idx]
        if transform == "normalize":
            max_abs = max((abs(x) for x in features), default=0)
            if max_abs > 0:
                features = [x / max_abs for x in features]
        elif transform == "flatten":
            features = flatten_list(features)
        result.append([features, label])
    return result`,
  solution_explanation: "PyTorch Dataset의 __getitem__과 transform 적용 로직을 시뮬레이션합니다. 실제 학습 파이프라인의 핵심 구성요소입니다.",
  sample_tests: [
    { input: { data: [[[1.0, 2.0], 0], [[3.0, 4.0], 1]], indices: [0, 1], transform: "none" }, expected: [[[1.0, 2.0], 0], [[3.0, 4.0], 1]] },
    { input: { data: [[[2.0, -4.0], 1]], indices: [0], transform: "normalize" }, expected: [[[0.5, -1.0], 1]] },
  ],
  hidden_tests: [
    { input: { data: [[[0.0, 0.0], 0]], indices: [0], transform: "normalize" }, expected: [[[0.0, 0.0], 0]], failure_category: "zero_division" },
    { input: { data: [[[[1, 2], [3, 4]], 1]], indices: [0], transform: "flatten" }, expected: [[[1, 2, 3, 4], 1]], failure_category: "nested_flatten" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation"],
  fallback_problem_ids: ["tensor_manipulation"],
};

export default problem;
