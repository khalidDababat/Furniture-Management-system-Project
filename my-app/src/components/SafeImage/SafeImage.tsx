"use client";

import { useState } from "react";
import cx from "@/utility/cx";
import styles from "./SafeImage.module.scss";

/** <img> that degrades to a branded gradient block if the source fails to load. */
export default function SafeImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [err, setErr] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={err ? undefined : src}
      alt={alt}
      loading={loading}
      onError={() => setErr(true)}
      className={cx(className, err && styles.broken)}
    />
  );
}
