"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 text-lime">
          <Lock size={18} />
        </div>
        <h1 className="mt-5 font-archivo text-2xl tracking-tight text-white">Admin</h1>
        <p className="mt-1 font-inter text-sm text-white/50">Enter the password to manage site content.</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-inter text-sm text-white placeholder:text-white/30 focus:border-lime focus:outline-none"
        />

        {error && <p className="mt-3 font-inter text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full rounded-xl bg-lime px-4 py-3 font-archivo text-sm font-black uppercase tracking-wide text-ink transition-opacity disabled:opacity-40"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
