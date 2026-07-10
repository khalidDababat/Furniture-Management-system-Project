import styles from "./page.module.css";

function Home() {
  return (
    <div>
      {/* Hero — dark background to show transparent navbar */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>مجموعة حصرية · ٢٠٢٥</p>
          <h1 className={styles.heroTitle}>
            أثاث فاخر يعكس
            <br />
            <span>ذوقك الرفيع</span>
          </h1>
          <p className={styles.heroSub}>
            تصاميم استثنائية تجمع بين الجماليات الكلاسيكية والعصرية
          </p>
          <div className={styles.heroActions}>
            <a href="/products" className={styles.heroCta}>
              تسوّق الآن
            </a>
            <a href="/latest" className={styles.heroSecondary}>
              أحدث المنتجات
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
