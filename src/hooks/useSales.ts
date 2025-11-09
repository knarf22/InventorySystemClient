// src/hooks/useSales.ts
import { useEffect, useState } from "react";
import { getSales, createSale, type Sale } from "../api/saleAPI";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    setLoading(true);
    const data = await getSales();
    setSales(data);
    setLoading(false);
  };

  const addSale = async (newSale: Omit<Sale, "saleID" | "transactionNo">) => {
    const sale = await createSale(newSale);
    setSales((prev) => [...prev, sale]);
  };

  return {
    sales,
    loading,
    addSale,
  };
}