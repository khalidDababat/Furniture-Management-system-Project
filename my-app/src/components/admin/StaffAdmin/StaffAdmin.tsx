"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { StaffService } from "@/services/api";
import type { Staff } from "@/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import cx from "@/utility/cx";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import PeopleRounded from "@mui/icons-material/PeopleRounded";
import styles from "@/styles/admin.module.scss";

type StaffForm = Omit<Staff, "id">;
const blank = (): StaffForm => ({
  name: "",
  email: "",
  phone: "",
  position: "",
  department: "",
  joinedAt: new Date().toISOString().slice(0, 10),
  active: true,
});

export default function StaffAdmin() {
  const { t } = useLanguage();
  const adminT = t.admin;
  const staffT = adminT.staff;
  const [rows, setRows] = useState<Staff[] | null>(null);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StaffForm>(blank());
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setRows(await StaffService.getStaff());
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
  const openEdit = (staff: Staff) => {
    const { id: _id, ...rest } = staff;
    void _id;
    setForm(rest);
    setEditing(staff);
    setOpen(true);
  };
  const handleFieldChange =
    (k: keyof StaffForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) await StaffService.updateStaff(editing.id, form);
      else await StaffService.createStaff(form);
      setOpen(false);
      await load();
    } catch {
      /* ignore */
    }
    setBusy(false);
  };
  const remove = async (id: number) => {
    if (!confirm(adminT.common.confirmDelete)) return;
    await StaffService.deleteStaff(id).catch(() => {});
    await load();
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{staffT.title}</h1>
        <Button size="sm" onClick={openNew}>
          <AddRounded sx={{ fontSize: 18 }} />
          {staffT.add}
        </Button>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <PeopleRounded />
          <p>{staffT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{staffT.colName}</th>
                <th>{staffT.colPosition}</th>
                <th>{staffT.colDept}</th>
                <th>{staffT.colPhone}</th>
                <th>{staffT.colStatus}</th>
                <th>{adminT.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.name}
                    <div className={styles.muted}>{r.email}</div>
                  </td>
                  <td>{r.position}</td>
                  <td>{r.department}</td>
                  <td dir="ltr">{r.phone}</td>
                  <td>
                    <span
                      className={cx(
                        styles.badge,
                        r.active ? styles.completed : styles.cancelled,
                      )}
                    >
                      {r.active ? staffT.active : staffT.inactive}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.iconBtn}
                        onClick={() => openEdit(r)}
                        aria-label="edit"
                      >
                        <EditRounded />
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
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? staffT.edit : staffT.new}
        wide
      >
        <form onSubmit={save}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>{staffT.fName}</label>
              <input
                required
                value={form.name}
                onChange={handleFieldChange("name")}
              />
            </div>
            <div className={styles.field}>
              <label>{staffT.fEmail}</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={handleFieldChange("email")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{staffT.fPhone}</label>
              <input
                value={form.phone}
                onChange={handleFieldChange("phone")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{staffT.fPosition}</label>
              <input
                value={form.position}
                onChange={handleFieldChange("position")}
              />
            </div>
            <div className={styles.field}>
              <label>{staffT.fDept}</label>
              <input
                value={form.department}
                onChange={handleFieldChange("department")}
              />
            </div>
            <div className={styles.field}>
              <label>{staffT.fJoined}</label>
              <input
                type="date"
                value={form.joinedAt}
                onChange={handleFieldChange("joinedAt")}
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
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
                style={{ width: "auto" }}
              />
              <span>{staffT.fActive}</span>
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
