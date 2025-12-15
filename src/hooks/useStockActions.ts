import { useMemo, useCallback, useState, useEffect } from "react";
import { getStockActionsService } from "../services/stocksService";
import type { ActionStocks } from "../api/stocksAPI";

export function useStockActions() {
  const [actionStocks, setActionStocks] = useState<ActionStocks[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStockActionsService();
      setActionStocks(data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  // 🔹 derived data (single source of truth)
  const stockInActions = useMemo(
    () => actionStocks.filter(a => a.actionType === "StockIn"),
    [actionStocks]
  );

  const stockOutActions = useMemo(
    () => actionStocks.filter(a => a.actionType === "StockOut"),
    [actionStocks]
  );

  return {
    actionStocks,
    stockInActions,
    stockOutActions,
    loading,
    refetch: fetchStocks,
  };
}
