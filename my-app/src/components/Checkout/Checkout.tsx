"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { orderService } from "@/services/api";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import SafeImage from "@/components/SafeImage/SafeImage";
import { money, currency } from "@/utility/format";
import type { Product } from "@/types";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import styles from "@/styles/checkout.module.scss";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { t, tr } = useLanguage();
  const checkoutT = t.checkout;
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  // group cart items (Product[] with duplicates) into lines with qty
  const lines = useMemo(() => {
    const map = new Map<number, { product: Product; qty: number }>();
    for (const p of items) {
      const e = map.get(p.id);
      if (e) e.qty += 1;
      else map.set(p.id, { product: p, qty: 1 });
    }
    return [...map.values()];
  }, [items]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setErr(false);
    try {
      await orderService.createOrder({
        customerName: String(fd.get("customerName") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        address: String(fd.get("address") || ""),
        city: String(fd.get("city") || ""),
        notes: String(fd.get("notes") || ""),
        items: lines.map((l) => ({
          productId: l.product.id,
          name: l.product.name_en || l.product.name_ar,
          price: l.product.price,
          qty: l.qty,
        })),
        total,
        status: "new",
        createdAt: new Date().toISOString(),
      });
      clear();
      router.push("/order/");
    } catch {
      setErr(true);
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className={styles.page}>
        <Container>
          <div className={styles.empty}>
            <ShoppingCartRounded />
            <h2>{checkoutT.empty}</h2>
            <Button href="/#catalog">{checkoutT.browse}</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1>{checkoutT.title}</h1>
          <p>{checkoutT.subtitle}</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className={styles.grid}>
            {/* Customer details */}
            <div className={styles.formCard}>
              <div className={styles.sumHead}>{checkoutT.customer}</div>
              <div className={styles.field}>
                <label>{checkoutT.fullName}</label>
                <input required name="customerName" placeholder={checkoutT.fullName} />
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>{checkoutT.email}</label>
                  <input
                    required
                    type="email"
                    name="email"
                    dir="ltr"
                    placeholder="name@example.com"
                  />
                </div>
                <div className={styles.field}>
                  <label>{checkoutT.phone}</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    dir="ltr"
                    placeholder="+970 ..."
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>{checkoutT.address}</label>
                <input required name="address" placeholder={checkoutT.address} />
              </div>
              <div className={styles.field}>
                <label>{checkoutT.city}</label>
                <input required name="city" placeholder={checkoutT.city} />
              </div>
              <div className={styles.field}>
                <label>{checkoutT.notes}</label>
                <textarea name="notes" placeholder={checkoutT.notesHint} />
              </div>
            </div>

            {/* Order summary */}
            <div className={styles.summaryCard}>
              <div className={styles.sumHead}>{checkoutT.summary}</div>
              {lines.map((l) => (
                <div className={styles.line} key={l.product.id}>
                  <SafeImage
                    className={styles.lineImg}
                    src={l.product.image}
                    alt={tr(l.product, "name")}
                  />
                  <div className={styles.lineMain}>
                    <h4>{tr(l.product, "name")}</h4>
                    <span>
                      {money(l.product)} × {l.qty}
                    </span>
                  </div>
                  <div className={styles.linePrice}>
                    {currency(l.product.price * l.qty)}
                  </div>
                </div>
              ))}
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>{checkoutT.subtotal}</span>
                  <span>{currency(total)}</span>
                </div>
                <div className={styles.grand}>
                  <span>{checkoutT.total}</span>
                  <span>{currency(total)}</span>
                </div>
              </div>
              {err && (
                <p className={styles.err}>
                  <ErrorOutlineRounded sx={{ fontSize: 20 }} />
                  {checkoutT.error}
                </p>
              )}
              <Button type="submit" block disabled={busy}>
                {busy ? checkoutT.placing : checkoutT.placeOrder}
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}
