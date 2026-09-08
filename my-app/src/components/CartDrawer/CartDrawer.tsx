"use client";

import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import SafeImage from "@/components/SafeImage";
import Button from "@/components/Button";
import cx from "@/utility/cx";
import { money, currency } from "@/utility/format";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import styles from "./CartDrawer.module.scss";

export default function CartDrawer() {
  const { items, total, open, setOpen, remove } = useCart();
  const { t, tr } = useLanguage();

  return (
    <>
      <div
        className={cx(styles.overlay, open && styles.open)}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cx(styles.drawer, open && styles.open)}
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <h3>
            {t.cart.title} ({items.length})
          </h3>
          <button
            className={styles.iconBtn}
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseRounded />
          </button>
        </div>

        <div className={styles.body}>
          {items.length ? (
            items.map((p, idx) => (
              <div className={styles.item} key={`${p.id}-${idx}`}>
                <SafeImage src={p.image} alt={tr(p, "name")} />
                <div className={styles.itemBody}>
                  <h4>{tr(p, "name")}</h4>
                  <div className={styles.price}>{money(p)}</div>
                  <button className={styles.remove} onClick={() => remove(idx)}>
                    <DeleteRounded sx={{ fontSize: 16 }} />
                    {t.cart.remove}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
              <ShoppingCartRounded
                sx={{
                  fontSize: 50,
                  color: "var(--surface-3)",
                  display: "block",
                  margin: "0 auto 12px",
                }}
              />
              {t.cart.empty}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.foot}>
            <div className={styles.total}>
              <span>{t.cart.total}</span>
              <span>{currency(total)}</span>
            </div>
            <Button block href="/checkout" onClick={() => setOpen(false)}>
              {t.cart.checkout}
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
