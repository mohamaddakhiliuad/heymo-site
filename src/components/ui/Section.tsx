// src/components/ui/Section.tsx
import * as React from "react";
import { cn, layout } from "@/styles/formStyles";

export default function Section({
  title,
  subtitle,
  muted = false,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  muted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        muted ? "bg-[rgb(var(--color-surface-muted))]" : "bg-[rgb(var(--color-surface))]",
        "text-[rgb(var(--color-text))]"
      )}
    >
      <div className={cn(layout.container, layout.section)}>
        {(title || subtitle) && (
          <header className="mb-8 md:mb-10">
            {typeof title === "string" ? (
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            ) : (
              title
            )}
            {subtitle && (
              <p className="mt-2 text-[rgb(var(--color-text-muted))]">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
