import { NextResponse } from "next/server";
import { deleteProject, updateProject } from "@/lib/models/project";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  for (const key of ["title", "dates", "org", "link", "linkLabel", "description", "outcome"] as const) {
    if (typeof body[key] === "string") update[key] = body[key];
  }
  if (Array.isArray(body.stack)) update.stack = body.stack;
  if (Array.isArray(body.highlights)) update.highlights = body.highlights;

  try {
    const project = await updateProject(id, update);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ok = await deleteProject(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }
}
