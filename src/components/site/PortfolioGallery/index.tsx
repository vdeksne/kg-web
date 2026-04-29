"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { PortfolioLightbox } from "./PortfolioLightbox";
import {
  GALLERY_OBJECT_CONTAIN_IDS,
  GALLERY_TILE_PRESETS,
  aspectRatioCssFromTileSize,
} from "@/lib/gallery-tile-sizes";
import type { Locale } from "@/i18n/config";
import type { PortfolioItem } from "@/lib/site-content/types";
import { cn } from "@/lib/utils";

const galleryImageHover =
  "transition-transform duration-[1.15s] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0 group-hover:scale-[1.035] motion-reduce:group-hover:scale-100";

type GalleryCtx = {
  open: (item: PortfolioItem) => void;
};

const GalleryContext = createContext<GalleryCtx | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error(
      "PortfolioGalleryTile must be inside PortfolioGalleryProvider",
    );
  }
  return ctx;
}

export function PortfolioGalleryProvider({
  items,
  locale,
  children,
}: {
  items: PortfolioItem[];
  locale: Locale;
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(
    (item: PortfolioItem) => {
      const idx = items.findIndex((x) => x.id === item.id);
      setActiveIndex(idx >= 0 ? idx : null);
    },
    [items],
  );

  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || items.length <= 1) return i;
      return (i - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || items.length <= 1) return i;
      return (i + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

  return (
    <GalleryContext.Provider value={{ open }}>
      {children}
      {mounted && activeIndex !== null
        ? createPortal(
            <PortfolioLightbox
              items={items}
              index={activeIndex}
              locale={locale}
              onClose={close}
              onPrev={goPrev}
              onNext={goNext}
            />,
            document.body,
          )
        : null}
    </GalleryContext.Provider>
  );
}

export function PortfolioGalleryTile({ item }: { item: PortfolioItem }) {
  const { open } = useGallery();
  const frame = GALLERY_TILE_PRESETS[item.tileSize];
  const isContain = GALLERY_OBJECT_CONTAIN_IDS.has(item.id);
  const unoptimized =
    item.src.startsWith("/uploads/") || item.src.endsWith(".svg");

  return (
    <article
      className="group w-full max-md:self-center overflow-hidden bg-neutral-100"
      style={{ maxWidth: `${frame.width}px` }}
    >
      <button
        type="button"
        className="block w-full cursor-zoom-in text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        onClick={() => open(item)}
        aria-haspopup="dialog"
        aria-label={`Open preview: ${item.alt}`}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: aspectRatioCssFromTileSize(item.tileSize),
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className={cn(
              galleryImageHover,
              isContain
                ? "origin-center object-contain object-center"
                : "origin-top object-cover object-top",
            )}
            unoptimized={unoptimized}
          />
        </div>
      </button>
    </article>
  );
}
