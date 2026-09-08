import { notFound } from "next/navigation";
import { jobService } from "@/services/api";
import JobApplicationForm from "@/components/JobApplicationForm";

export const dynamic = "force-dynamic";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await jobService.getJob(id).catch(() => null);
  if (!job) notFound();
  return <JobApplicationForm job={job} />;
}
