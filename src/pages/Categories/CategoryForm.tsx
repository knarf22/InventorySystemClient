import { useEffect, useState } from "react";
import type { Category } from "./CategoriesPage";

interface CategoryFormProps {
  onSubmit: (category: Category) => void;
  editingCategory: Category | null;
  onCancel: () => void;
}

const CategoryForm = ({ onSubmit, editingCategory, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editingCategory) {
      const { id, ...rest } = editingCategory;
      setFormData(rest);
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: editingCategory ? editingCategory.id : Date.now(),
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 
        placeholder-gray-400 text-gray-900
        focus:ring-2 focus:ring-primary focus:outline-none"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
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
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition cursor-pointer"
        >
          {editingCategory ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
