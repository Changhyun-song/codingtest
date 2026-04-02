import { Problem } from "@/lib/types";

// Algorithm — Basics (14)
import stringPalindrome from "./algorithm/string-palindrome";
import twoPointerPairSum from "./algorithm/two-pointer-pair-sum";
import dpClimbingStairs from "./algorithm/dp-climbing-stairs";
import dfsMaxDepth from "./algorithm/dfs-max-depth";
import heapKthLargest from "./algorithm/heap-kth-largest";
import dfsIslandCount from "./algorithm/dfs-island-count";
import backtrackingSubsets from "./algorithm/backtracking-subsets";
import duplicateDetector from "./algorithm/duplicate-detector";
import longestUniqueSubarray from "./algorithm/longest-unique-subarray";
import prefixSumRangeQuery from "./algorithm/prefix-sum-range-query";
import binarySearch from "./algorithm/binary-search";
import bfsConnectedComponents from "./algorithm/bfs-connected-components";
import validParentheses from "./algorithm/valid-parentheses";
import unionFindGroups from "./algorithm/union-find-groups";

// Algorithm — Practice (15)
import frequencyCounter from "./algorithm/frequency-counter";
import topKFrequentTokens from "./algorithm/top-k-frequent-tokens";
import twoSumPairs from "./algorithm/two-sum-pairs";
import maxSubarraySum from "./algorithm/max-subarray-sum";
import dpCoinChange from "./algorithm/dp-coin-change";
import minSubarrayLen from "./algorithm/min-subarray-len";
import mergeIntervals from "./algorithm/merge-intervals";
import topKBucketSort from "./algorithm/top-k-bucket-sort";
import arrayRotation from "./algorithm/array-rotation";
import lruCacheSimulator from "./algorithm/lru-cache-simulator";
import stockTradingMaxProfit from "./algorithm/stock-trading-max-profit";
import missingBadge from "./algorithm/missing-badge";
import editDistance from "./algorithm/edit-distance";
import dataPartition from "./algorithm/data-partition";
import stringAnagramGroups from "./algorithm/string-anagram-groups";

// AI (12)
import cosineSimilarity from "./ai/cosine-similarity";
import sentenceEmbeddingMeanPooling from "./ai/sentence-embedding-mean-pooling";
import nearestWordsRetrieval from "./ai/nearest-words-retrieval";
import classificationMetrics from "./ai/classification-metrics";
import confusionMatrixBinary from "./ai/confusion-matrix-binary";
import recommendationRanking from "./ai/recommendation-ranking";
import wordAnalogy from "./ai/word-analogy";
import tfidfFromScratch from "./ai/tfidf-from-scratch";
import bagOfWords from "./ai/bag-of-words";
import softmaxFromScratch from "./ai/softmax-from-scratch";
import sigmoidBceLoss from "./ai/sigmoid-bce-loss";
import gradientDescentStep from "./ai/gradient-descent-step";

// PyTorch (17)
import maskedMeanPooling from "./pytorch/masked-mean-pooling";
import tensorManipulation from "./pytorch/tensor-manipulation";
import attentionScores from "./pytorch/attention-scores";
import batchCrossEntropy from "./pytorch/batch-cross-entropy";
import simpleMlpForward from "./pytorch/simple-mlp-forward";
import multiHeadAttention from "./pytorch/multi-head-attention";
import pytorchTrainingLoop from "./pytorch/pytorch-training-loop";
import convOutputShape from "./pytorch/conv-output-shape";
import customDatasetLogic from "./pytorch/custom-dataset-logic";
import contrastiveLoss from "./pytorch/contrastive-loss";
import lrWarmupScheduler from "./pytorch/lr-warmup-scheduler";
import batchPadCollate from "./pytorch/batch-pad-collate";
import buildSimpleCnn from "./pytorch/build-simple-cnn";
import multimodalFusion from "./pytorch/multimodal-fusion";
import trainingEarlyStopping from "./pytorch/training-early-stopping";
import positionalEncoding from "./pytorch/positional-encoding";
import gradientAccumulation from "./pytorch/gradient-accumulation";

// PyTorch — New
import layerNormManual from "./pytorch/layer-norm-manual";
import tensorShapeTracker from "./pytorch/tensor-shape-tracker";
import modelParamCounter from "./pytorch/model-param-counter";
import geluActivation from "./pytorch/gelu-activation";
import focalLossCompute from "./pytorch/focal-loss-compute";
import gradientClipByNorm from "./pytorch/gradient-clip-by-norm";
import patchEmbedding from "./pytorch/patch-embedding";
import kvCacheAttention from "./pytorch/kv-cache-attention";

// AI — New (15)
import beamSearchStep from "./ai/beam-search-step";
import topPFiltering from "./ai/top-p-filtering";
import clipSimilarity from "./ai/clip-similarity";
import contrastiveInfoNce from "./ai/contrastive-info-nce";
import crossModalProject from "./ai/cross-modal-project";
import lateFusionClassify from "./ai/late-fusion-classify";
import dnaKmerTokenize from "./ai/dna-kmer-tokenize";
import bioOneHot from "./ai/bio-one-hot";
import proteinDistanceMap from "./ai/protein-distance-map";
import sequenceAlignScore from "./ai/sequence-align-score";
import codonFrequency from "./ai/codon-frequency";
import temperatureScale from "./ai/temperature-scale";
import perplexityCompute from "./ai/perplexity-compute";
import rouge1Score from "./ai/rouge-1-score";
import bpeMergeStep from "./ai/bpe-merge-step";
import multiLabelMetrics from "./ai/multi-label-metrics";
import attentionEntropy from "./ai/attention-entropy";

// PyTorch — New Batch 2 (27)
import broadcastShapes from "./pytorch/broadcast-shapes";
import oneHotEncode from "./pytorch/one-hot-encode";
import topkWithIndices from "./pytorch/topk-with-indices";
import tensorIndexingGather from "./pytorch/tensor-indexing-gather";
import embeddingLookup from "./pytorch/embedding-lookup";
import dropoutForward from "./pytorch/dropout-forward";
import batchMatmul from "./pytorch/batch-matmul";
import shapeErrorFinder from "./pytorch/shape-error-finder";
import transposeForHeads from "./pytorch/transpose-for-heads";
import linearLayerManual from "./pytorch/linear-layer-manual";
import residualBlockForward from "./pytorch/residual-block-forward";
import modelFlopsCount from "./pytorch/model-flops-count";
import labelSmoothingLoss from "./pytorch/label-smoothing-loss";
import tripletLoss from "./pytorch/triplet-loss";
import weightDecayStep from "./pytorch/weight-decay-step";
import manualBackwardLinear from "./pytorch/manual-backward-linear";
import dynamicBatchGrouping from "./pytorch/dynamic-batch-grouping";
import stratifiedSampler from "./pytorch/stratified-sampler";
import lrRangeTest from "./pytorch/lr-range-test";
import batchNormRunning from "./pytorch/batch-norm-running";
import deadNeuronCheck from "./pytorch/dead-neuron-check";
import causalMaskAttention from "./pytorch/causal-mask-attention";
import relativePoseBias from "./pytorch/relative-pos-bias";
import quantizeDequantize from "./pytorch/quantize-dequantize";
import pruneByMagnitude from "./pytorch/prune-by-magnitude";
import modelMemoryCalc from "./pytorch/model-memory-calc";
import knowledgeDistillLoss from "./pytorch/knowledge-distill-loss";

// ── Batch 3: Tensor/Shape/Module (6) ──
import maskedReduction from "./pytorch/masked-reduction";
import scatterAddManual from "./pytorch/scatter-add-manual";
import matmulChainShapes from "./pytorch/matmul-chain-shapes";
import reshapeWithInfer from "./pytorch/reshape-with-infer";
import weightInitVariance from "./pytorch/weight-init-variance";
import freezeParamCount from "./pytorch/freeze-param-count";

// ── Batch 3: Autograd/Dataset/Debug (6) ──
import gradientHealthCheck from "./pytorch/gradient-health-check";
import lossSafetyCheck from "./pytorch/loss-safety-check";
import cosineWarmupRestart from "./pytorch/cosine-warmup-restart";
import multimodalCollatePad from "./pytorch/multimodal-collate-pad";
import lossCurveClassify from "./pytorch/loss-curve-classify";
import trainEvalDropout from "./pytorch/train-eval-dropout";

// ── Batch 3: Attention/Multimodal/Bio (6) ──
import paddingMaskBuild from "./pytorch/padding-mask-build";
import slidingWindowMask from "./pytorch/sliding-window-mask";
import modalityDropoutMask from "./ai/modality-dropout-mask";
import slidePatchAggregate from "./ai/slide-patch-aggregate";
import patientSplitCheck from "./ai/patient-split-check";
import sparseBioEncode from "./ai/sparse-bio-encode";

// ── Batch 3: Optimization/Distributed (12) ──
import modelPrecisionMemory from "./pytorch/model-precision-memory";
import gradientCheckpointEst from "./pytorch/gradient-checkpoint-est";
import activationMemoryEst from "./pytorch/activation-memory-est";
import allReduceSim from "./pytorch/all-reduce-sim";
import distributedSamplerIdx from "./pytorch/distributed-sampler-idx";
import syncBatchnormCompute from "./pytorch/sync-batchnorm-compute";
import ddpGradientStep from "./pytorch/ddp-gradient-step";
import missingModalityFill from "./pytorch/missing-modality-fill";
import crossAttentionWeight from "./ai/cross-attention-weight";
import lengthBucketAssign from "./pytorch/length-bucket-assign";
import tokenTypeEmbed from "./pytorch/token-type-embed";
import throughputEstimate from "./pytorch/throughput-estimate";

// ── Batch 3: Interview Reasoning (6) ──
import poolingCompare from "./ai/pooling-compare";
import maskErrorFind from "./ai/mask-error-find";
import dataLeakDetect from "./ai/data-leak-detect";
import gpuFitCheck from "./ai/gpu-fit-check";
import trainingStepOrder from "./ai/training-step-order";
import inferenceThroughput from "./ai/inference-throughput";

// ── PyTorch Real: Tensor Ops (6) ──
import torchCreateTensors from "./pytorch/torch-create-tensors";
import torchIndexingOps from "./pytorch/torch-indexing-ops";
import torchReshapeHeads from "./pytorch/torch-reshape-heads";
import torchBooleanMask from "./pytorch/torch-boolean-mask";
import torchSoftmaxTopk from "./pytorch/torch-softmax-topk";
import torchEinsumOps from "./pytorch/torch-einsum-ops";
// ── PyTorch Real: Shape Debug + nn.Module (6) ──
import torchFixMatmul from "./pytorch/torch-fix-matmul";
import torchBroadcastAdd from "./pytorch/torch-broadcast-add";
import torchCatStack from "./pytorch/torch-cat-stack";
import torchLinearManual from "./pytorch/torch-linear-manual";
import torchMlpForward from "./pytorch/torch-mlp-forward";
import torchResidualBlock from "./pytorch/torch-residual-block";
// ── PyTorch Real: Training / Loss (5) ──
import torchMseLoss from "./pytorch/torch-mse-loss";
import torchCeLoss from "./pytorch/torch-ce-loss";
import torchSgdStep from "./pytorch/torch-sgd-step";
import torchGradAccumulation from "./pytorch/torch-grad-accumulation";
import torchCustomLoss from "./pytorch/torch-custom-loss";
// ── PyTorch Real: Data Loading (5) ──
import torchCustomDataset from "./pytorch/torch-custom-dataset";
import torchCollatePad from "./pytorch/torch-collate-pad";
import torchAttentionMask from "./pytorch/torch-attention-mask";
import torchDataloaderBatch from "./pytorch/torch-dataloader-batch";
import torchMultimodalBatch from "./pytorch/torch-multimodal-batch";
// ── PyTorch Real: Attention / Transformer (6) ──
import torchSdpa from "./pytorch/torch-sdpa";
import torchCausalAttn from "./pytorch/torch-causal-attn";
import torchPosEncoding from "./pytorch/torch-pos-encoding";
import torchMultiheadSplit from "./pytorch/torch-multihead-split";
import torchLayerNorm from "./pytorch/torch-layer-norm";
import torchTokenPool from "./pytorch/torch-token-pool";
// ── PyTorch Real: Debugging + Multimodal (5) ──
import torchTrainEvalMode from "./pytorch/torch-train-eval-mode";
import torchBatchnormStats from "./pytorch/torch-batchnorm-stats";
import torchDetectAnomaly from "./pytorch/torch-detect-anomaly";
import torchConcatFusion from "./pytorch/torch-concat-fusion";
import torchContrastiveSim from "./pytorch/torch-contrastive-sim";

export const ALL_PROBLEMS: Problem[] = [
  // Algorithm — Basics
  stringPalindrome,
  duplicateDetector,
  longestUniqueSubarray,
  prefixSumRangeQuery,
  binarySearch,
  bfsConnectedComponents,
  dfsMaxDepth,
  twoPointerPairSum,
  validParentheses,
  dpClimbingStairs,
  heapKthLargest,
  dfsIslandCount,
  backtrackingSubsets,
  unionFindGroups,
  // Algorithm — Practice
  frequencyCounter,
  topKFrequentTokens,
  twoSumPairs,
  maxSubarraySum,
  dpCoinChange,
  minSubarrayLen,
  mergeIntervals,
  topKBucketSort,
  arrayRotation,
  lruCacheSimulator,
  stockTradingMaxProfit,
  missingBadge,
  editDistance,
  dataPartition,
  stringAnagramGroups,
  // AI (14)
  cosineSimilarity,
  sentenceEmbeddingMeanPooling,
  nearestWordsRetrieval,
  classificationMetrics,
  confusionMatrixBinary,
  recommendationRanking,
  wordAnalogy,
  tfidfFromScratch,
  bagOfWords,
  softmaxFromScratch,
  sigmoidBceLoss,
  gradientDescentStep,
  beamSearchStep,
  topPFiltering,
  clipSimilarity,
  contrastiveInfoNce,
  crossModalProject,
  lateFusionClassify,
  dnaKmerTokenize,
  bioOneHot,
  proteinDistanceMap,
  sequenceAlignScore,
  codonFrequency,
  temperatureScale,
  perplexityCompute,
  rouge1Score,
  bpeMergeStep,
  multiLabelMetrics,
  attentionEntropy,
  // PyTorch (52)
  tensorManipulation,
  simpleMlpForward,
  attentionScores,
  batchCrossEntropy,
  multiHeadAttention,
  pytorchTrainingLoop,
  convOutputShape,
  customDatasetLogic,
  contrastiveLoss,
  lrWarmupScheduler,
  batchPadCollate,
  maskedMeanPooling,
  buildSimpleCnn,
  multimodalFusion,
  trainingEarlyStopping,
  positionalEncoding,
  gradientAccumulation,
  layerNormManual,
  tensorShapeTracker,
  modelParamCounter,
  geluActivation,
  focalLossCompute,
  gradientClipByNorm,
  patchEmbedding,
  kvCacheAttention,
  broadcastShapes,
  oneHotEncode,
  topkWithIndices,
  tensorIndexingGather,
  embeddingLookup,
  dropoutForward,
  batchMatmul,
  shapeErrorFinder,
  transposeForHeads,
  linearLayerManual,
  residualBlockForward,
  modelFlopsCount,
  labelSmoothingLoss,
  tripletLoss,
  weightDecayStep,
  manualBackwardLinear,
  dynamicBatchGrouping,
  stratifiedSampler,
  lrRangeTest,
  batchNormRunning,
  deadNeuronCheck,
  causalMaskAttention,
  relativePoseBias,
  quantizeDequantize,
  pruneByMagnitude,
  modelMemoryCalc,
  knowledgeDistillLoss,
  // ── Batch 3: Tensor/Shape/Module ──
  maskedReduction,
  scatterAddManual,
  matmulChainShapes,
  reshapeWithInfer,
  weightInitVariance,
  freezeParamCount,
  // ── Batch 3: Autograd/Dataset/Debug ──
  gradientHealthCheck,
  lossSafetyCheck,
  cosineWarmupRestart,
  multimodalCollatePad,
  lossCurveClassify,
  trainEvalDropout,
  // ── Batch 3: Attention/Multimodal/Bio ──
  paddingMaskBuild,
  slidingWindowMask,
  modalityDropoutMask,
  slidePatchAggregate,
  patientSplitCheck,
  sparseBioEncode,
  // ── Batch 3: Optimization/Distributed ──
  modelPrecisionMemory,
  gradientCheckpointEst,
  activationMemoryEst,
  allReduceSim,
  distributedSamplerIdx,
  syncBatchnormCompute,
  ddpGradientStep,
  missingModalityFill,
  crossAttentionWeight,
  lengthBucketAssign,
  tokenTypeEmbed,
  throughputEstimate,
  // ── Batch 3: Interview Reasoning ──
  poolingCompare,
  maskErrorFind,
  dataLeakDetect,
  gpuFitCheck,
  trainingStepOrder,
  inferenceThroughput,
  // ── PyTorch Real: Tensor Ops ──
  torchCreateTensors,
  torchIndexingOps,
  torchReshapeHeads,
  torchBooleanMask,
  torchSoftmaxTopk,
  torchEinsumOps,
  // ── PyTorch Real: Shape Debug + nn.Module ──
  torchFixMatmul,
  torchBroadcastAdd,
  torchCatStack,
  torchLinearManual,
  torchMlpForward,
  torchResidualBlock,
  // ── PyTorch Real: Training / Loss ──
  torchMseLoss,
  torchCeLoss,
  torchSgdStep,
  torchGradAccumulation,
  torchCustomLoss,
  // ── PyTorch Real: Data Loading ──
  torchCustomDataset,
  torchCollatePad,
  torchAttentionMask,
  torchDataloaderBatch,
  torchMultimodalBatch,
  // ── PyTorch Real: Attention / Transformer ──
  torchSdpa,
  torchCausalAttn,
  torchPosEncoding,
  torchMultiheadSplit,
  torchLayerNorm,
  torchTokenPool,
  // ── PyTorch Real: Debugging + Multimodal ──
  torchTrainEvalMode,
  torchBatchnormStats,
  torchDetectAnomaly,
  torchConcatFusion,
  torchContrastiveSim,
];

export function getProblemById(id: string): Problem | undefined {
  return ALL_PROBLEMS.find((p) => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return ALL_PROBLEMS.filter((p) => p.category === category);
}
