"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/Container";
import type { Stat } from "@/types";
import styles from "./Stats.module.scss";

export default function Stats({ stats }: { stats: Stat[] }) {
  const { tr } = useLanguage();
  return (
    <section className={styles.stats}>
      <Container className={styles.grid}>
        {stats.map((s) => (
          <div className={styles.stat} key={s.id}>
            <div className={styles.num}>{s.value}</div>
            <div className={styles.lbl}>{tr(s, "label")}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
