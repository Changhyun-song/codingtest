import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "bag_of_words",
  title: "Bag of Words Encoding",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp", "encoding", "text_processing"],
  statement_en: `Implement a Bag of Words encoder.

Given a vocabulary (list of unique words) and a list of documents (strings), convert each document into a Bag of Words vector.

Each vector has the same length as the vocabulary. The i-th element is the count of vocabulary[i] in the document. Words not in the vocabulary are ignored. Matching is case-sensitive.

**Function signature:**
\`\`\`python
def solution(vocabulary: List[str], documents: List[str]) -> List[List[int]]:
\`\`\`

**Returns:** A 2D list where result[i][j] is the count of vocabulary[j] in documents[i].
`,
  function_name: "solution",
  signature: "def solution(vocabulary: List[str], documents: List[str]) -> List[List[int]]:",
  constraints: [
    "1 <= len(vocabulary) <= 1000",
    "1 <= len(documents) <= 1000",
    "All vocabulary words are unique",
  ],
  examples: [
    {
      input: {
        vocabulary: ["cat", "dog", "fish"],
        documents: ["cat dog cat", "dog fish dog fish fish"],
      },
      output: [
        [2, 1, 0],
        [0, 2, 3],
      ],
      explanation: "doc0: cat=2, dog=1, fish=0. doc1: cat=0, dog=2, fish=3.",
    },
  ],
  starter_code: `def solution(vocabulary: List[str], documents: List[str]) -> List[List[int]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "vocabulary로부터 word→index 매핑을 만드세요.",
    "각 문서를 단어로 나누고 vocabulary 단어의 등장 횟수를 세세요.",
  ],
  solution_code: `def solution(vocabulary: List[str], documents: List[str]) -> List[List[int]]:
    word_idx = {w: i for i, w in enumerate(vocabulary)}
    result = []
    for doc in documents:
        vec = [0] * len(vocabulary)
        for word in doc.split():
            if word in word_idx:
                vec[word_idx[word]] += 1
        result.append(vec)
    return result`,
  solution_explanation: "vocabulary를 인덱스에 매핑하고 문서별로 vocabulary 단어 빈도를 셉니다. 시간 복잡도 O(V + D*L).",
  sample_tests: [
    {
      input: {
        vocabulary: ["cat", "dog", "fish"],
        documents: ["cat dog cat", "dog fish dog fish fish"],
      },
      expected: [
        [2, 1, 0],
        [0, 2, 3],
      ],
    },
  ],
  hidden_tests: [
    {
      input: { vocabulary: ["a"], documents: ["b c d"] },
      expected: [[0]],
      failure_category: "edge_case",
    },
    {
      input: { vocabulary: ["Cat", "cat"], documents: ["Cat cat Cat"] },
      expected: [[2, 1]],
      failure_category: "case_sensitivity",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["tfidf_from_scratch", "frequency_counter"],
  fallback_problem_ids: ["frequency_counter"],
};

export default problem;
