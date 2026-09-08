"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { jobService } from "@/services/api";
import type { Job } from "@/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import cx from "@/utility/cx";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import WorkOffRounded from "@mui/icons-material/WorkOffRounded";
import styles from "@/styles/admin.module.scss";

type JobForm = Omit<Job, "id">;
const blank = (): JobForm => ({
  title_ar: "",
  title_en: "",
  type_ar: "",
  type_en: "",
  location_ar: "",
  location_en: "",
  department_ar: "",
  department_en: "",
  desc_ar: "",
  desc_en: "",
  postedAt: new Date().toISOString().slice(0, 10),
});

export default function JobsAdmin() {
  const { t, tr } = useLanguage();
  const adminT = t.admin;
  const jobsT = adminT.jobs;
  const [rows, setRows] = useState<Job[] | null>(null);
  const [editing, setEditing] = useState<Job | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<JobForm>(blank());
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setRows(await jobService.getJobs());
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
  const openEdit = (job: Job) => {
    const { id: _id, ...rest } = job;
    void _id;
    setForm(rest);
    setEditing(job);
    setOpen(true);
  };
  const handleFieldChange =
    (k: keyof JobForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) await jobService.updateJob(editing.id, form);
      else await jobService.createJob(form);
      setOpen(false);
      await load();
    } catch {
      /* ignore */
    }
    setBusy(false);
  };
  const remove = async (id: number) => {
    if (!confirm(adminT.common.confirmDelete)) return;
    await jobService.deleteJob(id).catch(() => {});
    await load();
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{jobsT.title}</h1>
        <Button size="sm" onClick={openNew}>
          <AddRounded sx={{ fontSize: 18 }} />
          {jobsT.add}
        </Button>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <WorkOffRounded />
          <p>{jobsT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{jobsT.colTitle}</th>
                <th>{jobsT.colType}</th>
                <th>{jobsT.colLocation}</th>
                <th>{jobsT.colDept}</th>
                <th>{jobsT.colPosted}</th>
                <th>{adminT.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{tr(row, "title")}</td>
                  <td>{tr(row, "type")}</td>
                  <td>{tr(row, "location")}</td>
                  <td>{tr(row, "department")}</td>
                  <td>{row.postedAt}</td>
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
        title={editing ? jobsT.edit : jobsT.new}
        wide
      >
        <form onSubmit={save}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>{jobsT.fTitleAr}</label>
              <input
                required
                value={form.title_ar}
                onChange={handleFieldChange("title_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fTitleEn}</label>
              <input
                required
                value={form.title_en}
                onChange={handleFieldChange("title_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fTypeAr}</label>
              <input
                value={form.type_ar}
                onChange={handleFieldChange("type_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fTypeEn}</label>
              <input
                value={form.type_en}
                onChange={handleFieldChange("type_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fLocAr}</label>
              <input
                value={form.location_ar}
                onChange={handleFieldChange("location_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fLocEn}</label>
              <input
                value={form.location_en}
                onChange={handleFieldChange("location_en")}
                dir="ltr"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fDeptAr}</label>
              <input
                value={form.department_ar}
                onChange={handleFieldChange("department_ar")}
                dir="rtl"
              />
            </div>
            <div className={styles.field}>
              <label>{jobsT.fDeptEn}</label>
              <input
                value={form.department_en}
                onChange={handleFieldChange("department_en")}
                dir="ltr"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{jobsT.fDescAr}</label>
              <textarea
                value={form.desc_ar}
                onChange={handleFieldChange("desc_ar")}
                dir="rtl"
              />
            </div>
            <div className={cx(styles.field, styles.full)}>
              <label>{jobsT.fDescEn}</label>
              <textarea
                value={form.desc_en}
                onChange={handleFieldChange("desc_en")}
                dir="ltr"
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
