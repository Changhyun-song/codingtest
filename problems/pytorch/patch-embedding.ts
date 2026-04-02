import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "patch_embedding",
  title: "ViT Patch Embedding",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "transformer"],
  statement_en: `Implement the **patch embedding** step from **Vision Transformer (ViT)**.

Given a 2D image (H x W) and a patch_size:
1. Split the image into non-overlapping patches of size (patch_size x patch_size)
2. Flatten each patch into a 1D vector
3. Return the list of patch vectors in row-major order (left-to-right, top-to-bottom)

Assume H and W are divisible by patch_size.

**Function signature:**
\`\`\`python
def solution(image: List[List[float]], patch_size: int) -> List[List[float]]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(image: List[List[float]], patch_size: int) -> List[List[float]]:",
  constraints: [
    "1 <= H, W <= 224",
    "1 <= patch_size <= min(H, W)",
    "H % patch_size == 0, W % patch_size == 0",
  ],
  examples: [
    {
      input: {
        image: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],
        patch_size: 2,
      },
      output: [[1,2,5,6],[3,4,7,8],[9,10,13,14],[11,12,15,16]],
      explanation: "4x4 image → 4 patches of 2x2, each flattened to length 4",
    },
  ],
  starter_code: `def solution(image: List[List[float]], patch_size: int) -> List[List[float]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "2중 for 루프로 패치의 시작점 (i, j)를 patch_size 간격으로 순회합니다.",
    "각 패치 내에서 행/열을 순회하며 값을 1D 리스트에 추가합니다.",
  ],
  solution_code: `def solution(image: List[List[float]], patch_size: int) -> List[List[float]]:
    H = len(image)
    W = len(image[0])
    patches = []
    for i in range(0, H, patch_size):
        for j in range(0, W, patch_size):
            patch = []
            for r in range(i, i + patch_size):
                for c in range(j, j + patch_size):
                    patch.append(image[r][c])
            patches.append(patch)
    return patches`,
  solution_explanation: "이미지를 겹치지 않는 패치로 분할하고 각 패치를 1D로 펼칩니다. Vision Transformer의 첫 번째 단계입니다.",
  sample_tests: [
    {
      input: {
        image: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],
        patch_size: 2,
      },
      expected: [[1,2,5,6],[3,4,7,8],[9,10,13,14],[11,12,15,16]],
    },
    {
      input: {
        image: [[1,2],[3,4]],
        patch_size: 1,
      },
      expected: [[1],[2],[3],[4]],
    },
  ],
  hidden_tests: [
    {
      input: {
        image: [[1,2],[3,4]],
        patch_size: 2,
      },
      expected: [[1,2,3,4]],
      failure_category: "edge_case",
    },
    {
      input: {
        image: [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,36]],
        patch_size: 3,
      },
      expected: [[1,2,3,7,8,9,13,14,15],[4,5,6,10,11,12,16,17,18],[19,20,21,25,26,27,31,32,33],[22,23,24,28,29,30,34,35,36]],
      failure_category: "standard",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tensor_manipulation", "tensor_shape_tracker"],
  fallback_problem_ids: ["tensor_manipulation"],
};

export default problem;
