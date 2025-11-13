import { Package, Layers, DollarSign, AlertTriangle } from "lucide-react";

const DashboardPage = () => {
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
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">120</h3>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Package className="text-indigo-600" size={24} />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">8</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Layers className="text-green-600" size={24} />
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">$4,320</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <DollarSign className="text-yellow-600" size={24} />
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">5</h3>
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
              {[
                { date: "Nov 13, 2025", product: "Laptop", amount: "$1,200" },
                { date: "Nov 12, 2025", product: "Wireless Mouse", amount: "$50" },
                { date: "Nov 10, 2025", product: "Keyboard", amount: "$90" },
              ].map((sale, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2">{sale.date}</td>
                  <td>{sale.product}</td>
                  <td className="font-medium text-gray-700">{sale.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Selling Products</h2>
          <ul className="divide-y">
            {[
              { name: "Laptop", sold: 34 },
              { name: "Mouse", sold: 27 },
              { name: "Keyboard", sold: 18 },
              { name: "Headset", sold: 15 },
            ].map((item, idx) => (
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
