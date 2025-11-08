// src/api/saleAPI.ts
export interface SaleItem {
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

// 🧠 Mock data
let mockSales: Sale[] = [
  {
    saleID: 1,
    transactionNo: "SLS-20251105-001",
    totalAmount: 5000,
    remarks: "Paid in cash",
    createdBy: "Yagbols",
    createdAt: "2025-11-05T09:00:00",
    items: [
      { saleItemID: 1, productName: "Mouse", quantity: 2, unitPrice: 1250 },
      { saleItemID: 2, productName: "Keyboard", quantity: 1, unitPrice: 2500 },
    ],
  },
  {
    saleID: 2,
    transactionNo: "SLS-20251105-002",
    totalAmount: 2500,
    remarks: "Pending payment",
    createdBy: "Admin",
    createdAt: "2025-11-04T14:30:00",
    items: [
      { saleItemID: 3, productName: "Monitor", quantity: 1, unitPrice: 2500 },
    ],
  },
];

// ⏱️ Simulate delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// 📦 Get all sales
export async function getSales(): Promise<Sale[]> {
  await delay(500);
  return [...mockSales];
}

// ➕ Create new sale
export async function createSale(newSale: Omit<Sale, "saleID" | "transactionNo">): Promise<Sale> {
  await delay(300);

  const newId = mockSales.length + 1;
  const sale: Sale = {
    ...newSale,
    saleID: newId,
    transactionNo: `SLS-${new Date().getFullYear()}${String(newId).padStart(3, "0")}`,
  };

  mockSales.push(sale);
  return sale;
}
