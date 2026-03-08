export const API_ROUTES = {
  // ✅ Category routes
  GET_CATEGORIES: "/Categories",
  CREATE_CATEGORY: "/Categories",
  UPDATE_CATEGORY: (id: number) => `/Categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/Categories/${id}`,
  GET_TOTAL_CATEGORY: "/Categories/total",

   // ✅ Product routes
  GET_PRODUCTS: "/Products",
  CREATE_PRODUCT: "/Products",
  UPDATE_PRODUCT: (id: number) => `/Products/${id}`,
  DELETE_PRODUCT: (id: number) => `/Products/${id}`,
  GET_TOTAL_PRODUCT: "/Products/total",
  GET_LOWSTOCK_PRODUCT: "/Products/low-stock",

  // ✅ Sale routes
  GET_SALES: "/Sales",
  CREATE_SALE: "/Sales/create",
  GET_TOTAL_SALES: "/Sales/total-sales",

  // ✅ Stocks routes
  GET_STOCKS: "/Stocks/get-stock-actions",
  UPDATE_STOCK: `/Stocks/update-stock`,
  GET_STOCK_IN: `/Stocks/stock-in`,
  GET_STOCK_OUT: `/Stocks/stock-out`,

    // ✅ Auth routes
  LOGIN: "/Auth/login",
  LOGOUT: `/Auth/logout`,
  SIGNUP: `/Auth/register`,
  ME: `/Auth/me`,
  ADD_USER: `/Auth/add-allowed-user`,
};

export const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7270/api";
