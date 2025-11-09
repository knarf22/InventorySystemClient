import { useEffect, useState } from "react";
import type { Product } from "../../api/productAPI";
import { getCategories } from "../../services/categoryService";

interface ProductFormProps {
  editingProduct: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

interface Category {
  categoryID: number;
  categoryName: string;
}

const ProductForm = ({ editingProduct, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    categoryID: "",
    quantity: "",
    price: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);

  // Load categories from API
  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  // Load product data for editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        productName: editingProduct.productName,
        sku: editingProduct.sku,
        categoryID: editingProduct.categoryID?.toString() || "",
        quantity: editingProduct.quantity?.toString() || "",
        price: editingProduct.price?.toString() || "",
      });
    } else {
      setFormData({
        productName: "",
        sku: "",
        categoryID: "",
        quantity: "",
        price: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.categoryID === Number(formData.categoryID)
    );

    const newProduct: Product = {
      productID: editingProduct ? editingProduct.productID : Date.now(),
      productName: formData.productName,
      sku: formData.sku,
      categoryID: Number(formData.categoryID),
      category: selectedCategory
        ? {
            categoryID: selectedCategory.categoryID,
            categoryName: selectedCategory.categoryName,
          }
        : undefined,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };

    onSubmit(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Product Name */}
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
          placeholder-gray-400 text-gray-900
          focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* SKU */}
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
          placeholder-gray-400 text-gray-900
          focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* Category Dropdown */}
      <select
        name="categoryID"
        value={formData.categoryID}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
          text-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.categoryID} value={cat.categoryID}>
            {cat.categoryName}
          </option>
        ))}
      </select>

      {/* Quantity */}
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
          placeholder-gray-400 text-gray-900
          focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
          placeholder-gray-400 text-gray-900
          focus:ring-2 focus:ring-primary focus:outline-none"
      />

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
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-75 hover:text-black transition cursor-pointer"
        >
          {editingProduct ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
