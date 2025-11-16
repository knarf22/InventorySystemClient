// src/hooks/useSales.ts
import { useEffect, useState } from "react";
import { createSale, getSales, getTotalSalesService } from "../services/saleService";
import type { CreateSaleDto, Sale } from "../api/saleAPI";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalSales, setTotalSales] = useState<number>();
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
    try {
      // 1. Send the creation request
      await createSale(newSale);
      // 2. Refresh the entire list from the server to get the new sale and all necessary data
      await fetchSales();
    } catch (error) {
      console.error("Error creating or refreshing sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalSales = async () => {
    try {
      const total = await getTotalSalesService();
      setTotalSales(total);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  return {
    sales,
    loading,
    totalSales,
    fetchSales,
    addSale,
    fetchTotalSales
  };
}