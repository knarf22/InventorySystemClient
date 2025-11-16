import {
  getProducts as get,
  createProduct as create,
  updateProduct as update,
  deleteProduct as remove,
  getTotalProducts,
  getLowStockProducts,
} from "../api/productAPI";

import type { Product } from "../api/productAPI";

// 🧩 Get all
export async function getProducts(): Promise<Product[]> {
  return await get();
}

// 🧩 Create
export async function createProduct(product: Omit<Product, "productID" | "categoryName">): Promise<Product> {
  return await create(product);
}

// 🧩 Update
export async function updateProduct(id: number, product: Product): Promise<void> {
  return await update(id, product);
}

// 🧩 Delete
export async function deleteProduct(id: number): Promise<void> {
  return await remove(id);
}

// 🧩 Get total products
export async function getTotalProductsService(): Promise<number> {
  return await getTotalProducts();
}

// 🧩 Get low stock products
export async function getLowStockProductsService(): Promise<Product[]> {
  return await getLowStockProducts();
}