import { useState } from "react";
import StockInFormUI from "./StockInFormUI";
import { useProduct } from "../../../hooks/useProduct";
import { useStockActions } from "../../../hooks/useStockActions";
import type { UpdateStockDto } from "../../../api/stocksAPI";
import type { CreateSaleItemDto } from "../../../api/saleAPI";



export interface StockInFormProps {
  onSubmit: (data: UpdateStockDto) => void;
  onCancel: () => void;
  saving: boolean;
}

const StockInForm = ({ onSubmit, onCancel, saving }: StockInFormProps) => {
  const { products } = useProduct();
  const { stockInActions } = useStockActions();

  const [form, setForm] = useState<{
    performedBy: string;
    remarks: string;
    actionID: number;
  }>({
    performedBy: "",
    remarks: "",
    actionID: 0,
  });

  const [items, setItems] = useState<CreateSaleItemDto[]>([
    { productID: 1, quantity: 1 },
  ]);

  const addItem = () =>
    setItems((prev) => [...prev, { productID: 1, quantity: 1 }]);

  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const handleItemChange = (
    index: number,
    field: keyof CreateSaleItemDto,
    value: number | ""
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.actionID) {
      alert("Please select a reason.");
      return;
    }

    const validItems = items.filter(
      (i) => i.productID > 0 && i.quantity > 0
    );

    if (validItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    onSubmit({
      ...form,
      items: validItems,
    });
  };

  return (
    <StockInFormUI
      form={form}
      items={items}
      products={products}
      reason={stockInActions}
      onFormChange={setForm}
      onAddItem={addItem}
      onRemoveItem={removeItem}
      onItemChange={handleItemChange}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default StockInForm;
