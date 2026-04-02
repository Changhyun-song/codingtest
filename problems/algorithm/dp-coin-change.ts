import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "dp_coin_change",
  title: "Coin Change (Minimum Coins)",
  category: "algorithm",
  difficulty: "medium",
  tags: ["dynamic_programming"],
  statement_en: `You are given an array of coin denominations and a target amount. Find the **minimum number of coins** needed to make up that amount. If it's not possible, return -1.

You have unlimited supply of each coin denomination.

**Function signature:**
\`\`\`python
def solution(coins: List[int], amount: int) -> int:
\`\`\`

**Key DP idea:** Let dp[i] = minimum coins to make amount i.
- dp[0] = 0 (zero coins for zero amount)
- For each amount i, try every coin c: dp[i] = min(dp[i], dp[i-c] + 1) if i >= c
`,
  function_name: "solution",
  signature: "def solution(coins: List[int], amount: int) -> int:",
  constraints: ["1 <= len(coins) <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10,000"],
  examples: [
    { input: { coins: [1, 5, 10], amount: 12 }, output: 3, explanation: "10 + 1 + 1 = 12, 3 coins" },
    { input: { coins: [2], amount: 3 }, output: -1, explanation: "Cannot make 3 with only 2-cent coins" },
  ],
  starter_code: `def solution(coins: List[int], amount: int) -> int:
    # dp[i] = 금액 i를 만드는 최소 동전 수
    # dp[0] = 0
    # 1부터 amount까지 각 i에 대해:
    #   각 동전 c에 대해:
    #     i >= c이고 dp[i-c]가 유효하면: dp[i] = min(dp[i], dp[i-c] + 1)
    pass`,
  hints: [
    "크기 amount+1의 dp 배열을 무한대(또는 amount+1)로 초기화하고 dp[0] = 0으로 설정.",
    "1부터 amount까지 각 금액 i에 대해: 각 동전을 빼봅니다. dp[i-coin] + 1 < dp[i]이면 갱신.",
    "끝까지 dp[amount]가 무한대이면 -1을 반환. 아니면 dp[amount]를 반환.",
  ],
  solution_code: `def solution(coins: List[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i and dp[i - c] + 1 < dp[i]:
                dp[i] = dp[i - c] + 1
    return dp[amount] if dp[amount] <= amount else -1`,
  solution_explanation: "상향식 DP: dp[i] = 금액 i의 최소 동전 수. 각 동전을 시도하고 최솟값 선택. O(amount × 동전 수) 시간.",
  sample_tests: [
    { input: { coins: [1, 5, 10], amount: 12 }, expected: 3 },
    { input: { coins: [2], amount: 3 }, expected: -1 },
    { input: { coins: [1], amount: 0 }, expected: 0 },
  ],
  hidden_tests: [
    { input: { coins: [1, 2, 5], amount: 11 }, expected: 3, failure_category: "standard" },
    { input: { coins: [2, 5, 10, 1], amount: 27 }, expected: 4, failure_category: "multiple_coins" },
    { input: { coins: [3, 7], amount: 1 }, expected: -1, failure_category: "impossible" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dp_climbing_stairs", "max_subarray_sum"],
  fallback_problem_ids: ["dp_climbing_stairs"],
};

export default problem;
