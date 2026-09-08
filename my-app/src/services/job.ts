import { get, post, put, remove } from "./api";
import type { Job } from "@/types";

export const jobService = {
  getJobs() {
    return get<Job[]>("/jobs");
  },
  getJob(id: number | string) {
    return get<Job>(`/jobs/${id}`);
  },

  createJob(body: Omit<Job, "id">) {
    return post<Job>("/jobs", body);
  },

  updateJob(id: number, body: Partial<Job>) {
    return put<Job>(`/jobs/${id}`, body);
  },

  deleteJob(id: number) {
    return remove(`/jobs/${id}`);
  },
};
