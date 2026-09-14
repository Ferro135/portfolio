import type { SVGProps } from "react";

type AluneriLogoProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function AluneriLogo({ compact = false, ...props }: AluneriLogoProps) {
  return (
    <svg
      viewBox={compact ? "0 0 64 64" : "0 0 246 64"}
      role="img"
      aria-label="ALUNERI"
      {...props}
    >
      <defs>
        <linearGradient id="aluneri-ribbon" x1="6" y1="54" x2="58" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#123A8C" />
          <stop offset="0.38" stopColor="#67E8F9" />
          <stop offset="0.7" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="aluneri-ribbon-soft" x1="12" y1="50" x2="55" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8FAFF" />
          <stop offset="0.42" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="aluneri-wordmark" x1="76" y1="20" x2="235" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3FBFF" />
          <stop offset="0.58" stopColor="#D7EEFF" />
          <stop offset="1" stopColor="#AFCBFF" />
        </linearGradient>
        <filter id="aluneri-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g transform={compact ? "translate(1 1)" : "translate(2 1)"}>
        <path
          d="M5 51C13 48 20 38 25 25L31.5 9.5C33 5.9 38 5.5 40.1 8.8L57 50.5"
          fill="none"
          stroke="url(#aluneri-ribbon)"
          strokeWidth="8.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#aluneri-glow)"
        />
        <path
          d="M9 49C22 43 31 35 47.5 26.7C52 24.5 56.5 25.7 59.2 29.1"
          fill="none"
          stroke="url(#aluneri-ribbon-soft)"
          strokeWidth="6.3"
          strokeLinecap="round"
        />
        <path
          d="M28.5 31.5C35 22.5 44.5 21 51.2 27.2"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity=".72"
        />
        <path d="M27.5 45.3l1.7 4.3 4.2 1.7-4.2 1.7-1.7 4.2-1.7-4.2-4.2-1.7 4.2-1.7 1.7-4.3Z" fill="#C4F5FF" filter="url(#aluneri-glow)"/>
      </g>

      {!compact && (
        <text
          x="78"
          y="41"
          fill="url(#aluneri-wordmark)"
          fontSize="27"
          fontWeight="780"
          letterSpacing="4.4"
        >
          ALUNERI
        </text>
      )}
    </svg>
  );
}
