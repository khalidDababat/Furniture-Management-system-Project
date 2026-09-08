"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import s from "@/styles/admin.module.scss";

export default function ForgotForm() {
  const { t } = useLanguage();
  const a = t.admin.forgot;
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulated for this phase — always show a neutral success (don't reveal whether
    // an email exists). Real reset email wiring comes with the backend phase.
    setDone(true);
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
          {done && <p className={s.authOk}>{a.success}</p>}
          <div className={s.field}>
            <label>{a.email}</label>
            <input required type="email" name="email" dir="ltr" placeholder="name@example.com" />
          </div>
          <Button type="submit" block>
            {a.submit}
          </Button>
        </form>
        <div className={s.authAlt}>
          <Link href="/admin/login">{a.back}</Link>
        </div>
      </div>
    </div>
  );
}
