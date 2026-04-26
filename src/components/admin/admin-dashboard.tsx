"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizePortfolioCategorySlugInput } from "@/lib/portfolio-categories";
import {
  GALLERY_TILE_PRESETS,
  GALLERY_TILE_SIZE_ORDER,
  GALLERY_OBJECT_CONTAIN_IDS,
  type GalleryTileSizeId,
  aspectRatioCssFromTileSize,
} from "@/lib/gallery-tile-sizes";
import type { LocalizedString, SiteContent } from "@/lib/site-content/types";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "about" as const, label: "About" },
  { id: "portfolio" as const, label: "Work" },
  { id: "contact" as const, label: "Contact" },
];

/** Same asset as site footer — combining macron in filename */
const ADMIN_NEMIZ_SRC = "/images/nemi\u0304z.png";
const ADMIN_NEMIZ_INTRINSIC_W = 173;
const ADMIN_NEMIZ_INTRINSIC_H = 98;
const ADMIN_NEMIZ_DISPLAY_W = 86.45;
const ADMIN_NEMIZ_DISPLAY_H = 48.52;

const TILE_SIZE_OPTIONS: { value: GalleryTileSizeId; label: string }[] =
  GALLERY_TILE_SIZE_ORDER.map((id) => ({
    value: id,
    label: `${GALLERY_TILE_PRESETS[id].label} px`,
  }));

const fieldClass =
  "rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] outline-none focus-visible:border-zinc-600 focus-visible:ring-2 focus-visible:ring-[var(--kg-accent)]/20";

/** OS-drawn chevron ignores padding; custom icon + appearance-none */
const gallerySelectClass = cn(
  fieldClass,
  "w-full appearance-none py-2 pl-2 pr-10 text-xs text-zinc-300",
);

function LocalizedTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: LocalizedString;
  onChange: (next: LocalizedString) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <span className="text-[0.6rem] tracking-widest text-zinc-600 uppercase">
            LV
          </span>
          <textarea
            value={value.lv}
            onChange={(e) => onChange({ ...value, lv: e.target.value })}
            rows={rows}
            className={cn(fieldClass, "w-full resize-y px-3 py-2.5 text-sm")}
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-[0.6rem] tracking-widest text-zinc-600 uppercase">
            EN
          </span>
          <textarea
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            rows={rows}
            className={cn(fieldClass, "w-full resize-y px-3 py-2.5 text-sm")}
          />
        </div>
      </div>
    </div>
  );
}

function LocalizedInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedString;
  onChange: (next: LocalizedString) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <span className="text-[0.6rem] tracking-widest text-zinc-600 uppercase">
            LV
          </span>
          <Input
            value={value.lv}
            onChange={(e) => onChange({ ...value, lv: e.target.value })}
            className={cn(fieldClass, "h-10 px-3 text-sm")}
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-[0.6rem] tracking-widest text-zinc-600 uppercase">
            EN
          </span>
          <Input
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className={cn(fieldClass, "h-10 px-3 text-sm")}
          />
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const categorySlugAtFocusRef = useRef<Record<number, string>>({});
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("about");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "ok" | "err">(
    "idle",
  );
  const load = useCallback(async () => {
    setLoadError(null);
    const res = await fetch("/api/admin/content", { credentials: "include" });
    if (res.status === 401) {
      router.push("/admin/login?next=/admin");
      return;
    }
    if (!res.ok) {
      setLoadError("Could not load content");
      return;
    }
    const data = (await res.json()) as SiteContent;
    setContent(data);
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) {
      alert(data.error ?? "Upload failed");
      return null;
    }
    return data.url ?? null;
  };

  async function save() {
    if (!content) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
        credentials: "include",
      });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Save failed");
      }
      setSaveState("ok");
      setTimeout(() => setSaveState("idle"), 2400);
    } catch (e) {
      setSaveState("err");
      alert(e instanceof Error ? e.message : "Save failed");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
    router.refresh();
  }

  if (loadError) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-8 text-red-400">
        {loadError}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-zinc-500">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Loading editor…
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-10 sm:px-8">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => void logout()}
        aria-label="Sign out"
        title="Sign out"
        className="fixed top-4 right-4 z-[100] size-11 rounded-none border-zinc-600/80 bg-zinc-950/75 text-zinc-400 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md transition-colors hover:border-zinc-500 hover:bg-zinc-900/90 hover:text-zinc-100 sm:top-5 sm:right-6 sm:size-12"
      >
        <LogOut
          className="size-[1.25rem] sm:size-[1.35rem]"
          strokeWidth={1.65}
          aria-hidden
        />
      </Button>

      <header className="flex flex-col gap-6 border-b border-zinc-800/80 pb-8 pr-14 sm:flex-row sm:items-end sm:justify-between sm:pr-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[0.65rem] font-bold tracking-[0.35em] text-[var(--kg-accent)] uppercase">
            Content
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            Hello, welcome
          </h1>
          <p className="mt-2 max-w-md text-sm text-zinc-500">
            Take your time updating the content below.
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              onClick={() => void save()}
              disabled={saveState === "saving"}
              className="h-12 rounded-none bg-[var(--kg-accent)] px-14 text-sm font-semibold text-zinc-950 hover:brightness-95"
            >
              {saveState === "saving" ? "Saving…" : "Save changes"}
            </Button>
          </motion.div>
        </div>
      </header>

      <nav className="mt-8 flex shrink-0 gap-1 border-b border-zinc-800/60">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "relative px-5 py-3 text-sm font-medium transition-colors",
              tab === t.id ? "text-white" : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {t.label}
            {tab === t.id ? (
              <motion.span
                layoutId="admin-tab"
                className="absolute right-2 bottom-0 left-2 h-0.5 rounded-none bg-[var(--kg-accent)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.28 }}
          className="mt-10 min-h-0 flex-1 pb-12"
        >
          {tab === "about" ? (
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
              <div className="space-y-10">
                <LocalizedInput
                  label="Title"
                  value={content.about.title}
                  onChange={(v) =>
                    setContent((c) =>
                      c ? { ...c, about: { ...c.about, title: v } } : c,
                    )
                  }
                />
                <LocalizedTextarea
                  label="Paragraph"
                  value={content.about.body}
                  onChange={(v) =>
                    setContent((c) =>
                      c ? { ...c, about: { ...c.about, body: v } } : c,
                    )
                  }
                  rows={10}
                />
                <LocalizedInput
                  label="Portrait alt text"
                  value={content.about.portraitAlt}
                  onChange={(v) =>
                    setContent((c) =>
                      c ? { ...c, about: { ...c.about, portraitAlt: v } } : c,
                    )
                  }
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 }}
                className="w-full max-w-[673.749px] space-y-4"
              >
                <Label className="text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
                  Portrait image
                </Label>
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "673.749 / 561.1" }}
                  >
                    {content.about.portraitUrl ? (
                      <Image
                        src={content.about.portraitUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 674px"
                        unoptimized={content.about.portraitUrl.startsWith(
                          "/uploads/",
                        )}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-600">
                        No image URL
                      </div>
                    )}
                  </div>
                </div>
                <Input
                  value={content.about.portraitUrl}
                  onChange={(e) =>
                    setContent((c) =>
                      c
                        ? {
                            ...c,
                            about: {
                              ...c.about,
                              portraitUrl: e.target.value,
                            },
                          }
                        : c,
                    )
                  }
                  className={cn(fieldClass, "font-mono text-xs")}
                  placeholder="https://…"
                />
                <label className="flex cursor-pointer items-center justify-center rounded-none border border-dashed border-zinc-700 py-6 text-sm text-zinc-500 transition-colors hover:border-[color-mix(in_srgb,var(--kg-accent)_65%,transparent)] hover:text-zinc-300">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = await uploadFile(f);
                      if (url)
                        setContent((c) =>
                          c
                            ? {
                                ...c,
                                about: { ...c.about, portraitUrl: url },
                              }
                            : c,
                        );
                      e.target.value = "";
                    }}
                  />
                  Drop or click to upload
                </label>
              </motion.div>
            </div>
          ) : null}

          {tab === "portfolio" ? (
            <div className="space-y-10">
              <div className="grid gap-8 md:grid-cols-2">
                <LocalizedInput
                  label="Breadcrumb label"
                  value={content.portfolio.breadcrumb}
                  onChange={(v) =>
                    setContent((c) =>
                      c
                        ? {
                            ...c,
                            portfolio: { ...c.portfolio, breadcrumb: v },
                          }
                        : c,
                    )
                  }
                />
                <LocalizedInput
                  label="Category (e.g. Logo)"
                  value={content.portfolio.categoryLogo}
                  onChange={(v) =>
                    setContent((c) =>
                      c
                        ? {
                            ...c,
                            portfolio: { ...c.portfolio, categoryLogo: v },
                          }
                        : c,
                    )
                  }
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-medium text-white">
                    Gallery categories
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none border-zinc-500 bg-zinc-800 px-6 py-2 text-sm font-medium text-zinc-50 shadow-none hover:bg-zinc-700 hover:text-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                    onClick={() =>
                      setContent((c) => {
                        if (!c) return c;
                        const base = "new-category";
                        let n = 1;
                        const taken = new Set(
                          c.portfolio.categoryNav.map((x) => x.slug),
                        );
                        let slug = base;
                        while (taken.has(slug)) slug = `${base}-${n++}`;
                        return {
                          ...c,
                          portfolio: {
                            ...c.portfolio,
                            categoryNav: [
                              ...c.portfolio.categoryNav,
                              {
                                slug,
                                label: {
                                  lv: "Jauna sadaļa",
                                  en: "New section",
                                },
                              },
                            ],
                          },
                        };
                      })
                    }
                  >
                    Add category
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  Slug becomes the URL segment{" "}
                  <code className="text-zinc-400">/portfolio/your-slug</code>{" "}
                  (lowercase, hyphens only).
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {content.portfolio.categoryNav.map((cat, catIndex) => (
                    <div
                      key={catIndex}
                      className="space-y-3 rounded-xl border border-zinc-800/90 bg-zinc-900/35 p-4"
                    >
                      <div className="flex flex-wrap items-end gap-2">
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <span className="text-[0.6rem] tracking-widest text-zinc-600 uppercase">
                            Slug
                          </span>
                          <Input
                            value={cat.slug}
                            onFocus={() => {
                              if (content) {
                                categorySlugAtFocusRef.current[catIndex] =
                                  content.portfolio.categoryNav[catIndex]!.slug;
                              }
                            }}
                            onChange={(e) =>
                              setContent((c) => {
                                if (!c) return c;
                                const nav = [...c.portfolio.categoryNav];
                                nav[catIndex] = {
                                  ...nav[catIndex]!,
                                  slug: e.target.value,
                                };
                                return {
                                  ...c,
                                  portfolio: {
                                    ...c.portfolio,
                                    categoryNav: nav,
                                  },
                                };
                              })
                            }
                            onBlur={() => {
                              setContent((c) => {
                                if (!c) return c;
                                const start =
                                  categorySlugAtFocusRef.current[catIndex] ??
                                  c.portfolio.categoryNav[catIndex]!.slug;
                                const row = c.portfolio.categoryNav[catIndex]!;
                                let next = normalizePortfolioCategorySlugInput(
                                  row.slug,
                                );
                                if (!next) next = start;
                                if (
                                  c.portfolio.categoryNav.some(
                                    (x, i) =>
                                      i !== catIndex && x.slug === next,
                                  )
                                ) {
                                  next = start;
                                }
                                const nav = c.portfolio.categoryNav.map((x, i) =>
                                  i === catIndex ? { ...x, slug: next } : x,
                                );
                                const items = c.portfolio.items.map((item) => ({
                                  ...item,
                                  categories: item.categories.map((s) =>
                                    s === start ? next : s,
                                  ),
                                }));
                                return {
                                  ...c,
                                  portfolio: {
                                    ...c.portfolio,
                                    categoryNav: nav,
                                    items,
                                  },
                                };
                              });
                            }}
                            className={cn(
                              fieldClass,
                              "h-9 font-mono text-xs text-zinc-300",
                            )}
                            spellCheck={false}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-9 shrink-0 rounded-none text-xs text-red-400/90 hover:bg-red-950/40 hover:text-red-300 disabled:opacity-40"
                          disabled={content.portfolio.categoryNav.length <= 1}
                          onClick={() =>
                            setContent((c) => {
                              if (!c || c.portfolio.categoryNav.length <= 1)
                                return c;
                              const removed =
                                c.portfolio.categoryNav[catIndex]!.slug;
                              const nextNav = c.portfolio.categoryNav.filter(
                                (_, i) => i !== catIndex,
                              );
                              const fallback = nextNav[0]!.slug;
                              const items = c.portfolio.items.map((item) => {
                                const filtered = item.categories.filter(
                                  (s) => s !== removed,
                                );
                                return {
                                  ...item,
                                  categories:
                                    filtered.length > 0
                                      ? filtered
                                      : [fallback],
                                };
                              });
                              return {
                                ...c,
                                portfolio: {
                                  ...c.portfolio,
                                  categoryNav: nextNav,
                                  items,
                                },
                              };
                            })
                          }
                        >
                          Remove
                        </Button>
                      </div>
                      <LocalizedInput
                        label="Submenu & breadcrumb title"
                        value={cat.label}
                        onChange={(v) =>
                          setContent((c) => {
                            if (!c) return c;
                            const nav = [...c.portfolio.categoryNav];
                            nav[catIndex] = { ...nav[catIndex]!, label: v };
                            return {
                              ...c,
                              portfolio: {
                                ...c.portfolio,
                                categoryNav: nav,
                              },
                            };
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-medium text-white">Gallery</h2>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none border-zinc-500 bg-zinc-800 px-8 py-2 text-sm font-medium text-zinc-50 shadow-none hover:bg-zinc-700 hover:text-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                  onClick={() =>
                    setContent((c) =>
                      c
                        ? {
                            ...c,
                            portfolio: {
                              ...c.portfolio,
                              items: [
                                ...c.portfolio.items,
                                {
                                  id: crypto.randomUUID(),
                                  alt: "New piece",
                                  src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
                                  tileSize: "w488h426",
                                  categories: [
                                    c.portfolio.categoryNav[0]?.slug ??
                                      "logo",
                                  ],
                                },
                              ],
                            },
                          }
                        : c,
                    )
                  }
                >
                  Add slide
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {content.portfolio.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group rounded-xl border border-zinc-800/90 bg-zinc-900/35 p-4 transition-colors hover:border-zinc-700"
                  >
                    <div
                      className="relative mb-4 w-full overflow-hidden rounded-lg bg-zinc-950"
                      style={{
                        aspectRatio: aspectRatioCssFromTileSize(item.tileSize),
                      }}
                    >
                      {item.src ? (
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          className={cn(
                            "transition-transform duration-500",
                            GALLERY_OBJECT_CONTAIN_IDS.has(item.id)
                              ? "object-contain object-center"
                              : "object-cover object-top group-hover:scale-[1.03]",
                          )}
                          unoptimized={
                            item.src.startsWith("/uploads/") ||
                            item.src.endsWith(".svg")
                          }
                        />
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <Input
                        value={item.alt}
                        onChange={(e) =>
                          setContent((c) => {
                            if (!c) return c;
                            const items = [...c.portfolio.items];
                            items[index] = {
                              ...items[index],
                              alt: e.target.value,
                            };
                            return {
                              ...c,
                              portfolio: { ...c.portfolio, items },
                            };
                          })
                        }
                        placeholder="Alt text"
                        className={cn(fieldClass, "h-9 px-2 text-xs")}
                      />
                      <Input
                        value={item.src}
                        onChange={(e) =>
                          setContent((c) => {
                            if (!c) return c;
                            const items = [...c.portfolio.items];
                            items[index] = {
                              ...items[index],
                              src: e.target.value,
                            };
                            return {
                              ...c,
                              portfolio: { ...c.portfolio, items },
                            };
                          })
                        }
                        className={cn(
                          fieldClass,
                          "h-9 font-mono px-2 text-[0.7rem] text-zinc-300",
                        )}
                        placeholder="Image URL"
                      />
                      <div className="space-y-2">
                        <p className="text-[0.6rem] font-medium tracking-wider text-zinc-500 uppercase">
                          Sections
                        </p>
                        <div className="flex flex-col gap-2.5">
                          {content.portfolio.categoryNav.map((o) => (
                            <label
                              key={o.slug}
                              className="flex cursor-pointer items-center gap-2.5 text-xs text-zinc-300"
                            >
                              <input
                                type="checkbox"
                                checked={item.categories.includes(o.slug)}
                                onChange={(e) => {
                                  const on = e.target.checked;
                                  setContent((c) => {
                                    if (!c) return c;
                                    const items = [...c.portfolio.items];
                                    const cur = items[index]!;
                                    const set = new Set(cur.categories);
                                    if (on) set.add(o.slug);
                                    else set.delete(o.slug);
                                    const categories = Array.from(set);
                                    if (categories.length === 0) return c;
                                    items[index] = { ...cur, categories };
                                    return {
                                      ...c,
                                      portfolio: { ...c.portfolio, items },
                                    };
                                  });
                                }}
                                className="size-3.5 shrink-0 rounded border border-zinc-600 bg-zinc-950 accent-[var(--kg-accent)]"
                              />
                              <span>
                                {o.label.en}
                                <span className="text-zinc-600">
                                  {" "}
                                  ({o.slug})
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="relative w-full">
                        <select
                          value={item.tileSize}
                          onChange={(e) =>
                            setContent((c) => {
                              if (!c) return c;
                              const items = [...c.portfolio.items];
                              items[index] = {
                                ...items[index],
                                tileSize: e.target.value as GalleryTileSizeId,
                              };
                              return {
                                ...c,
                                portfolio: { ...c.portfolio, items },
                              };
                            })
                          }
                          className={gallerySelectClass}
                        >
                          {TILE_SIZE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500"
                          strokeWidth={2}
                        />
                      </div>
                      <label className="block text-center text-[0.7rem] text-zinc-500">
                        <span className="cursor-pointer text-[var(--kg-accent)] hover:underline">
                          Upload
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const url = await uploadFile(f);
                            if (url)
                              setContent((c) => {
                                if (!c) return c;
                                const items = [...c.portfolio.items];
                                items[index] = { ...items[index], src: url };
                                return {
                                  ...c,
                                  portfolio: { ...c.portfolio, items },
                                };
                              });
                            e.target.value = "";
                          }}
                        />
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-9 w-full rounded-none text-xs text-red-400/90 hover:bg-red-950/40 hover:text-red-300"
                        onClick={() =>
                          setContent((c) => {
                            if (!c) return c;
                            return {
                              ...c,
                              portfolio: {
                                ...c.portfolio,
                                items: c.portfolio.items.filter(
                                  (_, i) => i !== index,
                                ),
                              },
                            };
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "contact" ? (
            <div className="mx-auto max-w-3xl space-y-10">
              <LocalizedInput
                label="Decorative background line"
                value={content.contact.decorative}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, decorative: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Heading"
                value={content.contact.heading}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, heading: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Phone label"
                value={content.contact.phoneLabel}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, phoneLabel: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Name label"
                value={content.contact.nameLabel}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, nameLabel: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Email label"
                value={content.contact.emailLabel}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, emailLabel: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Message label"
                value={content.contact.messageLabel}
                onChange={(v) =>
                  setContent((c) =>
                    c
                      ? { ...c, contact: { ...c.contact, messageLabel: v } }
                      : c,
                  )
                }
              />
              <LocalizedInput
                label="Submit button"
                value={content.contact.submit}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, submit: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Success message"
                value={content.contact.sent}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, sent: v } } : c,
                  )
                }
              />
              <LocalizedInput
                label="Error message"
                value={content.contact.error}
                onChange={(v) =>
                  setContent((c) =>
                    c ? { ...c, contact: { ...c.contact, error: v } } : c,
                  )
                }
              />
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <footer className="mt-auto flex shrink-0 justify-center border-t border-zinc-800/50 pt-10 pb-4">
        <Image
          src={ADMIN_NEMIZ_SRC}
          alt="Nemiz"
          width={ADMIN_NEMIZ_INTRINSIC_W}
          height={ADMIN_NEMIZ_INTRINSIC_H}
          className="h-auto object-contain opacity-90 transition-opacity hover:opacity-100"
          style={{
            width: `min(100%, ${ADMIN_NEMIZ_DISPLAY_W}px)`,
            aspectRatio: `${ADMIN_NEMIZ_DISPLAY_W} / ${ADMIN_NEMIZ_DISPLAY_H}`,
          }}
        />
      </footer>

      <AnimatePresence>
        {saveState === "ok" ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-none border border-zinc-700 bg-zinc-900/95 px-10 py-3 text-sm text-white shadow-2xl backdrop-blur-md"
          >
            Saved successfully
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
