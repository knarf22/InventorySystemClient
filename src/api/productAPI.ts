import axios from "axios";
import { API_ROUTES, API_URL } from "../constants/apiRoutes"; // same file used for categories
export interface Category {
  categoryID: number;
  categoryName: string;
  description?: string;
}

export interface Product {
  productID: number;
  sku: string;
  productName: string;
  description?: string;
  categoryID: number;
  category?: Category; // 👈 add this
  categoryName?: string; // optional helper
  quantity?: number;
  price: number;
}

// ✅ GET all products
export async function getProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>(`${API_URL}${API_ROUTES.GET_PRODUCTS}`);
  return res.data;
}

// ✅ POST - create new product
export async function createProduct(product: Omit<Product, "productID" | "categoryName">): Promise<Product> {
  const res = await axios.post<Product>(`${API_URL}${API_ROUTES.CREATE_PRODUCT}`, product);
  return res.data;
}

// ✅ PUT - update existing product
export async function updateProduct(id: number, product: Product): Promise<void> {
  await axios.put(`${API_URL}${API_ROUTES.UPDATE_PRODUCT(id)}`, product);
}

// ✅ DELETE
export async function deleteProduct(id: number): Promise<void> {
  await axios.delete(`${API_URL}${API_ROUTES.DELETE_PRODUCT(id)}`);
}

// ✅ GET Total Products
export async function getTotalProducts(): Promise<number> {
  const res = await axios.get<number>(`${API_URL}${API_ROUTES.GET_TOTAL_PRODUCT}`);
  return res.data;
}

// ✅ GET Low Stock Products
export async function getLowStockProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>(`${API_URL}${API_ROUTES.GET_LOWSTOCK_PRODUCT}`);
  return res.data;
}