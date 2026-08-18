import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/models/project";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const project = await createProject({
    title: body.title,
    dates: body.dates || "",
    org: body.org || "",
    link: body.link || undefined,
    linkLabel: body.linkLabel || undefined,
    stack: Array.isArray(body.stack) ? body.stack : [],
    description: body.description || "",
    highlights: Array.isArray(body.highlights) ? body.highlights : [],
    outcome: body.outcome || "",
  });

  return NextResponse.json({ project }, { status: 201 });
}
