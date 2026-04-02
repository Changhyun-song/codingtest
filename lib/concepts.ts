export interface Concept {
  id: string;
  name: string;
  category: "algorithm" | "ai" | "pytorch" | "data";
  difficulty: "basic" | "intermediate" | "advanced";
  explanation: string;
  codeTemplate: string;
  relatedProblems: string[];
}

export const ALL_CONCEPTS: Concept[] = [
  // ━━━━━━━━━━ Algorithm ━━━━━━━━━━
  {
    id: "hash_map",
    name: "Hash Map / Set",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "딕셔너리(dict)와 집합(set)은 O(1) 조회/삽입/삭제를 제공합니다.\n• 중복 확인: set에 넣으면서 이미 존재하는지 체크\n• 빈도수 세기: Counter 또는 dict로 각 원소 횟수 저장\n• 그룹핑: defaultdict(list)로 같은 key끼리 묶기",
    codeTemplate: `# 중복 확인
seen = set()
for x in arr:
    if x in seen:
        return True
    seen.add(x)

# 빈도수 세기
from collections import Counter
freq = Counter(arr)

# 그룹핑
from collections import defaultdict
groups = defaultdict(list)
for item in data:
    groups[key(item)].append(item)`,
    relatedProblems: [
      "duplicate_detector", "frequency_counter", "two_sum_pairs",
      "top_k_frequent_tokens", "lru_cache_simulator",
      "string_anagram_groups", "missing_badge",
    ],
  },
  {
    id: "sliding_window",
    name: "슬라이딩 윈도우",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "배열에서 연속 구간을 left/right 포인터로 관리하는 기법입니다.\n• right를 확장하면서 윈도우에 원소 추가\n• 조건 위반 시 left를 이동하며 원소 제거\n• O(n)에 최적 구간을 찾을 수 있음",
    codeTemplate: `left = 0
for right in range(len(arr)):
    # 윈도우에 arr[right] 추가
    window.add(arr[right])

    # 조건 위반 시 left 이동
    while 조건_위반:
        window.remove(arr[left])
        left += 1

    # 현재 윈도우로 결과 갱신
    result = max(result, right - left + 1)`,
    relatedProblems: [
      "longest_unique_subarray", "min_subarray_len",
    ],
  },
  {
    id: "prefix_sum",
    name: "누적합 (Prefix Sum)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "구간 합을 O(1)에 구하기 위한 전처리 기법입니다.\n• prefix[i] = arr[0] + arr[1] + ... + arr[i-1]\n• 구간 [l, r] 합 = prefix[r+1] - prefix[l]\n• 전처리 O(n), 쿼리 O(1)",
    codeTemplate: `# 누적합 배열 생성
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + arr[i]

# 구간 합 쿼리
range_sum = prefix[r + 1] - prefix[l]`,
    relatedProblems: [
      "prefix_sum_range_query", "data_partition",
    ],
  },
  {
    id: "binary_search",
    name: "이진 탐색",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "정렬된 배열에서 O(log n)에 목표를 찾습니다.\n• lo, hi 경계 설정 → mid 계산 → 비교 후 범위 축소\n• '답에 대한 이진 탐색': 최적값을 직접 이진 탐색",
    codeTemplate: `lo, hi = 0, len(arr) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1`,
    relatedProblems: [
      "binary_search",
    ],
  },
  {
    id: "two_pointers",
    name: "투 포인터",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "정렬된 배열에서 양 끝의 두 포인터를 이동시켜 O(n)에 조건을 만족하는 쌍을 찾습니다.\n• 합이 target보다 크면 right--, 작으면 left++\n• 정렬 O(n log n) + 탐색 O(n)",
    codeTemplate: `arr.sort()
left, right = 0, len(arr) - 1
while left < right:
    s = arr[left] + arr[right]
    if s == target:
        return True
    elif s < target:
        left += 1
    else:
        right -= 1`,
    relatedProblems: [
      "two_pointer_pair_sum",
    ],
  },
  {
    id: "stack",
    name: "스택 (Stack)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "LIFO(후입선출) 자료구조입니다.\n• 괄호 매칭: 여는 괄호 push, 닫는 괄호 pop 후 매칭 확인\n• 단조 스택: 스택에 값을 유지하며 조건에 맞지 않으면 pop\n• 히스토리 추적: 가장 최근 상태를 빠르게 접근",
    codeTemplate: `stack = []
pairs = {')': '(', '}': '{', ']': '['}
for c in s:
    if c in '({[':
        stack.append(c)
    elif c in pairs:
        if not stack or stack[-1] != pairs[c]:
            return False
        stack.pop()
return len(stack) == 0`,
    relatedProblems: [
      "valid_parentheses",
    ],
  },
  {
    id: "bfs",
    name: "BFS (너비 우선 탐색)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "그래프를 레벨 순서로 탐색합니다. 최단 경로 찾기에 최적입니다.\n• Queue(deque) 사용\n• visited set으로 재방문 방지\n• 연결 요소 수 = BFS 시작 횟수",
    codeTemplate: `from collections import deque
visited = set([start])
queue = deque([(start, 0)])
while queue:
    node, dist = queue.popleft()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append((neighbor, dist + 1))`,
    relatedProblems: [
      "bfs_connected_components",
    ],
  },
  {
    id: "dfs",
    name: "DFS (깊이 우선 탐색)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "한 방향으로 끝까지 탐색한 후 되돌아오는 방식입니다.\n• 재귀로 자연스럽게 구현\n• Grid DFS: 상하좌우 4방향 탐색, 방문 표시 필수",
    codeTemplate: `def dfs(grid, r, c):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
        return
    if grid[r][c] == 0:
        return
    grid[r][c] = 0
    dfs(grid, r+1, c)
    dfs(grid, r-1, c)
    dfs(grid, r, c+1)
    dfs(grid, r, c-1)`,
    relatedProblems: [
      "dfs_max_depth", "dfs_island_count",
    ],
  },
  {
    id: "dynamic_programming",
    name: "동적 프로그래밍 (DP)",
    category: "algorithm",
    difficulty: "intermediate",
    explanation:
      "큰 문제를 작은 하위 문제로 분해하고, 결과를 저장하여 중복 계산을 피합니다.\n• 점화식 정의: dp[i]의 의미를 명확히\n• base case 설정 → bottom-up 반복\n• 1D DP, 2D DP 등 다양한 패턴",
    codeTemplate: `# 1D DP
dp = [0] * (n + 1)
dp[1] = 1; dp[2] = 2
for i in range(3, n + 1):
    dp[i] = dp[i-1] + dp[i-2]

# 2D DP - 편집 거리
dp = [[0]*(m+1) for _ in range(n+1)]
for i in range(n+1): dp[i][0] = i
for j in range(m+1): dp[0][j] = j
for i in range(1, n+1):
    for j in range(1, m+1):
        if s1[i-1] == s2[j-1]:
            dp[i][j] = dp[i-1][j-1]
        else:
            dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`,
    relatedProblems: [
      "dp_climbing_stairs", "dp_coin_change", "edit_distance",
      "stock_trading_max_profit",
    ],
  },
  {
    id: "backtracking",
    name: "백트래킹",
    category: "algorithm",
    difficulty: "intermediate",
    explanation:
      "모든 경우를 탐색하되, 유망하지 않은 경로를 조기에 포기합니다.\n• 재귀 함수로 선택 → 탐색 → 복원 반복\n• 순열, 조합, 부분집합 생성에 사용",
    codeTemplate: `def backtrack(start, path):
    result.append(path[:])
    for i in range(start, len(nums)):
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()`,
    relatedProblems: [
      "backtracking_subsets",
    ],
  },
  {
    id: "heap",
    name: "힙 (우선순위 큐)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "최소/최대값을 O(log n)에 관리하는 자료구조입니다.\n• heapq: 기본은 최소 힙. 최대 힙은 -val 사용\n• K번째 큰 원소: 크기 K의 최소 힙 유지\n• 스케줄링/병합 등에 활용",
    codeTemplate: `import heapq
heap = []
for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
        heapq.heappop(heap)
# heap[0]이 k번째 큰 원소`,
    relatedProblems: [
      "heap_kth_largest", "top_k_bucket_sort",
    ],
  },
  {
    id: "union_find",
    name: "Union-Find (Disjoint Set)",
    category: "algorithm",
    difficulty: "intermediate",
    explanation:
      "원소들의 그룹을 효율적으로 관리합니다.\n• find: 루트 노드 찾기 (경로 압축)\n• union: 두 그룹 합치기",
    codeTemplate: `parent = list(range(n))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x
def union(a, b):
    pa, pb = find(a), find(b)
    if pa != pb:
        parent[pa] = pb`,
    relatedProblems: ["union_find_groups"],
  },
  {
    id: "greedy",
    name: "그리디 (Greedy)",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "각 단계에서 최선의 선택을 하는 전략입니다.\n• 정렬 후 탐욕적 선택\n• 구간 스케줄링, 최소 동전 등에 사용",
    codeTemplate: `intervals.sort(key=lambda x: x[1])
count, last_end = 0, -1
for start, end in intervals:
    if start > last_end:
        count += 1
        last_end = end`,
    relatedProblems: [
      "merge_intervals",
    ],
  },
  {
    id: "sorting_techniques",
    name: "정렬 활용",
    category: "algorithm",
    difficulty: "basic",
    explanation:
      "정렬을 통해 문제를 단순화하는 패턴입니다.\n• 아나그램 그룹: 정렬된 문자열을 key로 사용\n• 배열 회전: 인덱스 계산",
    codeTemplate: `groups = defaultdict(list)
for s in strs:
    key = ''.join(sorted(s))
    groups[key].append(s)`,
    relatedProblems: [
      "string_anagram_groups", "array_rotation",
    ],
  },
  {
    id: "kadane",
    name: "카데인 알고리즘 (최대 부분배열)",
    category: "algorithm",
    difficulty: "intermediate",
    explanation:
      "연속 부분배열의 최대 합을 O(n)에 구합니다.\n• current = max(arr[i], current + arr[i])\n• 음수가 누적되면 새로 시작하는 것이 유리",
    codeTemplate: `max_sum = current = arr[0]
for x in arr[1:]:
    current = max(x, current + x)
    max_sum = max(max_sum, current)`,
    relatedProblems: [
      "max_subarray_sum",
    ],
  },

  // ━━━━━━━━━━ AI Fundamentals ━━━━━━━━━━
  {
    id: "cosine_similarity",
    name: "코사인 유사도",
    category: "ai",
    difficulty: "basic",
    explanation:
      "두 벡터 사이의 각도로 유사도를 측정합니다.\n• cos(θ) = (A·B) / (||A|| × ||B||)\n• 1에 가까울수록 유사, 0이면 직교, -1이면 반대\n• NLP에서 단어/문장 벡터 비교에 핵심",
    codeTemplate: `def cosine_sim(a, b):
    dot = sum(x*y for x, y in zip(a, b))
    norm_a = sum(x**2 for x in a) ** 0.5
    norm_b = sum(x**2 for x in b) ** 0.5
    return dot / (norm_a * norm_b)`,
    relatedProblems: [
      "cosine_similarity", "nearest_words_retrieval",
      "word_analogy", "contrastive_loss",
      "clip_similarity", "cross_modal_project",
    ],
  },
  {
    id: "softmax_cross_entropy",
    name: "Softmax & Cross-Entropy",
    category: "ai",
    difficulty: "basic",
    explanation:
      "Softmax는 벡터를 확률 분포로 변환하고, Cross-Entropy는 분류 손실을 계산합니다.\n• softmax(x_i) = exp(x_i) / Σexp(x_j)\n• 수치 안정성: max(x)를 빼고 계산\n• CE = -log(softmax[target])",
    codeTemplate: `import math
def softmax(logits):
    m = max(logits)
    exps = [math.exp(x - m) for x in logits]
    s = sum(exps)
    return [e / s for e in exps]`,
    relatedProblems: [
      "softmax_from_scratch", "batch_cross_entropy",
      "sigmoid_bce_loss",
    ],
  },
  {
    id: "attention_mechanism",
    name: "Attention Mechanism",
    category: "ai",
    difficulty: "intermediate",
    explanation:
      "Query, Key, Value를 사용한 가중합 메커니즘입니다.\n• score = Q @ K^T / √d_k\n• weights = softmax(score)\n• output = weights @ V\n• Transformer의 핵심 구성 요소",
    codeTemplate: `import math
d_k = len(Q[0])
scale = math.sqrt(d_k)
scores = [[sum(Q[i][d]*K[j][d] for d in range(d_k)) / scale
           for j in range(len(K))]
          for i in range(len(Q))]
weights = [softmax(row) for row in scores]
output = [[sum(weights[i][j]*V[j][d] for j in range(len(V)))
           for d in range(len(V[0]))]
          for i in range(len(Q))]`,
    relatedProblems: [
      "attention_scores", "multi_head_attention",
      "positional_encoding", "kv_cache_attention",
      "causal_mask_attention", "relative_pos_bias",
      "transpose_for_heads", "padding_mask_build",
      "sliding_window_mask", "cross_attention_weight",
    ],
  },
  {
    id: "embedding_pooling",
    name: "Embedding & Pooling",
    category: "ai",
    difficulty: "basic",
    explanation:
      "토큰 임베딩을 문장/문서 단위 벡터로 집계하는 기법입니다.\n• Mean Pooling: 유효 토큰의 평균\n• Attention Mask: padding을 제외\n• BoW, TF-IDF: 단어 빈도 기반 표현",
    codeTemplate: `def mean_pooling(embeddings, mask):
    dim = len(embeddings[0])
    result = [0.0] * dim
    count = sum(mask)
    for i, m in enumerate(mask):
        if m:
            for d in range(dim):
                result[d] += embeddings[i][d]
    return [x / count for x in result]`,
    relatedProblems: [
      "sentence_embedding_mean_pooling", "masked_mean_pooling",
      "bag_of_words", "tfidf_from_scratch",
    ],
  },
  {
    id: "classification_metrics",
    name: "분류 평가 지표",
    category: "ai",
    difficulty: "basic",
    explanation:
      "분류 모델의 성능을 측정하는 핵심 지표입니다.\n• Precision = TP / (TP + FP)\n• Recall = TP / (TP + FN)\n• F1 = 2PR / (P+R)",
    codeTemplate: `tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)
precision = tp / (tp + fp) if (tp + fp) > 0 else 0
recall = tp / (tp + fn) if (tp + fn) > 0 else 0
f1 = 2*precision*recall / (precision+recall) if (precision+recall) > 0 else 0`,
    relatedProblems: [
      "classification_metrics", "confusion_matrix_binary",
      "multi_label_metrics",
    ],
  },
  {
    id: "decoding_strategies",
    name: "디코딩 전략 (Beam/Sampling)",
    category: "ai",
    difficulty: "intermediate",
    explanation:
      "언어 모델의 텍스트 생성 시 사용하는 디코딩 기법입니다.\n• Beam Search: 상위 K개 후보를 유지하며 확장\n• Top-p (Nucleus): 누적 확률 p까지만 허용\n• Temperature: 분포의 날카로움 조절",
    codeTemplate: `# Beam Search
candidates = []
for b in range(beam_size):
    for v in range(vocab_size):
        candidates.append((scores[b] + log_probs[b][v], b, v))
candidates.sort(key=lambda x: -x[0])
top = candidates[:beam_width]

# Top-p Filtering
sorted_probs = sorted(enumerate(probs), key=lambda x: -x[1])
cumsum = 0
keep = set()
for idx, p in sorted_probs:
    cumsum += p
    keep.add(idx)
    if cumsum >= top_p:
        break`,
    relatedProblems: [
      "beam_search_step", "top_p_filtering",
      "temperature_scale", "perplexity_compute",
    ],
  },

  // ━━━━━━━━━━ PyTorch ━━━━━━━━━━
  {
    id: "tensor_ops",
    name: "Tensor 연산",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "PyTorch Tensor의 기본 형상 조작입니다.\n• reshape/view: 형상 변환\n• transpose: 차원 교환\n• Broadcasting: 차원 자동 확장\n• batch_norm: 배치 정규화",
    codeTemplate: `import torch
x = x.view(batch, -1)
x = x.transpose(0, 1)
x = x.unsqueeze(0)`,
    relatedProblems: [
      "tensor_manipulation", "batch_pad_collate",
      "tensor_shape_tracker", "patch_embedding",
      "broadcast_shapes", "tensor_indexing_gather",
      "topk_with_indices", "masked_reduction",
      "scatter_add_manual", "matmul_chain_shapes",
      "reshape_with_infer",
    ],
  },
  {
    id: "cnn_shape",
    name: "CNN 출력 크기 계산",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "Conv2d / MaxPool2d의 출력 크기 공식입니다.\n• output = (input + 2*padding - kernel) / stride + 1",
    codeTemplate: `def calc_output_size(input_size, kernel, stride=1, padding=0):
    return (input_size + 2*padding - kernel) // stride + 1`,
    relatedProblems: [
      "conv_output_shape", "build_simple_cnn",
    ],
  },
  {
    id: "training_loop",
    name: "학습 루프 & 옵티마이저",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "PyTorch 학습의 핵심 패턴입니다.\n• forward → loss → backward → optimizer.step()\n• SGD with Momentum: v = μv + grad, w = w - lr*v\n• Early Stopping: val_loss가 patience번 연속 개선 안 되면 중단",
    codeTemplate: `for epoch in range(epochs):
    model.train()
    optimizer.zero_grad()
    output = model(x)
    loss = criterion(output, y)
    loss.backward()
    optimizer.step()`,
    relatedProblems: [
      "pytorch_training_loop", "training_early_stopping",
      "gradient_accumulation", "gradient_clip_by_norm",
      "weight_decay_step", "cosine_warmup_restart",
      "training_step_order",
    ],
  },
  {
    id: "lr_scheduling",
    name: "Learning Rate 스케줄링",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "학습 중 LR을 동적으로 조절하는 기법입니다.\n• Warmup: 처음에 LR을 0에서 서서히 증가\n• Cosine Decay: cos 함수로 부드럽게 감소",
    codeTemplate: `import math
def get_lr(step, warmup_steps, total_steps, base_lr):
    if step < warmup_steps:
        return base_lr * (step / warmup_steps)
    else:
        progress = (step - warmup_steps) / (total_steps - warmup_steps)
        return base_lr * 0.5 * (1 + math.cos(math.pi * progress))`,
    relatedProblems: [
      "lr_warmup_scheduler", "lr_range_test",
      "cosine_warmup_restart",
    ],
  },
  {
    id: "contrastive_learning",
    name: "대조 학습 (Contrastive Learning)",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "같은 데이터의 변환은 가깝게, 다른 데이터는 멀게 학습합니다.\n• NT-Xent Loss: -log(exp(sim_pos/τ) / Σexp(sim/τ))\n• Temperature τ로 분포의 날카로움 조절",
    codeTemplate: `import math
def nt_xent_loss(anchor, positive, negatives, temperature=0.5):
    sim_pos = cosine_sim(anchor, positive) / temperature
    sim_negs = [cosine_sim(anchor, n) / temperature for n in negatives]
    max_val = max(sim_pos, max(sim_negs))
    exp_pos = math.exp(sim_pos - max_val)
    exp_negs = sum(math.exp(s - max_val) for s in sim_negs)
    return -math.log(exp_pos / (exp_pos + exp_negs))`,
    relatedProblems: [
      "contrastive_loss", "multimodal_fusion",
      "triplet_loss",
    ],
  },
  {
    id: "normalization",
    name: "정규화 (LayerNorm / BatchNorm)",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "학습 안정성과 속도를 위한 정규화 기법입니다.\n• LayerNorm: 각 샘플 내 feature 차원에서 정규화\n• BatchNorm: 배치 차원에서 각 feature를 정규화\n• (x - mean) / sqrt(var + eps) * gamma + beta",
    codeTemplate: `# Layer Normalization
mean = sum(row) / len(row)
var = sum((v - mean)**2 for v in row) / len(row)
norm = [(v - mean) / (var + eps)**0.5 for v in row]
out = [gamma[i] * norm[i] + beta[i] for i in range(len(row))]`,
    relatedProblems: [
      "layer_norm_manual", "batch_norm_running",
    ],
  },
  {
    id: "loss_functions",
    name: "손실 함수 (Loss Functions)",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "모델 학습의 목표를 정의하는 함수입니다.\n• Focal Loss: 클래스 불균형 대응, (1-p_t)^γ 가중\n• Label Smoothing: 과적합 방지를 위해 타겟을 부드럽게\n• Contrastive Loss: 유사/비유사 쌍의 거리 학습",
    codeTemplate: `# Focal Loss
pt = p if target == 1 else 1 - p
loss = -alpha * (1 - pt)**gamma * log(pt)

# GELU Activation
gelu = 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x**3)))`,
    relatedProblems: [
      "focal_loss_compute", "gelu_activation",
      "label_smoothing_loss", "triplet_loss",
      "knowledge_distill_loss",
    ],
  },
  {
    id: "model_architecture",
    name: "모델 아키텍처 분석",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "모델의 파라미터 수와 구조를 이해하는 능력입니다.\n• Linear: in*out + bias\n• Conv2d: out_ch * in_ch * k * k + bias\n• Embedding: vocab * dim\n• 전체 파라미터 = 각 레이어 합산",
    codeTemplate: `# Parameter counting
total = 0
for layer in model:
    if type == 'Linear':
        total += in_features * out_features + out_features
    elif type == 'Conv2d':
        total += out_ch * in_ch * k * k + out_ch
    elif type == 'Embedding':
        total += num_embeddings * embedding_dim`,
    relatedProblems: [
      "model_param_counter", "simple_mlp_forward",
      "model_flops_count", "model_memory_calc",
      "shape_error_finder", "weight_init_variance",
      "freeze_param_count",
    ],
  },
  {
    id: "inference_optimization",
    name: "추론 최적화 (KV Cache)",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "대규모 모델의 효율적 추론을 위한 기법입니다.\n• KV Cache: 이전 토큰의 Key/Value를 캐시하여 재계산 방지\n• 자동회귀 생성에서 O(n²) → O(n)으로 최적화\n• Gradient Clipping: 학습 안정성을 위한 기울기 크기 제한",
    codeTemplate: `# KV Cache: 새 토큰 처리
keys = past_keys + [new_key]
values = past_values + [new_value]
# query는 새 토큰만, key/value는 전체 캐시에서
scores = [dot(query, k) / sqrt(d_k) for k in keys]
weights = softmax(scores)
output = weighted_sum(weights, values)`,
    relatedProblems: [
      "kv_cache_attention", "gradient_clip_by_norm",
      "causal_mask_attention",
    ],
  },
  {
    id: "model_compression",
    name: "모델 압축 (Quantization / Pruning / Distillation)",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "대규모 모델을 효율적으로 만드는 기법입니다.\n• Quantization: float32 → int8로 가중치 양자화\n• Pruning: 절대값이 작은 가중치를 0으로\n• Knowledge Distillation: 큰 교사 모델 → 작은 학생 모델로 지식 전달",
    codeTemplate: `# INT8 Quantization
scale = (w_max - w_min) / 255
quantized = round(w / scale + zero_point)
dequantized = (quantized - zero_point) * scale

# Magnitude Pruning
threshold = sorted(abs_weights)[int(n * sparsity)]
pruned = [0 if abs(w) < threshold else w for w in weights]

# KD Loss = KL(soft_teacher || soft_student) * T^2`,
    relatedProblems: [
      "quantize_dequantize", "prune_by_magnitude",
      "knowledge_distill_loss", "model_memory_calc",
      "model_flops_count", "model_precision_memory",
    ],
  },
  {
    id: "nn_module_forward",
    name: "nn.Module & Forward Pass",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "신경망의 기본 구성 블록입니다.\n• Linear: y = xW^T + b\n• Embedding: 정수 ID → 밀집 벡터 매핑\n• Dropout: 학습 시 뉴런 무작위 비활성화\n• Residual: output = F(x) + x (skip connection)",
    codeTemplate: `# Linear Layer
output = [[sum(x[b][i]*W[o][i] for i in range(in_dim)) + bias[o]
           for o in range(out_dim)]
          for b in range(batch)]

# Dropout (inverted)
if training:
    output = x * mask / (1 - p)`,
    relatedProblems: [
      "linear_layer_manual", "embedding_lookup",
      "dropout_forward", "residual_block_forward",
      "one_hot_encode", "train_eval_dropout",
    ],
  },
  {
    id: "data_loading",
    name: "데이터 로딩 & 배치 구성",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "효율적인 학습을 위한 데이터 파이프라인입니다.\n• Dynamic Batching: 길이별 그룹핑으로 패딩 최소화\n• Stratified Sampling: 클래스 불균형 해소\n• Collate: 가변 길이 시퀀스를 배치로 묶기",
    codeTemplate: `# Dynamic Batching
sorted_by_length = sorted(data, key=len)
batches = []
for seq in sorted_by_length:
    if max_len * (batch_size + 1) > max_tokens:
        flush_batch()
    add_to_batch(seq)`,
    relatedProblems: [
      "dynamic_batch_grouping", "stratified_sampler",
      "batch_pad_collate", "custom_dataset_logic",
      "multimodal_collate_pad", "missing_modality_fill",
      "length_bucket_assign", "token_type_embed",
    ],
  },
  {
    id: "training_debugging",
    name: "학습 디버깅",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "모델 학습 문제를 진단하고 해결하는 기법입니다.\n• LR Range Test: 최적 학습률 탐색\n• Dead ReLU: 항상 0을 출력하는 뉴런 탐지\n• BatchNorm Running Stats: 추론용 통계 추적",
    codeTemplate: `# LR Range Test
best_lr = lr_at_steepest_loss_decrease

# Dead Neuron Detection
for neuron in layer:
    if all(output <= 0 for all inputs):
        mark_as_dead(neuron)`,
    relatedProblems: [
      "lr_range_test", "dead_neuron_check",
      "batch_norm_running", "loss_curve_classify",
      "gradient_health_check", "loss_safety_check",
    ],
  },
  {
    id: "autograd_backprop",
    name: "자동 미분 & 역전파",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "PyTorch autograd의 핵심 원리입니다.\n• Chain Rule: dL/dW = dL/dy × dy/dW\n• Linear backward: grad_W = grad_y^T @ x\n• Weight Decay: grad += λ × param",
    codeTemplate: `# Manual backward for y = x @ W^T + b
grad_y = 2 * y / batch  # if loss = mean(y^2)
grad_W = grad_y.T @ x
grad_b = sum(grad_y, dim=0)
# SGD + weight decay
param -= lr * (grad + wd * param)`,
    relatedProblems: [
      "manual_backward_linear", "weight_decay_step",
      "gradient_accumulation", "gradient_clip_by_norm",
      "gradient_health_check",
    ],
  },
  {
    id: "multimodal_learning",
    name: "멀티모달 학습",
    category: "ai",
    difficulty: "intermediate",
    explanation:
      "여러 모달리티(이미지, 텍스트 등)를 결합하는 기법입니다.\n• CLIP: 이미지-텍스트 대조 학습, cosine similarity 기반\n• Late Fusion: 각 모달리티를 독립 인코딩 후 결합\n• Cross-Modal Projection: 공유 공간으로 투영",
    codeTemplate: `# CLIP similarity
sim_matrix = cosine_sim(image_embs, text_embs) / temperature
# InfoNCE loss
loss = -log(exp(sim[i][i]) / sum(exp(sim[i][:])))`,
    relatedProblems: [
      "clip_similarity", "contrastive_info_nce",
      "cross_modal_project", "late_fusion_classify",
      "multimodal_fusion", "modality_dropout_mask",
      "missing_modality_fill",
    ],
  },
  {
    id: "bio_sequence",
    name: "바이오 시퀀스 처리",
    category: "ai",
    difficulty: "basic",
    explanation:
      "DNA/단백질 시퀀스를 ML 모델 입력으로 변환하는 방법입니다.\n• K-mer 토큰화: 슬라이딩 윈도우로 부분 서열 추출\n• One-hot: 각 염기/아미노산을 벡터로 변환\n• Contact Map: 3D 좌표에서 잔기 쌍 접촉 여부\n• Sequence Alignment: Needleman-Wunsch DP 정렬",
    codeTemplate: `# K-mer tokenization
kmers = [seq[i:i+k] for i in range(len(seq)-k+1)]

# One-hot encoding
alphabet = "ATGC"
one_hot = [[1 if c == a else 0 for a in alphabet] for c in seq]`,
    relatedProblems: [
      "dna_kmer_tokenize", "bio_one_hot",
      "protein_distance_map", "sequence_align_score",
      "codon_frequency", "slide_patch_aggregate",
      "patient_split_check", "sparse_bio_encode",
    ],
  },
  {
    id: "nlp_evaluation",
    name: "NLP 평가 지표",
    category: "ai",
    difficulty: "intermediate",
    explanation:
      "텍스트 생성 및 분류 모델의 평가 방법입니다.\n• Perplexity: exp(-avg(log_probs)), 낮을수록 좋음\n• ROUGE: 생성 텍스트와 참조 텍스트의 n-gram 겹침\n• Multi-label F1: 샘플별 precision/recall 평균",
    codeTemplate: `# Perplexity
ppl = math.exp(-sum(log_probs) / len(log_probs))

# ROUGE-1
common = len(set(hyp) & set(ref))
precision = common / len(hyp)
recall = common / len(ref)`,
    relatedProblems: [
      "perplexity_compute", "rouge_1_score",
      "multi_label_metrics", "attention_entropy",
    ],
  },
  {
    id: "tokenization",
    name: "토크나이제이션",
    category: "ai",
    difficulty: "basic",
    explanation:
      "텍스트를 모델 입력 토큰으로 변환하는 방법입니다.\n• BPE: 빈번한 인접 토큰 쌍을 반복적으로 병합\n• Temperature Scaling: softmax 분포 날카로움 조절\n• 서브워드 토크나이저: WordPiece, SentencePiece 등",
    codeTemplate: `# BPE merge step
for i in range(len(tokens) - 1):
    if tokens[i] == merge_a and tokens[i+1] == merge_b:
        merged.append(merge_a + merge_b)
        skip_next = True`,
    relatedProblems: [
      "bpe_merge_step", "temperature_scale",
      "bag_of_words",
    ],
  },

  // ━━━━━━━━━━ New: Distributed & System ━━━━━━━━━━
  {
    id: "distributed_training",
    name: "분산 학습 (DDP / DistributedSampler / SyncBN)",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "여러 GPU로 학습을 병렬화하는 기법입니다.\n• DDP: All-reduce로 gradient 동기화 → 각 GPU 동일 모델 유지\n• DistributedSampler: 데이터를 GPU별로 겹치지 않게 분배\n• SyncBatchNorm: GPU 간 BN 통계 동기화\n• Checkpoint: rank 0에서만 저장",
    codeTemplate: `# DDP: all-reduce average
avg_grad = sum(gpu_grads) / world_size
param -= lr * avg_grad

# DistributedSampler
total = ceil(N / world_size) * world_size
indices = indices[:total]
per_gpu = indices[rank::world_size]

# SyncBN: parallel variance
global_var = avg(local_var) + avg(local_mean^2) - global_mean^2`,
    relatedProblems: [
      "all_reduce_sim", "distributed_sampler_idx",
      "sync_batchnorm_compute", "ddp_gradient_step",
    ],
  },
  {
    id: "system_optimization",
    name: "학습/추론 시스템 최적화",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "대규모 모델의 메모리와 속도를 최적화하는 기법입니다.\n• Mixed Precision: FP16 연산으로 속도 향상, 활성화 메모리 절감\n• Gradient Checkpointing: 활성화 저장 대신 재계산으로 메모리 절감\n• 메모리 추정: 파라미터 + optimizer state + 활성화\n• Throughput: samples/sec = batch × GPUs / step_time",
    codeTemplate: `# Model memory by precision
mem_gb = params * bytes_per_param / 1024^3

# Gradient checkpointing
peak_mem = (num_checkpoints + segment_size) * act_per_layer

# Throughput
samples_per_sec = batch * num_gpus * 1000 / step_ms`,
    relatedProblems: [
      "model_precision_memory", "gradient_checkpoint_est",
      "activation_memory_est", "throughput_estimate",
      "gpu_fit_check", "inference_throughput",
    ],
  },
  {
    id: "interview_reasoning",
    name: "인터뷰 코드 리즈닝",
    category: "ai",
    difficulty: "intermediate",
    explanation:
      "라이브 코딩 인터뷰에서 요구되는 실전 추론 능력입니다.\n• Pooling 전략 비교: CLS vs Mean, 장단점 이해\n• Masking 오류 탐지: attention mask 정확성 검증\n• Data Leakage 감지: fit/transform 분리 원칙\n• Training Step 순서: zero_grad → forward → loss → backward → step",
    codeTemplate: `# Correct training step order
optimizer.zero_grad()
output = model(x)        # forward
loss = criterion(output, y)  # loss
loss.backward()           # backward
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)  # optional
optimizer.step()          # step

# Data leakage: always fit on TRAIN only
scaler.fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)`,
    relatedProblems: [
      "pooling_compare", "mask_error_find",
      "data_leak_detect", "gpu_fit_check",
      "training_step_order", "inference_throughput",
    ],
  },
  // ━━━━━━━━━━ PyTorch Real ━━━━━━━━━━
  {
    id: "pytorch_real_tensors",
    name: "PyTorch 실전 — 텐서 연산",
    category: "pytorch",
    difficulty: "basic",
    explanation:
      "실제 torch 라이브러리를 사용한 텐서 생성, 인덱싱, reshape, broadcasting, masking, reduction 연산입니다.\n• torch.zeros/ones/arange/eye/full로 텐서 생성\n• torch.gather로 고급 인덱싱\n• view/transpose로 multi-head attention reshape\n• boolean mask로 조건부 필터링\n• F.softmax + topk 파이프라인\n• torch.einsum으로 유연한 텐서 연산",
    codeTemplate: `import torch\nimport torch.nn.functional as F\n\n# 텐서 생성\nt = torch.zeros(2, 3)\nt = torch.arange(10)\n\n# Multi-head reshape\nx = x.view(B, S, num_heads, head_dim).transpose(1, 2)\n\n# Softmax + TopK\nprobs = F.softmax(logits, dim=-1)\nvalues, indices = torch.topk(probs, k)\n\n# Einsum\nresult = torch.einsum("ij,jk->ik", A, B)`,
    relatedProblems: [
      "torch_create_tensors", "torch_indexing_ops", "torch_reshape_heads",
      "torch_boolean_mask", "torch_softmax_topk", "torch_einsum_ops",
    ],
  },
  {
    id: "pytorch_real_modules",
    name: "PyTorch 실전 — nn.Module & 학습",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "nn.Module을 직접 구현하고, 손실 함수와 옵티마이저로 학습하는 실전 연습입니다.\n• nn.Parameter로 커스텀 Linear 구현\n• MLP forward pass 구현\n• Residual block (skip connection)\n• MSE/CE/Huber loss 계산\n• SGD step: zero_grad → forward → loss → backward → step\n• Gradient accumulation",
    codeTemplate: `import torch\nimport torch.nn as nn\n\nclass MyLinear(nn.Module):\n    def __init__(self, w, b):\n        super().__init__()\n        self.weight = nn.Parameter(torch.tensor(w))\n        self.bias = nn.Parameter(torch.tensor(b))\n    def forward(self, x):\n        return x @ self.weight.T + self.bias\n\n# Training step\noptimizer.zero_grad()\nloss = criterion(model(x), y)\nloss.backward()\noptimizer.step()`,
    relatedProblems: [
      "torch_linear_manual", "torch_mlp_forward", "torch_residual_block",
      "torch_mse_loss", "torch_ce_loss", "torch_sgd_step",
      "torch_grad_accumulation", "torch_custom_loss",
    ],
  },
  {
    id: "pytorch_real_data",
    name: "PyTorch 실전 — Dataset & DataLoader",
    category: "pytorch",
    difficulty: "intermediate",
    explanation:
      "커스텀 Dataset, DataLoader, 가변 길이 padding collate 등 데이터 파이프라인 실전입니다.\n• Dataset: __len__, __getitem__ 구현\n• DataLoader: batch_size, shuffle, drop_last\n• collate_fn: 가변 길이 시퀀스 패딩\n• attention mask 생성\n• 멀티모달 배치 조립",
    codeTemplate: `from torch.utils.data import Dataset, DataLoader\n\nclass MyDataset(Dataset):\n    def __init__(self, data, labels):\n        self.data = data\n        self.labels = labels\n    def __len__(self):\n        return len(self.data)\n    def __getitem__(self, idx):\n        return self.data[idx], self.labels[idx]\n\nloader = DataLoader(ds, batch_size=32, shuffle=True)`,
    relatedProblems: [
      "torch_custom_dataset", "torch_collate_pad", "torch_attention_mask",
      "torch_dataloader_batch", "torch_multimodal_batch",
    ],
  },
  {
    id: "pytorch_real_attention",
    name: "PyTorch 실전 — Attention & Transformer",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "Scaled Dot-Product Attention, 인과적 마스킹, Positional Encoding 등 Transformer 핵심 구현입니다.\n• SDPA: Q@K.T / √d_k → softmax → @V\n• Causal mask: upper-triangular -inf\n• Sinusoidal positional encoding\n• Multi-head split/merge\n• Layer normalization\n• Attention mask 기반 mean pooling",
    codeTemplate: `import torch\nimport torch.nn.functional as F\nimport math\n\n# Scaled Dot-Product Attention\nscores = Q @ K.T / math.sqrt(d_k)\nmask = torch.triu(torch.ones(S, S), diagonal=1).bool()\nscores.masked_fill_(mask, float('-inf'))\nweights = F.softmax(scores, dim=-1)\noutput = weights @ V\n\n# Sinusoidal PE\nposition = torch.arange(max_len).unsqueeze(1)\ndiv_term = torch.exp(torch.arange(0, d, 2) * -(math.log(10000.0) / d))\npe[:, 0::2] = torch.sin(position * div_term)\npe[:, 1::2] = torch.cos(position * div_term)`,
    relatedProblems: [
      "torch_sdpa", "torch_causal_attn", "torch_pos_encoding",
      "torch_multihead_split", "torch_layer_norm", "torch_token_pool",
    ],
  },
  {
    id: "pytorch_real_debug",
    name: "PyTorch 실전 — 디버깅 & 진단",
    category: "pytorch",
    difficulty: "advanced",
    explanation:
      "실전에서 마주치는 PyTorch 학습/추론 문제를 진단하고 해결하는 능력입니다.\n• train/eval 모드: Dropout, BatchNorm 동작 차이\n• BatchNorm 통계 직접 계산\n• gradient vanishing/exploding 진단\n• loss plateau 감지\n• 멀티모달 특성 결합 (concatenation fusion)\n• 대조 학습 유사도 행렬 계산",
    codeTemplate: `# train vs eval mode\nmodel.train()   # Dropout 활성\nmodel.eval()    # Dropout 비활성, BN 고정\n\n# BatchNorm 수동 계산\nmean = x.mean(dim=0)\nvar = x.var(dim=0, unbiased=False)\nout = (x - mean) / torch.sqrt(var + eps)\n\n# 학습 이상 진단\nif grad.abs().mean() < 1e-7: "vanishing_grad"\nif grad.abs().max() > 1e6: "exploding_grad"\nif loss.std() < 1e-6: "loss_plateau"`,
    relatedProblems: [
      "torch_train_eval_mode", "torch_batchnorm_stats",
      "torch_detect_anomaly", "torch_concat_fusion",
      "torch_contrastive_sim",
    ],
  },
];
