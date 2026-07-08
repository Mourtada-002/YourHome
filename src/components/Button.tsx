import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

/**
 * Fill-on-hover CTA button. The sweep is a pure CSS transform (scaleX on a
 * pseudo layer via group-hover) — no JS needed for this micro-interaction.
 */
export default function Button({
  href,
  children,
  variant = "outline",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-7 py-3 text-xs font-medium uppercase tracking-wide2 transition-all duration-500 ${
        variant === "solid"
          ? "border-gold bg-gold text-ink hover:scale-105 hover:bg-ivory"
          : "border-gold/40 text-ivory"
      } ${className}`}
    >
      {variant === "outline" && (
        <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-premium group-hover:scale-x-100" />
      )}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
        {children}
      </span>
    </Link>
  );
}
