import { useState } from "react";
import StockInFormUI from "./StockInFormUI";
import { useProduct } from "../../../hooks/useProduct";

export interface StockInItem {
  productID: number | "";
  productName: string;
  quantity: number;
}

export interface StockInFormProps {
  onSubmit: (data: { createdBy: string; remarks: string; items: StockInItem[] }) => void;
  onCancel: () => void;
}

const StockInForm = ({ onSubmit, onCancel }: StockInFormProps) => {
  const { products } = useProduct();
  const [form, setForm] = useState({
    createdBy: "",
    remarks: "",
  });

  const [items, setItems] = useState<StockInItem[]>([
    { productID: "", productName: "", quantity: 1 },
  ]);

  const addItem = () =>
    setItems((prev) => [...prev, { productID: "", productName: "", quantity: 1 }]);

  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const handleItemChange = <
    K extends keyof StockInItem
  >(
    index: number,
    field: K,
    value: StockInItem[K]
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter((i) => i.productName.trim() !== "");

    if (validItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    onSubmit({ ...form, items: validItems });
  };

  return (
    <StockInFormUI
      form={form}
      items={items}
      products={products}
      onFormChange={setForm}
      onAddItem={addItem}
      onRemoveItem={removeItem}
      onItemChange={handleItemChange}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default StockInForm;
