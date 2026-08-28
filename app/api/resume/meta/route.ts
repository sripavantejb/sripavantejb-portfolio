import { NextResponse } from "next/server";
import { getResumeMetadata } from "@/lib/models/resume";

export const dynamic = "force-dynamic";

export async function GET() {
  const resume = await getResumeMetadata();
  return NextResponse.json({ available: Boolean(resume), resume });
}
