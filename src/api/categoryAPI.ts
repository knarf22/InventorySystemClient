import axios from "axios";
import { API_ROUTES, API_URL } from "../constants/apiRoutes";

export interface Category {
  categoryID: number;
  categoryName: string;
  description?: string;
}

// ✅ GET
export async function getCategories(): Promise<Category[]> {
  const res = await axios.get<Category[]>(`${API_URL}${API_ROUTES.GET_CATEGORIES}`);
  return res.data;
}

// ✅ POST
export async function createCategory(category: Omit<Category, "categoryID">): Promise<Category> {
  const res = await axios.post<Category>(`${API_URL}${API_ROUTES.CREATE_CATEGORY}`, category);
  return res.data;
}

// ✅ PUT
export async function updateCategory(id: number, category: Category): Promise<void> {
  await axios.put(`${API_URL}${API_ROUTES.UPDATE_CATEGORY(id)}`, category);
}

// ✅ DELETE
export async function deleteCategory(id: number): Promise<void> {
  await axios.delete(`${API_URL}${API_ROUTES.DELETE_CATEGORY(id)}`);
}

// ✅ GET Total Categories
export async function getTotalCategories(): Promise<number> {
  const res = await axios.get<number>(`${API_URL}${API_ROUTES.GET_TOTAL_CATEGORY}`);
  return res.data;
}