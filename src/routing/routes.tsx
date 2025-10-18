// (You can add StockTransactionsPage, SuppliersPage, etc. later)

import ProductsPage from "../pages/Products/ProductsPage";

export interface RouteType {
  path: string;
  element: React.ReactElement;
  roles?: string[]; // optional, can be used later for role-based access
}
export const ROUTES: RouteType[] = [
  { path: "/products", element: <ProductsPage /> },
];
