"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Reveal from "@/components/Reveal";
import Container from "@/components/Container";
import type { Client } from "@/types";
import SafeImage from "@/components/SafeImage";
import styles from "./TrustedClients.module.scss";

export default function TrustedClients({ clients }: { clients: Client[] }) {
  const { t, tr } = useLanguage();
  return (
    <section className={styles.section} id="clients">
      <Container>
        <div className={styles.head}>
          <h2>{t.sections.clientsTitle}</h2>
        </div>
        <Reveal className={styles.row}>
          {clients.map((c) => (
            <div className={styles.chip} key={c.id}>
              <SafeImage src={c.image} alt={tr(c, "name") as string} />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
