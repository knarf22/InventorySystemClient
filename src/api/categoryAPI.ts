import { API_ROUTES } from "../constants/apiRoutes";
import api from "./axios";

export interface Category {
  categoryID: number;
  categoryName: string;
  description?: string;
}

// ✅ GET
export async function getCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>(API_ROUTES.GET_CATEGORIES);
  return res.data;
}

// ✅ POST
export async function createCategory(category: Omit<Category, "categoryID">): Promise<Category> {
  const res = await api.post<Category>(API_ROUTES.CREATE_CATEGORY, category);
  return res.data;
}

// ✅ PUT
export async function updateCategory(id: number, category: Category): Promise<void> {
  await api.put(API_ROUTES.UPDATE_CATEGORY(id), category);
}

// ✅ DELETE
export async function deleteCategory(id: number): Promise<void> {
  await api.delete(API_ROUTES.DELETE_CATEGORY(id));
}

// ✅ GET Total Categories
export async function getTotalCategories(): Promise<number> {
  const res = await api.get<number>(API_ROUTES.GET_TOTAL_CATEGORY);
  return res.data;
}