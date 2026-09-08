"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import SafeImage from "@/components/SafeImage/SafeImage";
import ProductCard from "@/components/ProductCard/ProductCard";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { money } from "@/utility/format";
import type { Category, Product } from "@/types";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import ChatRounded from "@mui/icons-material/ChatRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import HandymanRounded from "@mui/icons-material/HandymanRounded";
import styles from "@/styles/detail.module.scss";

export default function ProductDetailView({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category;
  related: Product[];
}) {
  const { t, tr, dir, lang } = useLanguage();
  const { add, setOpen } = useCart();
  const Chevron = dir === "rtl" ? ChevronLeftRounded : ChevronRightRounded;
  const catName = tr(category, "name");

  const addToCart = () => {
    add(product);
    setOpen(true);
  };

  return (
    <>
      <section className={styles.subhero}>
        <Container>
          <div className={styles.breadcrumb}>
            <Link href="/">{t.nav.home}</Link>
            <Chevron sx={{ fontSize: 16 }} />
            <Link href="/categories/">{catName}</Link>
            <Chevron sx={{ fontSize: 16 }} />
            <span>{tr(product, "name")}</span>
          </div>
        </Container>
      </section>

      <section className={styles.pad} style={{ paddingTop: 36 }}>
        <Container>
          <div className={styles.pdSplit}>
            <div className={styles.pdMedia}>
              <SafeImage
                src={product.image}
                alt={tr(product, "name")}
                loading="eager"
              />
            </div>
            <div className={styles.pdInfo}>
              <div className={styles.prodCat}>{catName}</div>
              <h1>{tr(product, "name")}</h1>
              <div className={styles.pdPrice}>{money(product)}</div>
              <p className={styles.pdDesc}>
                {tr(product, "longdesc") || tr(product, "desc")}
              </p>
              <div className={styles.pdMeta}>
                <div className={styles.row}>
                  <VerifiedRounded />
                  {lang === "ar"
                    ? "جودة تصنيع مضمونة 100%"
                    : "100% guaranteed build quality"}
                </div>
                <div className={styles.row}>
                  <LocalShippingRounded />
                  {lang === "ar"
                    ? "توصيل وتركيب احترافي"
                    : "Professional delivery & installation"}
                </div>
                <div className={styles.row}>
                  <HandymanRounded />
                  {lang === "ar"
                    ? "إمكانية التخصيص حسب الطلب"
                    : "Custom-made options available"}
                </div>
              </div>
              <div className={styles.pdActions}>
                <Button onClick={addToCart}>
                  <ShoppingCartRounded sx={{ fontSize: 19 }} />
                  {t.actions.addToCart}
                </Button>
                <Button variant="outline" href="/#contact">
                  <ChatRounded sx={{ fontSize: 19 }} />
                  {t.actions.requestQuote}
                </Button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className={styles.relatedWrap}>
              <h2 className={styles.relatedHead}>{t.product.relatedTitle}</h2>
              <div className={styles.prodGrid}>
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} categoryName={catName} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
