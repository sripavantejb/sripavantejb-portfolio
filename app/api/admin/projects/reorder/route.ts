import { NextResponse } from "next/server";
import { reorderProjects } from "@/lib/models/project";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.orderedIds) || !body.orderedIds.every((v: unknown) => typeof v === "string")) {
    return NextResponse.json({ error: "orderedIds must be a string array" }, { status: 400 });
  }

  await reorderProjects(body.orderedIds);
  return NextResponse.json({ ok: true });
}
