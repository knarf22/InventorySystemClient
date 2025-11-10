import { useState, useMemo } from "react";
import type { Product } from "../../api/productAPI";
import type { CreateSaleDto } from "../../api/saleAPI";
import { useProduct } from "../../hooks/useProduct";
import SalesFormUI from "./SalesFormUI";

interface SaleItem {
  productID: number | null;
  quantity: number;
  unitPrice: number;
  productName: string;
}

interface SaleFormProps {
  onSubmit: (sale: CreateSaleDto) => void;
  onCancel: () => void;
}

const SaleForm = ({ onSubmit, onCancel }: SaleFormProps) => {
  const { products } = useProduct();

  const productMap = useMemo(
    () =>
      products.reduce((map, product) => {
        map[product.productID] = product;
        return map;
      }, {} as Record<number, Product>),
    [products]
  );

  const [form, setForm] = useState({
    createdBy: "",
    remarks: "",
  });

  const [items, setItems] = useState<SaleItem[]>([
    { productID: null, productName: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleAddItem = () =>
    setItems((prev) => [
      ...prev,
      { productID: null, productName: "", quantity: 1, unitPrice: 0 },
    ]);

  const handleRemoveItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      const currentItem = { ...updated[index] };

      if (field === "productID" && typeof value === "number") {
        const selected = productMap[value];
        if (selected) {
          currentItem.productID = value;
          currentItem.productName = selected.productName;
          currentItem.unitPrice = selected.price;
        } else {
          currentItem.productID = null;
          currentItem.productName = "";
          currentItem.unitPrice = 0;
        }
      } else {
        (currentItem as any)[field] = value;
      }

      updated[index] = currentItem;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validItems = items.filter((item) => item.productID !== null);
    if (validItems.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const saleItemsDto = validItems.map((item) => ({
      productID: item.productID!,
      quantity: item.quantity,
    }));

    onSubmit({
      ...form,
      items: saleItemsDto,
    });
  };

  return (
    <SalesFormUI
      form={form}
      items={items}
      products={products}
      onFormChange={setForm}
      onAddItem={handleAddItem}
      onRemoveItem={handleRemoveItem}
      onItemChange={handleItemChange}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default SaleForm;
