import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_contrastive_sim",
  title: "Contrastive Similarity Matrix with Temperature Scaling",
  category: "pytorch",
  difficulty: "hard",
  tags: [
    "pytorch",
    "contrastive-learning",
    "cosine-similarity",
    "temperature-scaling",
  ],
  statement_en: `Compute a contrastive similarity matrix for a batch of embeddings with temperature scaling.

Given a batch of embedding vectors of shape [batch, dim] and a temperature scalar:
1. L2-normalize each embedding vector along the last dimension.
2. Compute the cosine similarity matrix by multiplying the normalized embeddings with their transpose: S = normalized @ normalized^T.
3. Apply temperature scaling by dividing the similarity matrix by the temperature: S = S / temperature.

Return the resulting similarity matrix as a nested list.`,
  function_name: "solution",
  signature: "def solution(embeddings: list, temperature: float) -> list:",
  constraints: [
    "embeddings shape: [batch, dim] where batch >= 1 and dim >= 1",
    "temperature > 0",
    "All embedding vectors are non-zero",
    "Diagonal entries of the similarity matrix before temperature scaling are 1.0 (self-similarity)",
  ],
  examples: [
    {
      input: {
        embeddings: [
          [1, 0],
          [0, 1],
        ],
        temperature: 1.0,
      },
      output: [
        [1.0, 0.0],
        [0.0, 1.0],
      ],
      explanation:
        "Orthogonal unit vectors have cosine similarity 0 with each other and 1 with themselves. With temperature 1.0, the matrix is the identity.",
    },
    {
      input: {
        embeddings: [
          [1, 1],
          [1, 1],
        ],
        temperature: 0.5,
      },
      output: [
        [2.0, 2.0],
        [2.0, 2.0],
      ],
      explanation:
        "Identical vectors have cosine similarity 1.0. Dividing by temperature 0.5 gives 2.0 for all entries.",
    },
  ],
  starter_code: `import torch
import torch.nn.functional as F

def solution(embeddings, temperature):
    pass`,
  hints: [
    "F.normalize(tensor, p=2, dim=-1)로 L2 정규화를 수행하세요.",
    "코사인 유사도 행렬은 정규화된 벡터의 행렬 곱으로 계산됩니다.",
    "temperature가 낮을수록 유사도 차이가 증폭되어 대조 학습에서 더 뚜렷한 구분을 만듭니다.",
    "전치 행렬은 .T 또는 .transpose(0, 1)로 구할 수 있습니다.",
  ],
  solution_code: `import torch
import torch.nn.functional as F

def solution(embeddings, temperature):
    e = torch.tensor(embeddings, dtype=torch.float32)
    e_norm = F.normalize(e, p=2, dim=-1)
    sim = e_norm @ e_norm.T
    sim = sim / temperature
    return sim.tolist()`,
  solution_explanation:
    "대조 학습(contrastive learning)에서 유사도 행렬은 핵심 구성 요소입니다. 먼저 각 임베딩 벡터를 L2 정규화하여 단위 벡터로 만듭니다. 정규화된 벡터 간의 내적은 코사인 유사도와 동일합니다. 정규화된 행렬과 그 전치 행렬의 곱으로 모든 쌍의 유사도를 한번에 계산합니다. 온도(temperature) 스케일링은 유사도 분포의 날카로움을 조절합니다. 낮은 온도는 유사도 차이를 증폭시켜 모델이 양성/음성 쌍을 더 강하게 구분하도록 합니다.",
  sample_tests: [
    {
      input: {
        embeddings: [
          [1, 0],
          [0, 1],
        ],
        temperature: 1.0,
      },
      expected: [
        [1.0, 0.0],
        [0.0, 1.0],
      ],
    },
    {
      input: {
        embeddings: [
          [1, 1],
          [1, 1],
        ],
        temperature: 0.5,
      },
      expected: [
        [2.0, 2.0],
        [2.0, 2.0],
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        embeddings: [
          [3, 4],
          [4, 3],
        ],
        temperature: 1.0,
      },
      expected: [
        [1.0, 0.96],
        [0.96, 1.0],
      ],
      failure_category: "non_unit_vector_normalization",
    },
    {
      input: {
        embeddings: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        temperature: 2.0,
      },
      expected: [
        [0.5, 0.0, 0.0],
        [0.0, 0.5, 0.0],
        [0.0, 0.0, 0.5],
      ],
      failure_category: "temperature_scaling",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
