import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "stock_trading_max_profit",
  title: "Stock Trading Max Profit",
  category: "algorithm",
  difficulty: "hard",
  tags: ["dynamic_programming", "greedy"],
  statement_en: `You are given an array \`prices\` where \`prices[i]\` is the stock price on day \`i\`. On each day you may buy, sell, or do nothing, but you must **sell before you buy again**, and you may complete **at most two** non-overlapping buy-sell transactions (buy → sell counts as one transaction).

Compute the **maximum profit** achievable. If no profit is possible, return \`0\`.

**Function signature:**
\`\`\`python
def solution(prices: List[int]) -> int:
\`\`\``,
  function_name: "solution",
  signature: "def solution(prices: List[int]) -> int:",
  constraints: [
    "0 <= len(prices) <= 10^5",
    "0 <= prices[i] <= 10^9",
  ],
  examples: [
    {
      input: { prices: [3, 3, 5, 0, 0, 3, 1, 4] },
      output: 6,
      explanation:
        "One optimal plan: buy at 0, sell at 3; buy at 1, sell at 4 for total profit 3+3=6.",
    },
    {
      input: { prices: [1, 2, 3, 4, 5] },
      output: 4,
      explanation: "A single transaction (buy at 1, sell at 5) yields profit 4; two transactions cannot beat that here.",
    },
  ],
  starter_code: `def solution(prices: List[int]) -> int:
    pass`,
  hints: [
    "최대 두 번의 매수·매도이므로 첫 번째 거래 최대 이익과 두 번째 거래를 한 번에 추적하는 상태를 쓸 수 있습니다.",
    "첫 매수 최소 가격, 첫 매도 후 이익, 두 번째 매수(첫 이익을 반영한 실질 비용), 두 번째 매도 후 이익을 갱신해 보세요.",
    "한 번의 순회로 네 값을 갱신하면 O(n)에 끝납니다.",
  ],
  solution_code: `from typing import List

def solution(prices: List[int]) -> int:
    if not prices:
        return 0
    buy1 = buy2 = float('inf')
    profit1 = profit2 = 0
    for price in prices:
        buy1 = min(buy1, price)
        profit1 = max(profit1, price - buy1)
        buy2 = min(buy2, price - profit1)
        profit2 = max(profit2, price - buy2)
    return profit2`,
  solution_explanation:
    "최대 두 번 거래하는 경우를 네 변수로 압축합니다. buy1·profit1은 첫 번째 매수·매도 후 최적값, buy2는 첫 이익을 반영한 두 번째 매수 비용(가격에서 profit1을 뺀 값의 최소), profit2는 두 번째 매도 후 최대 이익입니다. 한 번의 순회로 갱신하면 됩니다.",
  sample_tests: [
    { input: { prices: [3, 3, 5, 0, 0, 3, 1, 4] }, expected: 6 },
    { input: { prices: [1, 2, 3, 4, 5] }, expected: 4 },
  ],
  hidden_tests: [
    {
      input: { prices: [7, 6, 4, 3, 1] },
      expected: 0,
      failure_category: "decreasing",
    },
    {
      input: { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] },
      expected: 13,
      failure_category: "complex",
    },
    { input: { prices: [1] }, expected: 0, failure_category: "single_element" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dp_coin_change", "max_subarray_sum"],
  fallback_problem_ids: ["dp_coin_change"],
};

export default problem;
