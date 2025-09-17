// src/components/Hero/LogoMarquee.tsx
"use client";
import Image from "next/image";
import { cx } from "@/styles/theme";

const logos = [
  { src: "/logos/gallery.png", alt: "Gallery" },
  { src: "/logos/coach.png", alt: "Coach" },
  { src: "/logos/startup.png", alt: "Startup" },
  { src: "/logos/edu.png", alt: "Education" },
];

export default function LogoMarquee() {
  return (
    <div className="mt-10 overflow-hidden">
      <div
        className={cx(
          "flex min-w-[200%] animate-[marquee_18s_linear_infinite]",
          "[--gap:48px] gap-[var(--gap)]"
        )}
      >
        {[...logos, ...logos].map((item, i) => (
          <div key={i} className="shrink-0 opacity-80 hover:opacity-100 transition">
            <Image src={item.src} alt={item.alt} width={120} height={40} />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
