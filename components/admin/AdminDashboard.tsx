"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, LogOut, Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import type { ProjectAdmin } from "@/lib/models/project";
import { ProjectForm, type ProjectFormValues } from "@/components/admin/ProjectForm";

function toPayload(values: ProjectFormValues) {
  return {
    title: values.title.trim(),
    dates: values.dates.trim(),
    org: values.org.trim(),
    link: values.link.trim() || undefined,
    linkLabel: values.linkLabel.trim() || undefined,
    stack: values.stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    description: values.description.trim(),
    highlights: values.highlights
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    outcome: values.outcome.trim(),
  };
}

export function AdminDashboard({ initialProjects }: { initialProjects: ProjectAdmin[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [mode, setMode] = useState<"idle" | "add" | { edit: string }>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data.projects ?? []);
  }

  async function handleAdd(values: ProjectFormValues) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(values)),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to add project");
      await refresh();
      setMode("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit(id: string, values: ProjectFormValues) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(values)),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save project");
      await refresh();
      setMode("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to delete");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;

    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setProjects(reordered);

    try {
      const res = await fetch("/api/admin/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((p) => p._id) }),
      });
      if (!res.ok) throw new Error("Failed to save order");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      await refresh();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const editingProject = typeof mode === "object" ? projects.find((p) => p._id === mode.edit) : undefined;

  return (
    <main className="min-h-screen bg-ink px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-lime">Admin</p>
            <h1 className="mt-1 font-archivo text-3xl tracking-tight text-white">Projects</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-inter text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 font-inter text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8">
          {mode === "add" ? (
            <ProjectForm onCancel={() => setMode("idle")} onSubmit={handleAdd} submitting={submitting} />
          ) : (
            <button
              onClick={() => setMode("add")}
              className="flex items-center gap-2 rounded-lg bg-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink"
            >
              <Plus size={15} /> Add project
            </button>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {projects.map((p, i) =>
            typeof mode === "object" && mode.edit === p._id ? (
              <ProjectForm
                key={p._id}
                project={editingProject}
                onCancel={() => setMode("idle")}
                onSubmit={(values) => handleEdit(p._id, values)}
                submitting={submitting}
              />
            ) : (
              <div
                key={p._id}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-col gap-1 pt-0.5">
                  <button
                    onClick={() => handleMove(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-white/50 disabled:opacity-20"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    onClick={() => handleMove(i, 1)}
                    disabled={i === projects.length - 1}
                    aria-label="Move down"
                    className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-white/50 disabled:opacity-20"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-archivo text-base tracking-tight text-white">{p.title}</h3>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-lime"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <p className="mt-0.5 font-inter text-xs text-white/45">
                    {p.org} · {p.dates}
                  </p>
                  <p className="mt-2 line-clamp-2 font-inter text-sm text-white/60">{p.description}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setMode({ edit: p._id })}
                    aria-label="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-lime hover:text-lime"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id, p.title)}
                    disabled={busyId === p._id}
                    aria-label="Delete"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-red-400 hover:text-red-400 disabled:opacity-40"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          )}
          {projects.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center font-inter text-sm text-white/40">
              No projects yet — add your first one above.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
