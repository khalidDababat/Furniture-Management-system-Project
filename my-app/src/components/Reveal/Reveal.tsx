"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import cx from "@/utility/cx";
import styles from "./Reveal.module.scss";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  // Allow forwarding arbitrary props (href, onClick, etc.) to the rendered element.
  [key: string]: unknown;
};

/** Fades/slides children in when scrolled into view. */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref}
      className={cx(styles.reveal, inView && styles.in, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
