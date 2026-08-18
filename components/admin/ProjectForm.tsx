"use client";

import { useState, type FormEvent } from "react";
import type { ProjectAdmin } from "@/lib/models/project";

export type ProjectFormValues = {
  title: string;
  dates: string;
  org: string;
  link: string;
  linkLabel: string;
  stack: string;
  description: string;
  highlights: string;
  outcome: string;
};

function toFormValues(p?: ProjectAdmin): ProjectFormValues {
  return {
    title: p?.title ?? "",
    dates: p?.dates ?? "",
    org: p?.org ?? "",
    link: p?.link ?? "",
    linkLabel: p?.linkLabel ?? "",
    stack: p?.stack?.join(", ") ?? "",
    description: p?.description ?? "",
    highlights: p?.highlights?.join("\n") ?? "",
    outcome: p?.outcome ?? "",
  };
}

const field =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 font-inter text-sm text-ink placeholder:text-ink/30 focus:border-lime focus:outline-none";
const label = "block font-inter text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1.5";

export function ProjectForm({
  project,
  onCancel,
  onSubmit,
  submitting,
}: {
  project?: ProjectAdmin;
  onCancel: () => void;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
  submitting: boolean;
}) {
  const [values, setValues] = useState<ProjectFormValues>(toFormValues(project));

  const set = (key: keyof ProjectFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-paper p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Title</label>
          <input required className={field} value={values.title} onChange={set("title")} />
        </div>
        <div>
          <label className={label}>Org</label>
          <input className={field} value={values.org} onChange={set("org")} />
        </div>
        <div>
          <label className={label}>Dates</label>
          <input className={field} value={values.dates} onChange={set("dates")} placeholder="Oct 2025" />
        </div>
        <div>
          <label className={label}>Stack (comma-separated)</label>
          <input className={field} value={values.stack} onChange={set("stack")} placeholder="React, Node.js" />
        </div>
        <div>
          <label className={label}>Link (optional)</label>
          <input className={field} value={values.link} onChange={set("link")} placeholder="https://…" />
        </div>
        <div>
          <label className={label}>Link label (optional)</label>
          <input className={field} value={values.linkLabel} onChange={set("linkLabel")} placeholder="Live site" />
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea rows={2} className={field} value={values.description} onChange={set("description")} />
      </div>

      <div>
        <label className={label}>Highlights (one per line)</label>
        <textarea rows={4} className={field} value={values.highlights} onChange={set("highlights")} />
      </div>

      <div>
        <label className={label}>Outcome / Impact</label>
        <textarea rows={2} className={field} value={values.outcome} onChange={set("outcome")} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink disabled:opacity-50"
        >
          {submitting ? "Saving…" : project ? "Save changes" : "Add project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-ink/15 px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink/60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
