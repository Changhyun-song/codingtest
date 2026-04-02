import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "bio_one_hot",
  title: "Biological Sequence One-Hot Encoding",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp"],
  statement_en: `One-hot encode a biological sequence.\n\nGiven a sequence string and an alphabet (e.g., "ATGC" for DNA), convert each character to a one-hot vector.\n\nReturn a 2D list [seq_len, alphabet_size].\n\n**Function signature:**\n\`\`\`python\ndef solution(sequence: str, alphabet: str) -> List[List[int]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(sequence: str, alphabet: str) -> List[List[int]]:",
  constraints: ["All characters in sequence appear in alphabet"],
  examples: [{ input: { sequence: "ATGC", alphabet: "ATGC" }, output: [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], explanation: "Each char maps to position in alphabet" }],
  starter_code: "def solution(sequence: str, alphabet: str) -> List[List[int]]:\n    pass",
  hints: ["alphabet.index(char)로 위치를 찾습니다.", "one-hot: 해당 위치만 1, 나머지 0인 벡터를 만듭니다."],
  solution_code: `def solution(sequence: str, alphabet: str) -> List[List[int]]:
    result = []
    for ch in sequence:
        vec = [0] * len(alphabet)
        vec[alphabet.index(ch)] = 1
        result.append(vec)
    return result`,
  solution_explanation: "바이오 시퀀스의 one-hot 인코딩은 CNN/RNN 모델 입력의 기본 형태입니다.",
  sample_tests: [
    { input: { sequence: "ATGC", alphabet: "ATGC" }, expected: [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]] },
    { input: { sequence: "AAA", alphabet: "AT" }, expected: [[1,0],[1,0],[1,0]] },
  ],
  hidden_tests: [
    { input: { sequence: "G", alphabet: "ATGC" }, expected: [[0,0,1,0]], failure_category: "edge_case" },
    { input: { sequence: "ARND", alphabet: "ARNDCQEGHILKMFPSTWYV" }, expected: [[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dna_kmer_tokenize", "one_hot_encode"],
  fallback_problem_ids: ["one_hot_encode"],
};
export default problem;
