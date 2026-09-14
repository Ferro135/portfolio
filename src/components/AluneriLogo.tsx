import type { SVGProps } from "react";

type AluneriLogoProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function AluneriLogo({ compact = false, ...props }: AluneriLogoProps) {
  return (
    <svg
      viewBox={compact ? "0 0 48 48" : "0 0 220 48"}
      role="img"
      aria-label="ALUNERI"
      {...props}
    >
      <defs>
        <linearGradient id="aluneri-main-gradient" x1="5" y1="43" x2="43" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#54E2FF" />
          <stop offset="0.48" stopColor="#5F7CFF" />
          <stop offset="1" stopColor="#A35CFF" />
        </linearGradient>
        <filter id="aluneri-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#aluneri-soft-glow)">
        <path
          d="M7.5 38.5 20.4 10.7c1.45-3.12 5.9-3.18 7.43-.1L41 38.5"
          fill="none"
          stroke="url(#aluneri-main-gradient)"
          strokeWidth="6.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.2 30.5h22.4"
          fill="none"
          stroke="url(#aluneri-main-gradient)"
          strokeWidth="5.4"
          strokeLinecap="round"
        />
        <path
          d="M37.5 9.8c3.3 2.5 5.35 6.1 5.7 10.15"
          fill="none"
          stroke="#54E2FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".78"
        />
      </g>

      {!compact && (
        <text
          x="57"
          y="32"
          fill="currentColor"
          fontSize="24"
          fontWeight="800"
          letterSpacing="3.8"
        >
          ALUNERI
        </text>
      )}
    </svg>
  );
}
