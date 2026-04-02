export type Category = "algorithm" | "ai" | "pytorch" | "pandas" | "sklearn";
export type Difficulty = "easy" | "medium" | "hard";
export type ExecutionMode = "python_concept" | "pytorch_real";
export type CheckerType =
  | "exact"
  | "float_tolerance"
  | "unordered"
  | "ordered_list"
  | "ranking"
  | "vector"
  | "custom";
export type ProblemStatus = "unseen" | "attempted" | "solved" | "failed";
export type MasteryLevel = "perfect" | "good" | "assisted" | null;

export interface Example {
  input: Record<string, unknown>;
  output: unknown;
  explanation?: string;
}

export interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
  failure_category?: string;
}

export interface Problem {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  statement_en: string;
  function_name: string;
  signature: string;
  constraints: string[];
  examples: Example[];
  starter_code: string;
  hints?: string[];
  solution_code?: string;
  solution_explanation?: string;
  sample_tests: TestCase[];
  hidden_tests: TestCase[];
  checker_type: CheckerType;
  tolerance?: number;
  similar_problem_ids: string[];
  fallback_problem_ids: string[];
  execution_mode?: ExecutionMode;
}

export interface TestResult {
  test_index: number;
  input: Record<string, unknown>;
  expected: unknown;
  actual: unknown;
  passed: boolean;
  time_ms: number;
  error: string | null;
}

export interface RunResponse {
  results: TestResult[];
  all_passed: boolean;
}

export interface SubmitResponse {
  status: "solved" | "failed";
  sample_results: TestResult[];
  hidden_passed: number;
  hidden_total: number;
  failure_categories: string[];
  recommendations: ProblemSummary[];
  mastery?: MasteryLevel;
}

export interface ProblemSummary {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  status: ProblemStatus;
  mastery?: MasteryLevel;
  is_basic?: boolean;
  locked?: boolean;
  locked_by?: string[];
  execution_mode?: ExecutionMode;
}

export interface UserProgress {
  [problemId: string]: {
    status: ProblemStatus;
    last_code?: string;
    attempts: number;
    solved_at?: string;
    failure_categories?: string[];
    mastery?: MasteryLevel;
    hints_used?: number;
    ai_chats_used?: number;
    keywords_revealed?: boolean;
  };
}

// ── Coaching System ──

export interface CoachingState {
  problemSummary: string;
  expectedComplexity: string;
  dataStructures: string;
  edgeCases: string;
  hintLevel: number;
  keywordsRevealed: boolean;
  stuckAt: string | null;
  solveStartTime: number | null;
  firstSolveTimeMs: number | null;
  reviewDate: string | null;
  reviewCount: number;
  selfCheckCompleted: boolean;
  chatMessages: ChatMessage[];
}

export interface CoachingHint {
  level: number;
  label: string;
  content: string;
}

export interface CoachingKeyword {
  keyword: string;
  description: string;
}

export interface CoachingData {
  oneLiner: string;
  thinkingPrompts: string[];
  hints: CoachingHint[];
  essentialKeywords: CoachingKeyword[];
  helpfulKeywords: CoachingKeyword[];
  stuckGuidance: Record<string, string>;
  alternativeApproaches: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
