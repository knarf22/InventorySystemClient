import { PlusCircle, Trash2 } from "lucide-react";
import type { Product } from "../../api/productAPI";

interface SaleItem {
  productID: number | null;
  quantity: number;
  unitPrice: number;
  productName: string;
}

interface SaleFormUIProps {
  form: { createdBy: string; remarks: string };
  items: SaleItem[];
  products: Product[];

  onFormChange: (f: { createdBy: string; remarks: string }) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onItemChange: (index: number, field: keyof SaleItem, value: string | number) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SalesFormUI = ({
  form,
  items,
  products,
  onFormChange,  
  onAddItem,
  onRemoveItem,
  onItemChange,
  onCancel,
  onSubmit,
}: SaleFormUIProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Form fields */}
      <input
        type="text"
        placeholder="Created By"
        value={form.createdBy}
        onChange={(e) => onFormChange({ ...form, createdBy: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <textarea
        placeholder="Remarks"
        value={form.remarks}
        onChange={(e) => onFormChange({ ...form, remarks: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* Items Table */}
      <div>
        <h4 className="text-gray-700 font-medium mb-2">Items</h4>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-right">Qty</th>
              <th className="py-2 px-3 text-right">Price</th>
              <th className="py-2 px-3 text-center">Actions</th>
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

                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onItemChange(index, "quantity", Number(e.target.value))
                    }
                    className="w-20 text-right border rounded px-2 py-1"
                  />
                </td>

                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice.toFixed(2)}
                    readOnly
                    className="w-24 text-right border rounded px-2 py-1 bg-gray-50"
                  />
                </td>

                <td className="py-2 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
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
          className="flex items-center gap-2 text-primary hover:text-primaryHover mt-2"
        >
          <PlusCircle size={16} /> Add Item
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-75 transition cursor-pointer"
        >
          Save Sale
        </button>
      </div>
    </form>
  );
};

export default SalesFormUI;
