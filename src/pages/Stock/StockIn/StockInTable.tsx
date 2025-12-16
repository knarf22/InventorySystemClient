import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { StockMovements } from "../../../api/stocksAPI";
import type { Product } from "../../../api/productAPI";

/* =======================
   GROUPED VIEW MODEL
======================= */
export interface GroupedStock {
  referenceNo: string;
  performedBy: string;
  movementDate: Date;
  remarks?: string;
  totalQuantity: number;
  items: {
    movementID: number;
    product : Product;
    quantity: number;
  }[];
}

/* =======================
   COMPONENT
======================= */
export interface StockTableProps {
  stock: StockMovements[];
}

const StockInTable = ({ stock }: StockTableProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  /* =======================
     GROUP BY REFERENCE NO
  ======================= */
  const groupedStockIns = useMemo<GroupedStock[]>(() => {
    const map = new Map<string, GroupedStock>();

    stock.forEach((movement) => {
      if (!map.has(movement.referenceNo)) {
        map.set(movement.referenceNo, {
          referenceNo: movement.referenceNo,
          performedBy: movement.performedBy,
          movementDate: movement.movementDate,
          remarks: movement.remarks,
          totalQuantity: 0,
          items: [],
        });
      }

      const group = map.get(movement.referenceNo)!;

      group.totalQuantity += movement.quantityChange;

      group.items.push({
        movementID: movement.productID,
        product: movement.product,
        quantity: movement.quantityChange,
      });
    });

    return Array.from(map.values());
  }, [stock]);

  /* =======================
     RENDER
  ======================= */
  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-4 text-left">Reference No</th>
          <th className="py-3 px-4 text-left">Created By</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-right">Total</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {groupedStockIns.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-400 italic">
              No stock-in records yet.
            </td>
          </tr>
        ) : (
          groupedStockIns.map((stock) => (
            <React.Fragment key={stock.referenceNo}>
              {/* =======================
                  PREVIEW ROW
              ======================= */}
              <tr
                className="border-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() =>
                  setExpanded(
                    expanded === stock.referenceNo ? null : stock.referenceNo
                  )
                }
              >
                <td className="py-3 px-4">{stock.referenceNo}</td>
                <td className="py-3 px-4">{stock.performedBy}</td>
                <td className="py-3 px-4">
                  {new Date(stock.movementDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right font-semibold">
                  {stock.totalQuantity > 0 ? "+" : ""}
                  {stock.totalQuantity}
                </td>
                <td className="py-3 px-4 text-center">
                  {expanded === stock.referenceNo ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </td>
              </tr>

              {/* =======================
                  EXPANDED DETAILS
              ======================= */}
              {expanded === stock.referenceNo && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="p-4">
                    <table className="w-full text-xs border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-3 text-left">Product Name</th>
                          <th className="py-2 px-3 text-left">Price</th>
                          <th className="py-2 px-3 text-right">Quantity</th>
                        </tr>
                      </thead>

                      <tbody>
                        {stock.items.map((item, index) => (
                          <tr key={index} className="border-t">
                            <td className="py-2 px-3">
                              {item.product.productName}
                            </td>
                            <td className="py-2 px-3">
                              {item.product.price.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right">
                              {item.quantity > 0 ? "+" : ""}
                              {item.quantity}
                            </td>
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
