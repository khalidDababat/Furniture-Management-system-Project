// Data-access layer — all requests go through one Axios instance (http).
// Generic get/post keep this DRY; components never call axios directly.
import { categotyService } from "./category";
import { companyService } from "./company";
import http from "./http";
import { HomeData } from "@/types";
import { productService } from "./product";
import { jobService } from "./job";
import { clientService } from "./client";
import { ProjectsService } from "./project";

export * from "./company";
export * from "./product";
export * from "./category";
export * from "./project";
export * from "./client";
export * from "./job";
export * from "./order";
export * from "./admin";
export * from "./staff";

export async function get<T>(path: string): Promise<T> {
  try {
    const { data } = await http.get<T>(path);
    return data;
  } catch (error) {
    console.log("GET Error:", path, error);
    throw error;
  }
}
export async function post<T>(path: string, body: unknown): Promise<T> {
  const { data } = await http.post<T>(path, body);
  return data;
}
export async function put<T>(path: string, body: unknown): Promise<T> {
  const { data } = await http.put<T>(path, body);
  return data;
}
export async function patch<T>(path: string, body: unknown): Promise<T> {
  const { data } = await http.patch<T>(path, body);
  return data;
}
export async function remove(path: string): Promise<void> {
  await http.delete(path);
}

// Aggregate for the homepage (parallel fetch)
export async function getHomeData(): Promise<HomeData> {
  const [
    company,
    heroSlides,
    categories,
    products,
    whyChooseUs,
    projects,
    clients,
    jobs,
  ] = await Promise.all([
    companyService.getCompany(),
    companyService.getHeroSlides(),
    categotyService.getCategories(),
    productService.getAll(),
    ProjectsService.getWhyChooseUs(),
    ProjectsService.getProjects(),
    clientService.getClients(),
    jobService.getJobs(),
  ]);
  return {
    company,
    heroSlides,
    categories,
    products,
    whyChooseUs,
    projects,
    clients,
    jobs,
  };
}