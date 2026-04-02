import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "tfidf_from_scratch",
  title: "TF-IDF From Scratch",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp", "tfidf", "text_processing"],
  statement_en: `Implement TF-IDF (Term Frequency-Inverse Document Frequency) from scratch.

Given a list of documents (each document is a string of space-separated words) and a query word, compute the TF-IDF score of the query word for each document.

**TF(word, doc)** = (number of times word appears in doc) / (total words in doc)
**IDF(word, corpus)** = log(total number of documents / number of documents containing the word)

Use natural logarithm (ln). If the word doesn't appear in any document, IDF = 0.

**TF-IDF = TF * IDF**

**Function signature:**
\`\`\`python
def solution(documents: List[str], query: str) -> List[float]:
\`\`\`

**Returns:** A list of TF-IDF scores, one per document.
`,
  function_name: "solution",
  signature: "def solution(documents: List[str], query: str) -> List[float]:",
  constraints: [
    "1 <= len(documents) <= 1000",
    "1 <= len(document words) <= 10000",
    "query is a single word",
  ],
  examples: [
    {
      input: {
        documents: ["the cat sat on the mat", "the dog sat on the log", "cats and dogs"],
        query: "cat",
      },
      output: [0.1831, 0.0, 0.0],
      explanation: "cat appears in 1/3 docs. TF in doc0 = 1/6, IDF = ln(3/1) = 1.0986. TF-IDF = 0.1831",
    },
  ],
  starter_code: `def solution(documents: List[str], query: str) -> List[float]:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 문서를 단어로 나누고 query 등장 횟수를 세세요.",
    "TF = count(query in doc) / len(doc words)",
    "IDF = math.log(N / df), df는 query를 포함하는 문서 수",
  ],
  solution_code: `def solution(documents: List[str], query: str) -> List[float]:
    import math
    docs = [d.split() for d in documents]
    N = len(docs)
    df = sum(1 for d in docs if query in d)
    if df == 0:
        return [0.0] * N
    idf = math.log(N / df)
    result = []
    for d in docs:
        tf = d.count(query) / len(d) if d else 0
        result.append(tf * idf)
    return result`,
  solution_explanation: "문서별 term frequency를 세고 IDF = ln(N/df)를 곱합니다. 시간 복잡도 O(N*L).",
  sample_tests: [
    {
      input: {
        documents: ["the cat sat on the mat", "the dog sat on the log", "cats and dogs"],
        query: "cat",
      },
      expected: [0.1831, 0.0, 0.0],
    },
    {
      input: {
        documents: ["a b c", "a a a", "b b"],
        query: "a",
      },
      expected: [0.1351, 0.4055, 0.0],
    },
  ],
  hidden_tests: [
    {
      input: { documents: ["hello world", "hello hello"], query: "hello" },
      expected: [0.0, 0.0],
      failure_category: "edge_case",
    },
    {
      input: { documents: ["x y z", "a b c"], query: "w" },
      expected: [0.0, 0.0],
      failure_category: "zero_division",
    },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["bag_of_words", "word_analogy"],
  fallback_problem_ids: ["frequency_counter"],
};

export default problem;
