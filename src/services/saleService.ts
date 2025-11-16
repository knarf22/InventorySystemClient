import {
 getSales as get,
 createSale as create,
 type Sale,
 type CreateSaleDto,
 type CreateSaleResponse,
 getTotalSales
} from "../api/saleAPI";

// 🧩 Get all
export async function getSales(): Promise<Sale[]> {
  return await get();
}

// 🧩 Create
export async function createSale(sale : CreateSaleDto): Promise<CreateSaleResponse> {
  return await create(sale);
}

// 🧩 Get total sales
export async function getTotalSalesService(): Promise<number> {
  return await getTotalSales();
}