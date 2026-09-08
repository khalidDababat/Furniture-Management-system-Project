"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { categotyService } from "@/services/category";
import type { Category } from "@/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import SafeImage from "@/components/SafeImage/SafeImage";
import ImageField from "@/components/ImageField/ImageField";
import cx from "@/utility/cx";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import CategoryRounded from "@mui/icons-material/CategoryRounded";
import styles from "@/styles/admin.module.scss";

type CatForm = Omit<Category, "id">;
const blank = (): CatForm => ({
  name_ar: "",
  name_en: "",
  desc_ar: "",
  desc_en: "",
  image: "",
});

export default function CategoriesAdmin() {
  const { t, tr } = useLanguage();
  const adminT = t.admin;
  const categoriesT = adminT.categories;
  const [rows, setRows] = useState<Category[] | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CatForm>(blank());
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setRows(await categotyService.getCategories());
    } catch {
      setRows([]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(blank());
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (category: Category) => {
    const { id: _id, ...rest } = category;
    void _id;
    setForm(rest);
    setEditing(category);
    setOpen(true);
  };
  const handleFieldChange =
    (k: keyof CatForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) await categotyService.updateCategory(editing.id, form);
      else await categotyService.createCategory(form);
      setOpen(false);
      await load();
    } catch {
      /* ignore */
    }
    setBusy(false);
  };
  const remove = async (id: number) => {
    if (!confirm(adminT.common.confirmDelete)) return;
    await categotyService.deleteCategory(id).catch(() => {});
    await load();
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{categoriesT.title}</h1>
        <Button size="sm" onClick={openNew}>
          <AddRounded sx={{ fontSize: 18 }} />
          {categoriesT.add}
        </Button>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <CategoryRounded />
          <p>{categoriesT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{categoriesT.colImage}</th>
                <th>{categoriesT.colName}</th>
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
        title={editing ? categoriesT.edit : categoriesT.new}
        wide
      >
        <form onSubmit={save}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>{categoriesT.fNameAr}</label>
              <input
                required
                value={form.name_ar}
                onChange={handleFieldChange("name_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{categoriesT.fNameEn}</label>
              <input
                required
                value={form.name_en}
                onChange={handleFieldChange("name_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{categoriesT.fDescAr}</label>
              <input
                value={form.desc_ar}
                onChange={handleFieldChange("desc_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{categoriesT.fDescEn}</label>
              <input
                value={form.desc_en}
                onChange={handleFieldChange("desc_en")}
                dir="ltr"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{categoriesT.fImage}</label>
              <ImageField
                value={form.image}
                onChange={(v) => setForm((f) => ({ ...f, image: v }))}
              />
            </div>
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
