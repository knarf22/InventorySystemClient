import { getStocks, type ActionStocks, type StockUpdateResponse, type UpdateStockDto } from "../api/stocksAPI";


export async function getStocksService(): Promise<ActionStocks[]> {
  return await getStocks();
}

export async function updateStocksService(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
    return await updateStock(stockUpdate);
}