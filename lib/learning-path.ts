/**
 * 학습 경로 설정 — 각 개념의 "기본 문제"와 단계별 가이드 + 선수 조건 정의
 */

export interface LearningStep {
  title: string;
  instruction: string;
  hint_code: string;
}

export interface BasicInfo {
  concept: string;
  explanation: string;
  keyPoints: string[];
  steps: LearningStep[];
}

// ── Algorithm Basics ──

const ALGO_BASICS: Record<string, BasicInfo> = {
  duplicate_detector: {
    concept: "Hash Map",
    explanation:
      "Hash Map(딕셔너리)은 key-value 쌍으로 데이터를 저장하며, 조회·삽입·삭제가 평균 O(1)입니다.",
    keyPoints: [
      "dict/set의 in 연산자는 O(1) 조회",
      "collections.Counter로 빈도수 계산",
      "set()으로 중복 제거 및 존재 여부 확인",
    ],
    steps: [
      {
        title: "1단계: 빈 set 생성",
        instruction: "중복을 확인할 빈 set을 만드세요.",
        hint_code: "seen = set()",
      },
      {
        title: "2단계: 순회하며 중복 확인",
        instruction:
          "for 루프로 각 원소를 확인하세요. 이미 seen에 있으면 True를 반환하고, 없으면 추가하세요.",
        hint_code:
          "for num in nums:\n        if num in seen:\n            return True\n        seen.add(num)",
      },
      {
        title: "3단계: 결과 반환",
        instruction: "루프가 끝나면 중복이 없으므로 False를 반환하세요.",
        hint_code: "return False",
      },
    ],
  },
  longest_unique_subarray: {
    concept: "Sliding Window",
    explanation:
      "Sliding Window는 배열에서 연속 구간을 유지하면서 left/right 포인터를 이동시키는 기법입니다. O(n)에 최적 부분 배열을 찾을 수 있습니다.",
    keyPoints: [
      "left, right 두 포인터로 윈도우 관리",
      "조건 위반 시 left를 오른쪽으로 이동",
      "right를 하나씩 확장하면서 최적값 갱신",
    ],
    steps: [
      {
        title: "1단계: 변수 초기화",
        instruction:
          "left 포인터, 최대 길이, 마지막 위치를 저장할 딕셔너리를 초기화하세요.",
        hint_code: "seen = {}\n    left = 0\n    max_len = 0",
      },
      {
        title: "2단계: 오른쪽으로 확장",
        instruction:
          "for 루프로 right를 이동하며, 현재 값이 이미 seen에 있고 left 이후면 left를 갱신하세요.",
        hint_code:
          "for right, val in enumerate(nums):\n        if val in seen and seen[val] >= left:\n            left = seen[val] + 1",
      },
      {
        title: "3단계: 위치 기록 + 최대값 갱신",
        instruction: "현재 값의 위치를 기록하고, 윈도우 크기의 최대값을 갱신하세요.",
        hint_code:
          "        seen[val] = right\n        max_len = max(max_len, right - left + 1)",
      },
      {
        title: "4단계: 결과 반환",
        instruction: "최대 길이를 반환하세요.",
        hint_code: "return max_len",
      },
    ],
  },
  prefix_sum_range_query: {
    concept: "Prefix Sum",
    explanation:
      "Prefix Sum(누적합)은 배열의 구간 합을 O(1)에 구하기 위한 전처리 기법입니다.",
    keyPoints: [
      "prefix[0] = 0, prefix[i] = prefix[i-1] + arr[i-1]",
      "구간 합 = prefix[r+1] - prefix[l]",
      "전처리 O(n), 쿼리 O(1)",
    ],
    steps: [
      {
        title: "1단계: 누적합 배열 생성",
        instruction:
          "길이 n+1의 prefix 배열을 만들고, prefix[i+1] = prefix[i] + nums[i]로 채우세요.",
        hint_code:
          "prefix = [0] * (len(nums) + 1)\n    for i in range(len(nums)):\n        prefix[i + 1] = prefix[i] + nums[i]",
      },
      {
        title: "2단계: 쿼리 답 계산",
        instruction:
          "각 쿼리 [l, r]에 대해 prefix[r+1] - prefix[l]로 구간 합을 구하세요.",
        hint_code: "return [prefix[r + 1] - prefix[l] for l, r in queries]",
      },
    ],
  },
  binary_search: {
    concept: "Binary Search",
    explanation:
      "Binary Search는 정렬된 배열에서 목표값을 O(log n)에 찾는 알고리즘입니다.",
    keyPoints: [
      "lo, hi 경계를 설정하고 mid = (lo + hi) // 2",
      "arr[mid] < target이면 lo = mid + 1",
      "정렬이 전제조건",
    ],
    steps: [
      {
        title: "1단계: 경계 초기화",
        instruction: "left = 0, right = len(nums) - 1로 탐색 범위를 설정하세요.",
        hint_code: "left, right = 0, len(nums) - 1",
      },
      {
        title: "2단계: while 루프 + 중간점",
        instruction: "left <= right인 동안 중간점 mid를 계산하세요.",
        hint_code: "while left <= right:\n        mid = (left + right) // 2",
      },
      {
        title: "3단계: 비교 및 범위 축소",
        instruction:
          "nums[mid]와 target을 비교하세요. 같으면 반환, 작으면 left = mid+1, 크면 right = mid-1.",
        hint_code:
          "        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1",
      },
      {
        title: "4단계: 없는 경우",
        instruction: "루프 종료 후 -1을 반환하세요.",
        hint_code: "return -1",
      },
    ],
  },
  bfs_connected_components: {
    concept: "BFS (너비 우선 탐색)",
    explanation:
      "BFS는 그래프를 레벨 순서로 탐색합니다. Queue를 사용하며, 최단 경로와 연결 요소 찾기에 적합합니다.",
    keyPoints: [
      "collections.deque()로 큐 구현",
      "visited set으로 방문 체크 필수",
      "연결 요소 = BFS 시작 횟수",
    ],
    steps: [
      {
        title: "1단계: 인접 리스트 생성",
        instruction:
          "n개의 빈 리스트로 인접 리스트를 만들고, 간선을 양방향으로 추가하세요.",
        hint_code:
          "from collections import deque\n    adj = [[] for _ in range(n)]\n    for u, v in edges:\n        adj[u].append(v)\n        adj[v].append(u)",
      },
      {
        title: "2단계: 변수 초기화",
        instruction: "visited 배열과 연결 요소 카운터를 초기화하세요.",
        hint_code: "visited = [False] * n\n    count = 0",
      },
      {
        title: "3단계: BFS 탐색",
        instruction:
          "모든 노드를 순회하며, 방문 안 한 노드에서 BFS를 시작하세요. 큐에서 꺼내며 이웃을 방문합니다.",
        hint_code:
          "for i in range(n):\n        if not visited[i]:\n            count += 1\n            queue = deque([i])\n            visited[i] = True\n            while queue:\n                node = queue.popleft()\n                for nb in adj[node]:\n                    if not visited[nb]:\n                        visited[nb] = True\n                        queue.append(nb)",
      },
      {
        title: "4단계: 결과 반환",
        instruction: "연결 요소의 수를 반환하세요.",
        hint_code: "return count",
      },
    ],
  },
  dfs_max_depth: {
    concept: "DFS (깊이 우선 탐색)",
    explanation:
      "DFS는 한 방향으로 끝까지 탐색한 후 되돌아오는 방식입니다. 재귀로 자연스럽게 구현됩니다.",
    keyPoints: [
      "재귀 호출 = 암묵적 스택",
      "base case 설정 필수",
      "현재 노드 처리 + 자식 재귀",
    ],
    steps: [
      {
        title: "1단계: 최소 깊이 설정",
        instruction: "현재 리스트 자체가 깊이 1이므로 max_d = 1로 시작하세요.",
        hint_code: "max_d = 1",
      },
      {
        title: "2단계: 재귀 탐색",
        instruction:
          "각 원소를 확인하고, 리스트이면 재귀 호출하여 1 + 하위 깊이를 비교하세요.",
        hint_code:
          "for item in nested:\n        if isinstance(item, list):\n            max_d = max(max_d, 1 + solution(item))",
      },
      {
        title: "3단계: 결과 반환",
        instruction: "현재 레벨의 최대 깊이를 반환하세요.",
        hint_code: "return max_d",
      },
    ],
  },
  two_pointer_pair_sum: {
    concept: "Two Pointers",
    explanation:
      "Two Pointers는 정렬된 배열에서 양 끝의 두 포인터를 이동시키며 조건을 찾는 기법입니다. O(n²) → O(n).",
    keyPoints: [
      "배열을 먼저 정렬",
      "합이 크면 right--, 작으면 left++",
      "정렬 O(n log n) + 탐색 O(n)",
    ],
    steps: [
      {
        title: "1단계: 포인터 초기화",
        instruction:
          "이미 정렬된 배열의 양 끝에 left=0, right=len-1 포인터를 놓으세요.",
        hint_code: "left, right = 0, len(nums) - 1",
      },
      {
        title: "2단계: 합 비교 루프",
        instruction:
          "left < right인 동안, 두 값의 합을 계산하세요.",
        hint_code:
          "while left < right:\n        s = nums[left] + nums[right]",
      },
      {
        title: "3단계: 포인터 이동",
        instruction:
          "합이 target이면 True, 작으면 left++, 크면 right--.",
        hint_code:
          "        if s == target:\n            return True\n        elif s < target:\n            left += 1\n        else:\n            right -= 1",
      },
      {
        title: "4단계: 결과 반환",
        instruction: "쌍을 못 찾으면 False.",
        hint_code: "return False",
      },
    ],
  },
  valid_parentheses: {
    concept: "Stack",
    explanation:
      "Stack은 LIFO 자료구조입니다. 괄호 매칭, 히스토리 관리 등 '가장 최근 것부터 처리'할 때 사용합니다.",
    keyPoints: [
      "Python list의 append() / pop()",
      "여는 괄호 → push, 닫는 괄호 → pop 후 매칭",
      "끝나면 스택이 비어있어야 올바름",
    ],
    steps: [
      {
        title: "1단계: 스택과 매핑 초기화",
        instruction: "빈 스택과 닫는→여는 괄호 매핑 딕셔너리를 만드세요.",
        hint_code:
          "stack = []\n    pairs = {')': '(', '}': '{', ']': '['}",
      },
      {
        title: "2단계: 문자 순회",
        instruction:
          "각 문자가 여는 괄호면 push, 닫는 괄호면 스택 top과 매칭을 확인하세요.",
        hint_code:
          "for c in s:\n        if c in '({[':\n            stack.append(c)\n        elif c in pairs:\n            if not stack or stack[-1] != pairs[c]:\n                return False\n            stack.pop()",
      },
      {
        title: "3단계: 최종 확인",
        instruction: "스택이 비어있으면 True (모든 괄호 매칭됨).",
        hint_code: "return len(stack) == 0",
      },
    ],
  },
  dp_climbing_stairs: {
    concept: "Dynamic Programming (DP)",
    explanation:
      "DP는 큰 문제를 작은 하위 문제로 분해하고, 결과를 저장하여 중복 계산을 피하는 기법입니다.",
    keyPoints: [
      "점화식: dp[i]의 의미를 명확히 정의",
      "base case: 초기값 설정",
      "bottom-up (반복문) vs top-down (재귀)",
    ],
    steps: [
      {
        title: "1단계: 기저 조건",
        instruction: "n이 1이면 1, n이 2면 2를 바로 반환하세요.",
        hint_code: "if n <= 2:\n        return n",
      },
      {
        title: "2단계: 이전 두 값 초기화",
        instruction:
          "prev2=1 (1칸 오르는 방법), prev1=2 (2칸 오르는 방법)으로 시작하세요.",
        hint_code: "prev2, prev1 = 1, 2",
      },
      {
        title: "3단계: 반복 계산",
        instruction:
          "3부터 n까지, 현재 = 이전 + 이전이전. 값을 시프트하세요.",
        hint_code:
          "for _ in range(3, n + 1):\n        prev2, prev1 = prev1, prev2 + prev1",
      },
      {
        title: "4단계: 결과 반환",
        instruction: "prev1이 n번째 계단의 방법 수입니다.",
        hint_code: "return prev1",
      },
    ],
  },
  backtracking_subsets: {
    concept: "Backtracking",
    explanation:
      "Backtracking은 모든 경우를 탐색하되, 유망하지 않은 경로는 포기하는 기법입니다.",
    keyPoints: [
      "재귀 함수로 선택지를 추가/제거",
      "현재 상태를 결과에 추가",
      "정렬 후 중복 건너뛰기",
    ],
    steps: [
      {
        title: "1단계: 정렬 + 결과 리스트",
        instruction: "정렬하고 결과 리스트를 준비하세요.",
        hint_code: "nums.sort()\n    result = []",
      },
      {
        title: "2단계: 재귀 함수 정의",
        instruction:
          "bt(start, path) 함수를 만들고, 현재 path의 복사본을 결과에 추가하세요.",
        hint_code:
          "def bt(start, path):\n        result.append(path[:])",
      },
      {
        title: "3단계: 다음 원소 탐색",
        instruction:
          "start부터 순회하며 원소를 추가하고 재귀 호출하세요.",
        hint_code:
          "        for i in range(start, len(nums)):\n            bt(i + 1, path + [nums[i]])",
      },
      {
        title: "4단계: 호출 시작 + 반환",
        instruction: "bt(0, [])을 호출하고 결과를 반환하세요.",
        hint_code: "bt(0, [])\n    return result",
      },
    ],
  },
  string_palindrome: {
    concept: "String 처리",
    explanation:
      "문자열 문제의 기본 — Palindrome(회문) 확인은 양쪽 끝에서 비교합니다.",
    keyPoints: [
      "s == s[::-1]로 간단히 확인 가능",
      "알파벳/숫자만 필터링 + 소문자 변환",
      "Two Pointers로 O(n) 시간, O(1) 공간",
    ],
    steps: [
      {
        title: "1단계: 문자열 전처리",
        instruction:
          "알파벳과 숫자만 남기고 소문자로 변환하세요.",
        hint_code:
          "cleaned = ''.join(c.lower() for c in s if c.isalnum())",
      },
      {
        title: "2단계: 회문 확인",
        instruction: "뒤집은 문자열과 비교하세요.",
        hint_code: "return cleaned == cleaned[::-1]",
      },
    ],
  },
  heap_kth_largest: {
    concept: "Heap (우선순위 큐)",
    explanation:
      "Heap은 최소/최대값을 O(log n)에 다루는 자료구조입니다. K번째 큰 원소 찾기에 최적입니다.",
    keyPoints: [
      "heapq.heappush / heappop",
      "크기 K의 최소 힙 유지 → 루트가 K번째 큰 값",
      "최대 힙은 -val로 구현",
    ],
    steps: [
      {
        title: "1단계: heapq import + 빈 힙",
        instruction: "heapq를 import하고 빈 리스트를 만드세요.",
        hint_code: "import heapq\n    heap = []",
      },
      {
        title: "2단계: 원소 추가 + 크기 유지",
        instruction:
          "각 원소를 push하고, 힙 크기가 k를 초과하면 pop(최소값 제거)하세요.",
        hint_code:
          "for num in nums:\n        heapq.heappush(heap, num)\n        if len(heap) > k:\n            heapq.heappop(heap)",
      },
      {
        title: "3단계: 결과 반환",
        instruction: "크기 k인 최소 힙의 루트(heap[0])가 k번째 큰 원소입니다.",
        hint_code: "return heap[0]",
      },
    ],
  },
  dfs_island_count: {
    concept: "Grid DFS (2D 격자 탐색)",
    explanation:
      "지도를 위에서 내려다본다고 상상하세요. 1은 땅, 0은 바다입니다. 상하좌우로 연결된 땅 덩어리가 하나의 '섬'입니다.\n\nDFS(깊이 우선 탐색)는 하나의 땅(1)을 발견하면, 거기서부터 연결된 모든 땅을 찾아가는 방법입니다. 마치 물감을 떨어뜨리면 연결된 땅 전체에 퍼지는 것처럼요.\n\n핵심 아이디어: 땅(1)을 발견할 때마다 → 섬 개수 +1 → 그 섬 전체를 바다(0)로 칠해서 다시 세지 않게 함",
    keyPoints: [
      "grid[r][c] == 1이면 땅, 0이면 바다",
      "DFS = 하나의 땅에서 시작해서 연결된 모든 땅을 탐색하는 것",
      "방문한 땅은 0으로 바꿔서 '이미 센 섬'임을 표시",
      "상하좌우 4방향만 연결로 인정 (대각선 X)",
    ],
    steps: [
      {
        title: "1단계: 기본 변수 준비",
        instruction:
          "grid가 비어있으면 섬이 0개입니다. 그리고 격자의 행(rows), 열(cols) 수를 구하고, 섬 개수를 셀 변수 count를 0으로 만드세요.",
        hint_code: "if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0",
      },
      {
        title: "2단계: DFS 함수 뼈대 만들기",
        instruction:
          "dfs(r, c) 함수를 만듭니다. 이 함수는 (r, c) 위치에서 시작해서 연결된 땅을 전부 방문합니다.\n\n먼저 '멈춰야 할 조건'을 적으세요: r이나 c가 격자 밖이면? 또는 해당 칸이 바다(0)이면? → 아무것도 하지 않고 return",
        hint_code: "def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:\n            return",
      },
      {
        title: "3단계: 현재 칸을 '방문 완료'로 표시",
        instruction:
          "DFS가 이 칸에 도착했다면, 이 칸은 이미 센 섬의 일부입니다. 다시 세지 않도록 0(바다)으로 바꿔주세요.\n\n이 한 줄이 없으면 같은 칸을 무한히 반복 방문하게 됩니다!",
        hint_code: "        grid[r][c] = 0",
      },
      {
        title: "4단계: 상하좌우 4방향으로 퍼져나가기",
        instruction:
          "현재 칸의 위(r-1), 아래(r+1), 왼쪽(c-1), 오른쪽(c+1)에 대해 같은 dfs 함수를 호출하세요.\n\n이렇게 하면 물감이 퍼지듯 연결된 모든 땅을 자동으로 방문합니다.",
        hint_code: "        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)",
      },
      {
        title: "5단계: 격자 전체를 순회하며 섬 찾기",
        instruction:
          "이제 격자의 모든 칸을 확인합니다. 2중 for문으로 (r, c) 위치를 돌면서, 값이 1(아직 안 센 땅)이면:\n1. count += 1 (새 섬 발견!)\n2. dfs(r, c) 호출 (이 섬 전체를 0으로 칠함)\n\nDFS가 끝나면 이 섬의 모든 땅이 0이 되어서, 다음에 같은 섬을 또 세는 일이 없습니다.",
        hint_code: "for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                count += 1\n                dfs(r, c)",
      },
      {
        title: "6단계: 결과 반환",
        instruction: "모든 순회가 끝나면 count에 섬의 총 개수가 들어있습니다. 반환하세요.",
        hint_code: "return count",
      },
    ],
  },
  union_find_groups: {
    concept: "Union-Find (Disjoint Set)",
    explanation:
      "Union-Find는 원소들의 그룹을 효율적으로 관리합니다. find(같은 그룹?)와 union(합치기)이 핵심입니다.",
    keyPoints: [
      "parent[i] = i의 부모 (루트면 자기 자신)",
      "find: 경로 압축으로 O(α(n)) ≈ O(1)",
      "union: 두 루트를 연결",
    ],
    steps: [
      {
        title: "1단계: parent 배열 초기화",
        instruction: "각 사람이 자기 자신의 부모인 parent 배열을 만드세요.",
        hint_code: "parent = list(range(n))",
      },
      {
        title: "2단계: find 함수",
        instruction: "경로 압축으로 루트를 찾는 함수를 만드세요.",
        hint_code:
          "def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x",
      },
      {
        title: "3단계: union 함수",
        instruction: "두 원소의 루트를 연결하는 함수를 만드세요.",
        hint_code:
          "def union(x, y):\n        px, py = find(x), find(y)\n        if px != py:\n            parent[px] = py",
      },
      {
        title: "4단계: 그룹 합치기 + 결과",
        instruction:
          "모든 관계를 union하고, 고유 루트 수를 세세요.",
        hint_code:
          "for a, b in friendships:\n        union(a, b)\n    return len(set(find(i) for i in range(n)))",
      },
    ],
  },
};

// ── AI Basics ──

const AI_BASICS: Record<string, BasicInfo> = {
  cosine_similarity: {
    concept: "Cosine Similarity (코사인 유사도)",
    explanation:
      "두 벡터 사이의 각도를 측정하여 유사성을 판단합니다. NLP에서 단어/문장 비교의 핵심입니다.",
    keyPoints: [
      "cos(θ) = (A·B) / (||A|| × ||B||)",
      "dot product: sum(a*b)",
      "norm: sqrt(sum(x²))",
    ],
    steps: [
      {
        title: "1단계: 내적 계산",
        instruction: "두 벡터의 내적(dot product)을 계산하세요: Σ(a×b).",
        hint_code:
          "dot = sum(a * b for a, b in zip(vec_a, vec_b))",
      },
      {
        title: "2단계: 노름 계산",
        instruction: "각 벡터의 크기(L2 norm)를 계산하세요: √(Σx²).",
        hint_code:
          "norm_a = sum(a ** 2 for a in vec_a) ** 0.5\n    norm_b = sum(b ** 2 for b in vec_b) ** 0.5",
      },
      {
        title: "3단계: 유사도 반환",
        instruction: "내적을 두 노름의 곱으로 나누세요.",
        hint_code: "return dot / (norm_a * norm_b)",
      },
    ],
  },
  // sentence_embedding_mean_pooling → Medium이므로 PREREQUISITES로 이동
  bag_of_words: {
    concept: "Bag of Words (BoW)",
    explanation:
      "텍스트를 단어 빈도 벡터로 표현하는 가장 기본적인 NLP 기법입니다.",
    keyPoints: [
      "vocabulary → 각 단어에 인덱스 부여",
      "문서별로 단어 출현 횟수를 벡터로 표현",
      "순서 정보 손실이 단점",
    ],
    steps: [
      {
        title: "1단계: 단어-인덱스 매핑",
        instruction: "vocabulary의 각 단어에 인덱스를 부여하세요.",
        hint_code:
          "word_idx = {w: i for i, w in enumerate(vocabulary)}",
      },
      {
        title: "2단계: 문서별 벡터 생성",
        instruction:
          "각 문서를 순회하며 단어 빈도 벡터를 만드세요.",
        hint_code:
          "result = []\n    for doc in documents:\n        vec = [0] * len(vocabulary)\n        for word in doc.split():\n            if word in word_idx:\n                vec[word_idx[word]] += 1\n        result.append(vec)",
      },
      {
        title: "3단계: 반환",
        instruction: "모든 벡터를 반환하세요.",
        hint_code: "return result",
      },
    ],
  },
  classification_metrics: {
    concept: "Classification Metrics",
    explanation:
      "Precision, Recall, F1-Score는 분류 모델 평가의 핵심 지표입니다.",
    keyPoints: [
      "Precision = TP / (TP + FP)",
      "Recall = TP / (TP + FN)",
      "F1 = 2PR / (P + R)",
    ],
    steps: [
      {
        title: "1단계: TP, FP, FN 계산",
        instruction:
          "실제값과 예측값을 비교하여 TP, FP, FN을 세세요.",
        hint_code:
          "tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\n    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\n    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)",
      },
      {
        title: "2단계: Precision, Recall",
        instruction: "각 지표를 공식대로 계산하세요 (0 나눗셈 주의).",
        hint_code:
          "precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0",
      },
      {
        title: "3단계: F1-Score + 반환",
        instruction: "조화 평균을 계산하고 세 값을 리스트로 반환하세요.",
        hint_code:
          "f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0\n    return [precision, recall, f1]",
      },
    ],
  },
  // recommendation_ranking → Medium이므로 PREREQUISITES로 이동
  softmax_from_scratch: {
    concept: "Softmax & Numerical Stability",
    explanation:
      "Softmax는 벡터를 확률 분포로 변환합니다. exp() 오버플로우 방지를 위해 최대값을 빼는 것이 핵심입니다.",
    keyPoints: [
      "softmax(x_i) = exp(x_i) / Σexp(x_j)",
      "수치 안정성: x_i - max(x) 먼저 계산",
      "모든 출력 합 = 1",
    ],
    steps: [
      {
        title: "1단계: 최대값 빼기",
        instruction:
          "수치 안정성을 위해 logits의 최대값을 구하세요.",
        hint_code: "import math\n    max_val = max(logits)",
      },
      {
        title: "2단계: exp 계산",
        instruction: "각 값에서 max를 뺀 후 exp를 계산하세요.",
        hint_code:
          "exps = [math.exp(x - max_val) for x in logits]",
      },
      {
        title: "3단계: 정규화",
        instruction: "exp 합으로 나누어 확률로 변환하세요.",
        hint_code:
          "total = sum(exps)\n    return [round(e / total, 6) for e in exps]",
      },
    ],
  },
};

// ── PyTorch Basics ──

const PYTORCH_BASICS: Record<string, BasicInfo> = {
  tensor_manipulation: {
    concept: "PyTorch Tensor 기본",
    explanation:
      "Tensor는 PyTorch의 기본 데이터 구조입니다. reshape, transpose, broadcasting 등 형상 조작이 핵심입니다.",
    keyPoints: [
      ".view() / .reshape()로 형상 변환",
      "broadcasting: 차원 자동 확장 규칙",
      "transpose: 행↔열 교환",
    ],
    steps: [
      {
        title: "1단계: transpose 구현",
        instruction:
          "operation이 'transpose'면 행과 열을 바꾸세요.",
        hint_code:
          "import math\n    if operation == 'transpose':\n        return [[matrix[r][c] for r in range(len(matrix))] for c in range(len(matrix[0]))]",
      },
      {
        title: "2단계: flatten 구현",
        instruction:
          "operation이 'flatten'이면 2D를 1D로 펼치세요.",
        hint_code:
          "elif operation == 'flatten':\n        return [x for row in matrix for x in row]",
      },
      {
        title: "3단계: reshape 구현",
        instruction:
          "1D로 펼친 후 target_shape에 맞게 재배열하세요.",
        hint_code:
          "elif operation == 'reshape':\n        flat = [x for row in matrix for x in row]\n        rows, cols = target_shape\n        return [flat[r*cols:(r+1)*cols] for r in range(rows)]",
      },
      {
        title: "4단계: row_softmax 구현",
        instruction:
          "각 행에 softmax를 적용하세요 (max 빼기 → exp → 합으로 나누기).",
        hint_code:
          "elif operation == 'row_softmax':\n        result = []\n        for row in matrix:\n            m = max(row)\n            exps = [math.exp(x - m) for x in row]\n            s = sum(exps)\n            result.append([e / s for e in exps])\n        return result",
      },
      {
        title: "5단계: batch_norm 구현",
        instruction: "열별로 평균/표준편차를 구해 정규화하세요.",
        hint_code:
          "elif operation == 'batch_norm':\n        rows, cols = len(matrix), len(matrix[0])\n        result = [[0.0]*cols for _ in range(rows)]\n        for c in range(cols):\n            col = [matrix[r][c] for r in range(rows)]\n            mean = sum(col) / len(col)\n            var = sum((x - mean)**2 for x in col) / len(col)\n            std = math.sqrt(var)\n            for r in range(rows):\n                result[r][c] = (matrix[r][c] - mean) / std if std > 0 else 0.0\n        return result",
      },
    ],
  },
  // attention_scores, batch_cross_entropy → Hard/Medium이므로 PREREQUISITES로 이동
  simple_mlp_forward: {
    concept: "MLP (Multi-Layer Perceptron)",
    explanation:
      "가장 기본적인 신경망. Linear layer와 ReLU 활성화 함수를 쌓은 것입니다.",
    keyPoints: [
      "Linear: output = W @ input + b",
      "ReLU: max(0, x)",
      "forward()에서 순서대로 적용",
    ],
    steps: [
      {
        title: "1단계: 행렬-벡터 곱 함수",
        instruction: "W @ v + b를 계산하는 도우미 함수를 만드세요.",
        hint_code:
          "def matvec(W, v, b):\n        return [sum(W[i][j]*v[j] for j in range(len(v))) + b[i] for i in range(len(W))]",
      },
      {
        title: "2단계: ReLU 함수",
        instruction: "음수를 0으로 만드는 ReLU를 구현하세요.",
        hint_code: "def relu(v):\n        return [max(0, x) for x in v]",
      },
      {
        title: "3단계: 순전파",
        instruction:
          "h = ReLU(W1@input + b1), output = W2@h + b2를 계산하세요.",
        hint_code:
          "h = relu(matvec(W1, input_vec, b1))\n    return matvec(W2, h, b2)",
      },
    ],
  },
  pytorch_training_loop: {
    concept: "Training Loop & Optimizer",
    explanation:
      "PyTorch 학습의 핵심인 SGD with Momentum을 직접 구현합니다.",
    keyPoints: [
      "v = μ*v + grad",
      "w = w - lr * v",
      "batch 단위로 반복",
    ],
    steps: [
      {
        title: "1단계: 결과 리스트",
        instruction: "새 가중치와 속도를 저장할 빈 리스트를 만드세요.",
        hint_code: "new_w = []\n    new_v = []",
      },
      {
        title: "2단계: SGD with Momentum",
        instruction:
          "각 파라미터에 v_new = μ*v + g, w_new = w - lr*v_new을 적용하세요.",
        hint_code:
          "for w, g, v in zip(weights, gradients, prev_velocities):\n        v_new = momentum * v + g\n        w_new = w - lr * v_new\n        new_w.append(round(w_new, 6))\n        new_v.append(round(v_new, 6))",
      },
      {
        title: "3단계: 반환",
        instruction: "[새 가중치, 새 속도]를 반환하세요.",
        hint_code: "return [new_w, new_v]",
      },
    ],
  },
  conv_output_shape: {
    concept: "CNN Output Shape",
    explanation:
      "Conv2d/MaxPool2d의 출력 크기 공식: (W - K + 2P) / S + 1. 모델 설계의 필수 지식입니다.",
    keyPoints: [
      "Conv 출력: (W - K + 2P) / S + 1",
      "Pool 출력: 같은 공식",
      "stride, padding 기본값 주의",
    ],
    steps: [
      {
        title: "1단계: 초기 크기",
        instruction: "입력의 높이, 너비를 가져오세요.",
        hint_code: "h, w = input_size",
      },
      {
        title: "2단계: 레이어별 계산",
        instruction:
          "각 레이어의 공식을 적용하세요: (input + 2*padding - kernel) // stride + 1.",
        hint_code:
          "for layer in layers:\n        k = layer['kernel_size']\n        s = layer.get('stride', 1)\n        p = layer.get('padding', 0)\n        h = (h + 2 * p - k) // s + 1\n        w = (w + 2 * p - k) // s + 1",
      },
      {
        title: "3단계: 결과 반환",
        instruction: "최종 [h, w]를 반환하세요.",
        hint_code: "return [h, w]",
      },
    ],
  },
  custom_dataset_logic: {
    concept: "Custom Dataset & DataLoader",
    explanation:
      "__len__과 __getitem__을 구현하는 Dataset 로직입니다.",
    keyPoints: [
      "__getitem__(idx): idx번째 데이터 반환",
      "transform 적용",
      "DataLoader와 조합",
    ],
    steps: [
      {
        title: "1단계: flatten 도우미",
        instruction: "중첩 리스트를 1D로 펼치는 재귀 함수를 만드세요.",
        hint_code:
          "def flatten_list(lst):\n        result = []\n        for item in lst:\n            if isinstance(item, list):\n                result.extend(flatten_list(item))\n            else:\n                result.append(item)\n        return result",
      },
      {
        title: "2단계: 인덱싱 + 변환",
        instruction:
          "각 index로 데이터를 가져오고 transform을 적용하세요.",
        hint_code:
          "result = []\n    for idx in indices:\n        features, label = data[idx]\n        if transform == 'normalize':\n            max_abs = max((abs(x) for x in features), default=0)\n            if max_abs > 0:\n                features = [x / max_abs for x in features]\n        elif transform == 'flatten':\n            features = flatten_list(features)\n        result.append([features, label])",
      },
      {
        title: "3단계: 반환",
        instruction: "변환된 데이터를 반환하세요.",
        hint_code: "return result",
      },
    ],
  },
  // contrastive_loss → Medium이므로 PREREQUISITES로 이동
  lr_warmup_scheduler: {
    concept: "Learning Rate Scheduling",
    explanation:
      "대규모 모델에서 warmup → cosine decay 스케줄을 사용합니다.",
    keyPoints: [
      "Warmup: 0 → base_lr 선형 증가",
      "Cosine decay: base_lr × (1+cos(π·p))/2",
      "step 단위 업데이트",
    ],
    steps: [
      {
        title: "1단계: Warmup 단계",
        instruction:
          "현재 step이 warmup_steps보다 작으면 선형으로 증가시키세요.",
        hint_code:
          "import math\n    if current_step < warmup_steps:\n        lr = base_lr * (current_step / warmup_steps)",
      },
      {
        title: "2단계: Cosine Decay",
        instruction:
          "warmup 이후는 cosine 함수로 LR을 감소시키세요.",
        hint_code:
          "else:\n        progress = (current_step - warmup_steps) / (total_steps - warmup_steps)\n        lr = base_lr * 0.5 * (1 + math.cos(math.pi * progress))",
      },
      {
        title: "3단계: 반환",
        instruction: "계산된 LR을 반환하세요.",
        hint_code: "return round(lr, 8)",
      },
    ],
  },
  // masked_mean_pooling → Hard이므로 PREREQUISITES로 이동
  batch_pad_collate: {
    concept: "Batch Padding & Collation",
    explanation:
      "가변 길이 시퀀스를 같은 길이로 맞추고(padding), attention mask를 생성합니다.",
    keyPoints: [
      "배치 내 최대 길이로 padding",
      "attention mask: 실제=1, padding=0",
      "DataLoader의 collate_fn",
    ],
    steps: [
      {
        title: "1단계: 최대 길이 찾기",
        instruction: "가장 긴 시퀀스의 길이를 구하세요.",
        hint_code:
          "if not sequences:\n        return [[], []]\n    max_len = max(len(s) for s in sequences)",
      },
      {
        title: "2단계: 패딩 + 마스크 생성",
        instruction:
          "각 시퀀스를 max_len으로 패딩하고 attention mask를 만드세요.",
        hint_code:
          "padded = []\n    masks = []\n    for s in sequences:\n        pad_count = max_len - len(s)\n        padded.append(s + [pad_value] * pad_count)\n        masks.append([1] * len(s) + [0] * pad_count)",
      },
      {
        title: "3단계: 반환",
        instruction: "[padded, masks]를 반환하세요.",
        hint_code: "return [padded, masks]",
      },
    ],
  },
};

// (pandas / sklearn basics removed)

const PYTORCH_REAL_BASICS: Record<string, BasicInfo> = {
  torch_create_tensors: {
    concept: "PyTorch Tensor Creation",
    explanation:
      "PyTorch의 핵심인 텐서를 다양한 방법으로 생성하는 법을 배웁니다. torch.zeros, ones, arange, eye, full 등을 사용합니다.",
    keyPoints: [
      "torch.zeros(shape) — 0으로 채운 텐서",
      "torch.ones(shape) — 1로 채운 텐서",
      "torch.arange(n) — 0~n-1 정수 텐서",
      "torch.eye(n) — n×n 단위행렬",
      "torch.full(shape, value) — 특정 값으로 채운 텐서",
    ],
    steps: [
      { title: "zeros/ones 이해", instruction: "torch.zeros와 torch.ones로 주어진 shape의 텐서를 만들어보세요.", hint_code: "t = torch.zeros(shape)\n# 또는\nt = torch.ones(shape)" },
      { title: "arange/eye 이해", instruction: "torch.arange는 연속 정수, torch.eye는 단위행렬을 만듭니다.", hint_code: "t = torch.arange(n)\ne = torch.eye(n)" },
      { title: "full과 조건 분기", instruction: "mode에 따라 적절한 텐서 생성 함수를 호출하세요.", hint_code: "if mode == 'full':\n    t = torch.full(shape, 7.0)" },
    ],
  },
  torch_mse_loss: {
    concept: "MSE Loss (Mean Squared Error)",
    explanation:
      "회귀 문제에서 가장 기본적인 손실 함수입니다. 예측값과 실제값의 차이 제곱의 평균을 구합니다.",
    keyPoints: [
      "MSE = mean((pred - target)^2)",
      "nn.MSELoss()로 간편하게 계산 가능",
      "torch.tensor()로 리스트를 텐서로 변환",
      "loss.item()으로 스칼라 값 추출",
    ],
    steps: [
      { title: "텐서 변환", instruction: "입력 리스트를 torch.tensor로 변환하세요. dtype=torch.float32를 사용합니다.", hint_code: "pred = torch.tensor(predictions, dtype=torch.float32)" },
      { title: "손실 계산", instruction: "nn.MSELoss()를 사용하여 두 텐서 간의 MSE를 계산하세요.", hint_code: "loss = nn.MSELoss()(pred, tgt)" },
      { title: "스칼라 반환", instruction: "loss.item()으로 Python float 값으로 변환합니다.", hint_code: "return loss.item()" },
    ],
  },
  torch_custom_dataset: {
    concept: "PyTorch Dataset Class",
    explanation:
      "PyTorch의 Dataset 클래스를 상속받아 커스텀 데이터셋을 만드는 법을 배웁니다. __len__과 __getitem__을 구현합니다.",
    keyPoints: [
      "Dataset 클래스 상속",
      "__len__ → 데이터셋 크기 반환",
      "__getitem__ → 인덱스로 데이터 접근",
      "DataLoader와 함께 사용 가능",
    ],
    steps: [
      { title: "클래스 정의", instruction: "Dataset을 상속받는 SimpleDataset 클래스를 만드세요.", hint_code: "class SimpleDataset(Dataset):\n    def __init__(self, data, labels):\n        self.data = data\n        self.labels = labels" },
      { title: "__len__ 구현", instruction: "데이터셋의 크기를 반환하세요.", hint_code: "def __len__(self):\n    return len(self.data)" },
      { title: "__getitem__ 구현", instruction: "주어진 인덱스의 데이터와 레이블을 반환하세요.", hint_code: "def __getitem__(self, idx):\n    return [self.data[idx], self.labels[idx]]" },
    ],
  },
};

export const BASIC_PROBLEMS: Record<string, BasicInfo> = {
  ...ALGO_BASICS,
  ...AI_BASICS,
  ...PYTORCH_BASICS,
  ...PYTORCH_REAL_BASICS,
};

export const PREREQUISITES: Record<string, string[]> = {
  // Algorithm Practice
  frequency_counter: ["duplicate_detector"],
  top_k_frequent_tokens: ["duplicate_detector", "heap_kth_largest"],
  two_sum_pairs: ["duplicate_detector"],
  min_subarray_len: ["longest_unique_subarray"],
  data_partition: ["prefix_sum_range_query"],
  dp_coin_change: ["dp_climbing_stairs"],
  max_subarray_sum: ["dp_climbing_stairs"],
  edit_distance: ["dp_climbing_stairs", "string_palindrome"],
  string_anagram_groups: ["string_palindrome", "duplicate_detector"],
  lru_cache_simulator: ["duplicate_detector"],
  stock_trading_max_profit: ["dp_climbing_stairs"],
  merge_intervals: ["two_pointer_pair_sum"],
  top_k_bucket_sort: ["duplicate_detector"],
  // AI Medium/Hard
  sentence_embedding_mean_pooling: ["cosine_similarity"],
  recommendation_ranking: ["cosine_similarity"],
  nearest_words_retrieval: ["cosine_similarity"],
  word_analogy: ["sentence_embedding_mean_pooling", "cosine_similarity"],
  tfidf_from_scratch: ["bag_of_words"],
  confusion_matrix_binary: ["classification_metrics"],
  sigmoid_bce_loss: ["softmax_from_scratch"],
  gradient_descent_step: ["softmax_from_scratch"],
  beam_search_step: ["softmax_from_scratch"],
  top_p_filtering: ["softmax_from_scratch"],
  // PyTorch Medium/Hard
  attention_scores: ["tensor_manipulation", "softmax_from_scratch"],
  batch_cross_entropy: ["softmax_from_scratch"],
  contrastive_loss: ["cosine_similarity"],
  masked_mean_pooling: ["tensor_manipulation"],
  multi_head_attention: ["attention_scores"],
  batch_pad_collate: ["custom_dataset_logic"],
  build_simple_cnn: ["conv_output_shape", "simple_mlp_forward"],
  multimodal_fusion: ["simple_mlp_forward"],
  training_early_stopping: ["pytorch_training_loop"],
  positional_encoding: ["attention_scores"],
  gradient_accumulation: ["pytorch_training_loop"],
  // PyTorch New (Batch 1)
  focal_loss_compute: ["softmax_from_scratch"],
  gradient_clip_by_norm: ["pytorch_training_loop"],
  patch_embedding: ["tensor_manipulation"],
  kv_cache_attention: ["attention_scores"],
  // PyTorch New (Batch 2) — Tensor & Shape
  batch_matmul: ["tensor_manipulation"],
  shape_error_finder: ["conv_output_shape"],
  transpose_for_heads: ["tensor_manipulation", "attention_scores"],
  // PyTorch New (Batch 2) — nn.Module
  residual_block_forward: ["simple_mlp_forward", "linear_layer_manual"],
  // PyTorch New (Batch 2) — Loss & Training
  label_smoothing_loss: ["softmax_from_scratch"],
  triplet_loss: ["cosine_similarity"],
  manual_backward_linear: ["pytorch_training_loop", "linear_layer_manual"],
  knowledge_distill_loss: ["softmax_from_scratch"],
  // PyTorch New (Batch 2) — Data
  dynamic_batch_grouping: ["custom_dataset_logic"],
  stratified_sampler: ["custom_dataset_logic"],
  // PyTorch New (Batch 2) — Training Debug
  lr_range_test: ["pytorch_training_loop"],
  batch_norm_running: ["pytorch_training_loop"],
  dead_neuron_check: ["simple_mlp_forward"],
  // PyTorch New (Batch 2) — Attention
  causal_mask_attention: ["attention_scores"],
  relative_pos_bias: ["positional_encoding"],
  // PyTorch New (Batch 2) — Optimization
  quantize_dequantize: ["tensor_manipulation"],
  prune_by_magnitude: ["tensor_manipulation"],
  model_memory_calc: ["model_param_counter"],
  model_flops_count: ["model_param_counter"],
  // AI New — Multimodal
  clip_similarity: ["cosine_similarity"],
  contrastive_info_nce: ["softmax_from_scratch", "cosine_similarity"],
  cross_modal_project: ["cosine_similarity"],
  late_fusion_classify: ["softmax_from_scratch", "simple_mlp_forward"],
  // AI New — Bio
  protein_distance_map: ["bio_one_hot"],
  sequence_align_score: ["dp_climbing_stairs"],
  // AI New — NLP
  perplexity_compute: ["softmax_from_scratch"],
  rouge_1_score: ["bag_of_words"],
  bpe_merge_step: ["bag_of_words"],
  multi_label_metrics: ["classification_metrics"],
  attention_entropy: ["attention_scores"],
  // ── Batch 3: Tensor/Shape/Module ──
  masked_reduction: ["tensor_manipulation"],
  scatter_add_manual: ["tensor_manipulation", "tensor_indexing_gather"],
  matmul_chain_shapes: ["batch_matmul", "broadcast_shapes"],
  reshape_with_infer: ["tensor_manipulation", "broadcast_shapes"],
  weight_init_variance: ["linear_layer_manual"],
  freeze_param_count: ["model_param_counter"],
  // ── Batch 3: Autograd/Loss/Debug ──
  gradient_health_check: ["manual_backward_linear", "gradient_clip_by_norm"],
  loss_safety_check: ["softmax_from_scratch", "batch_cross_entropy"],
  cosine_warmup_restart: ["lr_warmup_scheduler"],
  multimodal_collate_pad: ["batch_pad_collate"],
  loss_curve_classify: ["pytorch_training_loop"],
  train_eval_dropout: ["dropout_forward", "linear_layer_manual"],
  // ── Batch 3: Attention ──
  padding_mask_build: ["batch_pad_collate", "attention_scores"],
  sliding_window_mask: ["causal_mask_attention"],
  // ── Batch 3: Multimodal/Bio ──
  modality_dropout_mask: ["dropout_forward"],
  slide_patch_aggregate: ["masked_mean_pooling", "attention_scores"],
  patient_split_check: ["classification_metrics"],
  sparse_bio_encode: ["bio_one_hot"],
  // ── Batch 3: Optimization/System ──
  model_precision_memory: ["model_memory_calc"],
  gradient_checkpoint_est: ["model_memory_calc"],
  activation_memory_est: ["model_memory_calc", "gradient_checkpoint_est"],
  throughput_estimate: ["model_precision_memory"],
  // ── Batch 3: Distributed ──
  all_reduce_sim: ["gradient_accumulation"],
  distributed_sampler_idx: ["stratified_sampler"],
  sync_batchnorm_compute: ["batch_norm_running", "all_reduce_sim"],
  ddp_gradient_step: ["all_reduce_sim", "pytorch_training_loop"],
  missing_modality_fill: ["multimodal_collate_pad"],
  cross_attention_weight: ["attention_scores"],
  length_bucket_assign: ["dynamic_batch_grouping"],
  token_type_embed: ["batch_pad_collate"],
  // ── Batch 3: Interview Reasoning ──
  pooling_compare: ["masked_mean_pooling"],
  mask_error_find: ["padding_mask_build"],
  data_leak_detect: ["classification_metrics"],
  gpu_fit_check: ["model_precision_memory"],
  training_step_order: ["pytorch_training_loop"],
  inference_throughput: ["throughput_estimate"],
  // ── PyTorch Real: Tensor Ops ──
  torch_indexing_ops: ["torch_create_tensors"],
  torch_reshape_heads: ["torch_create_tensors"],
  torch_boolean_mask: ["torch_create_tensors"],
  torch_softmax_topk: ["torch_create_tensors"],
  torch_einsum_ops: ["torch_reshape_heads", "torch_indexing_ops"],
  // ── PyTorch Real: Shape Debug + nn.Module ──
  torch_fix_matmul: ["torch_create_tensors"],
  torch_broadcast_add: ["torch_create_tensors"],
  torch_cat_stack: ["torch_create_tensors"],
  torch_linear_manual: ["torch_create_tensors"],
  torch_mlp_forward: ["torch_linear_manual"],
  torch_residual_block: ["torch_linear_manual"],
  // ── PyTorch Real: Training / Loss ──
  torch_ce_loss: ["torch_mse_loss"],
  torch_sgd_step: ["torch_mse_loss"],
  torch_grad_accumulation: ["torch_sgd_step"],
  torch_custom_loss: ["torch_mse_loss"],
  // ── PyTorch Real: Data Loading ──
  torch_collate_pad: ["torch_custom_dataset"],
  torch_attention_mask: ["torch_custom_dataset"],
  torch_dataloader_batch: ["torch_custom_dataset"],
  torch_multimodal_batch: ["torch_collate_pad"],
  // ── PyTorch Real: Attention / Transformer ──
  torch_sdpa: ["torch_softmax_topk", "torch_reshape_heads"],
  torch_causal_attn: ["torch_sdpa"],
  torch_pos_encoding: ["torch_sdpa"],
  torch_multihead_split: ["torch_reshape_heads"],
  torch_layer_norm: ["torch_create_tensors"],
  torch_token_pool: ["torch_attention_mask", "torch_layer_norm"],
  // ── PyTorch Real: Debugging + Multimodal ──
  torch_train_eval_mode: ["torch_mlp_forward"],
  torch_batchnorm_stats: ["torch_layer_norm"],
  torch_detect_anomaly: ["torch_sgd_step"],
  torch_concat_fusion: ["torch_linear_manual", "torch_cat_stack"],
  torch_contrastive_sim: ["torch_softmax_topk"],
};

export function isBasicProblem(problemId: string): boolean {
  return problemId in BASIC_PROBLEMS;
}

export function getPrerequisites(problemId: string): string[] {
  return PREREQUISITES[problemId] ?? [];
}

export function getBasicInfo(problemId: string): BasicInfo | null {
  return BASIC_PROBLEMS[problemId] ?? null;
}
