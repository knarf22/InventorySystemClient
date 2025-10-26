export const API_ROUTES = {
  // ✅ Category routes
  GET_CATEGORIES: "/api/Categories",
  CREATE_CATEGORY: "/api/Categories",
  UPDATE_CATEGORY: (id: number) => `/api/Categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/api/Categories/${id}`,
};

export const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7270";
