"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/admin";
import type { JobApplication } from "@/types";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import cx from "@/utility/cx";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import InboxRounded from "@mui/icons-material/InboxRounded";
import styles from "@/styles/admin.module.scss";

export default function ApplicationsAdmin() {
  const { t, lang } = useLanguage();
  const adminT = t.admin;
  const applicationsT = adminT.applications;
  const [rows, setRows] = useState<JobApplication[] | null>(null);
  const [view, setView] = useState<JobApplication | null>(null);

  const load = async () => {
    try {
      setRows(await adminService.getApplications());
    } catch {
      setRows([]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const remove = async (id?: number) => {
    if (id == null || !confirm(adminT.common.confirmDelete)) return;
    await adminService.deleteApplication(id).catch(() => {});
    await load();
  };
  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB") : "";

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{applicationsT.title}</h1>
      </div>

      {!rows ? (
        <p className={styles.center}>{adminT.common.loading}</p>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <InboxRounded />
          <p>{applicationsT.empty}</p>
        </div>
      ) : (
        <div className={cx(styles.panel, styles.tableWrap)}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{applicationsT.colName}</th>
                <th>{applicationsT.colMobile}</th>
                <th>{applicationsT.colJob}</th>
                <th>{applicationsT.colDate}</th>
                <th>{adminT.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.fullName}</td>
                  <td dir="ltr">{r.mobile}</td>
                  <td>{r.jobTitle}</td>
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
        title={view ? view.fullName : ""}
      >
        {view && (
          <div>
            <p className={styles.muted}>
              {view.jobTitle} · <span dir="ltr">{view.mobile}</span>
            </p>
            <div className={styles.field} style={{ marginTop: 16 }}>
              <label>{applicationsT.coverLetter}</label>
              <p>{view.coverLetter || "—"}</p>
            </div>
            <div style={{ marginTop: 12 }}>
              {view.resumeData ? (
                <Button href={view.resumeData} download={view.resumeName}>
                  <DownloadRounded sx={{ fontSize: 18 }} />
                  {applicationsT.download}
                </Button>
              ) : (
                <span className={styles.muted}>{applicationsT.noResume}</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
