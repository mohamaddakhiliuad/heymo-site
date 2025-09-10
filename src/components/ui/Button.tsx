// src/components/ui/Button.tsx
// Theme-first button using formStyles.ts; supports <a> and <button> via "as"/"href".

import * as React from "react";
import { button as btn, cn } from "@/styles/formStyles";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "sm" | "lg" | "icon" | "base";

type CommonProps = {
  className?: string;
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
  disabled?: boolean;
};

type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: "a";
  href: string;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

export default function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "base", className, children, ...rest } = props as any;
  const classes = cn(
    (btn as any)[variant],
    size !== "base" ? (btn as any)[size] : null,
    className
  );

  if ((props as AnchorProps).as === "a" || "href" in (props as any)) {
    const { as: _as, ...aProps } = props as AnchorProps;
    return <a {...aProps} className={classes}>{children}</a>;
  }

  const { as: _as, ...bProps } = props as ButtonProps;
  return <button {...bProps} className={classes}>{children}</button>;
}
