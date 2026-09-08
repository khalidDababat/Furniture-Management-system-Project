"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { orderService } from "@/services/api";
import type { Order, OrderStatus } from "@/types";
import Modal from "@/components/Modal/Modal";
import cx from "@/utility/cx";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import InboxRounded from "@mui/icons-material/InboxRounded";
import styles from "@/styles/admin.module.scss";

const STATUSES: OrderStatus[] = ["new", "processing", "completed", "canceled"];

export default function OrdersAdmin() {
  const { t, lang } = useLanguage();
  const adminT = t.admin;
  const ordersT = adminT.orders;
  const [rows, setRows] = useState<Order[] | null>(null);
  const [view, setView] = useState<Order | null>(null);

  const load = async () => {
    try {
      setRows(await orderService.getOrders());
    } catch {
      setRows([]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id: number, status: OrderStatus) => {
    setRows((rs) =>
      rs ? rs.map((r) => (r.id === id ? { ...r, status } : r)) : rs,
    );
    await orderService.updateOrderStatus(id, status).catch(() => {});
  };
  const remove = async (id: number) => {
    if (!confirm(adminT.common.confirmDelete)) return;
    await orderService.deleteOrder(id).catch(() => {});
    await load();
  };
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB");

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{ordersT.title}</h1>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <InboxRounded />
          <p>{ordersT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{ordersT.colId}</th>
                <th>{ordersT.colCustomer}</th>
                <th>{ordersT.colTotal}</th>
                <th>{ordersT.colStatus}</th>
                <th>{ordersT.colDate}</th>
                <th>{adminT.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>#{r.id}</td>
                  <td>{r.customerName}</td>
                  <td></td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={r.status}
                      onChange={(e) =>
                        changeStatus(r.id, e.target.value as OrderStatus)
                      }
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {ordersT.status[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{fmt(r.createdAt)}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.iconBtn}
                        onClick={() => setView(r)}
                        aria-label="view"
                      >
                        <VisibilityRounded />
                      </button>
                      <button
                        className={cx(styles.iconBtn, styles.danger)}
                        onClick={() => remove(r.id)}
                        aria-label="delete"
                      >
                        <DeleteRounded />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={view ? `#${view.id} · ${view.customerName}` : ""}
      >
        {view && (
          <div>
            <p className={styles.muted}>
              <span dir="ltr">{view.phone}</span> · {view.email}
            </p>
            {(view.address || view.city) && (
              <p className={styles.muted} style={{ marginTop: 4 }}>
                {[view.address, view.city].filter(Boolean).join(", ")}
              </p>
            )}
            {view.notes && (
              <p className={styles.muted} style={{ marginTop: 4 }}>
                “{view.notes}”
              </p>
            )}
            <div
              className={styles.panelHead}
              style={{ padding: "14px 0 4px", border: 0 }}
            >
              {ordersT.itemsTitle}
            </div>
            <div className={styles.list}>
              {view.items.map((it, i) => (
                <div className={styles.listItem} key={i}>
                  <b>
                    {it.name} × {it.qty}
                  </b>
                  <span>${(it.price * it.qty).toLocaleString("en-US")}</span>
                </div>
              ))}
              <div className={styles.listItem} style={{ fontWeight: 800 }}>
                <b>{ordersT.colTotal}</b>
                <span style={{ color: "var(--accent-2)" }}>
                  ${view.total.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
