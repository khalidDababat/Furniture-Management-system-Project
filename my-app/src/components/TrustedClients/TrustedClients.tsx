"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import type { Client } from "@/types";
import SafeImage from "@/components/SafeImage/SafeImage";
import styles from "./TrustedClients.module.scss";

export default function TrustedClients({ clients }: { clients: Client[] }) {
  const { t, tr } = useLanguage();

  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...clients, ...clients];

  return (
    <section className={styles.section} id="clients">
      <Container>
        <div className={styles.head}>
          <h2>{t.sections.clientsTitle}</h2>
        </div>
      </Container>

      <Reveal className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {doubled.map((c, i) => (
            <div className={styles.chip} key={`${c.id}-${i}`}>
              <SafeImage src={c.image} alt={tr(c, "name") as string} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
