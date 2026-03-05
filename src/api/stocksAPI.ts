import { API_ROUTES } from "../constants/apiRoutes";
import type { CreateSaleItemDto } from "./saleAPI";
import type { Product } from "./productAPI";
import api from "./axios";

export interface ActionStocks {
    actionID: number;
    actionName: string;
    actionType: string;
}

export interface UpdateStockDto {
    actionID: number;
    remarks: string;
    performedBy: string;
    items: CreateSaleItemDto[]; // Uses the simpler input item structure
}

export interface StockUpdateResponse {
    message: string;
    transactionNo: string;
    actionType: string;
}

export interface StockMovements {
    movementID : number;
    productID : number;
    changeType : string;
    quantityChange : number;
    movementDate : Date;
    referenceNo : string;
    performedBy : string;
    remarks : string;
    product : Product;
}


// ✅ GET Stocks
export async function getStockActions(): Promise<ActionStocks[]> {
    const res = await api.get<ActionStocks[]>(API_ROUTES.GET_STOCKS);
    return res.data;
}

// ✅ UPDATE Stock
export async function updateStock(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
  const res = await api.post<StockUpdateResponse>(API_ROUTES.UPDATE_STOCK, stockUpdate);
  return res.data;
}

// ✅ GET Stock In
export async function getStockIn(): Promise<StockMovements[]> {
    const res = await api.get<StockMovements[]>(API_ROUTES.GET_STOCK_IN);
    return res.data;
}


// ✅ GET Stock Out
export async function getStockOut(): Promise<StockMovements[]> {
    const res = await api.get<StockMovements[]>(API_ROUTES.GET_STOCK_OUT);
    return res.data;
}

