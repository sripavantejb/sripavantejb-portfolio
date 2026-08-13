import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-lime text-ink border-4 border-ink shadow-[4px_4px_0_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#0a0a0a]",
  secondary:
    "bg-white text-ink border-4 border-ink shadow-[4px_4px_0_0_#0a0a0a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#0a0a0a]",
  dark: "bg-ink text-lime border-4 border-lime shadow-[4px_4px_0_0_#c8f542] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#c8f542]",
};

export function BrutalistLink({
  href,
  variant = "primary",
  children,
  external,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 font-archivo text-sm font-black uppercase tracking-wide transition-transform md:px-8 md:py-4 md:text-base ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
