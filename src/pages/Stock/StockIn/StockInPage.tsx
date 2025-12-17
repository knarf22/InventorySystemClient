import { useState } from "react";
import StockInTable from "./StockInTable";
import StockInForm from "./StockInForm";
import { Plus } from "lucide-react";
import { useStockByType } from "../../../hooks/useStockByType";
import { useStocks } from "../../../hooks/useStocks";
import type { UpdateStockDto } from "../../../api/stocksAPI";

const StockInPage = () => {
  const { stocks, loading, refetch } = useStockByType("StockIn");
  const { updateStock, loading: saving } = useStocks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStockIn = async (data: UpdateStockDto) => {
    try {
      await updateStock(data);   // ✅ CALL API
      setIsModalOpen(false);     // ✅ CLOSE MODAL
      refetch();                 // ✅ REFRESH TABLE
    } catch (err) {
      console.error("Failed to create stock-in", err);
      alert("Failed to save stock-in.");
    }
  };

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
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockInPage;
