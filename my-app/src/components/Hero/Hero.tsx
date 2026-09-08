"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import SafeImage from "@/components/SafeImage/SafeImage";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import cx from "@/utility/cx";
import type { HeroSlide } from "@/types";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import styles from "./Hero.module.scss";

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const { t, tr, dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    if (slideCount <= 1) return;
    const timeoutId = setTimeout(
      () => setCurrentIndex((i) => (i + 1) % slideCount),
      60000,
    );
    return () => clearTimeout(timeoutId);
  }, [currentIndex, slideCount]);

  const goToSlide = (index: number) =>
    setCurrentIndex((index + slideCount) % slideCount);
  const currentSlide = slides[currentIndex];

  return (
    <section className={styles.hero} id="top">
      {slides.map((sl, i) => (
        <div
          className={cx(styles.slide, i === currentIndex && styles.active)}
          key={sl.id}
        >
          <SafeImage
            src={sl.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <button
        className={cx(styles.arrow, styles.prev)}
        onClick={() => goToSlide(currentIndex - 1)}
        aria-label="previous"
      >
        <ChevronLeftRounded />
      </button>
      <button
        className={cx(styles.arrow, styles.next)}
        onClick={() => goToSlide(currentIndex + 1)}
        aria-label="next"
      >
        <ChevronRightRounded />
      </button>

      <Container className={styles.inner}>
        <div className={styles.content} key={currentIndex}>
          <p>{tr(currentSlide, "subtitle")}</p>
          <div className={styles.cta}>
            <Button href="/#catalog">
              {t.actions.explore}
              <ArrowBackRounded
                sx={{
                  fontSize: 20,
                  transform: dir === "ltr" ? "rotate(180deg)" : "none",
                }}
              />
            </Button>
            <Button href="/#contact">{t.actions.customDesign}</Button>
          </div>
        </div>
      </Container>

      <div className={styles.dots}>
        {slides.map((sl, i) => (
          <button
            key={sl.id}
            className={cx(i === currentIndex && styles.active)}
            onClick={() => goToSlide(i)}
            aria-label={tr(sl, "headline")}
          />
        ))}
      </div>
    </section>
  );
}
