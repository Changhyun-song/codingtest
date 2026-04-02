import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_concat_fusion",
  title: "Multimodal Feature Fusion by Concatenation",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "multimodal", "feature-fusion", "linear-projection"],
  statement_en: `Implement multimodal feature fusion by concatenation followed by linear projection.

Given text features of shape [batch, text_dim] and image features of shape [batch, image_dim]:
1. Concatenate them along the last dimension to get a fused tensor of shape [batch, text_dim + image_dim].
2. Apply a linear projection: output = fused @ weight + bias, where weight has shape [text_dim + image_dim, output_dim] and bias has shape [output_dim].

Return the output as a nested list.`,
  function_name: "solution",
  signature:
    "def solution(text_features: list, image_features: list, weight: list, bias: list) -> list:",
  constraints: [
    "text_features shape: [batch, text_dim]",
    "image_features shape: [batch, image_dim]",
    "weight shape: [text_dim + image_dim, output_dim]",
    "bias shape: [output_dim]",
    "Both inputs have the same batch size",
  ],
  examples: [
    {
      input: {
        text_features: [[1, 2]],
        image_features: [[3, 4]],
        weight: [
          [1, 0],
          [0, 1],
          [1, 1],
          [0, 0],
        ],
        bias: [0, 0],
      },
      output: [[4.0, 5.0]],
      explanation:
        "Fused = [[1,2,3,4]]. Output = [[1*1+2*0+3*1+4*0, 1*0+2*1+3*1+4*0]] + [0,0] = [[4, 5]].",
    },
  ],
  starter_code: `import torch

def solution(text_features, image_features, weight, bias):
    pass`,
  hints: [
    "torch.cat([t, i], dim=-1)으로 마지막 차원을 따라 텐서를 연결하세요.",
    "행렬 곱셈은 @ 연산자 또는 torch.matmul()을 사용하세요.",
    "weight의 shape이 [input_dim, output_dim]이므로 fused @ weight로 계산합니다.",
  ],
  solution_code: `import torch

def solution(text_features, image_features, weight, bias):
    t = torch.tensor(text_features, dtype=torch.float32)
    i = torch.tensor(image_features, dtype=torch.float32)
    w = torch.tensor(weight, dtype=torch.float32)
    b = torch.tensor(bias, dtype=torch.float32)
    fused = torch.cat([t, i], dim=-1)
    output = fused @ w + b
    return output.tolist()`,
  solution_explanation:
    "멀티모달 퓨전은 서로 다른 모달리티(텍스트, 이미지)의 특성을 결합하는 기법입니다. 가장 간단한 방법은 연결(concatenation) 후 선형 투영입니다. torch.cat()으로 텍스트와 이미지 특성을 마지막 차원에서 연결하면 [batch, text_dim + image_dim] 형태가 됩니다. 이를 가중치 행렬과 행렬 곱셈하고 편향을 더하면 원하는 출력 차원으로 투영됩니다. 이는 nn.Linear 레이어의 내부 동작과 동일합니다.",
  sample_tests: [
    {
      input: {
        text_features: [[1, 2]],
        image_features: [[3, 4]],
        weight: [
          [1, 0],
          [0, 1],
          [1, 1],
          [0, 0],
        ],
        bias: [0, 0],
      },
      expected: [[4.0, 5.0]],
    },
    {
      input: {
        text_features: [[1, 0]],
        image_features: [[0, 1]],
        weight: [[1], [1], [1], [1]],
        bias: [10],
      },
      expected: [[12.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        text_features: [
          [1, 1],
          [2, 2],
        ],
        image_features: [
          [3, 3],
          [4, 4],
        ],
        weight: [[1], [1], [1], [1]],
        bias: [0],
      },
      expected: [[8.0], [12.0]],
      failure_category: "batched_fusion",
    },
    {
      input: {
        text_features: [[0.5, 0.5]],
        image_features: [[0.5, 0.5]],
        weight: [
          [1, 0],
          [0, 1],
          [1, 0],
          [0, 1],
        ],
        bias: [1, 1],
      },
      expected: [[2.0, 2.0]],
      failure_category: "bias_application",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
