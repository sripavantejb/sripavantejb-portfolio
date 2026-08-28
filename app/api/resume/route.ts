import { NextResponse } from "next/server";
import { getResumeDownload } from "@/lib/models/resume";
import { RESUME_DOWNLOAD_NAME } from "@/lib/resume";

export const dynamic = "force-dynamic";

export async function GET() {
  const resume = await getResumeDownload();
  if (!resume) {
    return NextResponse.json({ error: "Resume not available yet" }, { status: 404 });
  }

  const filename = resume.filename || RESUME_DOWNLOAD_NAME;

  return new NextResponse(new Uint8Array(resume.buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=60",
    },
  });
}
