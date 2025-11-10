import { useState, useMemo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
// Assuming you have a standard Product interface defined elsewhere
import type { Product } from "../../api/productAPI"; // Update path if necessary
import { useProduct } from "../../hooks/useProduct";
import type { CreateSaleDto } from "../../api/saleAPI";

// 1. Updated Interface to map to the backend DTO structure
interface SaleItem {
  // Fields needed for the backend DTO
  productID: number | null; // Use null for initial state/no selection
  quantity: number;
  
  // Fields used for display/UI purposes (not sent in DTO, but derived)
  unitPrice: number;
  productName: string; 
}

interface SaleFormProps {
  onSubmit: (sale: CreateSaleDto) => void;
  onCancel: () => void;
}

const SaleForm = ({ onSubmit, onCancel }: SaleFormProps) => {
  const { products } = useProduct();
  
  // Create a map for quick price lookup: { productID: product }
  const productMap = useMemo(() => {
    return products.reduce((map, product) => {
      map[product.productID] = product;
      return map;
    }, {} as Record<number, Product>);
  }, [products]);

  const [form, setForm] = useState({
    createdBy: "",
    remarks: "",
  });

  // 2. Updated initial state to use productID: null
  const [items, setItems] = useState<SaleItem[]>([
    { productID: null, productName: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleAddItem = () =>
    setItems([...items, { productID: null, productName: "", quantity: 1, unitPrice: 0 }]);

  const handleRemoveItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    const updated = [...items];
    const currentItem = updated[index];
    
    // 3. Logic to handle Product Selection (by ID)
    if (field === "productID" && typeof value === 'number') {
      const selectedProduct = productMap[value];
      
      if (selectedProduct) {
        currentItem.productID = value;
        currentItem.productName = selectedProduct.productName;
        // Automatically set the price based on the selected product
        currentItem.unitPrice = selectedProduct.price; 
      } else {
        // Reset if no product is found (e.g., if "Select Product" is chosen)
        currentItem.productID = null;
        currentItem.productName = "";
        currentItem.unitPrice = 0;
      }
    } else {
      // Handle changes for Quantity and Unit Price (if manually editable)
      (currentItem as any)[field] = value;
    }
    
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out items that don't have a product selected
    const validItems = items.filter(item => item.productID !== null);
    
    if (validItems.length === 0) {
        alert("Please select at least one product.");
        return;
    }

    const totalAmount = validItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    // Prepare the items to match the backend SaleItemDto: { ProductID, Quantity }
    const saleItemsDto = validItems.map(item => ({
        productID: item.productID!, // '!' tells TypeScript we know it's not null here
        quantity: item.quantity,
    }));

    // Pass the full DTO structure to the parent component

    console.log("items",saleItemsDto)
    console.log("form",form)
    console.log("totalAmount",totalAmount)
    onSubmit({ 
        ...form, 
        items: saleItemsDto // IMPORTANT: Use the DTO structure here
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... createdBy and Remarks inputs remain the same ... */}
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
                {/* 4. Product Dropdown (Select) */}
                <td className="py-2 px-3">
                  <select
                    value={item.productID || ""}
                    onChange={(e) =>
                      handleItemChange(index, "productID", Number(e.target.value))
                    }
                    className="w-full border rounded px-2 py-1"
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
                
                {/* Quantity Input (remains the same) */}
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
                
                {/* Price Display (read-only and auto-populated) */}
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice.toFixed(2)}
                    readOnly // Price is now read-only
                    className="w-24 text-right border rounded px-2 py-1 bg-gray-50"
                  />
                </td>
                
                {/* Actions (Remove Button) */}
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