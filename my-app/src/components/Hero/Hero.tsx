"use client";

import { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { getHeroSlides } from "@/services/api";
import { HeroSlide } from "@/types";

interface HeroProps {
  initialSlides?: HeroSlide[];
}

function Hero({ initialSlides = [] }: HeroProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(initialSlides.length > 0);

  useEffect(() => {
    if (slides.length > 0) return;

    getHeroSlides()
      .then((data) => {
        setSlides(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setLoaded(true);
      });
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className={styles.hero} aria-label="Hero banner">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`${styles.slide} ${i === current ? styles.active : ""}`}
          aria-hidden={i !== current}
        >
          <img
            src={s.image}
            alt={s.headline}
            className={styles.slideImg}
            sizes="100vw"
          />
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={styles.content} key={current}>
        {loaded && slide ? (
          <>
            <h1 className={styles.headline}>{slide.headline}</h1>

            <div className={styles.actions}>
              <a href="/products" className={styles.cta}>
                {slide.cta}
                <ArrowForwardRoundedIcon fontSize="small" />
              </a>
            </div>
          </>
        ) : (
          <div className={styles.skeleton} />
        )}
      </div>

      {/* pagination */}
      {slides.length > 1 && (
        <div className={styles.dots} aria-label="Slide navigation">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export default Hero;
