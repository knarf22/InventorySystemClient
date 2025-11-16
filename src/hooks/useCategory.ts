import { useState, useEffect } from "react";
import type { Category } from "../api/categoryAPI";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTotalCategoriesService,
} from "../services/categoryService";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or update
  const saveCategory = async (category: Partial<Category>) => {
    setLoading(true);
    setError(null);
    try {
      if (category.categoryID && category.categoryID > 0) {
        // ✏️ Update existing
        await updateCategory(category.categoryID, category as Category);
      } else {
        // ➕ Create new
        const newCat = await createCategory({
          categoryName: category.categoryName!,
          description: category.description,
        });
        setCategories((prev) => [...prev, newCat]);
      }
      await fetchCategories();
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const removeCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.categoryID !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCategories = async () => {
    try {
      const total = await getTotalCategoriesService();
      setTotalCategories(total);
    } catch (error) {
      console.error("Error fetching total categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    totalCategories,
    loading,
    error,
    fetchCategories,
    saveCategory,
    removeCategory,
    fetchTotalCategories,
  };
}
