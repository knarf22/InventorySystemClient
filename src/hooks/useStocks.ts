// src/hooks/useStocks.ts
import { useState } from "react";
import { updateStocksService } from "../services/stocksService";
import type { UpdateStockDto } from "../api/stocksAPI";

export function useStocks() {
  const [loading, setLoading] = useState(false);

  // 🔥 Update stock (stored procedure)
  const updateStock = async (update: UpdateStockDto) => {
    try {
      setLoading(true);
      await updateStocksService(update);
    } catch (err) {
      console.error("Error updating stock:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateStock,
  };
}
