import { get, post, put, remove } from "./api";
import type { Project, WhyItem } from "@/types";

export const ProjectsService = {
  getProjects() {
    return get<Project[]>("/projects");
  },
  getWhyChooseUs() {
    return get<WhyItem[]>("/whyChooseUs");
  },
};
