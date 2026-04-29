"use client";

import { createContext, useContext } from "react";
import type { PortfolioCategoryNavItem } from "@/lib/site-content/types";

const PortfolioNavContext = createContext<PortfolioCategoryNavItem[] | null>(
  null,
);

export function PortfolioNavProvider({
  categories,
  children,
}: {
  categories: PortfolioCategoryNavItem[];
  children: React.ReactNode;
}) {
  return (
    <PortfolioNavContext.Provider value={categories}>
      {children}
    </PortfolioNavContext.Provider>
  );
}

export function usePortfolioNavCategories(): PortfolioCategoryNavItem[] {
  const v = useContext(PortfolioNavContext);
  if (v == null) {
    throw new Error("usePortfolioNavCategories must be used within PortfolioNavProvider");
  }
  return v;
}
