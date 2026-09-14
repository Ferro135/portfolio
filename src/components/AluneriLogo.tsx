import Image from "next/image";
import type { HTMLAttributes } from "react";

type AluneriLogoProps = HTMLAttributes<HTMLSpanElement> & {
  compact?: boolean;
  priority?: boolean;
};

export function AluneriLogo({
  compact = false,
  priority = false,
  className = "",
  ...props
}: AluneriLogoProps) {
  const src = compact
    ? "/brand/aluneri-mark-master.png"
    : "/brand/aluneri-logo-master.png";

  return (
    <span
      className={`aluneri-logo ${compact ? "aluneri-logo-compact" : "aluneri-logo-full"} ${className}`.trim()}
      {...props}
    >
      <Image
        src={src}
        alt={compact ? "Símbolo ALUNERI" : "ALUNERI"}
        width={compact ? 545 : 1362}
        height={387}
        priority={priority}
        className="aluneri-logo-image"
      />
    </span>
  );
}
