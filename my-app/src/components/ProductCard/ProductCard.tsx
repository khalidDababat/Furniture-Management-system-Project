"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import SafeImage from "@/components/SafeImage/SafeImage";
import Button from "@/components/Button/Button";
import { money } from "@/utility/format";
import type { Product } from "@/types";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import styles from "./ProductCard.module.scss";

export default function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const { t, tr } = useLanguage();
  const { add, setOpen } = useCart();
  const badge = tr(product, "badge");
  const href = `/products/${product.id}`;

  const addToCart = () => {
    add(product);
    setOpen(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <Link href={href}>
          <SafeImage src={product.image} alt={tr(product, "name")} />
        </Link>
        {badge ? <span className={styles.badge}>{badge}</span> : null}
        <Link className={styles.fav} href={href} aria-label="view details">
          <VisibilityRounded sx={{ fontSize: 18, color: "#F5F3EE" }} />
        </Link>
      </div>
      <div className={styles.body}>
        {categoryName ? <div className={styles.cat}>{categoryName}</div> : null}
        <h3>
          <Link href={href}>{tr(product, "name")}</Link>
        </h3>
        <p className={styles.desc}>{tr(product, "desc")}</p>
        <div className={styles.foot}>
          <div className={styles.price}>
            {money(product)}
            <small>{t.product.startingFrom}</small>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={addToCart}>
            <ShoppingCartRounded sx={{ fontSize: 18 }} />
            {t.actions.addToCart}
          </Button>
          <Button variant="ghost" size="sm" href={href}>
            {t.actions.viewDetails}
          </Button>
        </div>
      </div>
    </div>
  );
}
