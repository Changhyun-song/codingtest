import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "codon_frequency",
  title: "Codon Usage Frequency",
  category: "ai",
  difficulty: "easy",
  tags: ["nlp"],
  statement_en: `Count **codon frequencies** in a DNA coding sequence.\n\nA codon is a triplet of nucleotides (e.g., "ATG", "GCA"). Split the sequence into non-overlapping codons from the start and count the frequency of each.\n\nReturn a dictionary of codon → count, sorted by codon alphabetically.\n\n**Function signature:**\n\`\`\`python\ndef solution(sequence: str) -> dict:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(sequence: str) -> dict:",
  constraints: ["len(sequence) % 3 == 0", "sequence contains only A, T, G, C"],
  examples: [{ input: { sequence: "ATGATGATG" }, output: {"ATG": 3}, explanation: "Three ATG codons" }],
  starter_code: "def solution(sequence: str) -> dict:\n    pass",
  hints: ["sequence[i:i+3]으로 3글자씩 잘라서 코돈을 추출합니다.", "딕셔너리로 각 코돈의 빈도를 세고 키 기준으로 정렬합니다."],
  solution_code: `def solution(sequence: str) -> dict:
    freq = {}
    for i in range(0, len(sequence), 3):
        codon = sequence[i:i + 3]
        freq[codon] = freq.get(codon, 0) + 1
    return dict(sorted(freq.items()))`,
  solution_explanation: "코돈 사용 빈도(codon usage bias)는 유전자 발현 수준 예측과 합성 생물학에서 중요합니다.",
  sample_tests: [
    { input: { sequence: "ATGATGATG" }, expected: {"ATG": 3} },
    { input: { sequence: "ATGGCATGA" }, expected: {"ATG": 1, "GCA": 1, "TGA": 1} },
  ],
  hidden_tests: [
    { input: { sequence: "AAA" }, expected: {"AAA": 1}, failure_category: "edge_case" },
    { input: { sequence: "ATGATGCCCGGGAAATTT" }, expected: {"AAA": 1, "ATG": 2, "CCC": 1, "GGG": 1, "TTT": 1}, failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dna_kmer_tokenize", "bio_one_hot"],
  fallback_problem_ids: ["bag_of_words"],
};
export default problem;
