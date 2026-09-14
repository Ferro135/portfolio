import type { SVGProps } from "react";

type AluneriLogoProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function AluneriLogo({ compact = false, ...props }: AluneriLogoProps) {
  return (
    <svg
      viewBox={compact ? "0 0 48 48" : "0 0 210 48"}
      role="img"
      aria-label="ALUNERI"
      {...props}
    >
      <defs>
        <linearGradient id="aluneri-gradient" x1="6" y1="42" x2="43" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7DD3FC" />
          <stop offset="0.48" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path
        d="M7.5 38.5 20.7 10.8c1.25-2.6 4.95-2.6 6.2 0L40.5 38.5"
        fill="none"
        stroke="url(#aluneri-gradient)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 30.4h20.3"
        fill="none"
        stroke="url(#aluneri-gradient)"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <circle cx="23.8" cy="17.8" r="2.4" fill="#FFF3E6" opacity=".92" />
      {!compact && (
        <text
          x="57"
          y="32"
          fill="currentColor"
          fontSize="24"
          fontWeight="800"
          letterSpacing="3.5"
        >
          ALUNERI
        </text>
      )}
    </svg>
  );
}
