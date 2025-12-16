import { useState, useCallback, useEffect } from "react";
import type { StockMovements } from "../api/stocksAPI";
import { getStockInService, getStockOutService } from "../services/stocksService";

export function useStockByType(actionType: "StockIn" | "StockOut") {
  const [stocks, setStocks] = useState<StockMovements[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    try {
      let data: StockMovements[] = [];
      if (actionType === "StockIn") {
        data = await getStockInService();
      } else if (actionType === "StockOut") {
        data = await getStockOutService();
      }
      setStocks(data);
    } catch (err) {
      console.error(`Error fetching ${actionType} stocks:`, err);
    } finally {
      setLoading(false);
    }
  }, [actionType]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return { stocks, loading, refetch: fetchStocks };
}
