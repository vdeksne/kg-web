"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  fluidContactDecorative,
  fluidContactLabel,
  fluidContactTitle,
} from "@/lib/fluid-type";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

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
    <form
      className={cn(
        "relative space-y-12 lg:space-y-[clamp(2.5rem,calc(100vw*48/1920),3rem)]",
      )}
      onSubmit={onSubmit}
    >
      <p
        className={cn(
          "text-muted-foreground/25 pointer-events-none absolute -z-10 font-black tracking-[0.2em] uppercase select-none",
          fluidContactDecorative,
        )}
        aria-hidden
      >
        {copy.decorative}
      </p>

      <div
        className={cn(
          "flex flex-col gap-6 sm:gap-8",
          "lg:flex-row lg:items-end lg:justify-between lg:gap-[clamp(2rem,calc(100vw*40/1920),2.5rem)]",
        )}
      >
        <div className="min-w-0 max-w-full lg:min-w-0 lg:flex-1">
          <h2 className={cn(fluidContactTitle, "max-w-full min-w-0")}>
            {copy.heading}
          </h2>
        </div>
        <div
          className={cn(
            fluidContactLabel,
            "flex min-w-0 max-w-full shrink-0 flex-wrap items-center gap-x-4 gap-y-2 sm:flex-nowrap",
          )}
        >
          <a
            href="mailto:info@kasparsgroza.lv"
            className="text-inherit shrink-0 transition-opacity hover:opacity-80"
          >
            info@kasparsgroza.lv
          </a>
          <div
            className="hidden h-10 w-px shrink-0 bg-brand lg:block"
            aria-hidden
          />
          <span className="shrink-0 whitespace-nowrap">
            {copy.phoneLabel} +371 20370077
          </span>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-10 md:grid-cols-2",
          "lg:gap-[clamp(2.25rem,calc(100vw*40/1920),2.5rem)]",
        )}
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className={cn("block select-none", fluidContactLabel)}
          >
            {copy.nameLabel}
          </label>
          <Input
            id="name"
            name="name"
            required
            className="border-0 border-b border-foreground/40 rounded-none px-0 shadow-none focus-visible:ring-0 lg:text-[clamp(16px,calc(100vw*18/1920),18px)]"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className={cn("block select-none", fluidContactLabel)}
          >
            {copy.emailLabel}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border-0 border-b border-foreground/40 rounded-none px-0 shadow-none focus-visible:ring-0 lg:text-[clamp(16px,calc(100vw*18/1920),18px)]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className={cn("block select-none", fluidContactLabel)}
        >
          {copy.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(
            "border-foreground/40 placeholder:text-muted-foreground focus-visible:border-foreground w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-sm outline-none focus-visible:ring-0",
            "lg:text-[clamp(16px,calc(100vw*18/1920),18px)]",
          )}
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
        <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-4 sm:gap-8 lg:gap-[clamp(1.5rem,calc(100vw*32/1920),2rem)]">
          <Image
            src="/icons/create.svg"
            alt={copy.decorative}
            width={1136}
            height={41}
            className="h-auto w-full max-w-full shrink object-contain object-left lg:max-w-[min(1136px,calc(100vw*1136/1920))]"
            unoptimized
          />
          <Button
            type="submit"
            disabled={status === "sending"}
            className={cn(
              "inline-flex max-w-full shrink-0 items-center justify-center rounded-none bg-brand px-0 py-0 font-sans font-normal tracking-[0.25em] uppercase text-white hover:brightness-95 min-h-0!",
              "h-[clamp(52px,calc(100vw*84.706/1920),84.706px)] w-[min(100%,clamp(12.5rem,calc(100vw*276.956/1920),276.956px))] text-[clamp(14px,calc(100vw*16/1920),16px)]",
            )}
          >
            {copy.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
