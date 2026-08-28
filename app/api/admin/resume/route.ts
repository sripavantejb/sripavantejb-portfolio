import { NextResponse } from "next/server";
import { deleteResume, getResumeMetadata, uploadResume } from "@/lib/models/resume";

const MAX_BYTES = 5 * 1024 * 1024;

function isPdf(buffer: Buffer, mimeType: string | null) {
  if (mimeType && mimeType !== "application/pdf") return false;
  return buffer.length >= 4 && buffer.subarray(0, 4).toString() === "%PDF";
}

export async function GET() {
  const resume = await getResumeMetadata();
  return NextResponse.json({ resume });
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "PDF file is required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "PDF must be 5 MB or smaller" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isPdf(buffer, file.type)) {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  const resume = await uploadResume(buffer, file.name || "resume.pdf");
  return NextResponse.json({ resume }, { status: 201 });
}

export async function DELETE() {
  const removed = await deleteResume();
  if (!removed) {
    return NextResponse.json({ error: "No resume uploaded yet" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
