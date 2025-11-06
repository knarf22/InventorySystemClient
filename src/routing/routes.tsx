// (You can add StockTransactionsPage, SuppliersPage, etc. later)

import CategoriesPage from "../pages/Categories/CategoriesPage";
import ProductsPage from "../pages/Products/ProductsPage";
import SalesTransactionsPage from "../pages/SalesTransactions/SalesTransactionsPage";

export interface RouteType {
  path: string;
  element: React.ReactElement;
  roles?: string[]; // optional, can be used later for role-based access
}
export const ROUTES: RouteType[] = [
  { path: "/products", element: <ProductsPage /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/sales", element: <SalesTransactionsPage /> },
  { path: "/sales-reports", element: <SalesTransactionsPage /> },
];
