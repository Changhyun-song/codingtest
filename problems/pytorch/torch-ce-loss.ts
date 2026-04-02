import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_ce_loss",
  title: "Cross-Entropy Loss",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss", "cross-entropy", "classification"],
  statement_en: `Given a 2D list of logits with shape [batch_size, num_classes] and a 1D list of integer target labels, compute the cross-entropy loss using PyTorch.

Use \`torch.nn.CrossEntropyLoss()\`, which internally applies log-softmax and negative log-likelihood. The function should return the scalar loss value (averaged over the batch).

Recall: CrossEntropyLoss(x, class) = -log(exp(x[class]) / sum(exp(x[j]) for all j))`,
  function_name: "solution",
  signature:
    "def solution(logits: list[list[float]], targets: list[int]) -> float:",
  constraints: [
    "1 <= batch_size <= 10",
    "2 <= num_classes <= 10",
    "0 <= targets[i] < num_classes",
    "Logit values are in [-100.0, 100.0]",
  ],
  examples: [
    {
      input: { logits: [[2.0, 1.0, 0.1]], targets: [0] },
      output: 0.417,
      explanation:
        "softmax([2.0, 1.0, 0.1]) ≈ [0.659, 0.242, 0.099]. CE = -log(0.659) ≈ 0.417",
    },
    {
      input: { logits: [[1.0, 1.0]], targets: [0] },
      output: 0.6931,
      explanation:
        "softmax([1.0, 1.0]) = [0.5, 0.5]. CE = -log(0.5) ≈ 0.6931",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(logits, targets):
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "nn.CrossEntropyLoss()는 내부적으로 softmax를 적용하므로 별도로 softmax를 적용하지 않아도 됩니다.",
    "logits는 float32, targets는 long(int64) 타입으로 변환해야 합니다.",
    "결과는 .item()으로 스칼라 값을 추출하세요.",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(logits, targets):
    l = torch.tensor(logits, dtype=torch.float32)
    t = torch.tensor(targets, dtype=torch.long)
    return nn.CrossEntropyLoss()(l, t).item()`,
  solution_explanation:
    "logits를 float32 텐서로, targets를 long 텐서로 변환합니다. nn.CrossEntropyLoss()는 내부적으로 log_softmax를 적용한 후 negative log likelihood를 계산합니다. 배치에 대한 평균 손실 값을 스칼라로 반환합니다.",
  sample_tests: [
    {
      input: { logits: [[2.0, 1.0, 0.1]], targets: [0] },
      expected: 0.417,
    },
    {
      input: { logits: [[1.0, 1.0]], targets: [0] },
      expected: 0.6931,
    },
  ],
  hidden_tests: [
    {
      input: { logits: [[0.0, 0.0, 0.0]], targets: [1] },
      expected: 1.0986,
      failure_category: "uniform_distribution",
    },
    {
      input: {
        logits: [
          [10.0, 0.0],
          [0.0, 10.0],
        ],
        targets: [0, 1],
      },
      expected: 0.0000454,
      failure_category: "high_confidence",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
