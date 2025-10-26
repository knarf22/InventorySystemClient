export const API_ROUTES = {
  // ✅ Category routes
  GET_CATEGORIES: "/api/Categories",
  CREATE_CATEGORY: "/api/Categories",
  UPDATE_CATEGORY: (id: number) => `/api/Categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/api/Categories/${id}`,

   // ✅ Product routes
  GET_PRODUCTS: "/api/Products",
  CREATE_PRODUCT: "/api/Products",
  UPDATE_PRODUCT: (id: number) => `/api/Products/${id}`,
  DELETE_PRODUCT: (id: number) => `/api/Products/${id}`,
};

export const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7270";
