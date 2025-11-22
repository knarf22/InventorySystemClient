import React from "react";

type Props = {
  onClose: () => void;
  onSubmit: () => void;
  createdBy: string;
  setCreatedBy: (v: string) => void;
  remarks: string;
  setRemarks: (v: string) => void;
  items: any[];
  addItem: () => void;
  updateItem: (index: number, key: string, value: any) => void;
  products: any[];
};

const StockInFormUI = ({
  onClose,
  onSubmit,
  createdBy,
  setCreatedBy,
  remarks,
  setRemarks,
  items,
  addItem,
  updateItem,
  products,
}: Props) => {
  return (
    <div>
      <h2>Stock In Form</h2>

      <label>Created By</label>
      <input
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
      />

      <label>Remarks</label>
      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <button onClick={addItem}>Add Item</button>

      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.productID}
            onChange={(e) =>
              updateItem(index, "productID", parseInt(e.target.value))
            }
          >
            {products.map((p) => (
              <option key={p.productID} value={p.productID}>
                {p.productName}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", parseInt(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default StockInFormUI;
