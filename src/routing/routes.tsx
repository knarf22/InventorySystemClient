// (You can add StockTransactionsPage, SuppliersPage, etc. later)

import CategoriesPage from "../pages/Categories/CategoriesPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LogsPage from "../pages/Logs/LogsPage";
// import LogsPage from "../pages/Logs/LogsPage";
import LowStocksAlertPage from "../pages/LowStocksAlert/LowStocksAlertPage";
import ProductsPage from "../pages/Products/ProductsPage";
import SalesReportsPage from "../pages/SalesReports/SalesReportsPage";
import SalesTransactionsPage from "../pages/SalesTransactions/SalesTransactionsPage";
import StockInPage from "../pages/Stock/StockIn/StockInPage";
import StockOutPage from "../pages/Stock/StockOut/StockOutPage";
import StockReportsPage from "../pages/StockReports/StockReportsPage";
import UserRolePage from "../pages/UserRoles/UserRolePage";

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
  { path: "/stock-in", element: <StockInPage /> },
  { path: "/stock-out", element: <StockOutPage /> },
  { path: "/user-role", element: <UserRolePage /> },
  { path: "/logs", element: <LogsPage /> },
  { path: "/stock-reports", element: <StockReportsPage /> },
  { path: "/sales-reports", element: <SalesReportsPage /> },
  { path: "/low-stocks-alert", element: <LowStocksAlertPage /> },



];
