import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "distributed_sampler_idx",
  title: "DistributedSampler Index Generator",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "distributed"],
  statement_en: `Implement the core logic of PyTorch's **DistributedSampler**.\n\nGiven dataset_size, num_replicas (GPUs), and rank:\n1. Pad indices to make evenly divisible (repeat from start)\n2. Each rank gets every num_replicas-th element starting from its rank\n\nReturn the indices for the given rank.\n\n**Function signature:**\n\`\`\`python\ndef solution(dataset_size: int, num_replicas: int, rank: int) -> List[int]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(dataset_size: int, num_replicas: int, rank: int) -> List[int]:",
  constraints: ["0 <= rank < num_replicas"],
  examples: [{ input: { dataset_size: 10, num_replicas: 3, rank: 0 }, output: [0, 3, 6, 9], explanation: "Padded to 12: [0..9,0,1]. Rank 0 gets indices 0,3,6,9" }],
  starter_code: "def solution(dataset_size: int, num_replicas: int, rank: int) -> List[int]:\n    pass",
  hints: ["먼저 총 크기를 num_replicas의 배수로 올림합니다.", "각 rank는 rank, rank+num_replicas, rank+2*num_replicas, ... 인덱스를 가져갑니다."],
  solution_code: `def solution(dataset_size: int, num_replicas: int, rank: int) -> List[int]:
    total = -(-dataset_size // num_replicas) * num_replicas
    indices = list(range(dataset_size))
    pad = total - dataset_size
    indices += indices[:pad]
    return indices[rank::num_replicas]`,
  solution_explanation: "DistributedSampler는 DDP 학습에서 각 GPU가 겹치지 않는 데이터를 받도록 합니다. 패딩으로 균등 분배를 보장합니다.",
  sample_tests: [
    { input: { dataset_size: 10, num_replicas: 3, rank: 0 }, expected: [0, 3, 6, 9] },
    { input: { dataset_size: 10, num_replicas: 3, rank: 2 }, expected: [2, 5, 8, 1] },
  ],
  hidden_tests: [
    { input: { dataset_size: 4, num_replicas: 2, rank: 1 }, expected: [1, 3], failure_category: "edge_case" },
    { input: { dataset_size: 7, num_replicas: 4, rank: 3 }, expected: [3, 7], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["stratified_sampler", "all_reduce_sim"],
  fallback_problem_ids: ["stratified_sampler"],
};
export default problem;
