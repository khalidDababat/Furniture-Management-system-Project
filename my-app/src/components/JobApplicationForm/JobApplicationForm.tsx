"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/api";
import Container from "@/components/Container";
import Button from "@/components/Button";
import cx from "@/utility/cx";
import type { Job } from "@/types";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import ApartmentRounded from "@mui/icons-material/ApartmentRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import d from "@/styles/detail.module.scss";

const MAX_BYTES = 3 * 1024 * 1024;

export default function JobApplicationForm({ job }: { job: Job }) {
  const { t, tr, dir } = useLanguage();
  const c = t.careers;
  const f = c.form;
  const Sep = dir === "rtl" ? ChevronLeftRounded : ChevronRightRounded;

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [resume, setResume] = useState<{
    name: string;
    type: string;
    data: string;
  } | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setMessage(f.errorSize);
      setFileName("");
      setResume(null);
      e.target.value = "";
      return;
    }
    setMessage("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () =>
      setResume({
        name: file.name,
        type: file.type || "application/octet-stream",
        data: String(reader.result),
      });
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!resume) {
      setStatus("error");
      setMessage(f.errorResume);
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      await adminService.submitApplication({
        jobId: job.id,
        jobTitle: String(fd.get("jobTitle") || tr(job, "title")),
        fullName: String(fd.get("fullName") || ""),
        mobile: String(fd.get("mobile") || ""),
        coverLetter: String(fd.get("coverLetter") || ""),
        resumeName: resume.name,
        resumeType: resume.type,
        resumeData: resume.data,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(f.errorGeneric);
    }
  };

  const chips = (
    <div className={d.jobChips}>
      <span className={d.jobChip}>
        <ScheduleRounded sx={{ fontSize: 15 }} />
        {tr(job, "type")}
      </span>
      <span className={d.jobChip}>
        <PlaceRounded sx={{ fontSize: 15 }} />
        {tr(job, "location")}
      </span>
      <span className={d.jobChip}>
        <ApartmentRounded sx={{ fontSize: 15 }} />
        {tr(job, "department")}
      </span>
    </div>
  );

  return (
    <>
      <section className={d.subhero}>
        <Container>
          <div className={d.breadcrumb}>
            <Link href="/">{t.nav.home}</Link>
            <Sep sx={{ fontSize: 16 }} />
            <Link href="/#careers">{t.nav.careers}</Link>
            <Sep sx={{ fontSize: 16 }} />
            <span>{tr(job, "title")}</span>
          </div>
          <h1>{tr(job, "title")}</h1>
          <div style={{ marginTop: 14 }}>{chips}</div>
        </Container>
      </section>

      <section className={d.pad} style={{ paddingTop: 36 }}>
        <Container>
          {status === "success" ? (
            <div className={d.applySuccess}>
              <CheckCircleRounded sx={{ fontSize: 64 }} />
              <h2>{f.success}</h2>
              <Button href="/#careers">
                <ArrowBackRounded
                  sx={{
                    fontSize: 20,
                    transform: dir === "ltr" ? "rotate(180deg)" : "none",
                  }}
                />
                {c.backToJobs}
              </Button>
            </div>
          ) : (
            <div className={d.applySplit}>
              <div className={d.card}>
                <h2>{c.applyTitle}</h2>
                <form onSubmit={onSubmit}>
                  <div className={d.field}>
                    <label>{f.fullName}</label>
                    <input required name="fullName" placeholder={f.fullName} />
                  </div>
                  <div className={d.field}>
                    <label>{f.mobile}</label>
                    <input
                      required
                      name="mobile"
                      type="tel"
                      dir="ltr"
                      placeholder="+970 ..."
                    />
                  </div>
                  <div className={d.field}>
                    <label>{f.jobTitle}</label>
                    <input
                      required
                      name="jobTitle"
                      defaultValue={tr(job, "title")}
                    />
                  </div>
                  <div className={d.field}>
                    <label>{f.coverLetter}</label>
                    <textarea name="coverLetter" placeholder="..." />
                  </div>
                  <div className={d.field}>
                    <label>{f.resume}</label>
                    <label className={cx(d.fileDrop, fileName && d.hasFile)}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf"
                        onChange={onFile}
                        hidden
                      />
                      {fileName ? (
                        <DescriptionRounded sx={{ fontSize: 22 }} />
                      ) : (
                        <UploadFileRounded sx={{ fontSize: 22 }} />
                      )}
                      <span>{fileName || f.chooseFile}</span>
                    </label>
                    <small className={d.fileHint}>{f.resumeHint}</small>
                  </div>

                  {message && (
                    <p className={cx(d.formMsg, d.error)}>{message}</p>
                  )}

                  <Button
                    type="submit"
                    block
                    disabled={status === "submitting"}
                  >
                    <SendRounded sx={{ fontSize: 19 }} />
                    {status === "submitting" ? f.submitting : f.submit}
                  </Button>
                </form>
              </div>

              <aside className={d.aside}>
                <h3>{tr(job, "title")}</h3>
                {chips}
                <p className={d.pdDesc} style={{ marginTop: 16 }}>
                  {tr(job, "desc")}
                </p>
                <div className={d.pdMeta}>
                  <div className={d.row}>
                    <ScheduleRounded />
                    {tr(job, "type")}
                  </div>
                  <div className={d.row}>
                    <PlaceRounded />
                    {tr(job, "location")}
                  </div>
                  <div className={d.row}>
                    <ApartmentRounded />
                    {tr(job, "department")}
                  </div>
                </div>
                <p className={d.posted}>
                  {c.posted}: {job.postedAt}
                </p>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
