import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "kv_cache_attention",
  title: "KV Cache Attention Step",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "attention", "transformer"],
  statement_en: `Simulate one step of **KV-cache attention**, a key optimization for autoregressive inference in Transformers.

Given:
- \`past_keys\`: list of previous key vectors (seq_len_past x d_k)
- \`past_values\`: list of previous value vectors (seq_len_past x d_v)
- \`new_query\`: the query vector for the new token (length d_k)
- \`new_key\`: the key vector for the new token (length d_k)
- \`new_value\`: the value vector for the new token (length d_v)

Steps:
1. Append new_key/new_value to past cache
2. Compute scaled dot-product attention of new_query against ALL keys
3. Return the attention output vector (length d_v)

**Function signature:**
\`\`\`python
def solution(past_keys: List[List[float]], past_values: List[List[float]], new_query: List[float], new_key: List[float], new_value: List[float]) -> List[float]:
\`\`\`

**Returns:** Attention output vector, each value rounded to 4 decimal places.
`,
  function_name: "solution",
  signature: "def solution(past_keys: List[List[float]], past_values: List[List[float]], new_query: List[float], new_key: List[float], new_value: List[float]) -> List[float]:",
  constraints: [
    "0 <= len(past_keys) <= 1000",
    "1 <= d_k, d_v <= 64",
    "past_keys and past_values have the same length",
  ],
  examples: [
    {
      input: {
        past_keys: [[1.0, 0.0]],
        past_values: [[10.0, 20.0]],
        new_query: [1.0, 0.0],
        new_key: [0.0, 1.0],
        new_value: [30.0, 40.0],
      },
      output: [16.6066, 26.6066],
      explanation: "Attention over 2 KV pairs, query attends more to the first key.",
    },
  ],
  starter_code: `def solution(past_keys: List[List[float]], past_values: List[List[float]], new_query: List[float], new_key: List[float], new_value: List[float]) -> List[float]:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "먼저 new_key/new_value를 past에 추가하세요. 그 다음 attention을 계산합니다.",
    "attention score = dot(query, key) / sqrt(d_k). softmax를 적용한 후 value의 가중합을 구합니다.",
  ],
  solution_code: `def solution(past_keys: List[List[float]], past_values: List[List[float]], new_query: List[float], new_key: List[float], new_value: List[float]) -> List[float]:
    import math
    keys = past_keys + [new_key]
    values = past_values + [new_value]
    d_k = len(new_query)
    scale = math.sqrt(d_k)
    scores = [sum(new_query[d] * k[d] for d in range(d_k)) / scale for k in keys]
    m = max(scores)
    exps = [math.exp(s - m) for s in scores]
    total = sum(exps)
    weights = [e / total for e in exps]
    d_v = len(new_value)
    output = [round(sum(weights[j] * values[j][d] for j in range(len(values))), 4) for d in range(d_v)]
    return output`,
  solution_explanation: "KV 캐시에 새 토큰의 K/V를 추가한 후, 새 토큰의 Q와 전체 K에 대해 scaled dot-product attention을 수행합니다. LLM 추론 최적화의 핵심입니다.",
  sample_tests: [
    {
      input: {
        past_keys: [[1.0, 0.0]],
        past_values: [[10.0, 20.0]],
        new_query: [1.0, 0.0],
        new_key: [0.0, 1.0],
        new_value: [30.0, 40.0],
      },
      expected: [16.6066, 26.6066],
    },
    {
      input: {
        past_keys: [],
        past_values: [],
        new_query: [1.0],
        new_key: [1.0],
        new_value: [42.0],
      },
      expected: [42.0],
    },
  ],
  hidden_tests: [
    {
      input: {
        past_keys: [[1.0, 0.0], [0.0, 1.0]],
        past_values: [[1.0, 0.0], [0.0, 1.0]],
        new_query: [0.0, 0.0],
        new_key: [0.0, 0.0],
        new_value: [0.5, 0.5],
      },
      expected: [0.3333, 0.3333],
      failure_category: "edge_case",
    },
    {
      input: {
        past_keys: [[1.0, 0.0, 0.0]],
        past_values: [[10.0]],
        new_query: [0.0, 0.0, 1.0],
        new_key: [0.0, 0.0, 1.0],
        new_value: [20.0],
      },
      expected: [15.0],
      failure_category: "standard",
    },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["attention_scores", "multi_head_attention"],
  fallback_problem_ids: ["attention_scores"],
};

export default problem;
