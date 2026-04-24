"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Messages } from "@/i18n/messages";

export function ContactForm({ copy }: { copy: Messages["contact"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="relative space-y-12" onSubmit={onSubmit}>
      <p
        className="text-muted-foreground/25 pointer-events-none absolute -z-10 text-[clamp(2rem,6vw,4rem)] font-black tracking-[0.2em] uppercase select-none"
        aria-hidden
      >
        {copy.decorative}
      </p>

      <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.heading}
        </h2>
        <div className="text-muted-foreground flex items-center gap-4 text-xs tracking-wide uppercase">
          <div
            className="h-10 w-px shrink-0 bg-[var(--kg-accent)]"
            aria-hidden
          />
          <div className="space-y-1 normal-case tracking-normal">
            <a
              href="mailto:info@kasparsgroza.lv"
              className="hover:text-foreground block transition-colors"
            >
              info@kasparsgroza.lv
            </a>
            <p>
              {copy.phoneLabel} +371 20370077
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs tracking-[0.2em] uppercase">
            {copy.nameLabel}
          </Label>
          <Input
            id="name"
            name="name"
            required
            className="border-0 border-b border-foreground/40 rounded-none px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs tracking-[0.2em] uppercase">
            {copy.emailLabel}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border-0 border-b border-foreground/40 rounded-none px-0 shadow-none focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs tracking-[0.2em] uppercase">
          {copy.messageLabel}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="border-foreground/40 placeholder:text-muted-foreground focus-visible:border-foreground w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-sm outline-none focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4">
        {status === "sent" ? (
          <p className="text-muted-foreground text-sm">{copy.sent}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-destructive text-sm">{copy.error}</p>
        ) : null}
        <Button
          type="submit"
          disabled={status === "sending"}
          className="rounded-none bg-[var(--kg-accent)] px-10 py-6 text-xs font-bold tracking-[0.35em] text-[var(--color-brand-foreground)] uppercase hover:brightness-95"
        >
          {copy.submit}
        </Button>
      </div>
    </form>
  );
}
