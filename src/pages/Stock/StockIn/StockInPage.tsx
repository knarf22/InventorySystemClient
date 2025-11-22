import React, { useState } from "react";
import StockInTable from "./StockInTable";
import StockInForm from "./StockInForm";
import { Plus } from "lucide-react";

const dummyStockIn = [
  {
    stockInID: 1,
    referenceNo: "REF-1001",
    remarks: "Initial stock load",
    createdBy: "Admin",
    createdAt: "2025-01-01",
    items: [
      { productID: 1, productName: "Product A", quantity: 50 },
      { productID: 2, productName: "Product B", quantity: 30 },
    ],
  },
  {
    stockInID: 2,
    referenceNo: "REF-1001",
    remarks: "Initial stock load",
    createdBy: "Admin",
    createdAt: "2025-01-01",
    items: [
      { productID: 1, productName: "Product A", quantity: 50 },
      { productID: 2, productName: "Product B", quantity: 30 },
    ],
  },
  {
    stockInID: 3,
    referenceNo: "REF-1001",
    remarks: "Initial stock load",
    createdBy: "Admin",
    createdAt: "2025-01-01",
    items: [
      { productID: 1, productName: "Product A", quantity: 50 },
      { productID: 2, productName: "Product B", quantity: 30 },
    ],
  },
];

const StockInPage = () => {
  const [stockIns, setStockIns] = useState(dummyStockIn);
  const [open, setOpen] = useState(false);

  const handleAdd = (data: any) => {
    const newEntry = {
      stockInID: stockIns.length + 1,
      referenceNo: "REF-" + (1000 + stockIns.length + 1),
      createdAt: new Date().toISOString(),
      createdBy: data.createdBy,
      remarks: data.remarks,
      items: data.items,
    };

    setStockIns([...stockIns, newEntry]);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Stock-In</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <StockInTable stockIns={stockIns} />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-primary text-white
           px-4 py-2 rounded-lg flex 
           hover:bg-gray-200
           hover:text-indigo-600
           hover:border-1
           items-center gap-2  cursor-pointer"
          onClick={() => setOpen(true)}
        >
         <Plus size={18} />  Add Stock-In
        </button>
      </div>

      {open && (
        <StockInForm onClose={() => setOpen(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
};

export default StockInPage;
