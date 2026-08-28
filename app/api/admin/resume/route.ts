import { NextResponse } from "next/server";
import { getAdminEnvStatus } from "@/lib/adminEnv";
import { deleteResume, getResumeMetadata, uploadResume } from "@/lib/models/resume";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 5 * 1024 * 1024;

function isPdf(buffer: Buffer, mimeType: string | null) {
  if (mimeType && mimeType !== "application/pdf" && mimeType !== "application/octet-stream") {
    return false;
  }
  return buffer.length >= 4 && buffer.subarray(0, 4).toString() === "%PDF";
}

function dbError(error: unknown) {
  const message = error instanceof Error ? error.message : "Database error";
  if (message.includes("Missing MONGODB_URI")) {
    return "MONGODB_URI is not configured on the server.";
  }
  if (message.includes("authentication failed") || message.includes("bad auth")) {
    return "MongoDB authentication failed. Check MONGODB_URI credentials.";
  }
  if (message.includes("timed out") || message.includes("Server selection")) {
    return "Could not reach MongoDB. Check Atlas network access (allow 0.0.0.0/0).";
  }
  if (message.includes("ECONNREFUSED") && message.includes("5432")) {
    return "MONGODB_URI looks wrong — the server tried PostgreSQL (port 5432). Use your MongoDB Atlas connection string.";
  }
  if (message.includes("must be a MongoDB connection string")) {
    return message;
  }
  return message;
}

export async function GET() {
  const env = getAdminEnvStatus();
  if (!env.ok) {
    return NextResponse.json({ error: `Missing env: ${env.missing.join(", ")}` }, { status: 503 });
  }

  try {
    const resume = await getResumeMetadata();
    return NextResponse.json({ resume });
  } catch (error) {
    return NextResponse.json({ error: dbError(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const env = getAdminEnvStatus();
  if (!env.ok) {
    return NextResponse.json({ error: `Missing env: ${env.missing.join(", ")}` }, { status: 503 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

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
  } catch (error) {
    console.error("[admin/resume] upload failed:", error);
    return NextResponse.json({ error: dbError(error) }, { status: 500 });
  }
}

export async function DELETE() {
  const env = getAdminEnvStatus();
  if (!env.ok) {
    return NextResponse.json({ error: `Missing env: ${env.missing.join(", ")}` }, { status: 503 });
  }

  try {
    const removed = await deleteResume();
    if (!removed) {
      return NextResponse.json({ error: "No resume uploaded yet" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: dbError(error) }, { status: 500 });
  }
}
