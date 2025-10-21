import { useEffect, useState } from "react";
import type { Product } from "./ProductsPage";

interface ProductFormProps {
  editingProduct: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm = ({ editingProduct, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        category: editingProduct.category,
        quantity: editingProduct.quantity.toString(),
        price: editingProduct.price.toString(),
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "",
        quantity: "",
        price: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };
    onSubmit(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {["name", "sku", "category", "quantity", "price"].map((field) => (
        <input
          key={field}
          type={field === "quantity" || field === "price" ? "number" : "text"}
          name={field}
          placeholder={
            field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
          }
          value={(formData as any)[field]}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
            placeholder-gray-400 text-gray-900
            focus:ring-2 focus:ring-primary focus:outline-none"
        />
      ))}

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
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition cursor-pointer"
        >
          {editingProduct ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
