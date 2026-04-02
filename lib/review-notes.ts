import fs from "fs";
import path from "path";
import { ALL_CONCEPTS, Concept } from "./concepts";

const DATA_DIR = path.join(process.cwd(), "data");
const NOTES_FILE = path.join(DATA_DIR, "review-notes.json");

export interface ReviewEntry {
  conceptId: string;
  addedAt: string;
  updatedAt: string;
  triggeredBy: string[];
  understood: boolean;
}

export type ReviewNotes = Record<string, ReviewEntry>;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadReviewNotes(): ReviewNotes {
  ensureDataDir();
  if (!fs.existsSync(NOTES_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(NOTES_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveReviewNotes(notes: ReviewNotes): void {
  ensureDataDir();
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), "utf-8");
}

const conceptByProblem = new Map<string, Concept[]>();
for (const concept of ALL_CONCEPTS) {
  for (const pid of concept.relatedProblems) {
    const list = conceptByProblem.get(pid) ?? [];
    list.push(concept);
    conceptByProblem.set(pid, list);
  }
}

export function getConceptsForProblem(problemId: string): Concept[] {
  return conceptByProblem.get(problemId) ?? [];
}

export function addReviewNotes(problemId: string): void {
  const concepts = getConceptsForProblem(problemId);
  if (concepts.length === 0) return;

  const notes = loadReviewNotes();
  const now = new Date().toISOString();

  for (const c of concepts) {
    const existing = notes[c.id];
    if (existing) {
      if (!existing.triggeredBy.includes(problemId)) {
        existing.triggeredBy.push(problemId);
      }
      existing.updatedAt = now;
      existing.understood = false;
    } else {
      notes[c.id] = {
        conceptId: c.id,
        addedAt: now,
        updatedAt: now,
        triggeredBy: [problemId],
        understood: false,
      };
    }
  }

  saveReviewNotes(notes);
}

export function markUnderstood(conceptId: string): void {
  const notes = loadReviewNotes();
  if (notes[conceptId]) {
    notes[conceptId].understood = true;
    saveReviewNotes(notes);
  }
}

export function markNotUnderstood(conceptId: string): void {
  const notes = loadReviewNotes();
  if (notes[conceptId]) {
    notes[conceptId].understood = false;
    saveReviewNotes(notes);
  }
}

export function backfillFromProgress(): void {
  const { loadProgress } = require("./progress") as { loadProgress: () => Record<string, { status?: string; mastery?: string | null }> };
  const progress = loadProgress();
  const notes = loadReviewNotes();
  let changed = false;

  for (const [problemId, data] of Object.entries(progress)) {
    const needsReview =
      data.status === "failed" ||
      data.status === "attempted" ||
      data.mastery === "assisted";

    if (!needsReview) continue;

    const concepts = getConceptsForProblem(problemId);
    for (const c of concepts) {
      if (!notes[c.id]) {
        notes[c.id] = {
          conceptId: c.id,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          triggeredBy: [problemId],
          understood: false,
        };
        changed = true;
      } else if (!notes[c.id].triggeredBy.includes(problemId)) {
        notes[c.id].triggeredBy.push(problemId);
        changed = true;
      }
    }
  }

  if (changed) saveReviewNotes(notes);
}
