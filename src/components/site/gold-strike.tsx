import { cn } from "@/lib/utils";

export function GoldStrike({
  children,
  active,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      {active ? (
        <span
          className="pointer-events-none absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[var(--kg-accent)]"
          aria-hidden
        />
      ) : null}
    </span>
  );
}
