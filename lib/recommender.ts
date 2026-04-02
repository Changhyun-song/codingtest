import { Problem, ProblemSummary, UserProgress, ProblemStatus } from "./types";

const DIFFICULTY_ORDER: Record<string, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

export function getRecommendations(
  failedProblem: Problem,
  allProblems: Problem[],
  progress: UserProgress,
  maxCount: number = 3
): ProblemSummary[] {
  const candidates: Problem[] = [];
  const seen = new Set<string>();
  seen.add(failedProblem.id);

  for (const id of failedProblem.similar_problem_ids) {
    const p = allProblems.find((prob) => prob.id === id);
    if (p && !seen.has(p.id) && getStatus(p.id, progress) !== "solved") {
      candidates.push(p);
      seen.add(p.id);
    }
  }

  for (const id of failedProblem.fallback_problem_ids) {
    const p = allProblems.find((prob) => prob.id === id);
    if (p && !seen.has(p.id) && getStatus(p.id, progress) !== "solved") {
      candidates.push(p);
      seen.add(p.id);
    }
  }

  if (candidates.length < maxCount) {
    const failedDiff = DIFFICULTY_ORDER[failedProblem.difficulty] ?? 1;
    const tagSet = new Set(failedProblem.tags);

    const tagMatches = allProblems
      .filter((p) => {
        if (seen.has(p.id)) return false;
        if (getStatus(p.id, progress) === "solved") return false;
        const pDiff = DIFFICULTY_ORDER[p.difficulty] ?? 1;
        if (pDiff > failedDiff) return false;
        return p.tags.some((t) => tagSet.has(t));
      })
      .sort((a, b) => {
        const aOverlap = a.tags.filter((t) => tagSet.has(t)).length;
        const bOverlap = b.tags.filter((t) => tagSet.has(t)).length;
        return bOverlap - aOverlap;
      });

    for (const p of tagMatches) {
      if (candidates.length >= maxCount) break;
      candidates.push(p);
      seen.add(p.id);
    }
  }

  return candidates.slice(0, maxCount).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    difficulty: p.difficulty,
    tags: p.tags,
    status: getStatus(p.id, progress),
  }));
}

function getStatus(problemId: string, progress: UserProgress): ProblemStatus {
  return progress[problemId]?.status ?? "unseen";
}

export function getFailureCategories(
  failedIndices: number[],
  hiddenTests: { failure_category?: string }[]
): string[] {
  const categories = new Set<string>();
  for (const idx of failedIndices) {
    const cat = hiddenTests[idx]?.failure_category;
    if (cat) categories.add(cat);
  }
  return Array.from(categories);
}

export const FAILURE_MESSAGES: Record<string, string> = {
  edge_case: "엣지 케이스 처리가 필요합니다",
  negative_handling: "음수 값 케이스를 고려하세요",
  performance: "큰 입력에 대해 성능이 부족할 수 있습니다",
  wrong_formula: "수학 공식을 확인하세요",
  duplicate_handling: "중복 원소 처리를 주의하세요",
  empty_input: "빈 입력을 올바르게 처리하세요",
  large_input: "큰 입력에 대해 최적화가 필요합니다",
  overflow: "정수 오버플로우를 주의하세요",
  off_by_one: "Off-by-one 오류를 확인하세요",
  zero_division: "0으로 나누기를 처리하세요",
  type_mismatch: "반환 타입이 기대 타입과 일치하는지 확인하세요",
  boundary: "경계 조건을 확인하세요",
  disconnected: "연결되지 않은 컴포넌트를 처리하세요",
  single_element: "원소가 1개인 입력을 처리하세요",
  all_same: "모든 원소가 같은 경우를 처리하세요",
  precision: "부동소수점 정밀도 문제입니다",
  normalization: "정규화 단계를 확인하세요",
  metric_formula: "메트릭 공식을 검토하세요",
  ranking_order: "순위/정렬 순서를 확인하세요",
  tie_breaking: "동점 처리를 올바르게 하세요",
  standard: "기본 테스트 케이스를 확인하세요",
  multiple_coins: "여러 동전 조합을 고려하세요",
  impossible: "불가능한 경우를 처리하세요",
  no_island: "섬이 없는 경우를 처리하세요",
  single_cell: "단일 셀 입력을 처리하세요",
  single_row: "단일 행 입력을 처리하세요",
  small_input: "작은 입력에 대한 처리를 확인하세요",
  multiple_groups: "여러 그룹이 있는 경우를 확인하세요",
  empty_string: "빈 문자열을 처리하세요",
  single_char: "단일 문자 입력을 처리하세요",
  duplicate: "중복 값을 처리하세요",
  negative_numbers: "음수를 처리하세요",
  negative: "음수 값을 처리하세요",
  duplicates: "중복 원소를 처리하세요",
  base_case: "기저 조건을 처리하세요",
  medium_input: "중간 크기 입력을 확인하세요",
  multiple_branches: "여러 분기를 확인하세요",
  no_friendships: "관계가 없는 경우를 처리하세요",
  single_person: "1명인 경우를 처리하세요",
  cycle: "순환 구조를 처리하세요",
};
