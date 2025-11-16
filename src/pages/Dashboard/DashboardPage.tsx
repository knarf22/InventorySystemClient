import { Package, Layers, DollarSign, AlertTriangle } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useSales } from "../../hooks/useSales";
import { useCategory } from "../../hooks/useCategory";
import { useProduct } from "../../hooks/useProduct";
import type { Sale } from "../../api/saleAPI";
import { formatDate } from "../../utils/formatDate";

const DashboardPage = () => {

  const { totalSales, sales, fetchTotalSales, fetchSales } = useSales();
  const { totalCategories, fetchTotalCategories } = useCategory();
  const { totalProducts, lowStockProducts, fetchTotalProducts, fetchLowStockProducts } = useProduct();
  const [latestSales, setLatestSales] = useState<Sale[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<{ name: string; sold: number }[]>([]);

  const getLatestSales = () => {
    return sales
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }

  const getTopSellingProducts = () => {
    // Placeholder logic for top selling products
    // In a real scenario, this would likely involve more complex data processing
    const productSalesMap: { [key: string]: number } = {};
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (productSalesMap[item.productName]) {
          productSalesMap[item.productName] += item.quantity;
        } else {
          productSalesMap[item.productName] = item.quantity;
        }
      });
    });

    const sortedProducts = Object.entries(productSalesMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, sold]) => ({ name, sold }));
    return sortedProducts;
  }

  useEffect(() => {
    fetchTotalSales();
    fetchTotalCategories();
    fetchTotalProducts();
    fetchLowStockProducts();
    fetchSales();
    setLatestSales(getLatestSales());

  }, [])
  useEffect(() => {
    setLatestSales(getLatestSales());
    setTopSellingProducts(getTopSellingProducts());
  }, [sales])
  console.log(latestSales)
  console.log(topSellingProducts)

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">{totalProducts}</h3>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Package className="text-indigo-600" size={24} />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">{totalCategories}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Layers className="text-green-600" size={24} />
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1 truncate">
              {totalSales?.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })}
            </h3>
          </div>

          {/* Peso Icon (circle will always stay perfect) */}
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <span className="text-yellow-600 text-2xl leading-none">₱</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">{lowStockProducts.length}</h3>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Sales</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Product</th>
                <th className="pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {latestSales.map((sale, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2">{formatDate(sale.createdAt)}</td>
                  {/* Show all product names separated by comma */}
                  <td>{sale.items.map(i => i.productName).join(", ")}</td>
                  <td className="font-medium text-gray-700">{sale.totalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Selling Products</h2>
          <ul className="divide-y">
            {topSellingProducts.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span className="text-gray-700 font-medium">{item.sold} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales Overview (Chart Placeholder)</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          Chart coming soon...
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
