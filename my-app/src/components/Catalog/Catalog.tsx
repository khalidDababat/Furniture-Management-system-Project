"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHead from "@/components/SectionHead/SectionHead";
import Reveal from "@/components/Reveal/Reveal";
import Container from "@/components/Container/Container";
import ProductCard from "@/components/ProductCard/ProductCard";
import cx from "@/utility/cx";
import type { Category, Product } from "@/types";
import styles from "./Catalog.module.scss";

export default function Catalog({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const { t, tr, lang } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const catName = (id: number) => {
    const c = categories.find((x) => x.id === id);
    return c ? tr(c, "name") : "";
  };

  const filtered = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => String(p.categoryId) === filter),
    [filter, products],
  );

  return (
    <section className={styles.section} id="catalog">
      <Container>
        <SectionHead
          kicker={t.nav.products}
          title={t.sections.featuredTitle}
          sub={t.sections.featuredSub}
        />

        <Reveal className={styles.chips}>
          <button
            className={cx(styles.chip, filter === "all" && styles.active)}
            onClick={() => setFilter("all")}
          >
            {lang === "ar" ? "الكل" : "All"}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={cx(
                styles.chip,
                filter === String(c.id) && styles.active,
              )}
              onClick={() => setFilter(String(c.id))}
            >
              {tr(c, "name")}
            </button>
          ))}
        </Reveal>

        {filtered.length ? (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                categoryName={catName(p.categoryId)}
              />
            ))}
          </div>
        ) : (
          <p className={styles.noRes}>{t.product.noProducts}</p>
        )}
      </Container>
    </section>
  );
}
