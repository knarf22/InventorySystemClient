// (You can add StockTransactionsPage, SuppliersPage, etc. later)

import CategoriesPage from "../pages/Categories/CategoriesPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductsPage from "../pages/Products/ProductsPage";
import SalesTransactionsPage from "../pages/SalesTransactions/SalesTransactionsPage";
import StockIn from "../pages/Stock/StockIn/StockIn";
import StockOut from "../pages/Stock/StockOut/StockOut";

export interface RouteType {
  path: string;
  element: React.ReactElement;
  roles?: string[]; // optional, can be used later for role-based access
}
export const ROUTES: RouteType[] = [
  { path: "/", element: <DashboardPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/sales", element: <SalesTransactionsPage /> },
  { path: "/sales-reports", element: <SalesTransactionsPage /> },
  { path: "/stock-in", element: <StockIn /> },
  { path: "/stock-out", element: <StockOut /> },

];
