export const API_ROUTES = {
  // ✅ Category routes
  GET_CATEGORIES: "/api/Categories",
  CREATE_CATEGORY: "/api/Categories",
  UPDATE_CATEGORY: (id: number) => `/api/Categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/api/Categories/${id}`,
  GET_TOTAL_CATEGORY: "/api/Categories/total",

   // ✅ Product routes
  GET_PRODUCTS: "/api/Products",
  CREATE_PRODUCT: "/api/Products",
  UPDATE_PRODUCT: (id: number) => `/api/Products/${id}`,
  DELETE_PRODUCT: (id: number) => `/api/Products/${id}`,
  GET_TOTAL_PRODUCT: "/api/Products/total",
  GET_LOWSTOCK_PRODUCT: "/api/Products/low-stock",


  // ✅ Sale routes
  GET_SALES: "/api/Sales",
  CREATE_SALE: "/api/Sales/create",
  GET_TOTAL_SALES: "/api/Sales/total-sales",

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
  ADD_USER: `/Auth/add-allowed-users`,
};

export const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7270";
