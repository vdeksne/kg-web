"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in");
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/85 p-8 shadow-2xl backdrop-blur-2xl [--kg-accent:#F3C02D]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[color-mix(in_srgb,var(--kg-accent)_20%,transparent)] blur-3xl" />
          <p className="text-[0.65rem] font-bold tracking-[0.35em] text-[var(--kg-accent)] uppercase">
            Kaspars Groza
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Admin
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Sign in to edit site content.
          </p>
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="pw"
                className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
              >
                Password
              </label>
              <Input
                id="pw"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-none border-zinc-700 bg-zinc-900/90 text-white placeholder:text-zinc-600 focus-visible:border-[var(--kg-accent)] focus-visible:ring-[color-mix(in_srgb,var(--kg-accent)_28%,transparent)]"
                placeholder="••••••••"
              />
            </div>
            {error ? (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-red-400"
              >
                {error}
              </motion.p>
            ) : null}
            <Button
              type="submit"
              disabled={loading || !password}
              className="h-12 w-full rounded-none bg-[var(--kg-accent)] px-10 font-semibold text-zinc-950 hover:brightness-95"
            >
              {loading ? "Signing in…" : "Continue"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
