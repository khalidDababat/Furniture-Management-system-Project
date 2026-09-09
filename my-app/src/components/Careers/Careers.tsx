"use client";

import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import type { Job } from "@/types";
import styles from "./Careers.module.scss";

export default function Careers() {
  const { t, tr, dir } = useLanguage();
  const c = t.careers;

  return (
    <section className={styles.section} id="careers">
      <Container>
        <SectionHead title={c.title} sub={c.text} />

        <Reveal className={styles.infoBar}>
          <p className={styles.infoText} dir={dir}>
            {c.textInfo}
            <strong>info@shakhshirfurniture.com</strong>
          </p>
          <p className={styles.infoText} dir={dir}>
            {c.textreply}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
