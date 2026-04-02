# Codility-Style 코딩테스트 연습 웹앱 — 전체 명세서

> **목적**: 이 문서를 외부 LLM(GPT 등)에게 제공하면, 이 웹앱의 틀과 기능을 보존하면서 새 문제를 추가하거나 기존 문제를 수정할 수 있음.

---

## 1. 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS (다크 모드) |
| 코드 에디터 | Monaco Editor (@monaco-editor/react) |
| AI 코칭 | Anthropic SDK (@anthropic-ai/sdk) — Claude |
| Python 실행 | Node.js child_process → scripts/run_code.py |
| 데이터 저장 | 파일 기반 JSON (data/progress.json, data/review-notes.json) |
| 패키지 매니저 | npm |

---

## 2. 프로젝트 구조 (핵심만)

```
c:\coding\
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈 (문제 목록 + 통계)
│   ├── layout.tsx                # 레이아웃
│   ├── globals.css               # 전역 스타일
│   ├── problems/[id]/page.tsx    # 문제 풀이 페이지
│   ├── notes/page.tsx            # 오답 노트 페이지
│   ├── mock-test/page.tsx        # 모의 테스트
│   └── api/                      # API 라우트들
│       ├── problems/route.ts     # GET: 문제 목록 (ProblemSummary[])
│       ├── problems/[id]/route.ts # GET: 문제 상세
│       ├── run/route.ts          # POST: 샘플 테스트 실행
│       ├── submit/route.ts       # POST: 최종 제출 (샘플+히든)
│       ├── coach/route.ts        # POST: AI 코칭 대화
│       ├── feedback/route.ts     # POST: AI 코드 리뷰
│       ├── notes/route.ts        # GET/POST: 오답 노트
│       ├── progress/route.ts     # GET: 유저 진도
│       └── concepts/route.ts     # GET: 전체 개념 목록
├── components/                   # React 컴포넌트 (15개)
│   ├── ProblemList.tsx           # 문제 목록 표시
│   ├── ProblemDescription.tsx    # 문제 설명 표시
│   ├── CodeEditor.tsx            # Monaco 에디터
│   ├── TestResults.tsx           # 샘플 테스트 결과
│   ├── SubmitResults.tsx         # 제출 결과 (히든 테스트 포함)
│   ├── BasicLearningPanel.tsx    # 기본 학습 단계별 가이드 + 실행 확인
│   ├── LockedOverlay.tsx         # 잠금 문제 오버레이
│   ├── CoachingPanel.tsx         # AI 코칭 패널
│   ├── SelfCheckPanel.tsx        # 제출 전 자기 체크
│   ├── PostSolvePanel.tsx        # 풀이 후 AI 리뷰
│   ├── SolutionPanel.tsx         # 정답 코드 표시
│   ├── RecommendedProblems.tsx   # 추천 문제 표시
│   ├── StatsBoard.tsx            # 진도 통계
│   ├── ThinkingPad.tsx           # 사전 생각 정리 UI
│   └── Timer.tsx                 # 타이머
├── problems/                     # 문제 데이터 (TypeScript 파일)
│   ├── index.ts                  # 중앙 레지스트리 (ALL_PROBLEMS 배열)
│   ├── algorithm/                # 알고리즘 문제 (69개)
│   ├── ai/                       # AI 기초 문제 (12개)
│   ├── pytorch/                  # PyTorch 문제 (17개)
│   ├── pandas/                   # Pandas 문제 (8개)
│   └── sklearn/                  # Sklearn 문제 (6개)
├── lib/                          # 핵심 로직
│   ├── types.ts                  # 모든 타입/인터페이스 정의
│   ├── checker.ts                # 채점 로직 (exact, float_tolerance 등)
│   ├── runner.ts                 # Python 실행 엔진
│   ├── progress.ts               # 유저 진도 읽기/쓰기
│   ├── recommender.ts            # 추천 알고리즘
│   ├── coaching.ts               # 코칭 데이터 생성기
│   ├── coachingStore.ts          # 코칭 상태 관리
│   ├── learning-path.ts          # 기본 학습 경로 + 선수 조건
│   ├── concepts.ts               # 전체 개념 정의 (오답 노트용)
│   └── review-notes.ts           # 오답 노트 관리
├── scripts/
│   └── run_code.py               # Python 실행 스크립트
├── data/
│   ├── progress.json             # 유저 진도 데이터
│   └── review-notes.json         # 오답 노트 데이터
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 3. 핵심 타입 정의 (lib/types.ts)

### 3.1 Problem 인터페이스 — 문제를 정의하는 핵심 구조

```typescript
type Category = "algorithm" | "ai" | "pytorch" | "pandas" | "sklearn";
type Difficulty = "easy" | "medium" | "hard";
type CheckerType = "exact" | "float_tolerance" | "unordered" | "ordered_list"
                 | "ranking" | "vector" | "custom";

interface Example {
  input: Record<string, unknown>;
  output: unknown;
  explanation?: string;
}

interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
  failure_category?: string;  // 히든 테스트 실패 시 카테고리
}

interface Problem {
  id: string;                     // 고유 ID (snake_case). 파일명 kebab-case와 매핑
  title: string;                  // 영문 제목
  category: Category;
  difficulty: Difficulty;
  tags: string[];                 // 알고리즘/개념 태그 (coaching에서도 사용)
  statement_en: string;           // 영문 문제 설명 (마크다운)
  function_name: string;          // 보통 "solution"
  signature: string;              // Python 함수 시그니처
  constraints: string[];          // 제약 조건 목록
  examples: Example[];            // 예제 (UI 표시용)
  starter_code: string;           // 초기 코드 (한글 주석 포함)
  hints?: string[];               // 한글 힌트 목록 (최소 2개 권장)
  solution_code?: string;         // 정답 코드 (Python)
  solution_explanation?: string;  // 한글 풀이 설명
  sample_tests: TestCase[];       // 공개 테스트 (최소 2개)
  hidden_tests: TestCase[];       // 비공개 테스트 (최소 2개, failure_category 필수)
  checker_type: CheckerType;      // 채점 방식
  tolerance?: number;             // float_tolerance/vector 일 때 허용 오차
  similar_problem_ids: string[];  // 유사 문제 ID (추천용)
  fallback_problem_ids: string[]; // 대안 문제 ID (추천용)
}
```

### 3.2 기타 타입들

```typescript
type ProblemStatus = "unseen" | "attempted" | "solved" | "failed";
type MasteryLevel = "perfect" | "good" | "assisted" | null;

interface ProblemSummary {
  id: string; title: string; category: Category; difficulty: Difficulty;
  tags: string[]; status: ProblemStatus; mastery?: MasteryLevel;
  is_basic?: boolean; locked?: boolean; locked_by?: string[];
}

interface UserProgress {
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
```

---

## 4. 문제 파일 작성 규격 (★ 가장 중요)

### 4.1 파일 위치와 네이밍

- 파일 경로: `problems/{category}/{kebab-case-id}.ts`
- ID는 **snake_case** (예: `two_pointer_pair_sum`)
- 파일명은 **kebab-case** (예: `two-pointer-pair-sum.ts`)
- 카테고리별 폴더: `algorithm/`, `ai/`, `pytorch/`, `pandas/`, `sklearn/`

### 4.2 파일 템플릿

```typescript
import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "문제_id_snake_case",
  title: "English Title",
  category: "algorithm",  // "algorithm" | "ai" | "pytorch" | "pandas" | "sklearn"
  difficulty: "easy",      // "easy" | "medium" | "hard"
  tags: ["tag1", "tag2"],  // 사용 가능한 태그는 아래 참조
  statement_en: `영문으로 작성. 마크다운 지원.

**Function signature:**
\\\`\\\`\\\`python
def solution(param: Type) -> ReturnType:
\\\`\\\`\\\`

파라미터, 리턴값 설명.
`,
  function_name: "solution",
  signature: "def solution(param: Type) -> ReturnType:",
  constraints: [
    "1 <= len(arr) <= 10^5",
    "제약 조건들",
  ],
  examples: [
    {
      input: { param: [1, 2, 3] },
      output: 6,
      explanation: "1+2+3 = 6",
    },
  ],
  starter_code: `def solution(param: Type) -> ReturnType:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "한글로 작성. 첫 번째 힌트는 방향 제시.",
    "두 번째 힌트는 구체적 접근법.",
  ],
  solution_code: `def solution(param: Type) -> ReturnType:
    # 정답 코드 (순수 Python)
    return result`,
  solution_explanation: "한글로 풀이 설명.",
  sample_tests: [
    { input: { param: [1, 2, 3] }, expected: 6 },
    { input: { param: [0] }, expected: 0 },
  ],
  hidden_tests: [
    { input: { param: [1] }, expected: 1, failure_category: "single_element" },
    { input: { param: [-1, -2] }, expected: -3, failure_category: "negative" },
    { input: { param: Array(100000).fill(1) }, expected: 100000, failure_category: "performance" },
  ],
  checker_type: "exact",  // 아래 채점 방식 참조
  // tolerance: 0.01,     // float_tolerance/vector일 때만
  similar_problem_ids: ["관련_문제_id1", "관련_문제_id2"],
  fallback_problem_ids: ["더_쉬운_문제_id"],
};

export default problem;
```

### 4.3 채점 방식 (checker_type)

| checker_type | 용도 | 예시 |
|---|---|---|
| `"exact"` | 정확히 일치 (정수, 문자열, 배열, bool) | `true`, `[1,2,3]`, `42` |
| `"float_tolerance"` | 소수점 허용 오차 (기본 1e-6) | `3.14159` |
| `"unordered"` | 순서 무관 배열 비교 | `["b","a"]` == `["a","b"]` |
| `"ordered_list"` | 순서 있는 배열 (exact와 동일) | `[1,2,3]` |
| `"ranking"` | 순위/순서 일치 | 추천 결과 등 |
| `"vector"` | 2D 배열 소수점 허용 (tolerance 필수) | `[[1.23, 4.56]]` |
| `"custom"` | 기본 deep equal (fallback) | 복잡한 구조 |

### 4.4 사용 가능한 주요 태그

**Algorithm:**
`hash`, `array`, `sorting`, `binary_search`, `two_pointers`, `sliding_window`,
`prefix_sum`, `stack`, `heap`, `bfs`, `dfs`, `graph`, `greedy`,
`dynamic_programming`, `counting`, `string`, `optimization`

**AI:**
`nlp`, `tfidf`, `text_processing`, `cosine_similarity`, `similarity`,
`embedding`, `word_embeddings`, `retrieval`, `attention`, `transformer`,
`multi_head`, `softmax`, `cross_entropy`, `loss_function`, `classification`,
`metrics`, `evaluation`

**PyTorch:**
`pytorch`, `tensor`, `operations`, `mlp`, `forward_pass`, `neural_network`,
`mean_pooling`, `attention`, `transformer`

**Data:**
`pandas`, `groupby`, `aggregation`, `merge`, `join`, `cleaning`,
`preprocessing`, `sklearn`, `pipeline`, `scaling`, `recommendation`, `analysis`

### 4.5 failure_category 목록 (hidden_tests용)

```
edge_case, single_element, all_same, empty_input, negative, negative_numbers,
performance, large_input, medium_input, small_input, boundary, off_by_one,
zero_division, overflow, wrong_formula, precision, normalization,
duplicate, duplicates, duplicate_handling, type_mismatch, ranking_order,
tie_breaking, standard, base_case, disconnected, no_island, single_cell,
single_row, single_char, empty_string, cycle, no_friendships, single_person,
multiple_groups, multiple_branches, impossible
```

---

## 5. 문제 등록 절차 (problems/index.ts)

### 5.1 새 문제 추가

1. `problems/{category}/{kebab-case-id}.ts` 파일 생성
2. `problems/index.ts`에 import 추가:
   ```typescript
   import newProblem from "./{category}/{kebab-case-id}";
   ```
3. `ALL_PROBLEMS` 배열에 추가 (적절한 위치에):
   ```typescript
   export const ALL_PROBLEMS: Problem[] = [
     // ... 기존 문제들 ...
     newProblem,
   ];
   ```

### 5.2 기존 문제 제거

1. `ALL_PROBLEMS` 배열에서 해당 변수 제거
2. import 문 제거
3. 파일 삭제
4. **반드시 확인**: 다른 문제의 `similar_problem_ids`, `fallback_problem_ids`에서 해당 ID 참조 제거
5. **반드시 확인**: `lib/learning-path.ts`의 `PREREQUISITES`에서 해당 ID 참조 제거
6. **반드시 확인**: `lib/concepts.ts`의 `relatedProblems`에서 해당 ID 참조 제거

---

## 6. 학습 경로 시스템 (lib/learning-path.ts)

### 6.1 기본 문제 (Basic Problems)

기본 문제는 각 개념의 **입문 튜토리얼**로, 단계별 가이드와 함께 제공됩니다.
기본 문제는 `BASIC_PROBLEMS` 객체에 등록됩니다.

```typescript
interface LearningStep {
  title: string;        // "1단계: 변수 초기화"
  instruction: string;  // 한글 지시사항
  hint_code: string;    // 해당 단계의 코드 (힌트로 제공)
}

interface BasicInfo {
  concept: string;       // 개념명 (예: "Hash Map")
  explanation: string;   // 한글 개념 설명
  keyPoints: string[];   // 핵심 포인트 3-5개
  steps: LearningStep[]; // 단계별 가이드 (3-6단계)
}

// 기본 문제로 등록
const ALGO_BASICS: Record<string, BasicInfo> = {
  problem_id: { concept, explanation, keyPoints, steps }
};

export const BASIC_PROBLEMS = { ...ALGO_BASICS, ...AI_BASICS, ...PYTORCH_BASICS, ...DATA_BASICS };
```

**기본 문제의 특수 동작:**
- 에디터 초기 코드가 `def solution(...): pass`로 리셋 (기존 starter_code의 첫 줄 + pass)
- hints 배열이 빈 배열로 대체 (코칭 패널 비활성화)
- 정답 코드를 바로 볼 수 있음 (학습 목적)
- BasicLearningPanel이 표시되어 단계별 가이드 제공
- 각 단계에서 "여기까지 실행해보기" 버튼으로 샘플 테스트 실행 가능
- 풀이 시 mastery가 항상 "perfect"
- 기본 문제를 풀어야 관련 실전 문제가 잠금 해제

### 6.2 선수 조건 (Prerequisites)

```typescript
export const PREREQUISITES: Record<string, string[]> = {
  practice_problem_id: ["basic_problem_id_1", "basic_problem_id_2"],
  // ...
};
```

- value의 모든 문제가 solved 상태여야 해당 문제가 잠금 해제됨
- `PREREQUISITES`에 없는 문제 + `BASIC_PROBLEMS`에 없는 문제 = 항상 잠금 해제
- `BASIC_PROBLEMS`에 있는 문제 = 항상 잠금 해제 (입문 문제이므로)

### 6.3 현재 기본 문제 목록 (31개)

**Algorithm (15):** duplicate_detector, longest_unique_subarray, prefix_sum_range_query, binary_search, bfs_connected_components, dfs_max_depth, two_pointer_pair_sum, valid_parentheses, dp_climbing_stairs, backtracking_subsets, string_palindrome, heap_kth_largest, dfs_island_count, union_find_groups

**AI (5):** cosine_similarity, bag_of_words, classification_metrics, softmax_from_scratch

**PyTorch (9):** tensor_manipulation, simple_mlp_forward, pytorch_training_loop, conv_output_shape, custom_dataset_logic, lr_warmup_scheduler, batch_pad_collate

**Data (2):** dataframe_aggregation, train_test_evaluation

---

## 7. 개념 시스템 (lib/concepts.ts) — 오답 노트용

문제를 틀리거나 assisted로 풀면 관련 개념이 오답 노트에 자동 추가됩니다.

```typescript
interface Concept {
  id: string;
  name: string;
  category: "algorithm" | "ai" | "pytorch" | "data";
  difficulty: "basic" | "intermediate" | "advanced";
  explanation: string;     // 한글 설명 (줄바꿈 포함)
  codeTemplate: string;    // 대표 코드 패턴
  relatedProblems: string[]; // 관련 문제 ID 목록
}
```

**새 문제를 추가할 때**: 해당 문제의 ID를 적절한 Concept의 `relatedProblems`에 추가해야 오답 노트에서 연결됩니다.

현재 29개 개념 정의됨:
- Algorithm (21): hash_map, sliding_window, prefix_sum, binary_search, two_pointers, stack, bfs, dfs, dynamic_programming, backtracking, heap, union_find, greedy, sorting_techniques, boyer_moore_voting, kadane, sqrt_optimization, sieve, gcd, bit_manipulation, sweep_line, fibonacci
- AI (5): cosine_similarity, softmax_cross_entropy, attention_mechanism, embedding_pooling, classification_metrics
- PyTorch (5): tensor_ops, cnn_shape, training_loop, lr_scheduling, contrastive_learning
- Data (2): pandas_groupby, sklearn_pipeline

---

## 8. 채점 & 실행 시스템

### 8.1 Python 실행 (scripts/run_code.py)

- `from typing import List, Dict, Tuple, Set, Optional, Any, Union` 자동 주입
- 단일 네임스페이스에서 `exec()` → 재귀 함수도 자기 자신 참조 가능
- numpy, torch, sklearn, pandas 등 설치된 라이브러리 사용 가능
- 타임아웃: 10초
- 결과는 JSON으로 stdout 출력

### 8.2 채점 흐름

**Run (샘플 테스트):**
POST /api/run → sample_tests만 실행 → 각 결과 pass/fail + 실행시간 반환

**Submit (최종 제출):**
POST /api/submit → sample_tests + hidden_tests 모두 실행
- 전부 통과 → status: "solved", mastery 계산
- 실패 → status: "failed", failure_categories 반환, 추천 문제 제공

### 8.3 Mastery 계산

```
perfect: 첫 시도, 힌트 0, AI 0, 키워드 미공개
good:    시도 ≤2, 힌트 ≤1, AI 0
assisted: 그 외
basic 문제: 항상 perfect
```

- `assisted` 또는 실패 시 → 오답 노트에 관련 개념 자동 추가

### 8.4 추천 시스템 (lib/recommender.ts)

실패 시 추천 순서:
1. `similar_problem_ids`에 있는 미풀이 문제
2. `fallback_problem_ids`에 있는 미풀이 문제
3. 같은 태그의 같거나 낮은 난이도 문제 (태그 겹침 많은 순)

---

## 9. AI 코칭 시스템

### 9.1 템플릿 기반 코칭 (lib/coaching.ts)

tags를 기반으로 자동 생성:
- 5단계 힌트 (방향 → 핵심 개념 → 로직 뼈대 → 상세 접근 → 전체 솔루션)
- 키워드 (필수/보조)
- 막힘 가이드 (이해, 접근법, 자료구조, 구현, 디버깅, 최적화)
- 생각 정리 프롬프트

### 9.2 LLM 코칭 (app/api/coach/route.ts)

Anthropic Claude를 사용한 대화형 코칭:
- 최소 힌트 원칙 — 답을 직접 알려주지 않음
- progressive하게 유도
- 한글 응답

### 9.3 AI 코드 리뷰 (app/api/feedback/route.ts)

문제 풀이 후 Claude가 코드를 분석하여 피드백 제공.

---

## 10. 문제 예시 (카테고리별)

### 10.1 Algorithm (exact 채점)

```typescript
const problem: Problem = {
  id: "duplicate_detector",
  title: "Duplicate Detector",
  category: "algorithm",
  difficulty: "easy",
  tags: ["hash", "frequency"],
  statement_en: `Given an array of integers, determine if it contains any duplicates...`,
  function_name: "solution",
  signature: "def solution(nums: List[int]) -> bool:",
  constraints: ["1 <= len(nums) <= 10^5", "-10^9 <= nums[i] <= 10^9"],
  examples: [
    { input: { nums: [1, 2, 3, 1] }, output: true, explanation: "1 appears twice" },
  ],
  starter_code: `def solution(nums: List[int]) -> bool:\n    # 여기에 코드를 작성하세요\n    pass`,
  hints: ["O(1) 조회가 가능한 자료구조를 생각해 보세요.", "set은 고유한 원소만 담습니다."],
  solution_code: `def solution(nums: List[int]) -> bool:\n    return len(nums) != len(set(nums))`,
  solution_explanation: "set으로 변환한 뒤 길이를 비교. O(n) 시간, O(n) 공간.",
  sample_tests: [
    { input: { nums: [1, 2, 3, 1] }, expected: true },
    { input: { nums: [1, 2, 3, 4] }, expected: false },
  ],
  hidden_tests: [
    { input: { nums: [1] }, expected: false, failure_category: "single_element" },
    { input: { nums: [1000000000, -1000000000, 1000000000] }, expected: true, failure_category: "edge_case" },
    { input: { nums: [0, 0, 0, 0] }, expected: true, failure_category: "all_same" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["frequency_counter", "longest_unique_subarray"],
  fallback_problem_ids: [],
};
```

### 10.2 PyTorch (vector 채점, tolerance 사용)

```typescript
const problem: Problem = {
  id: "attention_scores",
  title: "Scaled Dot-Product Attention",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "attention", "transformer", "softmax"],
  // ... statement_en, signature 등 ...
  checker_type: "vector",
  tolerance: 0.01,
  // ...
};
```

### 10.3 Pandas (float_tolerance 채점)

```typescript
const problem: Problem = {
  id: "dataframe_aggregation",
  category: "pandas",
  tags: ["pandas", "groupby", "aggregation"],
  // ... starter_code에 `import pandas as pd` 포함 ...
  checker_type: "float_tolerance",
  tolerance: 0.01,
  // ...
};
```

---

## 11. 주요 규칙 요약

### 반드시 지켜야 할 것

1. **ID 규칙**: problem ID는 `snake_case`, 파일명은 `kebab-case`
2. **함수 이름**: 항상 `"solution"` (function_name 필드)
3. **Python 전용**: 코드는 모든 것이 Python. typing 모듈은 자동 import됨
4. **영문 문제 / 한글 힌트**: `statement_en`은 영어, `hints`, `solution_explanation`, `starter_code` 주석은 한글
5. **starter_code 형식**: 첫 줄은 함수 시그니처, 두 번째 줄은 `    # 여기에 코드를 작성하세요`, 세 번째 줄은 `    pass`
6. **hidden_tests에 failure_category 필수**: 모든 hidden test에 failure_category 명시
7. **sample_tests 최소 2개, hidden_tests 최소 2개**
8. **checker_type**: 소수점 결과면 `float_tolerance` 또는 `vector`, 2D 소수점이면 `vector`
9. **tolerance**: float/vector 타입일 때 반드시 지정 (보통 `0.01` 또는 `1e-6`)
10. **similar/fallback IDs**: 존재하는 문제 ID만 참조. 비어있으면 빈 배열 `[]`

### 피해야 할 것

1. **외부 라이브러리 의존**: 기본적으로 순수 Python + typing. pandas/sklearn/pytorch/numpy는 해당 카테고리에서만
2. **input 키 변경**: TestCase의 input은 함수 파라미터명과 정확히 일치해야 함 (`**inputs`로 전달됨)
3. **숨겨진 테스트 노출**: hidden_tests의 expected 값이 UI에는 표시되지 않지만 파일에는 있어야 함
4. **잘못된 expected 값**: 반드시 solution_code를 실행해서 검증된 expected 값 사용
5. **import 문 포함**: starter_code나 solution_code에 `from typing import ...` 불필요 (자동 주입)
6. **같은 ID 중복**: ALL_PROBLEMS 내에서 ID는 유일해야 함

---

## 12. 문제 추가 체크리스트

새 문제를 GPT로 생성할 때 아래 모두 확인:

- [ ] ID가 snake_case이고, 파일명이 kebab-case인가?
- [ ] Category가 5개 중 하나인가?
- [ ] Difficulty가 easy/medium/hard 중 하나인가?
- [ ] Tags가 위 목록에 있는 태그인가?
- [ ] statement_en이 영어이고, 마크다운 형식인가?
- [ ] function_name이 "solution"인가?
- [ ] signature가 Python 타입 힌트 포함인가?
- [ ] starter_code에 `# 여기에 코드를 작성하세요` + `pass` 있는가?
- [ ] hints가 최소 2개, 한글인가?
- [ ] solution_code가 실제로 동작하는 Python 코드인가?
- [ ] solution_explanation이 한글인가?
- [ ] sample_tests가 최소 2개인가?
- [ ] hidden_tests가 최소 2개이고, 모두 failure_category가 있는가?
- [ ] checker_type이 결과 타입에 맞는가?
- [ ] 소수점 결과면 tolerance가 지정되어 있는가?
- [ ] similar/fallback IDs가 존재하는 문제를 참조하는가?
- [ ] TestCase의 input 키가 함수 파라미터명과 일치하는가?
- [ ] expected 값이 solution_code의 실제 출력과 일치하는가?

---

## 13. 기존 문제 목록 (112개)

### Algorithm (69개)
duplicate_detector, frequency_counter, top_k_frequent_tokens, longest_unique_subarray, min_subarray_len, prefix_sum_range_query, binary_search, bfs_connected_components, package_disposal, data_partition, two_sum_pairs, valid_parentheses, max_subarray_sum, dp_coin_change, string_anagram_groups, union_find_groups, edit_distance, task_scheduler_cooldown, word_search_grid, merge_intervals, top_k_bucket_sort, signal_gap_analyzer, array_rotation, unpaired_element, minimum_jumps, missing_badge, team_balance_split, passing_cars, divisible_count, sensor_priority_query, min_avg_slice, max_product_triplet, triangle_check, disc_intersections, robot_collision, stone_wall_blocks, bridge_builder, permutation_check, scoreboard_manager, first_available_slot, meeting_room_scheduler, lru_cache_simulator, delivery_route_optimizer, stock_trading_max_profit, majority_vote, equi_leader_split, max_profit_single, double_slice_max, count_factors, optimal_rectangle, non_divisor_count, semiprime_range, common_prime_check, fib_stepping_stones, fair_workload_split, peak_flag_placer, distinct_slice_count, triangle_count_pairs, min_abs_pair_sum, max_non_overlapping, rope_tying, dice_board_game, string_palindrome, two_pointer_pair_sum, dp_climbing_stairs, dfs_max_depth, heap_kth_largest, dfs_island_count, backtracking_subsets

### AI (12개)
cosine_similarity, sentence_embedding_mean_pooling, nearest_words_retrieval, classification_metrics, confusion_matrix_binary, recommendation_ranking, word_analogy, tfidf_from_scratch, bag_of_words, softmax_from_scratch, sigmoid_bce_loss, gradient_descent_step

### PyTorch (17개)
masked_mean_pooling, tensor_manipulation, attention_scores, batch_cross_entropy, simple_mlp_forward, multi_head_attention, pytorch_training_loop, conv_output_shape, custom_dataset_logic, contrastive_loss, lr_warmup_scheduler, batch_pad_collate, build_simple_cnn, multimodal_fusion, training_early_stopping, positional_encoding, gradient_accumulation

### Pandas (8개)
dataframe_aggregation, pandas_recommendation, dataframe_merge_analysis, data_cleaning_pipeline, sales_report_generator, customer_churn_features, time_series_preprocessing, ab_test_analyzer

### Sklearn (6개)
text_classification_pipeline, train_test_evaluation, feature_preprocessing, complete_classification_pipeline, hyperparameter_search, ensemble_model_comparison
