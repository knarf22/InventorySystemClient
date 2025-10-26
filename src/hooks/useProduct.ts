// src/hooks/useProduct.ts
import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import type { Product } from "../api/productAPI";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "productID" | "categoryName">) => {
    const newProduct = await createProduct(product);
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = async (id: number, product: Product) => {
    await updateProduct(id, product);
    setProducts((prev) => prev.map((p) => (p.productID === id ? product : p)));
  };

  const removeProduct = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.productID !== id));
  };

  return {
    products,
    loading,
    addProduct,
    editProduct,
    removeProduct,
    fetchProducts,
  };
};
