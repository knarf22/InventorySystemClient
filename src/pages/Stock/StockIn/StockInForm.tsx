import React, { useState } from "react";
import StockInFormUI from "./StockInFormUI";

const dummyProducts = [
  { productID: 1, productName: "Product A" },
  { productID: 2, productName: "Product B" },
  { productID: 3, productName: "Product C" },
];

type Props = {
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const StockInForm = ({ onClose, onSubmit }: Props) => {
  const [createdBy, setCreatedBy] = useState("Admin");
  const [remarks, setRemarks] = useState("");
  const [items, setItems] = useState<
    { productID: number; productName: string; quantity: number }[]
  >([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        productID: dummyProducts[0].productID,
        productName: dummyProducts[0].productName,
        quantity: 1,
      },
    ]);
  };

  const updateItem = (index: number, key: string, value: any) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][key] = value;
    setItems(updated);
  };

  const submit = () => {
    onSubmit({ createdBy, remarks, items });
    onClose();
  };

  return (
    <StockInFormUI
      onClose={onClose}
      onSubmit={submit}
      createdBy={createdBy}
      setCreatedBy={setCreatedBy}
      remarks={remarks}
      setRemarks={setRemarks}
      items={items}
      addItem={addItem}
      updateItem={updateItem}
      products={dummyProducts}
    />
  );
};

export default StockInForm;
