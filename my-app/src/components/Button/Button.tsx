"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import cx from "@/utility/cx";
import styles from "./Button.module.scss";

type Variant = "primary" | "ghost" | "outline" | "wa";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: "sm";
  block?: boolean;
  href?: string;
  external?: boolean;
  download?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

/** One button, everywhere — renders a <button>, an internal <Link>, or an external <a>. */
export default function Button({
  children,
  variant = "primary",
  size,
  block,
  href,
  external,
  download,
  onClick,
  type = "button",
  disabled,
  className,
  ariaLabel,
}: ButtonProps) {
  const cls = cx(
    styles.btn,
    styles[variant],
    size && styles.sm,
    block && styles.block,
    className,
  );

  if (href) {
    if (download) {
      return (
        <a
          className={cls}
          href={href}
          download={download}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          className={cls}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        className={cls}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
