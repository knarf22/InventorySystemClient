import { getStockActions, updateStock, type ActionStocks, type StockUpdateResponse, type UpdateStockDto } from "../api/stocksAPI";


export async function getStockActionsService(): Promise<ActionStocks[]> {
  return await getStockActions();
}

export async function updateStocksService(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
    return await updateStock(stockUpdate);
}