import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "token_type_embed",
  title: "Token Type ID & Segment Construction",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "transformer"],
  statement_en: `Construct **token type IDs** and attention masks for multi-segment inputs (like BERT).\n\nGiven a batch of segment pairs, for each sample:\n1. Concatenate all segments' tokens\n2. Create token_type_ids: 0 for segment 0, 1 for segment 1, etc.\n3. Pad to max_len with pad_token\n4. Create attention mask: 1=real, 0=padding\n\nReturn [all_tokens, all_type_ids, all_masks].\n\n**Function signature:**\n\`\`\`python\ndef solution(batch_segments: List[List[List[int]]], max_len: int, pad_token: int) -> List:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(batch_segments: List[List[List[int]]], max_len: int, pad_token: int) -> List:",
  constraints: ["total tokens per sample <= max_len"],
  examples: [{ input: { batch_segments: [[[101, 1, 2, 102], [101, 3, 102]]], max_len: 8, pad_token: 0 }, output: [[[101,1,2,102,101,3,102,0]],[[0,0,0,0,1,1,1,0]],[[1,1,1,1,1,1,1,0]]], explanation: "Concat segments, type_id=segment index, pad to 8" }],
  starter_code: "def solution(batch_segments: List[List[List[int]]], max_len: int, pad_token: int) -> List:\n    pass",
  hints: ["각 세그먼트를 연결하면서 segment index를 token_type_id로 사용합니다.", "BERT의 [SEP] 토큰이 세그먼트를 구분합니다."],
  solution_code: `def solution(batch_segments: List[List[List[int]]], max_len: int, pad_token: int) -> List:
    all_t, all_ty, all_m = [], [], []
    for segments in batch_segments:
        tokens, types = [], []
        for si, seg in enumerate(segments):
            tokens.extend(seg)
            types.extend([si] * len(seg))
        mask = [1] * len(tokens)
        while len(tokens) < max_len:
            tokens.append(pad_token)
            types.append(0)
            mask.append(0)
        all_t.append(tokens[:max_len])
        all_ty.append(types[:max_len])
        all_m.append(mask[:max_len])
    return [all_t, all_ty, all_m]`,
  solution_explanation: "Token type embedding은 BERT 등에서 두 문장을 구분하는 핵심 입력입니다. NSP(Next Sentence Prediction)와 QA에서 사용됩니다.",
  sample_tests: [
    { input: { batch_segments: [[[101,1,2,102],[101,3,102]]], max_len: 8, pad_token: 0 }, expected: [[[101,1,2,102,101,3,102,0]],[[0,0,0,0,1,1,1,0]],[[1,1,1,1,1,1,1,0]]] },
    { input: { batch_segments: [[[1,2]], [[3,4,5]]], max_len: 4, pad_token: 0 }, expected: [[[1,2,0,0],[3,4,5,0]],[[0,0,0,0],[0,0,0,0]],[[1,1,0,0],[1,1,1,0]]] },
  ],
  hidden_tests: [
    { input: { batch_segments: [[[10]]], max_len: 1, pad_token: 0 }, expected: [[[10]],[[0]],[[1]]], failure_category: "edge_case" },
    { input: { batch_segments: [[[1,2],[3],[4,5,6]]], max_len: 7, pad_token: -1 }, expected: [[[1,2,3,4,5,6,-1]],[[0,0,1,2,2,2,0]],[[1,1,1,1,1,1,0]]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["batch_pad_collate", "multimodal_collate_pad"],
  fallback_problem_ids: ["batch_pad_collate"],
};
export default problem;
