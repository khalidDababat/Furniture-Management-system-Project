import { get, post, put, remove } from "./api";
import type { Product } from "@/types";

export const productService = {
  getAll() {
    return get<Product[]>("/products");
  },

  getById(id: number | string) {
    return get<Product>(`/products/${id}`);
  },

  getByCategory(categoryId: number | string) {
    return get<Product[]>(`/products?categoryId=${categoryId}`);
  },

  create(data: Omit<Product, "id">) {
    return post<Product>("/products", data);
  },

  update(id: number, data: Partial<Product>) {
    return put<Product>(`/products/${id}`, data);
  },

  delete(id: number) {
    return remove(`/products/${id}`);
  },

  getProductsByCategory(categoryId: number | string) {
    return get<Product[]>(`/products?categoryId=${categoryId}`);
  },

  async getRelatedProducts(categoryId: number, excludeId: number, limit = 4) {
    const items: any = await productService.getProductsByCategory(categoryId);
    return items.filter((p: any) => p.id !== excludeId).slice(0, limit);
  },

  /* ---------------- Admin: Products CRUD ---------------- */
  createProduct(body: Omit<Product, "id">) {
    return post<Product>("/products", body);
  },

  updateProduct(id: number, body: Partial<Product>) {
    put<Product>(`/products/${id}`, body);
  },

  deleteProduct(id: number) {
    return remove(`/products/${id}`);
  },
};
