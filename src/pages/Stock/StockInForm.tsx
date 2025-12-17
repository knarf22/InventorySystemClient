// src/components/Stock/StockForm.tsx
import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import type { UpdateStockDto } from "../../api/stocksAPI";
import type { CreateSaleItemDto } from "../../api/saleAPI";
import type { ActionStocks } from "../../api/stocksAPI";
import StockFormUI from "./StockFormUI";

export interface StockFormProps {
  type: "in" | "out"; // determines Stock-In or Stock-Out
  actions: ActionStocks[]; // pass corresponding actions
  onSubmit: (data: UpdateStockDto) => void;
  onCancel: () => void;
  saving: boolean;
}

const StockForm = ({ type, actions, onSubmit, onCancel, saving }: StockFormProps) => {
  const { products } = useProduct();

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
    { productID: 0, quantity: 1 },
  ]);

  const addItem = () =>
    setItems((prev) => [...prev, { productID: 0, quantity: 1 }]);

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
    <StockFormUI
      type={type}
      form={form}
      items={items}
      products={products}
      reason={actions}
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

export default StockForm;
