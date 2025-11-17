import type { Sale } from "../../../api/saleAPI";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  latestSales: Sale[];
}

const RecentSalesTable = ({ latestSales }: Props) => {
  return (
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
              <td className="py-4">{formatDate(sale.createdAt)}</td>
              <td>{sale.items.map(i => i.productName).join(", ")}</td>
              <td className="font-medium text-gray-700">
                {sale.totalAmount.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSalesTable;
