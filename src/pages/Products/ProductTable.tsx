import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "./ProductsPage";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-4 text-left">Product Name</th>
          <th className="py-3 px-4 text-left">SKU</th>
          <th className="py-3 px-4 text-left">Category</th>
          <th className="py-3 px-4 text-left">Quantity</th>
          <th className="py-3 px-4 text-left">Price</th>
          <th className="py-3 px-4 text-center w-24">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td
              colSpan={6}
              className="text-center py-6 text-gray-400 italic"
            >
              No products added yet.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{product.sku}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className="py-3 px-4">{product.quantity}</td>
              <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
              <td className="py-3 px-4 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
