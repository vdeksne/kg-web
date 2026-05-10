"use client";

import { createContext, useContext } from "react";
import type { SocialLinksHrefMap } from "@/lib/site-content/types";

const SocialLinksContext = createContext<SocialLinksHrefMap | null>(null);

export function SocialLinksProvider({
  social,
  children,
}: {
  social: SocialLinksHrefMap;
  children: React.ReactNode;
}) {
  return (
    <SocialLinksContext.Provider value={social}>
      {children}
    </SocialLinksContext.Provider>
  );
}

export function useSocialLinkHrefsOptional(): SocialLinksHrefMap | null {
  return useContext(SocialLinksContext);
}
