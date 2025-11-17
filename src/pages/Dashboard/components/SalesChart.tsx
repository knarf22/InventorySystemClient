import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";
import type { Sale } from "../../../api/saleAPI";

interface Props {
  sales: Sale[];
}

const SalesChart = ({ sales }: Props) => {
  const [chartData, setChartData] = useState<any[]>([]);

  // --- Transform sales into daily totals ---
  const getChartData = () => {
    const map: Record<string, { date: string; totalAmount: number; totalQuantity: number }> = {};

    sales.forEach(sale => {
      const date = sale.createdAt.split("T")[0]; // YYYY-MM-DD

      if (!map[date]) {
        map[date] = { date, totalAmount: 0, totalQuantity: 0 };
      }

      map[date].totalAmount += sale.totalAmount;
      map[date].totalQuantity += sale.items.reduce((sum, i) => sum + i.quantity, 0);
    });

    // Convert to array & sort by date
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  };

  useEffect(() => {
    setChartData(getChartData());
  }, [sales]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales Overview</h2>

      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          No sales data...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Line for Sales Amount */}
            <Line
              type="monotone"
              dataKey="totalAmount"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Total Amount"
            />

            {/* Line for Quantity */}
            <Line
              type="monotone"
              dataKey="totalQuantity"
              stroke="#10b981"
              strokeWidth={3}
              name="Total Quantity"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;
