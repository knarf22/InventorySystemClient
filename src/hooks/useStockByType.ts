import { useState, useCallback, useEffect } from "react";
import type { StockMovements } from "../api/stocksAPI";
import { getStockInService } from "../services/stocksService";

export function useStockIn() {
  const [stockIn, setStockIn] = useState<StockMovements[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStockIn = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStockInService();
      setStockIn(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStockIn();
  }, [fetchStockIn]);

  return { stockIn, loading, refetch: fetchStockIn };
}
