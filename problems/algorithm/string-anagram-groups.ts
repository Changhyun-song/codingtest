import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "string_anagram_groups",
  title: "Group Anagrams",
  category: "algorithm",
  difficulty: "medium",
  tags: ["string", "hash"],
  statement_en: `Given a list of strings, group the **anagrams** together.

An anagram is a word formed by rearranging the letters of another word. For example, "eat", "tea", and "ate" are anagrams.

Return a list of groups. Each group is a sorted list of words. The groups can be in any order.

**Function signature:**
\`\`\`python
def solution(strs: List[str]) -> List[List[str]]:
\`\`\`

**Key insight:** Two words are anagrams if they have the same characters when sorted. Use sorted characters as a **hash map key**.
`,
  function_name: "solution",
  signature: "def solution(strs: List[str]) -> List[List[str]]:",
  constraints: ["1 <= len(strs) <= 10,000", "0 <= len(strs[i]) <= 100", "strs[i] consists of lowercase English letters"],
  examples: [
    {
      input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
      output: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
      explanation: "eat/tea/ate are anagrams, tan/nat are anagrams, bat is alone",
    },
  ],
  starter_code: `def solution(strs: List[str]) -> List[List[str]]:
    # 힌트: sorted("eat") == sorted("tea") == "aet"
    # 이것을 딕셔너리의 키로 사용
    pass`,
  hints: [
    "애너그램의 문자를 정렬하면 같은 문자열이 됩니다. 'eat' → 'aet', 'tea' → 'aet'.",
    "정렬된 문자열을 키로, 원래 단어 리스트를 값으로 하는 딕셔너리를 사용합니다.",
    "from collections import defaultdict; groups = defaultdict(list); for s in strs: groups[tuple(sorted(s))].append(s)",
  ],
  solution_code: `def solution(strs: List[str]) -> List[List[str]]:
    from collections import defaultdict
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return [sorted(g) for g in groups.values()]`,
  solution_explanation: "각 단어를 정렬하여 정규 키를 만들고 해시맵으로 그룹화. O(n × k log k) 시간, k = 최대 단어 길이.",
  sample_tests: [
    {
      input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
      expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
    },
    { input: { strs: ["a"] }, expected: [["a"]] },
  ],
  hidden_tests: [
    { input: { strs: [""] }, expected: [[""]], failure_category: "empty_string" },
    { input: { strs: ["ab", "ba", "abc", "bca", "cab"] }, expected: [["ab", "ba"], ["abc", "bca", "cab"]], failure_category: "multiple_groups" },
  ],
  checker_type: "unordered",
  similar_problem_ids: ["frequency_counter", "string_palindrome"],
  fallback_problem_ids: ["frequency_counter"],
};

export default problem;
