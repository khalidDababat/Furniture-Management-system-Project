import { get, post, put, remove } from "./api";
import type { Category } from "@/types";

export const categotyService = {
  getCategories() {
    return get<Category[]>("/categories");
  },
  getCategory(id: number | string) {
    return get<Category>(`/categories/${id}`);
  },

  /* ---------------- Admin: Categories CRUD ---------------- */

  createCategory(body: Omit<Category, "id">) {
    return post<Category>("/categories", body);
  },

  updateCategory(id: number, body: Partial<Category>) {
    put<Category>(`/categories/${id}`, body);
  },

  deleteCategory(id: number) {
    return remove(`/categories/${id}`);
  },
};
