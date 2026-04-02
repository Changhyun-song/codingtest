import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_multimodal_batch",
  title: "Multimodal Batch Assembly",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "multimodal", "batching", "padding", "data-loading"],
  statement_en: `Given a batch of multimodal samples, each containing:
- **"text"**: a list of token IDs (variable length)
- **"image"**: a list of floats (fixed length across all samples)

And a **pad_id** (int) for padding text sequences.

Create a padded batch and return a list of three items:
1. **text_padded**: 2D list of padded text token IDs (padded to the length of the longest text)
2. **image_batch**: 2D list of image features
3. **text_lengths**: 1D list of original text lengths

Return \`[text_padded, image_batch, text_lengths]\`.`,
  function_name: "solution",
  signature: "def solution(samples: list, pad_id: int) -> list:",
  constraints: [
    "1 <= len(samples) <= 10",
    "Each sample has 'text' (list of ints) and 'image' (list of floats)",
    "All image lists have the same length",
    "1 <= len(text) <= 10",
    "pad_id is an integer",
  ],
  examples: [
    {
      input: {
        samples: [
          { text: [1, 2, 3], image: [0.1, 0.2] },
          { text: [4, 5], image: [0.3, 0.4] },
        ],
        pad_id: 0,
      },
      output: [
        [
          [1, 2, 3],
          [4, 5, 0],
        ],
        [
          [0.1, 0.2],
          [0.3, 0.4],
        ],
        [3, 2],
      ],
      explanation:
        "Text sequences are padded to max length 3. Image features are already uniform. Original lengths are [3, 2].",
    },
    {
      input: {
        samples: [
          { text: [10], image: [1.0] },
          { text: [20, 30], image: [2.0] },
        ],
        pad_id: -1,
      },
      output: [
        [
          [10, -1],
          [20, 30],
        ],
        [[1.0], [2.0]],
        [1, 2],
      ],
      explanation:
        "Text padded to max length 2 with pad_id=-1. Image features collected as-is.",
    },
  ],
  starter_code: `import torch

def solution(samples: list, pad_id: int) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 샘플에서 'text'와 'image'를 분리하여 별도 리스트로 모으세요.",
    "텍스트 시퀀스의 최대 길이를 구한 뒤, 짧은 시퀀스에 pad_id를 추가하여 패딩하세요.",
    "torch.tensor로 변환 후 .tolist()로 반환하세요. 이미지는 dtype=torch.float32를 사용하세요.",
  ],
  solution_code: `import torch

def solution(samples: list, pad_id: int) -> list:
    texts = [s["text"] for s in samples]
    images = [s["image"] for s in samples]
    lengths = [len(t) for t in texts]
    max_len = max(lengths)
    text_padded = [t + [pad_id] * (max_len - len(t)) for t in texts]
    return [
        torch.tensor(text_padded).tolist(),
        torch.tensor(images, dtype=torch.float32).tolist(),
        lengths
    ]`,
  solution_explanation:
    "멀티모달 배치 조립의 핵심은 각 모달리티를 별도로 처리하는 것입니다. 텍스트는 가변 길이이므로 pad_id로 패딩하고, 이미지는 고정 길이이므로 그대로 텐서로 변환합니다. 원본 텍스트 길이도 함께 반환하여, 이후 모델에서 패딩을 무시할 수 있도록 합니다. 이 패턴은 CLIP, Flamingo 등 멀티모달 모델의 데이터 로딩에서 핵심적으로 사용됩니다.",
  sample_tests: [
    {
      input: {
        samples: [
          { text: [1, 2, 3], image: [0.1, 0.2] },
          { text: [4, 5], image: [0.3, 0.4] },
        ],
        pad_id: 0,
      },
      expected: [
        [
          [1, 2, 3],
          [4, 5, 0],
        ],
        [
          [0.1, 0.2],
          [0.3, 0.4],
        ],
        [3, 2],
      ],
    },
    {
      input: {
        samples: [
          { text: [10], image: [1.0] },
          { text: [20, 30], image: [2.0] },
        ],
        pad_id: -1,
      },
      expected: [
        [
          [10, -1],
          [20, 30],
        ],
        [[1.0], [2.0]],
        [1, 2],
      ],
    },
  ],
  hidden_tests: [
    {
      input: {
        samples: [
          { text: [1, 2], image: [0.5, 0.5, 0.5] },
          { text: [3, 4, 5, 6], image: [1.0, 1.0, 1.0] },
          { text: [7], image: [0.0, 0.0, 0.0] },
        ],
        pad_id: 0,
      },
      expected: [
        [
          [1, 2, 0, 0],
          [3, 4, 5, 6],
          [7, 0, 0, 0],
        ],
        [
          [0.5, 0.5, 0.5],
          [1.0, 1.0, 1.0],
          [0.0, 0.0, 0.0],
        ],
        [2, 4, 1],
      ],
      failure_category: "multi_sample_padding",
    },
    {
      input: {
        samples: [{ text: [1], image: [0.0] }],
        pad_id: 0,
      },
      expected: [[[1]], [[0.0]], [1]],
      failure_category: "single_sample",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
