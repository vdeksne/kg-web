"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Messages } from "@/i18n/messages";

/** 320px → 1920px viewport — matches site fluid type ramps */
const CONTACT_HEADING_MIN_PX = 28;
const CONTACT_HEADING_MAX_PX = 67.05;
const CONTACT_HEADING_SLOPE =
  (CONTACT_HEADING_MAX_PX - CONTACT_HEADING_MIN_PX) / 1600;

const CONTACT_ASIDE_FS_MIN = 12;
const CONTACT_ASIDE_FS_MAX = 19;
const CONTACT_ASIDE_FS_SLOPE =
  (CONTACT_ASIDE_FS_MAX - CONTACT_ASIDE_FS_MIN) / 1600;

const CONTACT_ASIDE_LH_MIN = 16;
const CONTACT_ASIDE_LH_MAX = 24;
const CONTACT_ASIDE_LH_SLOPE =
  (CONTACT_ASIDE_LH_MAX - CONTACT_ASIDE_LH_MIN) / 1600;

/** Contact main heading — Figma max, fluid down to narrow viewports */
const contactHeadingStyle: React.CSSProperties = {
  color: "#000",
  fontFamily: 'Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: `clamp(${CONTACT_HEADING_MIN_PX}px, calc(${CONTACT_HEADING_MIN_PX}px + (100vw - 320px) * ${CONTACT_HEADING_SLOPE}), ${CONTACT_HEADING_MAX_PX}px)`,
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "uppercase",
};

/** Email + phone in header, and all form field labels (name, email, message) — same ramp */
const contactHeaderAsideStyle: React.CSSProperties = {
  color: "#000",
  fontFamily: 'Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: `clamp(${CONTACT_ASIDE_FS_MIN}px, calc(${CONTACT_ASIDE_FS_MIN}px + (100vw - 320px) * ${CONTACT_ASIDE_FS_SLOPE}), ${CONTACT_ASIDE_FS_MAX}px)`,
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: `clamp(${CONTACT_ASIDE_LH_MIN}px, calc(${CONTACT_ASIDE_LH_MIN}px + (100vw - 320px) * ${CONTACT_ASIDE_LH_SLOPE}), ${CONTACT_ASIDE_LH_MAX}px)`,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

export function ContactForm({ copy }: { copy: Messages["contact"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorFeedback, setErrorFeedback] = useState<{
    message: string;
    hint?: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorFeedback(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        dev?: boolean;
        mockReason?: string;
        error?: string;
        detail?: string;
        hint?: string;
      } | null;

      if (res.ok && json?.ok) {
        if (json.dev && json.mockReason) {
          console.warn(
            "[contact] Email not delivered (dev/local). Resend error:",
            json.mockReason,
          );
        }
        setStatus("sent");
        return;
      }

      if (!res.ok) {
        const serverMsg =
          typeof json?.error === "string" && json.error.trim() !== ""
            ? json.error
            : copy.error;
        const hint =
          typeof json?.hint === "string" && json.hint.trim() !== ""
            ? json.hint
            : undefined;
        console.error(
          "[contact]",
          json?.detail ?? json?.error ?? res.statusText,
        );
        setErrorFeedback({ message: serverMsg, hint });
      }
      setStatus("error");
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

      <div className="flex flex-col gap-6 sm:gap-8 min-[1439px]:flex-row min-[1439px]:items-end min-[1439px]:justify-between min-[1439px]:gap-10">
        <div className="min-w-0 max-w-full min-[1439px]:min-w-0 min-[1439px]:flex-1">
          <h2
            className="max-w-full hyphens-auto wrap-break-word min-[1439px]:whitespace-nowrap"
            style={contactHeadingStyle}
          >
            {copy.heading}
          </h2>
        </div>
        <div
          className="flex min-w-0 max-w-full shrink-0 flex-wrap items-center gap-x-4 gap-y-2 sm:flex-nowrap"
          style={contactHeaderAsideStyle}
        >
          <a
            href="mailto:info@kasparsgroza.lv"
            className="text-inherit shrink-0 transition-opacity hover:opacity-80"
          >
            info@kasparsgroza.lv
          </a>
          <div
            className="hidden h-10 w-px shrink-0 bg-[var(--kg-accent)] lg:block"
            aria-hidden
          />
          <span className="shrink-0 whitespace-nowrap">
            {copy.phoneLabel} +371 20370077
          </span>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block select-none"
            style={contactHeaderAsideStyle}
          >
            {copy.nameLabel}
          </label>
          <Input
            id="name"
            name="name"
            required
            className="border-0 border-b border-foreground/40 rounded-none px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block select-none"
            style={contactHeaderAsideStyle}
          >
            {copy.emailLabel}
          </label>
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
        <label
          htmlFor="message"
          className="block select-none"
          style={contactHeaderAsideStyle}
        >
          {copy.messageLabel}
        </label>
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
          <div className="max-w-prose space-y-2">
            <p className="text-destructive text-sm">
              {errorFeedback?.message ?? copy.error}
            </p>
            {errorFeedback?.hint ? (
              <p className="text-muted-foreground text-xs leading-relaxed">
                {errorFeedback.hint}
              </p>
            ) : null}
          </div>
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
