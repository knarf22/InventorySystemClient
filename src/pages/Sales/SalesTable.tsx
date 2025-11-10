import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SaleItem {
  productId : number;
  saleItemID: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Sale {
  saleID: number;
  transactionNo: string;
  totalAmount: number;
  remarks: string;
  createdBy: string;
  createdAt: string;
  items: SaleItem[];
}

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-4 text-left">Transaction No</th>
          <th className="py-3 px-4 text-left">Created By</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-right">Total Amount</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-400 italic">
              No sales recorded yet.
            </td>
          </tr>
        ) : (
          sales.map((sale) => (
            <React.Fragment key={sale.saleID}>
              <tr
                key={sale.saleID}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{sale.transactionNo}</td>
                <td className="py-3 px-4">{sale.createdBy}</td>
                <td className="py-3 px-4">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  ₱{sale.totalAmount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() =>
                      setExpanded(expanded === sale.saleID ? null : sale.saleID)
                    }
                    className="text-primary hover:text-primaryHover hover:scale-105 transition cursor-pointer"
                  >
                    {expanded === sale.saleID ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </td>
              </tr>

              {/* Expandable Row */}
              {expanded === sale.saleID && (
                <tr className="bg-gray-50" key={sale.saleID}>
                  <td colSpan={5} className="p-4">
                    <table className="w-full text-xs border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-3 text-left">Product</th>
                          <th className="py-2 px-3 text-right">Qty</th>
                          <th className="py-2 px-3 text-right">Price</th>
                          <th className="py-2 px-3 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.items.map((item) => (
                          <tr key={item.productId} className="border-t">
                            <td className="py-2 px-3">{item.productName}</td>
                            <td className="py-2 px-3 text-right">{item.quantity}</td>
                            <td className="py-2 px-3 text-right">
                              ₱{item.unitPrice.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right">
                              ₱{(item.quantity * item.unitPrice).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {sale.remarks && (
                      <p className="text-gray-500 text-xs mt-2 italic">
                        Remarks: {sale.remarks}
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SalesTable;