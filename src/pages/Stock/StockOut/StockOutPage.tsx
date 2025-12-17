import { useState } from "react";
import { Plus } from "lucide-react";
import { useStockByType } from "../../../hooks/useStockByType";
import { useStocks } from "../../../hooks/useStocks";
import type { UpdateStockDto } from "../../../api/stocksAPI";
import { useStockActions } from "../../../hooks/useStockActions";
import StockTable from "../StockTable";
import StockForm from "../StockInForm";

const StockOutPage = () => {
  const { stocks, loading, refetch } = useStockByType("StockOut");
  const { stockOutActions } = useStockActions();
  const { updateStock, loading: saving } = useStocks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStockOut = async (data: UpdateStockDto) => {
    try {
      await updateStock(data);   // ✅ CALL API
      setIsModalOpen(false);     // ✅ CLOSE MODAL
      refetch();                 // ✅ REFRESH TABLE
    } catch (err) {
      console.error("Failed to create stock-out", err);
      alert("Failed to save stock-out.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Stock-Out</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <StockTable stock={stocks} />
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 
          hover:bg-gray-200 hover:text-primary cursor-pointer"
        >
          <Plus size={18} /> Add Stock-Out
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Create Stock-Out
            </h3>

            <StockForm
              type="out"
              actions={stockOutActions}
              onSubmit={handleAddStockOut}
              onCancel={() => setIsModalOpen(false)}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockOutPage;
