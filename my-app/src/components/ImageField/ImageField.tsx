"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Button from "@/components/Button";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import styles from "./ImageField.module.scss";

/**
 * Reusable image field: upload a file (stored as a base64 data URL) OR paste a URL.
 * Shows a live preview. JSON Server can't store binaries, so uploads become data URLs.
 */
export default function ImageField({
  value,
  onChange,
  maxMB = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  maxMB?: number;
}) {
  const { t } = useLanguage();
  const c = t.admin.common;
  const ref = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > maxMB * 1024 * 1024) {
      setErr(c.imageSize);
      e.target.value = "";
      return;
    }
    setErr("");
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(f);
    e.target.value = "";
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.preview}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.img} src={value} alt="" />
        ) : (
          <ImageRounded sx={{ fontSize: 34, color: "var(--surface-3)" }} />
        )}
      </div>
      <div className={styles.side}>
        <div className={styles.controls}>
          <Button size="sm" variant="ghost" onClick={() => ref.current?.click()}>
            <UploadFileRounded sx={{ fontSize: 18 }} />
            {c.upload}
          </Button>
          {value ? (
            <Button size="sm" variant="outline" onClick={() => onChange("")}>
              <DeleteRounded sx={{ fontSize: 18 }} />
              {c.remove}
            </Button>
          ) : null}
          <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />
        </div>
        <input
          className={styles.url}
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={c.orUrl}
          dir="ltr"
        />
        {err && <p className={styles.err}>{err}</p>}
      </div>
    </div>
  );
}
