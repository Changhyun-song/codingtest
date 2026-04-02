import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_dataloader_batch",
  title: "DataLoader Batch Iteration",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "dataloader", "dataset", "batching"],
  statement_en: `Create a custom Dataset from a 1D list of numbers, then use a DataLoader with a given **batch_size** to iterate over it.

Return a list of all batches (each batch converted to a list). Use \`shuffle=False\` and \`drop_last=False\`.

The dataset should store data as \`torch.float32\` tensors.`,
  function_name: "solution",
  signature: "def solution(data: list, batch_size: int) -> list:",
  constraints: [
    "1 <= len(data) <= 20",
    "1 <= batch_size <= len(data)",
    "data contains integers or floats",
    "shuffle=False, drop_last=False",
  ],
  examples: [
    {
      input: { data: [1, 2, 3, 4, 5], batch_size: 2 },
      output: [[1.0, 2.0], [3.0, 4.0], [5.0]],
      explanation:
        "5 items with batch_size=2 gives 3 batches: [1,2], [3,4], and [5] (last batch is smaller).",
    },
    {
      input: { data: [10, 20, 30, 40], batch_size: 4 },
      output: [[10.0, 20.0, 30.0, 40.0]],
      explanation:
        "4 items with batch_size=4 gives 1 batch containing all items.",
    },
  ],
  starter_code: `import torch
from torch.utils.data import Dataset, DataLoader

def solution(data: list, batch_size: int) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "Dataset 클래스를 상속하여 __len__과 __getitem__을 구현하세요.",
    "데이터를 torch.tensor(data, dtype=torch.float32)로 변환하여 저장하세요.",
    "DataLoader(ds, batch_size=batch_size, shuffle=False, drop_last=False)로 로더를 만든 뒤, 각 배치를 .tolist()로 변환하여 결과 리스트에 추가하세요.",
  ],
  solution_code: `import torch
from torch.utils.data import Dataset, DataLoader

def solution(data: list, batch_size: int) -> list:
    class ListDataset(Dataset):
        def __init__(self, data):
            self.data = torch.tensor(data, dtype=torch.float32)
        def __len__(self):
            return len(self.data)
        def __getitem__(self, idx):
            return self.data[idx]
    ds = ListDataset(data)
    loader = DataLoader(ds, batch_size=batch_size, shuffle=False, drop_last=False)
    result = []
    for batch in loader:
        result.append(batch.tolist())
    return result`,
  solution_explanation:
    "Dataset을 상속하여 데이터를 float32 텐서로 저장합니다. DataLoader는 지정된 batch_size로 데이터를 순차적으로 분할합니다. shuffle=False로 순서를 유지하고, drop_last=False로 마지막 불완전한 배치도 포함합니다. 각 배치를 .tolist()로 변환하여 최종 결과를 반환합니다.",
  sample_tests: [
    {
      input: { data: [1, 2, 3, 4, 5], batch_size: 2 },
      expected: [[1.0, 2.0], [3.0, 4.0], [5.0]],
    },
    {
      input: { data: [10, 20, 30, 40], batch_size: 4 },
      expected: [[10.0, 20.0, 30.0, 40.0]],
    },
  ],
  hidden_tests: [
    {
      input: { data: [1, 2, 3, 4, 5, 6], batch_size: 3 },
      expected: [
        [1.0, 2.0, 3.0],
        [4.0, 5.0, 6.0],
      ],
      failure_category: "even_batching",
    },
    {
      input: { data: [1, 2, 3, 4, 5, 6, 7], batch_size: 3 },
      expected: [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0]],
      failure_category: "remainder_batch",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
