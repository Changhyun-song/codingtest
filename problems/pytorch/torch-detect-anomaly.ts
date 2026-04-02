import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_detect_anomaly",
  title: "Detect Training Anomalies from Gradients and Losses",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "debugging", "gradients", "training-diagnostics"],
  statement_en: `Detect common PyTorch training problems by analyzing gradient and loss tensors.

Given a list of gradient values and a list of loss values recorded over training steps, diagnose the training status by checking the following conditions in order:

1. "vanishing_grad" — if the mean of absolute gradient values is less than 1e-7
2. "exploding_grad" — if the maximum absolute gradient value exceeds 1e6
3. "loss_plateau" — if the standard deviation of the last 5 loss values (or all losses if fewer than 5) is less than 1e-6
4. "healthy" — if none of the above conditions are met

Return the diagnosis as a string. Check conditions in the order listed and return the first match.`,
  function_name: "solution",
  signature: "def solution(gradients: list, losses: list) -> str:",
  constraints: [
    "gradients is a non-empty list of floats",
    "losses is a non-empty list of floats",
    "All values are finite (no NaN or Inf)",
    "Conditions are checked in the specified order; return the first match",
  ],
  examples: [
    {
      input: { gradients: [0.01, 0.02, -0.01], losses: [2.0, 1.5, 1.0] },
      output: "healthy",
      explanation:
        "Mean |grad| = 0.0133 (> 1e-7), max |grad| = 0.02 (< 1e6), loss std ≈ 0.5 (> 1e-6). All checks pass, so training is healthy.",
    },
    {
      input: {
        gradients: [1e-10, 1e-11, 1e-12],
        losses: [5.0, 5.0, 5.0],
      },
      output: "vanishing_grad",
      explanation:
        "Mean |grad| ≈ 3.7e-11 which is less than 1e-7, indicating vanishing gradients.",
    },
  ],
  starter_code: `import torch

def solution(gradients, losses):
    pass`,
  hints: [
    "조건을 순서대로 확인하고 첫 번째로 일치하는 진단을 반환하세요.",
    "torch.abs()로 절대값을 구한 후 .mean()과 .max()를 사용하세요.",
    "손실 정체를 확인할 때는 마지막 5개 값의 표준편차를 계산하세요.",
    "텐서 슬라이싱 l[-5:]로 마지막 5개 요소를 추출할 수 있습니다.",
  ],
  solution_code: `import torch

def solution(gradients, losses):
    g = torch.tensor(gradients, dtype=torch.float32)
    l = torch.tensor(losses, dtype=torch.float32)
    if g.abs().mean() < 1e-7:
        return "vanishing_grad"
    if g.abs().max() > 1e6:
        return "exploding_grad"
    recent = l[-5:] if len(l) >= 5 else l
    if recent.std() < 1e-6:
        return "loss_plateau"
    return "healthy"`,
  solution_explanation:
    "학습 진단은 그래디언트와 손실 패턴을 분석하여 수행합니다. 먼저 그래디언트의 평균 절대값이 1e-7 미만이면 기울기 소실(vanishing gradient)로 진단합니다. 다음으로 최대 절대값이 1e6을 초과하면 기울기 폭발(exploding gradient)입니다. 마지막 5개 손실의 표준편차가 1e-6 미만이면 손실이 정체(plateau)된 것입니다. 어떤 조건에도 해당하지 않으면 학습이 정상(healthy)입니다. 조건 확인 순서가 중요하며, 첫 번째로 일치하는 진단을 반환합니다.",
  sample_tests: [
    {
      input: { gradients: [0.01, 0.02, -0.01], losses: [2.0, 1.5, 1.0] },
      expected: "healthy",
    },
    {
      input: {
        gradients: [1e-10, 1e-11, 1e-12],
        losses: [5.0, 5.0, 5.0],
      },
      expected: "vanishing_grad",
    },
  ],
  hidden_tests: [
    {
      input: {
        gradients: [1e8, -2e7, 5e6],
        losses: [1.0, 0.5, 0.3],
      },
      expected: "exploding_grad",
      failure_category: "missed_exploding_gradient",
    },
    {
      input: {
        gradients: [0.01, 0.02],
        losses: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
      },
      expected: "loss_plateau",
      failure_category: "missed_loss_plateau",
    },
    {
      input: {
        gradients: [0.5, -0.3, 0.4, -0.2],
        losses: [3.0, 2.5, 2.0, 1.5],
      },
      expected: "healthy",
      failure_category: "false_positive_diagnosis",
    },
  ],
  checker_type: "exact",
  tolerance: 0,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
