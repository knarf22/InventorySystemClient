// src/hooks/useSales.ts
import { useEffect, useState } from "react";
import { createSale, getSales } from "../services/saleService";
import type { CreateSaleDto, Sale } from "../api/saleAPI";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSale = async (newSale: CreateSaleDto) => {
    const sale = await createSale(newSale);
    setSales((prev) => [...prev, sale]);
  };



  return {
    sales,
    loading,
    addSale,
  };
}