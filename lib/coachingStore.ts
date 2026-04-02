import { CoachingState } from "./types";

const PREFIX = "coaching_";

export function getDefaultCoachingState(): CoachingState {
  return {
    problemSummary: "",
    expectedComplexity: "",
    dataStructures: "",
    edgeCases: "",
    hintLevel: 0,
    keywordsRevealed: false,
    stuckAt: null,
    solveStartTime: null,
    firstSolveTimeMs: null,
    reviewDate: null,
    reviewCount: 0,
    selfCheckCompleted: false,
    chatMessages: [],
  };
}

export function loadCoachingState(problemId: string): CoachingState {
  if (typeof window === "undefined") return getDefaultCoachingState();
  try {
    const raw = localStorage.getItem(PREFIX + problemId);
    if (!raw) return getDefaultCoachingState();
    return { ...getDefaultCoachingState(), ...JSON.parse(raw) };
  } catch {
    return getDefaultCoachingState();
  }
}

export function saveCoachingState(problemId: string, state: CoachingState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFIX + problemId, JSON.stringify(state));
}

export function getReviewMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const map: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      try {
        const s = JSON.parse(localStorage.getItem(key)!) as CoachingState;
        if (s.reviewDate) {
          map[key.replace(PREFIX, "")] = s.reviewDate;
        }
      } catch { /* skip */ }
    }
  }
  return map;
}
