import { Pencil, Trash2 } from "lucide-react";
import type { Category } from "./CategoriesPage";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryTable = ({ categories, onEdit, onDelete }: CategoryTableProps) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 italic">
        No categories added yet.
      </div>
    );
  }

  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-4 text-left">Category Name</th>
          <th className="py-3 px-4 text-left">Description</th>
          <th className="py-3 px-4 text-center w-24">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.id} className="border-b hover:bg-gray-50 transition">
            <td className="py-3 px-4">{c.name}</td>
            <td className="py-3 px-4">{c.description}</td>
            <td className="py-3 px-4 text-center flex justify-center gap-3">
              <button
                onClick={() => onEdit(c)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
