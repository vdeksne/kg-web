"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { GALLERY_TILE_PRESETS } from "@/lib/gallery-tile-sizes";
import type { Locale } from "@/i18n/config";
import type { PortfolioItem } from "@/lib/site-content/types";

/** Lightbox overlays `document.body`; mount only on client (`PortfolioGalleryProvider`). */
export function PortfolioLightbox({
  items,
  index,
  locale,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  index: number;
  locale: Locale;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index]!;
  const descriptionText = item.description[locale]?.trim() ?? "";
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const canNavigate = items.length > 1;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const unoptimized =
    item.src.startsWith("/uploads/") || item.src.endsWith(".svg");
  const frame = GALLERY_TILE_PRESETS[item.tileSize];
  const intrinsicW = Math.round(frame.width);
  const intrinsicH = Math.round(frame.height);

  const onSwipePointerDown = (e: React.PointerEvent) => {
    if (!canNavigate) return;
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const endSwipe = (e: React.PointerEvent) => {
    if (!canNavigate || !swipeStartRef.current) return;
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const minDistance = 48;
    if (Math.abs(dx) < minDistance) return;
    if (Math.abs(dy) > Math.abs(dx) * 1.15) return;
    if (dx > 0) onPrev();
    else onNext();
  };

  const onSwipePointerUp = (e: React.PointerEvent) => {
    endSwipe(e);
  };

  const onSwipePointerCancel = () => {
    swipeStartRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-500 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-lightbox-title"
      aria-describedby={descriptionText ? "portfolio-lightbox-desc" : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[3px] transition-opacity motion-reduce:backdrop-blur-none"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 md:px-10">
        <div className="flex shrink-0 justify-end pb-2">
          <button
            ref={closeRef}
            type="button"
            className="rounded-full p-2.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-6" strokeWidth={1.25} aria-hidden />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-white/5 ring-1 ring-white/10">
          <div className="relative isolate flex min-h-0 flex-1">
            <div
              className="flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-y-auto overscroll-contain p-3 pr-14 pl-14 sm:p-6 sm:pr-16 sm:pl-16 md:p-10 md:pr-20 md:pl-20"
              onPointerDown={onSwipePointerDown}
              onPointerUp={onSwipePointerUp}
              onPointerCancel={onSwipePointerCancel}
            >
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                width={intrinsicW}
                height={intrinsicH}
                sizes="(max-width: 768px) 100vw, min(90vw, 1200px)"
                className="h-auto max-h-[min(78dvh,calc(100dvh-14rem))] w-auto max-w-full object-contain object-center"
                unoptimized={unoptimized}
                priority
              />
            </div>

            {canNavigate ? (
              <>
                <button
                  type="button"
                  className="absolute top-1/2 left-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/55 text-white/95 shadow-lg backdrop-blur-md transition-colors hover:border-white/25 hover:bg-zinc-950/75 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none sm:left-3 sm:size-12 md:left-4"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                >
                  <ChevronLeft
                    className="size-7 sm:size-8"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                </button>
                <button
                  type="button"
                  className="absolute top-1/2 right-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/55 text-white/95 shadow-lg backdrop-blur-md transition-colors hover:border-white/25 hover:bg-zinc-950/75 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none sm:right-3 sm:size-12 md:right-4"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                >
                  <ChevronRight
                    className="size-7 sm:size-8"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                </button>
              </>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-white/10 bg-zinc-950/40 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
            <p
              id="portfolio-lightbox-title"
              className="text-center text-[13px] font-light leading-relaxed tracking-[0.14em] text-white/85 uppercase sm:text-sm"
            >
              {item.alt}
            </p>
            {descriptionText ? (
              <p
                id="portfolio-lightbox-desc"
                className="text-white/65 mt-3 text-center text-[13px] font-light leading-relaxed tracking-[0.04em] normal-case sm:text-sm"
                lang={locale}
              >
                {descriptionText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
