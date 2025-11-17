import { useEffect, useState } from "react";
import { useSales } from "../../hooks/useSales";
import { useCategory } from "../../hooks/useCategory";
import { useProduct } from "../../hooks/useProduct";
import type { Sale } from "../../api/saleAPI";

import SummaryCards from "./components/SummaryCards";
import RecentSalesTable from "./components/RecentSalesTable";
import TopSellingProductsList from "./components/TopSellingProductList";
import SalesChart from "./components/SalesChart";

const DashboardPage = () => {
  const { totalSales, sales, fetchTotalSales, fetchSales } = useSales();
  const { totalCategories, fetchTotalCategories } = useCategory();
  const { totalProducts, lowStockProducts, fetchTotalProducts, fetchLowStockProducts } = useProduct();

  const [latestSales, setLatestSales] = useState<Sale[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<{ name: string; sold: number }[]>([]);

  // --- Latest 4 sales ---
  const getLatestSales = () => {
    return sales
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  };

  // --- Top selling products ---
  const getTopSellingProducts = () => {
    const productSalesMap: Record<string, number> = {};

    sales.forEach(sale => {
      sale.items.forEach(item => {
        productSalesMap[item.productName] =
          (productSalesMap[item.productName] || 0) + item.quantity;
      });
    });

    return Object.entries(productSalesMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, sold]) => ({ name, sold }));
  };

  useEffect(() => {
    fetchTotalSales();
    fetchTotalCategories();
    fetchTotalProducts();
    fetchLowStockProducts();
    fetchSales();
  }, []);

  useEffect(() => {
    setLatestSales(getLatestSales());
    setTopSellingProducts(getTopSellingProducts());
  }, [sales]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <SummaryCards
        totalProducts={totalProducts ?? 0}
        totalCategories={totalCategories ?? 0}
        totalSales={totalSales ?? 0}
        lowStockCount={lowStockProducts?.length ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSalesTable latestSales={latestSales} />
        <TopSellingProductsList topSellingProducts={topSellingProducts} />
      </div>

      {/* —— Sales Chart with Date, Amount, Quantity —— */}
      <SalesChart sales={sales} />
    </div>
  );
};

export default DashboardPage;
