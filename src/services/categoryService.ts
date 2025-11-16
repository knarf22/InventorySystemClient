import {
  getCategories as get,
  createCategory as create,
  updateCategory as update,
  deleteCategory as remove,
  getTotalCategories,
} from "../api/categoryAPI";

import type { Category } from "../api/categoryAPI";

// 🧩 Get all categories
export async function getCategories(): Promise<Category[]> {
  return await get();
}

// 🧩 Create new category
export async function createCategory(category: Omit<Category, "categoryID">): Promise<Category> {
  return await create(category);
}

// 🧩 Update category
export async function updateCategory(id: number, category: Category): Promise<void> {
  return await update(id, category);
}

// 🧩 Delete category
export async function deleteCategory(id: number): Promise<void> {
  return await remove(id);
}

// 🧩 Get total categories
export async function getTotalCategoriesService(): Promise<number> {
  return await getTotalCategories();
}