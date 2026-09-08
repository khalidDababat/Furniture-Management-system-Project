"use client";

import { useEffect, useRef, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { initials } from "@/utility/format";
import Button from "@/components/Button";
import PhotoCameraRounded from "@mui/icons-material/PhotoCameraRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import styles from "@/styles/admin.module.scss";

const MAX = 2 * 1024 * 1024;

export default function ProfileAdmin() {
  const { admin, update } = useAdminAuth();
  const { t } = useLanguage();
  const profileT = t.admin.profile;
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [avatar, setAvatar] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
      });
      setAvatar(admin.avatar || "");
    }
  }, [admin]);

  if (!admin) return null;

  const handleFieldChange =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setSaved(false);
    };
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX) {
      setErr(profileT.errorSize);
      return;
    }
    setErr("");
    const r = new FileReader();
    r.onload = () => {
      setAvatar(String(r.result));
      setSaved(false);
    };
    r.readAsDataURL(file);
  };
  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    try {
      await update({ ...form, avatar });
      setSaved(true);
    } catch {
      /* ignore */
    }
    setBusy(false);
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{profileT.title}</h1>
      </div>
      <div className={styles.profileWrap}>
        <form onSubmit={save}>
          <div className={styles.profileTop}>
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.avatarBig} src={avatar} alt="" />
            ) : (
              <span className={styles.avatarBigInit}>{initials(admin.name)}</span>
            )}
            <div>
              <div className={styles.avatarActions}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => fileRef.current?.click()}
                >
                  <PhotoCameraRounded sx={{ fontSize: 18 }} />
                  {profileT.change}
                </Button>
                {avatar ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setAvatar("");
                      setSaved(false);
                    }}
                  >
                    <DeleteRounded sx={{ fontSize: 18 }} />
                    {profileT.remove}
                  </Button>
                ) : null}
              </div>
              <span className={styles.roleTag}>
                {profileT.role}: {admin.role}
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={onFile}
              />
            </div>
          </div>

          {err && <p className={styles.authErr}>{err}</p>}

          <div className={styles.field}>
            <label>{profileT.name}</label>
            <input required value={form.name} onChange={handleFieldChange("name")} />
          </div>
          <div className={styles.field}>
            <label>{profileT.email}</label>
            <input
              required
              type="email"
              dir="ltr"
              value={form.email}
              onChange={handleFieldChange("email")}
            />
          </div>
          <div className={styles.field}>
            <label>{profileT.phone}</label>
            <input dir="ltr" value={form.phone} onChange={handleFieldChange("phone")} />
          </div>
          <small className={styles.muted}>{profileT.hint}</small>

          <div className={styles.formActions} style={{ marginTop: 16 }}>
            {saved && (
              <span
                className={styles.authOk}
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <CheckCircleRounded sx={{ fontSize: 18 }} />
                {profileT.saved}
              </span>
            )}
            <Button type="submit" disabled={busy}>
              {busy ? profileT.saving : profileT.save}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
