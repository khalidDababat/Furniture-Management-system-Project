"use client";

import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import type { Job } from "@/types";
import WorkOutlineRounded from "@mui/icons-material/WorkOutlineRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import ApartmentRounded from "@mui/icons-material/ApartmentRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import WorkOffRounded from "@mui/icons-material/WorkOffRounded";
import styles from "./Careers.module.scss";

export default function Careers({ jobs }: { jobs: Job[] }) {
  const { t, tr, dir } = useLanguage();
  const c = t.careers;

  return (
    <section className={styles.section} id="careers">
      <Container>
        <SectionHead title={c.title} sub={c.text} />

        {jobs.length > 0 ? (
          <div className={styles.grid}>
            {jobs.map((j, i) => (
              <Reveal key={j.id} className={styles.card} delay={(i % 3) * 60}>
                <div className={styles.top}>
                  <div className={styles.ico}>
                    <WorkOutlineRounded />
                  </div>
                  <h3>{tr(j, "title")}</h3>
                </div>
                <div className={styles.chips}>
                  <span className={styles.chip}>
                    <ScheduleRounded sx={{ fontSize: 15 }} />
                    {tr(j, "type")}
                  </span>
                  <span className={styles.chip}>
                    <PlaceRounded sx={{ fontSize: 15 }} />
                    {tr(j, "location")}
                  </span>
                  <span className={styles.chip}>
                    <ApartmentRounded sx={{ fontSize: 15 }} />
                    {tr(j, "department")}
                  </span>
                </div>
                <p className={styles.desc}>{tr(j, "desc")}</p>
                <Button
                  size="sm"
                  href={`/careers/${j.id}`}
                  className={styles.applyBtn}
                >
                  {c.viewApply}
                  <ArrowBackRounded
                    sx={{
                      fontSize: 18,
                      transform: dir === "ltr" ? "rotate(180deg)" : "none",
                    }}
                  />
                </Button>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className={styles.empty}>
            <WorkOffRounded sx={{ fontSize: 48 }} />
            <h3>{c.noVacancies}</h3>
            <p>{c.noVacanciesHint}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
