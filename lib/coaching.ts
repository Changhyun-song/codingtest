import { Problem, CoachingData, CoachingHint, CoachingKeyword } from "./types";

const KW: Record<string, { keyword: string; desc: string }> = {
  hash: { keyword: "Hash Map / Hash Set", desc: "O(1) lookup for existence or counting" },
  array: { keyword: "Array Traversal", desc: "Sequential scan or indexed access" },
  counting: { keyword: "Counting Pattern", desc: "Tally occurrences with a map/dict" },
  sorting: { keyword: "Sorting", desc: "Arrange elements for binary search or grouping" },
  heap: { keyword: "Heap / Priority Queue", desc: "Efficient min/max extraction" },
  sliding_window: { keyword: "Sliding Window", desc: "Track a moving subarray without full recomputation" },
  two_sum: { keyword: "Two Sum Pattern", desc: "Find pairs using complement lookup" },
  two_pointers: { keyword: "Two Pointers", desc: "Scan from both ends or at different speeds" },
  binary_search: { keyword: "Binary Search", desc: "Halve search space each step on sorted data" },
  search: { keyword: "Search Algorithm", desc: "Locate elements efficiently" },
  bfs: { keyword: "BFS", desc: "Level-by-level graph traversal using queue" },
  dfs: { keyword: "DFS", desc: "Explore as deep as possible then backtrack" },
  graph: { keyword: "Graph Traversal", desc: "Systematic node/edge exploration" },
  greedy: { keyword: "Greedy Strategy", desc: "Make locally optimal choice at each step" },
  dynamic_programming: { keyword: "Dynamic Programming", desc: "Overlapping subproblems + memoization" },
  stack: { keyword: "Stack (LIFO)", desc: "Last-in-first-out for matching/nesting" },
  string: { keyword: "String Processing", desc: "Character-by-character analysis" },
  prefix_sum: { keyword: "Prefix Sum", desc: "Precompute cumulative sums for O(1) range queries" },
  optimization: { keyword: "Optimization", desc: "Minimize/maximize under constraints" },
  nlp: { keyword: "NLP Basics", desc: "Text tokenization, vectorization" },
  tfidf: { keyword: "TF-IDF", desc: "Term frequency weighted by document rarity" },
  text_processing: { keyword: "Text Processing", desc: "Tokenization, cleaning, vectorization" },
  encoding: { keyword: "Feature Encoding", desc: "Convert categories/text to numbers" },
  cosine_similarity: { keyword: "Cosine Similarity", desc: "Direction similarity between vectors" },
  similarity: { keyword: "Similarity Metric", desc: "Measure closeness between objects" },
  embedding: { keyword: "Embeddings", desc: "Dense vector representation of words/sentences" },
  word_embeddings: { keyword: "Word Embeddings", desc: "Words as points in vector space" },
  retrieval: { keyword: "Retrieval / kNN", desc: "Find nearest neighbors by distance" },
  attention: { keyword: "Attention Mechanism", desc: "Weighted focus on relevant input parts" },
  transformer: { keyword: "Transformer", desc: "Self-attention based architecture" },
  multi_head: { keyword: "Multi-Head Attention", desc: "Parallel attention for richer representations" },
  pytorch: { keyword: "PyTorch Tensors", desc: "Multi-dimensional array ops + autograd" },
  tensor: { keyword: "Tensor Operations", desc: "Reshape, transpose, broadcast" },
  mlp: { keyword: "MLP", desc: "Fully connected layers: matmul + bias + activation" },
  forward_pass: { keyword: "Forward Pass", desc: "Input → hidden → output computation" },
  neural_network: { keyword: "Neural Network", desc: "Layers, activations, and loss" },
  loss_function: { keyword: "Loss Function", desc: "Quantifies prediction error" },
  cross_entropy: { keyword: "Cross-Entropy", desc: "Standard classification loss" },
  softmax: { keyword: "Softmax", desc: "Logits → probability distribution" },
  mean_pooling: { keyword: "Mean Pooling", desc: "Average token embeddings with mask" },
  pandas: { keyword: "pandas DataFrame", desc: "Tabular data manipulation" },
  merge: { keyword: "DataFrame Merge/Join", desc: "Combine tables on shared keys" },
  join: { keyword: "Join Operations", desc: "Inner/outer/left/right joins" },
  groupby: { keyword: "GroupBy", desc: "Split-apply-combine aggregation" },
  aggregation: { keyword: "Aggregation", desc: "sum, mean, count over groups" },
  cleaning: { keyword: "Data Cleaning", desc: "Handle NaN, duplicates, type conversion" },
  preprocessing: { keyword: "Preprocessing", desc: "Scale, encode, and transform features" },
  sklearn: { keyword: "scikit-learn", desc: "ML pipeline: preprocess → train → predict → evaluate" },
  classification: { keyword: "Classification", desc: "Predict discrete labels" },
  metrics: { keyword: "Evaluation Metrics", desc: "Precision, Recall, F1, Accuracy" },
  evaluation: { keyword: "Model Evaluation", desc: "Measure model performance" },
  scaling: { keyword: "Feature Scaling", desc: "Normalize to comparable ranges" },
  pipeline: { keyword: "ML Pipeline", desc: "Sequenced preprocessing + model" },
  recommendation: { keyword: "Recommendation", desc: "Predict preferences using similarity" },
  analysis: { keyword: "Data Analysis", desc: "Extract insights from structured data" },
  operations: { keyword: "Tensor Ops", desc: "Reshape, flatten, transpose, softmax" },
};

const DIR: Record<string, string> = {
  hash: "Think about a structure that lets you check existence instantly.",
  array: "Can you solve this in a single pass through the array?",
  sorting: "Would ordering the elements first reveal a pattern?",
  sliding_window: "Can you maintain a window without recalculating from scratch?",
  two_sum: "For each element, what complement do you need?",
  two_pointers: "Can two positions moving inward/outward help?",
  binary_search: "Can you eliminate half the candidates at each step?",
  bfs: "Think about exploring layer by layer, like ripples.",
  dfs: "Go as deep as possible before trying alternatives.",
  graph: "Model the problem as nodes and edges.",
  greedy: "At each step, what's the single best local choice?",
  dynamic_programming: "Can you break this into overlapping subproblems?",
  stack: "Is there a last-in-first-out pattern here?",
  string: "Process character by character — what state to track?",
  prefix_sum: "Can cumulative information speed up range queries?",
  optimization: "What are you minimizing/maximizing? What are the constraints?",
  nlp: "How do you convert text into numbers a computer can process?",
  tfidf: "How do rare-but-present words differ from common ones?",
  cosine_similarity: "Two vectors — how similar is their direction?",
  embedding: "Think of words as points in high-dimensional space.",
  attention: "Which parts of input should get the most weight?",
  pytorch: "Think in terms of tensor shapes — broadcasting matters.",
  mlp: "Data flows: multiply by weights, add bias, activate.",
  pandas: "Think in table operations: filter, group, aggregate.",
  merge: "Which column connects the two tables?",
  cleaning: "What should happen to missing or invalid values?",
  sklearn: "Chain: preprocess → train → predict → evaluate.",
  classification: "Map features to discrete output labels.",
  metrics: "How do you measure whether predictions are good?",
  recommendation: "Which items are most similar to what the user liked?",
};

const STUCK: Record<string, string> = {
  understanding: "Re-read the problem. Rephrase it in your own words. What exactly are the inputs and expected output? Trace through the examples by hand.",
  approach: "List 2-3 possible approaches (brute force first). What's the simplest thing that could work? What data structure makes the key operation fast?",
  data_structure: "Consider: array, hash map, set, stack, queue, heap, tree, graph. Which operations does the problem need most? Which structure supports those efficiently?",
  implementation: "Write pseudocode first. Handle the main case before edge cases. Start with the simplest example input. Add complexity incrementally.",
  debugging: "Print intermediate values. Check off-by-one errors. Verify loop boundaries. Compare your logic with a manual trace of the example.",
  optimization: "What's your current time complexity? Where's the bottleneck? Can you trade space for time? Is there a mathematical shortcut?",
};

export function generateCoachingData(problem: Problem): CoachingData {
  const tags = problem.tags;

  const oneLiner = `Implement \`${problem.function_name}\`: ${problem.title} (${problem.category}, ${problem.difficulty})`;

  const thinkingPrompts = [
    `What are the input types and sizes? (${problem.constraints[0] || "check constraints"})`,
    "What should the output look like? What type is returned?",
    "Given the input size, what time complexity can you afford?",
    `For "${tags[0] || problem.category}" — which pattern or data structure fits?`,
    "What edge cases could break a naive solution?",
  ];

  const hints: CoachingHint[] = [];

  const dirHints = tags.map((t) => DIR[t]).filter(Boolean);
  hints.push({
    level: 1,
    label: "Direction",
    content: dirHints[0] || `Think about the most efficient way to handle ${tags.join(", ")} problems.`,
  });

  const kwNames = tags.map((t) => KW[t]?.keyword).filter(Boolean);
  hints.push({
    level: 2,
    label: "Key Concepts",
    content: `Consider: ${kwNames.length > 0 ? kwNames.join(", ") : tags.join(", ")}. Which fits this problem's constraints?`,
  });

  const existingHints = problem.hints || [];
  hints.push({
    level: 3,
    label: "Logic Skeleton",
    content: existingHints[0] || problem.solution_explanation || `Break into: 1) parse input, 2) apply ${tags[0] || "algorithm"}, 3) format output.`,
  });

  hints.push({
    level: 4,
    label: "Detailed Approach",
    content: existingHints[1] || existingHints[0] || problem.solution_explanation || "Code each step from the logic skeleton.",
  });

  hints.push({
    level: 5,
    label: "Full Solution",
    content: problem.solution_code || "Solution not available.",
  });

  const essentialKeywords: CoachingKeyword[] = [];
  const helpfulKeywords: CoachingKeyword[] = [];

  tags.forEach((tag, i) => {
    const k = KW[tag];
    if (k) {
      (i < 2 ? essentialKeywords : helpfulKeywords).push({
        keyword: k.keyword,
        description: k.desc,
      });
    }
  });

  if (problem.category === "algorithm" && !helpfulKeywords.find((k) => k.keyword.includes("Complexity"))) {
    helpfulKeywords.push({ keyword: "Time/Space Complexity Analysis", description: "Analyze O(n), O(n log n), O(n²) to pick approach" });
  }

  const alternativeApproaches: string[] = [];
  if (problem.solution_explanation) alternativeApproaches.push(problem.solution_explanation);

  return {
    oneLiner,
    thinkingPrompts,
    hints,
    essentialKeywords,
    helpfulKeywords,
    stuckGuidance: STUCK,
    alternativeApproaches,
  };
}
