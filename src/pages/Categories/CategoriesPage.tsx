import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import { useCategory } from "../../hooks/useCategory";

export interface Category {
  id: number;
  name: string;
  description: string;
}

const CategoriesPage = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    saveCategory,
    removeCategory,
  } = useCategory();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Load categories when mounted
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add or update
  const handleAddOrUpdate = async (category: Category) => {
    const payload =
      editingCategory === null
        ? {
            // ➕ New category → POST
            categoryName: category.name,
            description: category.description,
          }
        : {
            // ✏️ Editing existing → PUT
            categoryID: category.id,
            categoryName: category.name,
            description: category.description,
          };

    await saveCategory(payload);
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // ✅ Delete
  const handleDelete = async (id: number) => {
    await removeCategory(id);
  };

  // ✅ Edit button clicked
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  // ✅ Open “Add New” modal
  const handleOpenModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Categories</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <CategoryTable
          categories={categories.map((c) => ({
            id: c.categoryID,
            name: c.categoryName,
            description: c.description ?? "",
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ✅ Add New Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleOpenModal}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primaryHover transition"
        >
          <Plus size={18} /> Add New Category
        </button>
      </div>

      {/* ✅ Modal */}
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
