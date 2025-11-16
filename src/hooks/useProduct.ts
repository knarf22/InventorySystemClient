// src/hooks/useProduct.ts
import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, getLowStockProductsService, getTotalProductsService } from "../services/productService";
import type { Product } from "../api/productAPI";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>();
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

  const fetchLowStockProducts = async () => {
    try {
      const data = await getLowStockProductsService();
      setLowStockProducts(data);
    } catch (error) {
      console.error("Error fetching low stock products:", error);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const total = await getTotalProductsService();
      setTotalProducts(total);
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  return {
    products,
    loading,
    totalProducts,
    lowStockProducts,
    addProduct,
    editProduct,
    removeProduct,
    fetchProducts,
    fetchLowStockProducts,
    fetchTotalProducts,
  };
};
