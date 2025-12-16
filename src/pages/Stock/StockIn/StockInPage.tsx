import React, { useState } from "react";
import StockInTable from "./StockInTable";
import StockInForm from "./StockInForm";
import { Plus } from "lucide-react";
import { useStockByType } from "../../../hooks/useStockByType";

const StockInPage = () => {
  const { stocks, loading, refetch } = useStockByType("StockIn");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStockIn = async (data: any) => {
    // Normally this should call an API
    // await createStockInService(data);

    // After saving → refetch list
    // refetch();
    console.log("yagbols")
    setIsModalOpen(false);
  };

  console.log("stocks",stocks)

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Stock-In</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <StockInTable stock={stocks} />
        )}
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
