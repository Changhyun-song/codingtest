import { NextRequest, NextResponse } from "next/server";
import { loadProgress, saveProgress } from "@/lib/progress";

export async function GET() {
  const progress = loadProgress();
  return NextResponse.json(progress);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { problemId, data } = body;

  if (problemId && data) {
    const progress = loadProgress();
    progress[problemId] = { ...progress[problemId], ...data };
    saveProgress(progress);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
