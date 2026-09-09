"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Reveal from "@/components/Reveal/Reveal";
import SafeImage from "@/components/SafeImage/SafeImage";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import type { Company, WhyItem } from "@/types";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import styles from "./AboutSection.module.scss";

export default function AboutSection({
  company,
  points,
  image,
}: {
  company: Company;
  points: WhyItem[];
  image: string;
}) {
  const { t, tr, dir, lang } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <section className={styles.section} id="about">
      <Container className={styles.split}>
        <Reveal className={styles.txt}>
          <span className={styles.kicker}>{t.sections.aboutTitle}</span>
          <h2>{tr(company, "name")}</h2>
          <p>{tr(company, "about")}</p>
          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p.id}>
                <CheckCircleRounded />
                {tr(p, "title")}
              </li>
            ))}
          </ul>
          <Button href="/#contact">
            {t.actions.learnMore}
            <ArrowBackRounded
              sx={{
                fontSize: 20,
                transform: dir === "ltr" ? "rotate(180deg)" : "none",
              }}
            />
          </Button>
        </Reveal>
        <Reveal className={styles.media}>
          <SafeImage src={image} alt={tr(company, "name")} />
          <div className={styles.badge}>
            <b>+{year - company.established}</b>
            <span>
              {lang === "ar" ? "سنة من الخبرة" : "Years of Experience"}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
