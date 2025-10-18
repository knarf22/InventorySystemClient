import { useEffect, useState } from "react";
import type { Product } from "./ProductsPage";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  editingProduct: Product | null;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, editingProduct, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (editingProduct) {
      const { id, ...rest } = editingProduct;
      setFormData(rest);
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        price: 0,
      });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: editingProduct ? editingProduct.id : Date.now() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <div className="col-span-2 flex gap-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
