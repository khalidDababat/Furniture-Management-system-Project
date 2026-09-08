"use client";

import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import Icon from "@/components/Icon/Icon";
import type { WhyItem } from "@/types";
import styles from "./WhyChooseUs.module.scss";

export default function WhyChooseUs({
  items,
}: {
  items: WhyItem[];
  established: number;
}) {
  const { t, tr } = useLanguage();
  return (
    <section className={styles.section} id="why">
      <Container>
        <SectionHead title={t.sections.whyTitle} sub={t.sections.whySub} />
        <div className={styles.grid}>
          {items.map((w, i) => (
            <Reveal key={w.id} className={styles.card} delay={(i % 3) * 60}>
              <div className={styles.ico}>
                <Icon name={w.icon} />
              </div>
              <h3>{tr(w, "title")}</h3>
              <p>{tr(w, "desc")}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
