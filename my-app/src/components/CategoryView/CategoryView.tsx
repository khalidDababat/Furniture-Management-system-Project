"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import SafeImage from "@/components/SafeImage";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import Button from "@/components/Button";
import type { Category, Product } from "@/types";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import styles from "@/styles/detail.module.scss";

export default function CategoryView({ category, products }: { category: Category; products: Product[] }) {
  const { t, tr, dir } = useLanguage();
  const Chevron = dir === "rtl" ? ChevronLeftRounded : ChevronRightRounded;
  const name = tr(category, "name");

  return (
    <>
      <section className={styles.subhero}>
        <div className={styles.subheroBg}>
          <SafeImage src={category.image} alt="" loading="eager" />
        </div>
        <Container>
          <div className={styles.breadcrumb}>
            <Link href="/">{t.nav.home}</Link>
            <Chevron sx={{ fontSize: 16 }} />
            <Link href="/#categories">{t.nav.categories}</Link>
            <Chevron sx={{ fontSize: 16 }} />
            <span>{name}</span>
          </div>
          <h1>{name}</h1>
          <p>{tr(category, "desc")}</p>
        </Container>
      </section>

      <section className={styles.pad}>
        <Container>
          {products.length ? (
            <div className={styles.prodGrid}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} categoryName={name} />
              ))}
            </div>
          ) : (
            <p className={styles.noRes}>{t.product.noProducts}</p>
          )}
          <div className={styles.mtCta}>
            <Button variant="ghost" href="/#categories">
              {t.actions.back}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
