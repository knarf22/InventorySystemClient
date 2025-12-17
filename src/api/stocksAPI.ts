import axios from "axios";
import { API_ROUTES, API_URL } from "../constants/apiRoutes";
import type { CreateSaleItemDto } from "./saleAPI";
import type { Product } from "./productAPI";

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
    const res = await axios.get<ActionStocks[]>(`${API_URL}${API_ROUTES.GET_STOCKS}`);
    return res.data;
}

// ✅ UPDATE Stock
export async function updateStock(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
  const res = await axios.post<StockUpdateResponse>(`${API_URL}${API_ROUTES.UPDATE_STOCK}`, stockUpdate);
  return res.data;
}

// ✅ GET Stock In
export async function getStockIn(): Promise<StockMovements[]> {
    const res = await axios.get<StockMovements[]>(`${API_URL}${API_ROUTES.GET_STOCK_IN}`);
    return res.data;
}


// ✅ GET Stock Out
export async function getStockOut(): Promise<StockMovements[]> {
    const res = await axios.get<StockMovements[]>(`${API_URL}${API_ROUTES.GET_STOCK_OUT}`);
    return res.data;
}

