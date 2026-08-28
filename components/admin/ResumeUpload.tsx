"use client";

import { useRef, useState } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import type { ResumeMeta } from "@/lib/models/resume";
import { RESUME_DOWNLOAD_PATH } from "@/lib/resume";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeUpload({ initialResume }: { initialResume: ResumeMeta | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState(initialResume);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/resume");
    const data = await res.json();
    setResume(data.resume ?? null);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/resume", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to upload resume");
      setResume(data.resume ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!confirm("Remove the current resume PDF?")) return;
    setRemoving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/resume", { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to remove resume");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-lime">Resume</p>
          <h2 className="mt-1 font-archivo text-xl tracking-tight text-white">CV / Resume PDF</h2>
          <p className="mt-2 max-w-xl font-inter text-sm text-white/55">
            Upload a PDF resume. Visitors can download it from the hero, nav, and contact footer.
          </p>
        </div>
        {resume ? (
          <a
            href={RESUME_DOWNLOAD_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-inter text-sm font-medium text-white/75 transition-colors hover:border-lime hover:text-lime"
          >
            <Download size={15} /> Preview download
          </a>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 font-inter text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-5 rounded-xl border border-dashed border-white/15 p-5">
        {resume ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lime">
                <FileText size={18} />
              </span>
              <div>
                <p className="font-inter text-sm font-semibold text-white">{resume.filename}</p>
                <p className="mt-1 font-inter text-xs text-white/45">
                  {formatSize(resume.size)} · Uploaded {formatDate(resume.uploadedAt)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading || removing}
                className="inline-flex items-center gap-2 rounded-lg bg-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink disabled:opacity-50"
              >
                <Upload size={14} /> Replace PDF
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading || removing}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-inter text-sm font-medium text-white/70 transition-colors hover:border-red-400 hover:text-red-300 disabled:opacity-50"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-inter text-sm text-white/50">No resume uploaded yet.</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink disabled:opacity-50"
            >
              <Upload size={14} /> {uploading ? "Uploading…" : "Upload PDF"}
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleUpload(file);
        }}
      />
    </section>
  );
}
