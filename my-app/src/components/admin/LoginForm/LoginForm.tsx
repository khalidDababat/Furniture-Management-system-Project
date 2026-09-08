"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import s from "@/styles/admin.module.scss";

export default function LoginForm() {
  const { login } = useAdminAuth();
  const { t } = useLanguage();
  const a = t.admin.login;
  const router = useRouter();
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setErr(false);
    const ok = await login(String(fd.get("email") || ""), String(fd.get("password") || "")).catch(() => false);
    setBusy(false);
    if (ok) router.replace("/admin");
    else setErr(true);
  };

  return (
    <div className={s.authWrap}>
      <div className={s.authCard}>
        <div className={s.authHead}>
          <Logo size={48} />
          <h1>{a.title}</h1>
          <p>{a.subtitle}</p>
        </div>
        <form onSubmit={onSubmit}>
          {err && <p className={s.authErr}>{a.error}</p>}
          <div className={s.field}>
            <label>{a.email}</label>
            <input required type="email" name="email" dir="ltr" placeholder="admin@shakhshir-factory.ps" />
          </div>
          <div className={s.field}>
            <label>{a.password}</label>
            <input required type="password" name="password" dir="ltr" placeholder="••••••••" />
          </div>
          <Button type="submit" block disabled={busy}>
            {busy ? a.submitting : a.submit}
          </Button>
        </form>
        <div className={s.authAlt}>
          <Link href="/admin/forgot">{a.forgot}</Link>
        </div>
        <div className={s.demo}>
          <b>{a.demo}:</b> admin@shakhshir-factory.ps / admin123
        </div>
      </div>
    </div>
  );
}
