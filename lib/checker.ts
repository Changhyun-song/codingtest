import { CheckerType } from "./types";

export function checkResult(
  actual: unknown,
  expected: unknown,
  checkerType: CheckerType,
  tolerance?: number
): boolean {
  switch (checkerType) {
    case "exact":
      return deepEqual(actual, expected);
    case "float_tolerance":
      return floatClose(actual, expected, tolerance ?? 1e-6);
    case "unordered":
      return unorderedEqual(actual, expected);
    case "ordered_list":
      return deepEqual(actual, expected);
    case "ranking":
      return rankingMatch(actual, expected);
    case "vector":
      return vectorClose(actual, expected, tolerance ?? 1e-6);
    case "custom":
      return deepEqual(actual, expected);
    default:
      return deepEqual(actual, expected);
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;

  if (typeof a === "number" && typeof b === "number") {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key]));
  }

  return false;
}

function floatClose(
  a: unknown,
  b: unknown,
  tol: number
): boolean {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < tol;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => floatClose(v, b[i], tol));
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const keys = Object.keys(aObj);
    if (keys.length !== Object.keys(bObj).length) return false;
    return keys.every((k) => floatClose(aObj[k], bObj[k], tol));
  }
  return deepEqual(a, b);
}

function unorderedEqual(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return deepEqual(a, b);
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
  const sortedB = [...b].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
  return deepEqual(sortedA, sortedB);
}

function rankingMatch(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return deepEqual(a, b);
  if (a.length !== b.length) return false;
  return deepEqual(a, b);
}

function vectorClose(
  a: unknown,
  b: unknown,
  tol: number
): boolean {
  return floatClose(a, b, tol);
}
