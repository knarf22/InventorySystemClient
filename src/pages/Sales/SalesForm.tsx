import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

interface SaleItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface SaleFormProps {
  onSubmit: (sale: any) => void;
  onCancel: () => void;
}

const SaleForm = ({ onSubmit, onCancel }: SaleFormProps) => {
  const [form, setForm] = useState({
    createdBy: "",
    remarks: "",
  });

  const [items, setItems] = useState<SaleItem[]>([
    { productName: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleAddItem = () =>
    setItems([...items, { productName: "", quantity: 1, unitPrice: 0 }]);

  const handleRemoveItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    onSubmit({ ...form, totalAmount, items });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Created By"
        value={form.createdBy}
        onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <textarea
        placeholder="Remarks"
        value={form.remarks}
        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
      />

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
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={item.productName}
                    onChange={(e) =>
                      handleItemChange(index, "productName", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", Number(e.target.value))
                    }
                    className="w-20 text-right border rounded px-2 py-1"
                  />
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", Number(e.target.value))
                    }
                    className="w-24 text-right border rounded px-2 py-1"
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
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
          onClick={handleAddItem}
          className="flex items-center gap-2 text-primary hover:text-primaryHover mt-2"
        >
          <PlusCircle size={16} /> Add Item
        </button>
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition"
        >
          Save Sale
        </button>
      </div>
    </form>
  );
};

export default SaleForm;