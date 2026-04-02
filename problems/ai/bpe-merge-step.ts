import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "bpe_merge_step",
  title: "BPE Merge Step",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Perform one step of **Byte Pair Encoding (BPE)** merge.\n\nGiven a list of token sequences (each sequence is a list of strings) and a merge pair (a, b):\n- Find all adjacent occurrences of (a, b) in each sequence\n- Merge them into a single token "a+b" (concatenated)\n\nReturn the updated token sequences.\n\n**Function signature:**\n\`\`\`python\ndef solution(sequences: List[List[str]], merge_a: str, merge_b: str) -> List[List[str]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(sequences: List[List[str]], merge_a: str, merge_b: str) -> List[List[str]]:",
  constraints: ["1 <= total tokens <= 10000"],
  examples: [{ input: { sequences: [["h","e","l","l","o"]], merge_a: "l", merge_b: "l" }, output: [["h","e","ll","o"]], explanation: "Merge adjacent 'l'+'l' → 'll'" }],
  starter_code: "def solution(sequences: List[List[str]], merge_a: str, merge_b: str) -> List[List[str]]:\n    pass",
  hints: ["각 시퀀스를 순회하면서 인접한 (a, b) 쌍을 찾으면 합칩니다.", "한번 merge한 위치는 건너뛰고 다음 위치로 진행합니다."],
  solution_code: `def solution(sequences: List[List[str]], merge_a: str, merge_b: str) -> List[List[str]]:
    result = []
    for seq in sequences:
        new_seq = []
        i = 0
        while i < len(seq):
            if i < len(seq) - 1 and seq[i] == merge_a and seq[i + 1] == merge_b:
                new_seq.append(merge_a + merge_b)
                i += 2
            else:
                new_seq.append(seq[i])
                i += 1
        result.append(new_seq)
    return result`,
  solution_explanation: "BPE는 GPT, BERT 등 현대 LLM의 토크나이저 핵심입니다. 빈도가 높은 인접 토큰 쌍을 반복적으로 병합합니다.",
  sample_tests: [
    { input: { sequences: [["h","e","l","l","o"]], merge_a: "l", merge_b: "l" }, expected: [["h","e","ll","o"]] },
    { input: { sequences: [["a","b","a","b"]], merge_a: "a", merge_b: "b" }, expected: [["ab","ab"]] },
  ],
  hidden_tests: [
    { input: { sequences: [["x","y"],["y","x"]], merge_a: "x", merge_b: "y" }, expected: [["xy"],["y","x"]], failure_category: "standard" },
    { input: { sequences: [["a"]], merge_a: "a", merge_b: "b" }, expected: [["a"]], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dna_kmer_tokenize", "bag_of_words"],
  fallback_problem_ids: ["bag_of_words"],
};
export default problem;
