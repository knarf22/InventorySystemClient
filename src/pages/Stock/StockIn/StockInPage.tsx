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
    referenceNo: "REF-1002",
    remarks: "New supplies",
    createdBy: "Admin",
    createdAt: "2025-01-02",
    items: [
      { productID: 3, productName: "Product C", quantity: 15 },
      { productID: 4, productName: "Product D", quantity: 20 },
    ],
  },
];

const StockInPage = () => {
  const [stockIns, setStockIns] = useState(dummyStockIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStockIn = (data: any) => {
    const newEntry = {
      stockInID: stockIns.length + 1,
      referenceNo: "REF-" + (1000 + stockIns.length + 1),
      createdAt: new Date().toISOString(),
      createdBy: data.createdBy,
      remarks: data.remarks,
      items: data.items,
    };

    setStockIns([...stockIns, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Stock-In</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <StockInTable stockIns={stockIns} />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 
            hover:bg-gray-200 hover:text-primary cursor-pointer"
        >
          <Plus size={18} /> Add Stock-In
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Create Stock-In
            </h3>

            <StockInForm
              onSubmit={handleAddStockIn}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockInPage;
