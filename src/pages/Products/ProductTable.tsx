import type { Product } from "./ProductsPage";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  if (products.length === 0)
    return <p className="text-gray-500">No products added yet.</p>;

  return (
    <table className="w-full border-collapse border border-gray-200 shadow-sm text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2 text-left">SKU</th>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Category</th>
          <th className="border p-2 text-center">Quantity</th>
          <th className="border p-2 text-center">Price</th>
          <th className="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="border p-2">{p.sku}</td>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">{p.category}</td>
            <td className="border p-2 text-center">{p.quantity}</td>
            <td className="border p-2 text-center">₱{p.price.toFixed(2)}</td>
            <td className="border p-2 text-center">
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
