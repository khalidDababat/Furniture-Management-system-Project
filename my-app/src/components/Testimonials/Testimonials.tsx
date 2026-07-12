import Image from "next/image";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/services/api";

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
}

function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default async function Testimonials({
  initialTestimonials,
}: TestimonialsProps) {
  let items = initialTestimonials;
  if (!items) {
    try {
      const data = await getTestimonials();
      items = data ?? [];
    } catch {
      items = [];
    }
  }

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.header}>
        <span className="gold-bar" />
        <h2 id="testimonials-title" className="section-title">
          عملاؤنا
        </h2>
        <p className="section-subtitle">
          قصص حقيقية من عملاء راضين في جميع أنحاء المنطقة
        </p>
      </div>

      <div className={styles.grid}>
        {items.map((t) => (
          <article key={t.id} className={styles.card}>
            <Stars count={t.rating} />
            <blockquote className={styles.quote}>
              &ldquo;{t.review}&rdquo;
            </blockquote>
            <footer className={styles.author}>
              <div>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
