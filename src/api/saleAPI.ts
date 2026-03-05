import { API_ROUTES } from "../constants/apiRoutes";
import api from "./axios";

export interface SaleItem {
    productId: number;
    saleItemID: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface Sale {
    saleID: number;
    transactionNo: string;
    totalAmount: number;
    remarks: string;
    createdBy: string;
    createdAt: string;
    items: SaleItem[];
}


export interface CreateSaleItemDto {
    productID: number;
    quantity: number;
}

export interface CreateSaleDto {
    remarks: string;
    createdBy: string;
    items: CreateSaleItemDto[]; // Uses the simpler input item structure
}

export interface CreateSaleResponse {
    Message: string;
    transactionNo: string; // Matches result.TransactionNo
    saleID: number;        // Matches result.SaleID 
}

// ✅ GET
export async function getSales(): Promise<Sale[]> {
    const res = await api.get<Sale[]>(API_ROUTES.GET_SALES);
    return res.data;
}

// ✅ POST
export async function createSale(sale: CreateSaleDto): Promise<CreateSaleResponse> {
    const res = await api.post<CreateSaleResponse>(API_ROUTES.CREATE_SALE, sale);
    return res.data;
}
// ✅ GET Total Sales
export async function getTotalSales(): Promise<number> {
    const res = await api.get<number>(API_ROUTES.GET_TOTAL_SALES);
    return res.data;
}