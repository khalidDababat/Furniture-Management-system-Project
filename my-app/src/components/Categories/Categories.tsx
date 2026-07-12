import styles from "./Categories.module.scss";
import { Category } from "@/types";
import { getCategories } from "@/services/api";
import Link from "next/link";

interface CategoriesProps {
  initialCategories?: Category[];
}

async function Categories({ initialCategories }: CategoriesProps) {
  let categories = initialCategories;
  if (!categories) {
    try {
      const data = await getCategories();
      categories = data;
    } catch {
      categories = [];
    }
  }

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <div className={styles.header}>
        <span className="gold-bar" />
        <h2 id="categories-title" className={`section-title ${styles.title}`}>
          فئات المنتجات
        </h2>
        <p className="section-subtitle">
          استكشف مجموعتنا الواسعة من أثاث غرف النوم
        </p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={``}
            className={styles.card}
            aria-label={`Browse ${cat.name}`}
          >
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.name} className={styles.image} />
              <div className={styles.overlay} />
            </div>
            <div className={styles.label}>
              <span>{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default Categories;
