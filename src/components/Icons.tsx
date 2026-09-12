import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function ArrowUpRight({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

export function ArrowRight({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
}

export function ArrowLeft({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></svg>;
}

export function Mail({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
}

export function Code({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></svg>;
}

export function Layers({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg>;
}

export function Monitor({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>;
}

export function Spark({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" /><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" /></svg>;
}

export function Check({ size = 18, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function Github({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.2 15 1.9a13.4 13.4 0 0 0-6 0C5.8.2 4.7.5 4.7.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" />
      <path d="M9 19c-3 .9-3-1.5-4.2-2" />
    </svg>
  );
}

export function Menu({ size = 22, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>;
}

export function Close({ size = 22, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></svg>;
}

export function WhatsApp({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M20 11.1A8.1 8.1 0 0 1 8.4 18.5L4 20l1.6-4.2A8.1 8.1 0 1 1 20 11.1Z" />
      <path d="M9.1 8.4c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.5c.1.2 1.8 3 4.5 4 .6.3 1 .4 1.4.5.6.2 1.2.1 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1 .2-1.1 0-.1-.2-.2-.4-.3s-1.5-.7-1.7-.8c-.2-.1-.4-.1-.5.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.8-1.1-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.5-1.3-.7-1.8Z" />
    </svg>
  );
}
