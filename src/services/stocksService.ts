import {
  getStockActions,
  getStockIn,
  getStockOut,
  updateStock,
  type ActionStocks,
  type StockMovements,
  type StockUpdateResponse,
  type UpdateStockDto
} from "../api/stocksAPI";


export async function getStockActionsService(): Promise<ActionStocks[]> {
  return await getStockActions();
}

export async function updateStocksService(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
  return await updateStock(stockUpdate);
}

export async function getStockInService(): Promise<StockMovements[]> {
  return await getStockIn();
}

export async function getStockOutService(): Promise<StockMovements[]> {
  return await getStockOut();
}

