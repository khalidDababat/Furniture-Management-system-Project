"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import SafeImage from "@/components/SafeImage/SafeImage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import type { Category } from "@/types";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import styles from "./Categories.module.scss";

export default function Categories({ categories }: { categories: Category[] }) {
  const { t, tr, dir } = useLanguage();
  const Chevron = dir === "rtl" ? ChevronLeftRounded : ChevronRightRounded;

  return (
    <section className={styles.section} id="categories">
      <Container>
        <SectionHead
          title={t.sections.categoriesTitle}
          sub={t.sections.categoriesSub}
        />
        <div className={styles.grid}>
          {categories.map((c, i) => (
            <Reveal
              as={Link}
              key={c.id}
              href={`/categories/${c.id}`}
              className={styles.card}
              delay={(i % 6) * 50}
            >
              <SafeImage src={c.image} alt={tr(c, "name")} />
              <div className={styles.go}>
                <Chevron sx={{ fontSize: 18 }} />
              </div>
              <div className={styles.body}>
                <h3>{tr(c, "name")}</h3>
                {/* <p>{tr(c, "desc")}</p> */}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
