import { useState } from "react";
import { Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

export interface Category {
  id: number;
  name: string;
  description: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOrUpdate = (category: Category) => {
    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? category : c))
      );
    } else {
      // Add new
      setCategories((prev) => [...prev, category]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Categories</h2>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add New Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleOpenModal}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primaryHover transition"
        >
          <Plus size={18} /> Add New Category
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <CategoryForm
              onSubmit={handleAddOrUpdate}
              editingCategory={editingCategory}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
