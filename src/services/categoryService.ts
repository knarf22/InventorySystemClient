import {
  getCategories as apiGet,
  createCategory as apiCreate,
  updateCategory as apiUpdate,
  deleteCategory as apiDelete,
} from "../api/categoryAPI";

export const getCategories = apiGet;
export const createCategory = apiCreate;
export const updateCategory = apiUpdate;
export const deleteCategory = apiDelete;
