"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { currency } from "@/utility/format";
import type { Order } from "@/types";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import c from "@/styles/checkout.module.scss";

export default function OrderConfirmation({ order }: { order: Order }) {
  const { t } = useLanguage();
  const ck = t.checkout;
  const statusLabel = t.admin.orders.status[order.status] ?? order.status;

  return (
    <section className={c.page}>
      <Container>
        <div className={c.success}>
          <div className={c.successIco}>
            <CheckCircleRounded />
          </div>
          <h1>{ck.successTitle}</h1>
          <p>{ck.successMsg}</p>

          <div className={c.orderMeta}>
            <div className={c.metaItem}>
              <span>{ck.orderNumber}</span>
              <b>#{order.id}</b>
            </div>
            <div className={c.metaItem}>
              <span>{ck.total}</span>
              <b>{currency(order.total)}</b>
            </div>
            <div className={c.metaItem}>
              <span>{ck.statusLabel}</span>
              <b>{statusLabel}</b>
            </div>
          </div>

          <div className={c.confItems}>
            <div className={c.sumHead} style={{ marginTop: 8 }}>
              {ck.itemsTitle}
            </div>
            {order.items.map((it, i) => (
              <div className={c.line} key={i}>
                <div className={c.lineMain}>
                  <h4>{it.name}</h4>
                  <span>
                    {currency(it.price)} × {it.qty}
                  </span>
                </div>
                <div className={c.linePrice}>{currency(it.price * it.qty)}</div>
              </div>
            ))}
          </div>

          <Button href="/#catalog">{ck.continue}</Button>
        </div>
      </Container>
    </section>
  );
}
