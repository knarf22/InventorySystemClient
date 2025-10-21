import { useState } from "react";
import { Plus } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (product: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? product : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Products</h2>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <ProductTable
          products={products}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Add New Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primaryHover transition cursor-pointer"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>

            <ProductForm
              editingProduct={editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
