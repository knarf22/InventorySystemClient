import { Pencil, Trash2 } from "lucide-react";
import type { Category } from "./CategoriesPage";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryTable = ({ categories, onEdit, onDelete }: CategoryTableProps) => {
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
        {categories.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              className="text-center py-6 text-gray-400 italic"
            >
              No categories added yet.
            </td>
          </tr>
        ) : (
          categories.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4">{c.name}</td>
              <td className="py-3 px-4">{c.description}</td>
              <td className="py-3 px-4 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-500 hover:text-blue-700 transition cursor-pointer group"
                >
                  <Pencil
                    size={18}
                    className="fill-transparent stroke-current transition-colors group-hover:fill-blue-500 group-hover:stroke-transparent"
                  />
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer group"
                >
                  <Trash2
                    size={18}
                    className="fill-transparent stroke-current transition-colors group-hover:fill-red-500 group-hover:stroke-transparent"
                  />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;
