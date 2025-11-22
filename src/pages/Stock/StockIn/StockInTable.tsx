import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface StockInItem {
  productID: number;
  stockInItemID?: number;
  productName: string;
  quantity: number;
}

interface StockIn {
  stockInID: number;
  referenceNo: string;
  createdBy: string;
  createdAt: string;
  remarks: string;
  items: StockInItem[];
}

interface StockInTableProps {
  stockIns: StockIn[];
}

const StockInTable = ({ stockIns }: StockInTableProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-4 text-left">Reference No</th>
          <th className="py-3 px-4 text-left">Created By</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-center">Items</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {stockIns.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-400 italic">
              No stock-in records yet.
            </td>
          </tr>
        ) : (
          stockIns.map((stock) => (
            <React.Fragment key={`main-${stock.stockInID}`}>
              {/* MAIN ROW */}
              <tr
                key={stock.stockInID}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() =>
                  setExpanded(expanded === stock.stockInID ? null : stock.stockInID)
                }
              >
                <td className="py-3 px-4">{stock.referenceNo}</td>
                <td className="py-3 px-4">{stock.createdBy}</td>
                <td className="py-3 px-4">
                  {new Date(stock.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center">
                  {stock.items.length} item(s)
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() =>
                      setExpanded(
                        expanded === stock.stockInID ? null : stock.stockInID
                      )
                    }
                    className="text-primary hover:text-primaryHover hover:scale-105 transition cursor-pointer"
                  >
                    {expanded === stock.stockInID ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </td>
              </tr>

              {/* EXPANDED ROW */}
              {expanded === stock.stockInID && (
                <tr key={`expanded-${stock.stockInID}`} className="bg-gray-50">
                  <td colSpan={5} className="p-4">
                    <table className="w-full text-xs border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-3 text-left">Product</th>
                          <th className="py-2 px-3 text-right">Quantity</th>
                        </tr>
                      </thead>

                      <tbody>
                        {stock.items.map((item, index) => (
                          <tr key={`item-${index}`} className="border-t">
                            <td className="py-2 px-3">{item.productName}</td>
                            <td className="py-2 px-3 text-right">{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {stock.remarks && (
                      <p className="text-gray-500 text-xs mt-2 italic">
                        Remarks: {stock.remarks}
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

export default StockInTable;
