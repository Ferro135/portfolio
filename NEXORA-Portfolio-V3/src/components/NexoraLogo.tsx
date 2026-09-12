import type { SVGProps } from "react";

type NexoraLogoProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function NexoraLogo({ compact = false, ...props }: NexoraLogoProps) {
  return (
    <svg
      viewBox={compact ? "0 0 48 48" : "0 0 190 48"}
      role="img"
      aria-label="NEXORA"
      {...props}
    >
      <defs>
        <linearGradient id="nexora-gradient" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#54E2FF" />
          <stop offset="0.48" stopColor="#5F7CFF" />
          <stop offset="1" stopColor="#A35CFF" />
        </linearGradient>
      </defs>
      <path
        d="M8 38V10c0-2.2 2.7-3.2 4.1-1.5L34 34.2V10"
        fill="none"
        stroke="url(#nexora-gradient)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="34" y="10" width="7" height="28" rx="3.5" fill="url(#nexora-gradient)" />
      {!compact && (
        <text
          x="58"
          y="32"
          fill="currentColor"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="25"
          fontWeight="800"
          letterSpacing="3.2"
        >
          NEXORA
        </text>
      )}
    </svg>
  );
}
