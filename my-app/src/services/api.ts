// Data-access layer — all requests go through one Axios instance (http).
// Generic get/post keep this DRY; components never call axios directly.
import { categotyService } from "./category";
import { companyService } from "./company";
import http from "./http";
import { HomeData } from "@/types";
import { productService } from "./product";
import { adminService } from "./admin";
import { jobService } from "./job";
import { clientService } from "./client";
import { orderService } from "./order";
import { ProjectsService } from "./project";
// import type {
//   Category,
//   Product,
//   HeroSlide,
//   WhyItem,
//   Project,
//   Client,
//   Company,
//   HomeData,
//   Job,
//   JobApplication,
//   Admin,
//   Order,
//   Staff,
// } from "@/types";
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

// Individual resources
// export const getCompany = () => get<Company>("/company");
// export const getHeroSlides = () => get<HeroSlide[]>("/heroSlides");
// export const getCategories = () => get<Category[]>("/categories");
// export const getCategory = (id: number | string) =>
// get<Category>(`/categories/${id}`);

// export const getProducts = () => get<Product[]>("/products");
// export const getProduct = (id: number | string) =>
//   get<Product>(`/products/${id}`);
// export const getProductsByCategory = (categoryId: number | string) =>
//   get<Product[]>(`/products?categoryId=${categoryId}`);

//export const getWhyChooseUs = () => get<WhyItem[]>("/whyChooseUs");

// export const getProjects = () => get<Project[]>("/projects");

// export const getClients = () => get<Client[]>("/clients");
// export const getJobs = () => get<Job[]>("/jobs");
// export const getJob = (id: number | string) => get<Job>(`/jobs/${id}`);

// // Submit a job application to JSON Server (creates a row under /applications).
// export function submitApplication(
//   payload: Omit<JobApplication, "id" | "createdAt">,
// ) {
//   return post<JobApplication>("/applications", {
//     ...payload,
//     createdAt: new Date().toISOString(),
//   });
// }

// export async function getRelatedProducts(
//   categoryId: number,
//   excludeId: number,
//   limit = 4,
// ) {
//   const items = await getProductsByCategory(categoryId);
//   return items.filter((p) => p.id !== excludeId).slice(0, limit);
// }

/* ---------------- Admin: auth ---------------- */
// export async function loginAdmin(
//   email: string,
//   password: string,
// ): Promise<Admin | null> {
//   const admins = await get<Admin[]>(
//     `/admins?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
//   );
//   return admins[0] ?? null;
// }
// export async function adminEmailExists(email: string): Promise<boolean> {
//   const admins = await get<Admin[]>(
//     `/admins?email=${encodeURIComponent(email)}`,
//   );
//   return admins.length > 0;
// }

/* ---------------- Admin: Jobs CRUD ---------------- */
// export const createJob = (body: Omit<Job, "id">) => post<Job>("/jobs", body);
// export const updateJob = (id: number, body: Partial<Job>) =>
//   put<Job>(`/jobs/${id}`, body);
// export const deleteJob = (id: number) => remove(`/jobs/${id}`);

/* ---------------- Admin: Categories CRUD ---------------- */
// export const createCategory = (body: Omit<Category, "id">) =>
//   post<Category>("/categories", body);
// export const updateCategory = (id: number, body: Partial<Category>) =>
//   put<Category>(`/categories/${id}`, body);
// export const deleteCategory = (id: number) => remove(`/categories/${id}`);

/* ---------------- Admin: Products CRUD ---------------- */
// export const createProduct = (body: Omit<Product, "id">) =>
//   post<Product>("/products", body);
// export const updateProduct = (id: number, body: Partial<Product>) =>
//   put<Product>(`/products/${id}`, body);
// export const deleteProduct = (id: number) => remove(`/products/${id}`);

/* ---------------- Admin: Applications ---------------- */
// export const getApplications = () => get<JobApplication[]>("/applications");
// export const deleteApplication = (id: number) => remove(`/applications/${id}`);

/* ---------------- Orders ---------------- */
// export const getOrders = () => get<Order[]>("/orders");
// export const getOrder = (id: number | string) => get<Order>(`/orders/${id}`);
// export const createOrder = (body: Omit<Order, "id">) =>
//   post<Order>("/orders", body);
// export const updateOrderStatus = (id: number, status: Order["status"]) =>
//   patch<Order>(`/orders/${id}`, { status });
// export const deleteOrder = (id: number) => remove(`/orders/${id}`);

/* ---------------- Admin: notifications feed ---------------- */
// One parallel fetch powering the admin notification bell (orders + applications).
// export async function getAdminNotifications(): Promise<{
//   orders: Order[];
//   applications: JobApplication[];
// }> {
//   const [orders, applications] = await Promise.all([
//     getOrders(),
//     getApplications(),
//   ]);
//   return { orders, applications };
// }

/* ---------------- Admin: Staff CRUD ---------------- */
// export const getStaff = () => get<Staff[]>("/staff");
// export const createStaff = (body: Omit<Staff, "id">) =>
//   post<Staff>("/staff", body);
// export const updateStaff = (id: number, body: Partial<Staff>) =>
//   put<Staff>(`/staff/${id}`, body);
// export const deleteStaff = (id: number) => remove(`/staff/${id}`);

/* ---------------- Admin: profile ---------------- */
// export const updateAdmin = (id: number, body: Partial<Admin>) =>
//   patch<Admin>(`/admins/${id}`, body);

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
    // getCompany(),
    // getHeroSlides(),
    // getCategories(),
    // getProducts(),
    // getWhyChooseUs(),

    // getProjects(),

    // getClients(),
    // getJobs(),
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
