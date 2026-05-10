"use client";

import { useEffect } from "react";

function imageFromEventTarget(target: EventTarget | null): HTMLImageElement | null {
  if (!target || !(target instanceof Node)) return null;
  const el = target instanceof Element ? target : target.parentElement;
  const img = el?.closest("img");
  return img instanceof HTMLImageElement ? img : null;
}

/**
 * Discourages casual save/drag of images (right-click, drag-out, iOS long-press).
 * Images remain discoverable via devtools / network — this is deterrent only.
 */
export function PublicSiteImageFriction() {
  useEffect(() => {
    const capture = true;

    const onContextMenu = (e: MouseEvent) => {
      if (imageFromEventTarget(e.target)) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      if (imageFromEventTarget(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu, capture);
    document.addEventListener("dragstart", onDragStart, capture);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, capture);
      document.removeEventListener("dragstart", onDragStart, capture);
    };
  }, []);

  return null;
}
