import axios from "axios";
import { API_ROUTES, API_URL } from "../constants/apiRoutes";
import type { CreateSaleItemDto } from "./saleAPI";

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

// ✅ GET Stocks
export async function getStockActions(): Promise<ActionStocks[]> {
    const res = await axios.get<ActionStocks[]>(`${API_URL}${API_ROUTES.GET_STOCKS}`);
    return res.data;
}

// ✅ UPDATE Stock
export async function updateStock(stockUpdate: UpdateStockDto): Promise<StockUpdateResponse> {
    const res = await axios.put<StockUpdateResponse>(`${API_URL}${API_ROUTES.UPDATE_STOCK}`, stockUpdate);
    return res.data;
}