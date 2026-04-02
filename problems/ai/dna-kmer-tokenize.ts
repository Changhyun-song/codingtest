import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "dna_kmer_tokenize",
  title: "DNA K-mer Tokenizer",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp"],
  statement_en: `Tokenize a DNA sequence into overlapping **k-mers** (subsequences of length k).\n\nGiven a DNA string (characters: A, T, G, C) and k, extract all k-mers using a sliding window.\n\n**Function signature:**\n\`\`\`python\ndef solution(sequence: str, k: int) -> List[str]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(sequence: str, k: int) -> List[str]:",
  constraints: ["1 <= k <= len(sequence)", "sequence contains only A, T, G, C"],
  examples: [{ input: { sequence: "ATGCGA", k: 3 }, output: ["ATG", "TGC", "GCG", "CGA"], explanation: "Sliding window of size 3" }],
  starter_code: "def solution(sequence: str, k: int) -> List[str]:\n    pass",
  hints: ["슬라이딩 윈도우: sequence[i:i+k] for i in range(len(sequence)-k+1)", "바이오 시퀀스에서 k-mer는 토큰화의 기본 단위입니다."],
  solution_code: `def solution(sequence: str, k: int) -> List[str]:
    return [sequence[i:i + k] for i in range(len(sequence) - k + 1)]`,
  solution_explanation: "K-mer 토큰화는 DNA/단백질 시퀀스를 모델 입력으로 변환하는 기본 방법입니다. BPE와 유사한 역할을 합니다.",
  sample_tests: [
    { input: { sequence: "ATGCGA", k: 3 }, expected: ["ATG", "TGC", "GCG", "CGA"] },
    { input: { sequence: "AAAA", k: 2 }, expected: ["AA", "AA", "AA"] },
  ],
  hidden_tests: [
    { input: { sequence: "ATGC", k: 4 }, expected: ["ATGC"], failure_category: "edge_case" },
    { input: { sequence: "ATGATG", k: 3 }, expected: ["ATG", "TGA", "GAT", "ATG"], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["bio_one_hot", "codon_frequency"],
  fallback_problem_ids: ["bag_of_words"],
};
export default problem;
