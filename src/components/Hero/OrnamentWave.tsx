// src/components/Hero/OrnamentWave.tsx
"use client";

export default function OrnamentWave() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute -right-24 bottom-[-80px] w-[560px] max-w-none opacity-30 animate-float-slow"
        viewBox="0 0 600 300"
        fill="none"
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(180,205,215,0.45)" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 C120,120 240,280 360,200 C440,146 520,170 600,120 L600,300 L0,300 Z"
          fill="url(#g)"
        />
      </svg>

      <svg
        className="absolute -left-24 top-[-60px] w-[520px] max-w-none opacity-25 animate-float-slower"
        viewBox="0 0 600 300"
        fill="none"
      >
        <path
          d="M0,120 C100,180 260,60 360,120 C440,166 520,130 600,200 L600,0 L0,0 Z"
          fill="rgba(255,255,255,0.45)"
        />
      </svg>
    </div>
  );
}
