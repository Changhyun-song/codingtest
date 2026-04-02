import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_custom_dataset",
  title: "Custom Dataset Implementation",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "dataset", "data-loading"],
  statement_en: `Implement a custom PyTorch Dataset class.

Given two lists: **data** and **labels**, create a \`Dataset\` that stores them. Each item returned by the dataset should be \`[data_item, label_item]\`.

Return a list containing:
1. The length of the dataset
2. The item at index 0
3. The item at index 2

i.e. \`[len(dataset), dataset[0], dataset[2]]\``,
  function_name: "solution",
  signature: "def solution(data: list, labels: list) -> list:",
  constraints: [
    "data and labels have the same length",
    "len(data) >= 3",
    "Each data element can be an int or a list of ints",
    "Each label element is an int",
  ],
  examples: [
    {
      input: { data: [[1, 2], [3, 4], [5, 6], [7, 8]], labels: [0, 1, 0, 1] },
      output: [4, [[1, 2], 0], [[5, 6], 0]],
      explanation:
        "Dataset has 4 items. Index 0 is [[1,2], 0], index 2 is [[5,6], 0].",
    },
    {
      input: { data: [10, 20, 30], labels: [1, 2, 3] },
      output: [3, [10, 1], [30, 3]],
      explanation:
        "Dataset has 3 items. Index 0 is [10, 1], index 2 is [30, 3].",
    },
  ],
  starter_code: `import torch
from torch.utils.data import Dataset

def solution(data: list, labels: list) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.utils.data.Dataset을 상속하여 __len__과 __getitem__을 구현하세요.",
    "__getitem__은 [self.data[idx], self.labels[idx]] 형태로 반환하면 됩니다.",
    "최종 결과는 [len(ds), ds[0], ds[2]] 리스트입니다.",
  ],
  solution_code: `import torch
from torch.utils.data import Dataset

def solution(data: list, labels: list) -> list:
    class SimpleDataset(Dataset):
        def __init__(self, data, labels):
            self.data = data
            self.labels = labels
        def __len__(self):
            return len(self.data)
        def __getitem__(self, idx):
            return [self.data[idx], self.labels[idx]]
    ds = SimpleDataset(data, labels)
    return [len(ds), ds[0], ds[2]]`,
  solution_explanation:
    "Dataset 클래스를 상속받아 __len__과 __getitem__ 메서드를 구현합니다. __len__은 데이터 길이를 반환하고, __getitem__은 해당 인덱스의 [data, label] 쌍을 반환합니다. 최종적으로 길이, 0번 인덱스 아이템, 2번 인덱스 아이템을 리스트로 묶어 반환합니다.",
  sample_tests: [
    {
      input: { data: [[1, 2], [3, 4], [5, 6], [7, 8]], labels: [0, 1, 0, 1] },
      expected: [4, [[1, 2], 0], [[5, 6], 0]],
    },
    {
      input: { data: [10, 20, 30], labels: [1, 2, 3] },
      expected: [3, [10, 1], [30, 3]],
    },
  ],
  hidden_tests: [
    {
      input: {
        data: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
        labels: [0, 0, 1, 1, 0],
      },
      expected: [5, [[0, 0], 0], [[2, 2], 1]],
      failure_category: "dataset_indexing",
    },
    {
      input: { data: [100, 200, 300, 400], labels: [10, 20, 30, 40] },
      expected: [4, [100, 10], [300, 30]],
      failure_category: "dataset_length",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
