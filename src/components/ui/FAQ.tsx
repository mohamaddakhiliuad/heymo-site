// src/components/ui/FAQ.tsx
import * as React from "react";
import { cn, card } from "@/styles/formStyles";
import { ChevronDown } from "lucide-react";

export type FAQItem = { q: string; a: string };

export default function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <details
          key={idx}
          className={cn(card.base, card.padded, "group")}
        >
          <summary className="flex cursor-pointer items-center justify-between font-medium text-[rgb(var(--color-text))] list-none">
            <span>{it.q}</span>
            <ChevronDown
              className="h-5 w-5 text-[rgb(var(--color-text-muted))] transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="mt-3 text-[rgb(var(--color-text-muted))] leading-relaxed">
            {it.a}
          </div>
        </details>
      ))}
    </div>
  );
}
