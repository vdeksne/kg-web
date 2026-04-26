"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Messages } from "@/i18n/messages";

/** Contact main heading — Figma */
const contactHeadingStyle: React.CSSProperties = {
  color: "#000",
  fontFamily: 'Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "67.05px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "uppercase",
};

/** Email + phone beside the main heading — Figma */
const contactHeaderAsideStyle: React.CSSProperties = {
  color: "#000",
  fontFamily: 'Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "19px",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "24px",
  letterSpacing: "0.074px",
  textTransform: "uppercase",
};

/** Name / email / message labels */
const contactFieldLabelStyle: React.CSSProperties = {
  color: "#000",
  fontFamily:
    '"Gotham Light", Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "19.01px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  textTransform: "uppercase",
};

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
        <div className="max-w-full min-w-0 overflow-x-auto">
          <h2 className="whitespace-nowrap" style={contactHeadingStyle}>
            {copy.heading}
          </h2>
        </div>
        <div
          className="flex min-w-0 max-w-full flex-nowrap items-center gap-4"
          style={contactHeaderAsideStyle}
        >
          <a
            href="mailto:info@kasparsgroza.lv"
            className="text-inherit shrink-0 transition-opacity hover:opacity-80"
          >
            info@kasparsgroza.lv
          </a>
          <div
            className="h-10 w-px shrink-0 bg-[var(--kg-accent)]"
            aria-hidden
          />
          <span className="shrink-0 whitespace-nowrap">
            {copy.phoneLabel} +371 20370077
          </span>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="p-0" style={contactFieldLabelStyle}>
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
          <Label htmlFor="email" className="p-0" style={contactFieldLabelStyle}>
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
        <Label htmlFor="message" className="p-0" style={contactFieldLabelStyle}>
          {copy.messageLabel}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="border-foreground/40 placeholder:text-muted-foreground focus-visible:border-foreground w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-sm outline-none focus-visible:ring-0"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        {status === "sent" ? (
          <p className="text-muted-foreground text-sm">{copy.sent}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-destructive text-sm">{copy.error}</p>
        ) : null}
        <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-4 sm:gap-8">
          <Image
            src="/icons/create.svg"
            alt={copy.decorative}
            width={1136}
            height={41}
            className="shrink object-contain object-left"
            style={{
              width: "min(1135.97px, 100%)",
              height: "auto",
            }}
            unoptimized
          />
          <Button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex max-w-full shrink-0 items-center justify-center rounded-none bg-[var(--kg-accent)] px-0 py-0 font-sans text-[16px] font-normal tracking-[0.25em] text-white uppercase hover:brightness-95 !h-[84.706px] !w-[276.956px] !min-h-0"
          >
            {copy.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
