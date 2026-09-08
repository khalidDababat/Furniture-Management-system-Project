"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { productService, categotyService } from "@/services/api";
import type { Product, Category } from "@/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import SafeImage from "@/components/SafeImage/SafeImage";
import ImageField from "@/components/ImageField/ImageField";
import cx from "@/utility/cx";
import { money } from "@/utility/format";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import Inventory2Rounded from "@mui/icons-material/Inventory2Rounded";
import styles from "@/styles/admin.module.scss";

type ProductForm = Omit<Product, "id">;
const blank = (categoryId: number): ProductForm => ({
  categoryId,
  name_ar: "",
  name_en: "",
  desc_ar: "",
  desc_en: "",
  longdesc_ar: "",
  longdesc_en: "",
  price: 0,
  currency: "$",
  image: "",
  featured: false,
  badge_ar: "",
  badge_en: "",
});

export default function ProductsAdmin() {
  const { t, tr } = useLanguage();
  const adminT = t.admin;
  const productsT = adminT.products;
  const [rows, setRows] = useState<Product[] | null>(null);
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>(blank(1));
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const [ps, cs] = await Promise.all([
        productService.getAll(),
        categotyService.getCategories(),
      ]);
      setRows(ps);
      setCats(cs);
    } catch {
      setRows([]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const catName = (id: number) => {
    const category = cats.find((x) => x.id === id);
    return category ? tr(category, "name") : "";
  };
  const openNew = () => {
    setForm(blank(cats[0]?.id ?? 1));
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (product: Product) => {
    const { id: _id, ...rest } = product;
    void _id;
    setForm({
      longdesc_ar: "",
      longdesc_en: "",
      badge_ar: "",
      badge_en: "",
      ...rest,
    });
    setEditing(product);
    setOpen(true);
  };
  const handleFieldChange =
    (k: keyof ProductForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }) as ProductForm);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const payload: ProductForm = {
      ...form,
      price: Number(form.price) || 0,
      categoryId: Number(form.categoryId),
    };
    try {
      if (editing) await productService.updateProduct(editing.id, payload);
      else await productService.createProduct(payload);
      setOpen(false);
      await load();
    } catch {
      /* ignore */
    }
    setBusy(false);
  };
  const remove = async (id: number) => {
    if (!confirm(adminT.common.confirmDelete)) return;
    await productService.deleteProduct(id).catch(() => {});
    await load();
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{productsT.title}</h1>
        <Button size="sm" onClick={openNew}>
          <AddRounded sx={{ fontSize: 18 }} />
          {productsT.add}
        </Button>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <Inventory2Rounded />
          <p>{productsT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{productsT.colImage}</th>
                <th>{productsT.colName}</th>
                <th>{productsT.colCategory}</th>
                <th>{productsT.colPrice}</th>
                <th>{productsT.colFeatured}</th>
                <th>{adminT.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <SafeImage
                      src={row.image}
                      alt=""
                      className={styles.thumb}
                    />
                  </td>
                  <td>{tr(row, "name")}</td>
                  <td>{catName(row.categoryId)}</td>
                  <td>{money(row)}</td>
                  <td>
                    {row.featured ? (
                      <span className={cx(styles.badge, styles.completed)}>
                        {productsT.yes}
                      </span>
                    ) : (
                      <span className={styles.muted}>{productsT.no}</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.iconBtn}
                        onClick={() => openEdit(row)}
                        aria-label="edit"
                      >
                        <EditRounded />
                      </button>
                      <button
                        className={cx(styles.iconBtn, styles.danger)}
                        onClick={() => remove(row.id)}
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
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? productsT.edit : productsT.new}
        wide
      >
        <form onSubmit={save}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>{productsT.fNameAr}</label>
              <input
                required
                value={form.name_ar}
                onChange={handleFieldChange("name_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fNameEn}</label>
              <input
                required
                value={form.name_en}
                onChange={handleFieldChange("name_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fCategory}</label>
              <select
                value={form.categoryId}
                onChange={handleFieldChange("categoryId")}
              >
                {cats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {tr(c, "name")}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>{productsT.fPrice}</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={handleFieldChange("price")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fCurrency}</label>
              <input
                value={form.currency}
                onChange={handleFieldChange("currency")}
                dir="ltr"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{productsT.fImage}</label>
              <ImageField
                value={form.image}
                onChange={(v) => setForm((f) => ({ ...f, image: v }))}
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fBadgeAr}</label>
              <input
                value={form.badge_ar || ""}
                onChange={handleFieldChange("badge_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fBadgeEn}</label>
              <input
                value={form.badge_en || ""}
                onChange={handleFieldChange("badge_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fDescAr}</label>
              <input
                value={form.desc_ar}
                onChange={handleFieldChange("desc_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{productsT.fDescEn}</label>
              <input
                value={form.desc_en}
                onChange={handleFieldChange("desc_en")}
                dir="ltr"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{productsT.fLongAr}</label>
              <textarea
                value={form.longdesc_ar || ""}
                onChange={handleFieldChange("longdesc_ar")}
                dir="rtl"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{productsT.fLongEn}</label>
              <textarea
                value={form.longdesc_en || ""}
                onChange={handleFieldChange("longdesc_en")}
                dir="ltr"
              />
            </div>
            <label
              className={styles.full}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                marginBottom: 16,
              }}
            >
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featured: e.target.checked }))
                }
                style={{ width: "auto" }}
              />
              <span>{productsT.fFeatured}</span>
            </label>
          </div>
          <div className={styles.formActions}>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {adminT.common.cancel}
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? adminT.common.saving : adminT.common.save}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
