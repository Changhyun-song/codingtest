import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "tensor_manipulation",
  title: "Tensor Manipulation",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "tensor", "reshape", "broadcasting"],
  statement_en: `Implement a function that performs a sequence of tensor operations (using pure Python lists to represent tensors):

Given a 2D matrix (list of lists) and an operation name, perform the operation:

- \`"transpose"\`: Transpose the matrix (swap rows and columns)
- \`"flatten"\`: Flatten into a 1D list
- \`"reshape"\`: Reshape into the given target shape (provided as a tuple)
- \`"row_softmax"\`: Apply softmax to each row: softmax(x_i) = exp(x_i) / sum(exp(x_j)) for all j in the row
- \`"batch_norm"\`: For each column, normalize to zero mean and unit variance: (x - mean) / std. Use population std (not sample). If std is 0, output 0 for that column.

**Function signature:**
\`\`\`python
def solution(matrix: List[List[float]], operation: str, target_shape: List[int] = None) -> list:
\`\`\`

**Returns:** The result as a nested list (or flat list for "flatten").

**Note:** You may use \`import math\`. PyTorch/numpy are also available but not required.
`,
  function_name: "solution",
  signature:
    "def solution(matrix: List[List[float]], operation: str, target_shape: List[int] = None) -> list:",
  constraints: [
    "1 <= rows, cols <= 100",
    "operation is one of: transpose, flatten, reshape, row_softmax, batch_norm",
    "For reshape: product of target_shape equals total number of elements",
  ],
  examples: [
    {
      input: {
        matrix: [[1, 2, 3], [4, 5, 6]],
        operation: "transpose",
        target_shape: null,
      },
      output: [[1, 4], [2, 5], [3, 6]],
      explanation: "2x3 matrix transposed to 3x2",
    },
    {
      input: {
        matrix: [[1, 2], [3, 4]],
        operation: "flatten",
        target_shape: null,
      },
      output: [1, 2, 3, 4],
      explanation: "Flattened to 1D",
    },
  ],
  starter_code: `def solution(matrix: List[List[float]], operation: str, target_shape: List[int] = None) -> list:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "transpose: [[row[j] for row in matrix] for j in range(len(matrix[0]))]",
    "softmax: exp 전에 수치 안정성을 위해 max를 빼세요.",
    "batch norm: 열마다 mean과 std를 구한 뒤 정규화합니다.",
  ],
  solution_code: `def solution(matrix: List[List[float]], operation: str, target_shape: List[int] = None) -> list:
    import math
    if operation == "transpose":
        return [[matrix[r][c] for r in range(len(matrix))] for c in range(len(matrix[0]))]
    elif operation == "flatten":
        return [x for row in matrix for x in row]
    elif operation == "reshape":
        flat = [x for row in matrix for x in row]
        result, idx = [], 0
        rows, cols = target_shape
        for r in range(rows):
            row = []
            for c in range(cols):
                row.append(flat[idx]); idx += 1
            result.append(row)
        return result
    elif operation == "row_softmax":
        result = []
        for row in matrix:
            m = max(row)
            exps = [math.exp(x - m) for x in row]
            s = sum(exps)
            result.append([e / s for e in exps])
        return result
    elif operation == "batch_norm":
        rows, cols = len(matrix), len(matrix[0])
        result = [[0.0]*cols for _ in range(rows)]
        for c in range(cols):
            col = [matrix[r][c] for r in range(rows)]
            mean = sum(col) / len(col)
            var = sum((x - mean)**2 for x in col) / len(col)
            std = math.sqrt(var)
            for r in range(rows):
                result[r][c] = (matrix[r][c] - mean) / std if std > 0 else 0.0
        return result`,
  solution_explanation: "operation에 따라 분기합니다. softmax는 안정성을 위해 max를 빼고, batch norm은 population std를 사용합니다.",
  sample_tests: [
    {
      input: {
        matrix: [[1, 2, 3], [4, 5, 6]],
        operation: "transpose",
        target_shape: null,
      },
      expected: [[1, 4], [2, 5], [3, 6]],
    },
    {
      input: {
        matrix: [[1, 2], [3, 4]],
        operation: "flatten",
        target_shape: null,
      },
      expected: [1, 2, 3, 4],
    },
    {
      input: {
        matrix: [[1, 2, 3, 4, 5, 6]],
        operation: "reshape",
        target_shape: [2, 3],
      },
      expected: [[1, 2, 3], [4, 5, 6]],
    },
  ],
  hidden_tests: [
    {
      input: {
        matrix: [[1.0, 2.0], [3.0, 4.0]],
        operation: "row_softmax",
        target_shape: null,
      },
      expected: [
        [0.2689414213699951, 0.7310585786300049],
        [0.2689414213699951, 0.7310585786300049],
      ],
      failure_category: "wrong_formula",
    },
    {
      input: {
        matrix: [[2.0, 4.0], [4.0, 6.0], [6.0, 8.0]],
        operation: "batch_norm",
        target_shape: null,
      },
      expected: [
        [-1.2247448713915890, -1.2247448713915890],
        [0.0, 0.0],
        [1.2247448713915890, 1.2247448713915890],
      ],
      failure_category: "normalization",
    },
    {
      input: {
        matrix: [[5.0, 5.0], [5.0, 5.0]],
        operation: "batch_norm",
        target_shape: null,
      },
      expected: [[0.0, 0.0], [0.0, 0.0]],
      failure_category: "zero_division",
    },
  ],
  checker_type: "vector",
  tolerance: 1e-4,
  similar_problem_ids: ["masked_mean_pooling", "attention_scores"],
  fallback_problem_ids: ["masked_mean_pooling"],
};

export default problem;
