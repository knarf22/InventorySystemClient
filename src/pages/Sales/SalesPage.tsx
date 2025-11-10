import { Plus } from "lucide-react";
import { useState } from "react";
import SalesTable from "./SalesTable";
import SaleForm from "./SalesForm";
import { useSales } from "../../hooks/useSales";

const SalesPage = () => {
  const { sales, addSale, loading } = useSales();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSale = async (sale: any) => {
    await addSale(sale);
    setIsModalOpen(false);
  };

  if (loading) return <div className="p-6">Loading sales...</div>;


  console.log("sale",sales)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Sales</h2>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <SalesTable sales={sales} />
      </div>

      {/* Add Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primaryHover transition"
        >
          <Plus size={18} /> Add New Sale
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative">
            <h3 className="text-xl font-semibold text-primary mb-4">Create Sale</h3>
            <SaleForm onSubmit={handleAddSale} onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;