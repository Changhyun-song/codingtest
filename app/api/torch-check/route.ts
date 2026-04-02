import { NextResponse } from "next/server";
import { checkTorchAvailability } from "@/lib/runner";

export async function GET() {
  const result = await checkTorchAvailability();
  return NextResponse.json(result);
}
