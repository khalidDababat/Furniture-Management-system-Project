"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import SafeImage from "@/components/SafeImage/SafeImage";
import Container from "@/components/Container/Container";
import type { Project } from "@/types";
import CloseRounded from "@mui/icons-material/CloseRounded";
import styles from "./CompletedProjects.module.scss";

export default function CompletedProjects({
  projects,
}: {
  projects: Project[];
}) {
  const { t, tr } = useLanguage();
  const [sel, setSel] = useState<Project | null>(null);

  return (
    <section className={styles.section} id="projects">
      <Container>
        <SectionHead
          title={t.sections.projectsTitle}
          sub={t.sections.projectsSub}
        />
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <Reveal
              as="button"
              key={p.id}
              className={styles.card}
              delay={(i % 3) * 60}
              onClick={() => setSel(p)}
            >
              <SafeImage src={p.image} alt={tr(p, "title")} />
              <div className={styles.body}>
                <span className={styles.tag}>{tr(p, "sector")}</span>
                <h3>{tr(p, "title")}</h3>
                <p>{tr(p, "desc")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {sel && (
        <div className={styles.lightbox} onClick={() => setSel(null)}>
          <button
            className={styles.lbClose}
            onClick={() => setSel(null)}
            aria-label="close"
          >
            <CloseRounded />
          </button>
          <div className={styles.lbInner} onClick={(e) => e.stopPropagation()}>
            <SafeImage
              src={sel.image}
              alt={tr(sel, "title")}
              className={styles.lbImg}
            />
            <div className={styles.lbCap}>
              <h3>{tr(sel, "title")}</h3>
              <p>{tr(sel, "desc")}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
