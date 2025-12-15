import { PlusCircle, Trash2 } from "lucide-react";
import type { StockInItem } from "./StockInForm";
import type { Product } from "../../../api/productAPI";
import type { ActionStocks } from "../../../api/stocksAPI";



interface StockInFormUIProps {
  form: { createdBy: string; remarks: string };
  items: StockInItem[];
  products: Product[];
  reason: ActionStocks[];


  onFormChange: (v: { createdBy: string; remarks: string }) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onItemChange: <K extends keyof StockInItem>(
    index: number,
    field: K,
    value: StockInItem[K]
  ) => void;

  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StockInFormUI = ({
  form,
  items,
  products,
  reason,
  onFormChange,
  onAddItem,
  onRemoveItem,
  onItemChange,
  onCancel,
  onSubmit,
}: StockInFormUIProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Created By"
        className="w-full border rounded-lg px-3 py-2"
        value={form.createdBy}
        onChange={(e) => onFormChange({ ...form, createdBy: e.target.value })}
      />

      <textarea
        placeholder="Remarks"
        className="w-full border rounded-lg px-3 py-2"
        value={form.remarks}
        onChange={(e) => onFormChange({ ...form, remarks: e.target.value })}
      />

      <h4 className="font-medium text-gray-700">Items</h4>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Product Name</th>
            <th className="p-2 text-left">Reason</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-3">
                <select
                  value={item.productID || ""}
                  onChange={(e) =>
                    onItemChange(index, "productID", Number(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1 cursor-pointer"
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map((product) => (
                    <option key={product.productID} value={product.productID}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3">
                <select
                  value={item.actionID || ""}
                  onChange={(e) =>
                    onItemChange(index, "actionID", Number(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1 cursor-pointer"
                >
                  <option value="" disabled>
                    Select Reason
                  </option>
                  {reason.map((reason) => (
                    <option key={reason.actionID} value={reason.actionID}>
                      {reason.actionName}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-2 text-right">
                <input
                  type="number"
                  min={1}
                  className="w-20 border rounded px-2 py-1 text-right"
                  value={item.quantity}
                  onChange={(e) =>
                    onItemChange(index, "quantity", Number(e.target.value))
                  }
                />
              </td>

              <td className="p-2 text-center">
                <button
                  type="button"
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={onAddItem}
        className="flex items-center text-primary gap-2 mt-2"
      >
        <PlusCircle size={16} /> Add Item
      </button>

      <div className="flex justify-end gap-2 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-80"
        >
          Save Stock-In
        </button>
      </div>
    </form>
  );
};

export default StockInFormUI;
