import styles from "./Testimonials.module.scss";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/services/api";
import { Stars } from "./Stars";

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
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
