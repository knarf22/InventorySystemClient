import { useMemo, useCallback, useState } from "react";
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

  // Example: Memoized computed values (optional)
  const totalStocks = useMemo(() => actionStocks.length, [actionStocks]);

  return {
    actionStocks,
    loading,
    fetchStocks,
    totalStocks,
  };
}
