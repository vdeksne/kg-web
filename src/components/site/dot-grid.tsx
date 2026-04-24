import Image from "next/image";

const DOTS_W = 231.48;
const DOTS_H = 322.3;

/** Figma: grid bottom 347.2px from viewport top; artboard 1920. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Image
        src="/images/yellow-dots.svg"
        alt=""
        width={DOTS_W}
        height={DOTS_H}
        className="h-auto w-full"
      />
    </div>
  );
}
