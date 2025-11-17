import { Package, Layers, AlertTriangle } from "lucide-react";

interface Props {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  lowStockCount: number;
}

const SummaryCards = ({ totalProducts, totalCategories, totalSales, lowStockCount }: Props) => {
  return (
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
      <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Sales</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">
            {totalSales?.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}
          </h3>
        </div>
        <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-yellow-600 text-2xl leading-none">₱</span>
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">{lowStockCount}</h3>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
