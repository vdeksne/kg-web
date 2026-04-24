import Image from "next/image";
import { cn } from "@/lib/utils";

const src = "/images/kg.svg";
const width = 142;
const height = 144;

export function KgLogo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt="Kaspars Groza"
      width={width}
      height={height}
      className={cn("h-auto w-[5.5rem] max-w-full sm:w-[6.75rem]", className)}
      priority={priority}
    />
  );
}
