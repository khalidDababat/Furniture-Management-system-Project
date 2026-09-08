"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import type { Company } from "@/types";
import SendRounded from "@mui/icons-material/SendRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import MailRounded from "@mui/icons-material/MailRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import styles from "./ContactSection.module.scss";

export default function ContactSection({ company }: { company: Company }) {
  const { t, tr } = useLanguage();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className={styles.section} id="contact">
      <Container>
        <SectionHead
          title={t.sections.contactTitle}
          sub={t.sections.contactSub}
        />
        <div className={styles.split}>
          <Reveal className={styles.card}>
            <form onSubmit={onSubmit}>
              <div className={styles.field}>
                <label>{t.contact.name}</label>
                <input required name="name" placeholder={t.contact.name} />
              </div>
              <div className={styles.field}>
                <label>{t.contact.email}</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className={styles.field}>
                <label>{t.contact.phone}</label>
                <input name="phone" placeholder="+970 ..." />
              </div>
              <div className={styles.field}>
                <label>{t.contact.message}</label>
                <textarea required name="message" placeholder="..." />
              </div>
              <Button type="submit" block>
                <SendRounded sx={{ fontSize: 19 }} />
                {t.contact.send}
              </Button>
              {sent && (
                <p className={styles.success}>
                  <CheckCircleRounded sx={{ fontSize: 20 }} />
                  {t.contact.success}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iico}>
                  <CallRounded />
                </div>
                <div>
                  <h4>{t.contact.phones}</h4>
                  {company.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} dir="ltr">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iico}>
                  <MailRounded />
                </div>
                <div>
                  <h4>{t.contact.emailLabel}</h4>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iico}>
                  <LocationOnRounded />
                </div>
                <div>
                  <h4>{t.contact.branches}</h4>
                  {company.branches.map((b) => (
                    <p key={b.id}>
                      {tr(b, "city")} — {tr(b, "address")}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.map}>
              <iframe
                src={company.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
