import { API_ROUTES } from "../constants/apiRoutes"; // same file used for categories
import api from "./axios";
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
  const res = await api.get<Product[]>(API_ROUTES.GET_PRODUCTS);
  console.log(res)
  return res.data;
}

// ✅ POST - create new product
export async function createProduct(product: Omit<Product, "productID" | "categoryName">): Promise<Product> {
  const res = await api.post<Product>(API_ROUTES.CREATE_PRODUCT, product);
  return res.data;
}

// ✅ PUT - update existing product
export async function updateProduct(id: number, product: Product): Promise<void> {
  await api.put(API_ROUTES.UPDATE_PRODUCT(id), product);
}

// ✅ DELETE
export async function deleteProduct(id: number): Promise<void> {
  await api.delete(API_ROUTES.DELETE_PRODUCT(id));
}

// ✅ GET Total Products
export async function getTotalProducts(): Promise<number> {
  const res = await api.get<number>(API_ROUTES.GET_TOTAL_PRODUCT);
  return res.data;
}

// ✅ GET Low Stock Products
export async function getLowStockProducts(): Promise<Product[]> {
  const res = await api.get<Product[]>(API_ROUTES.GET_LOWSTOCK_PRODUCT);
  return res.data;
}