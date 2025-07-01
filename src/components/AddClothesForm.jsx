// components/AddClothesForm.jsx
import React, { useState } from "react";

export default function AddClothesForm({ onAdd }) {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(7); // Default price

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      item: item || "Clothes",
      qty: parseInt(qty),
      price: parseFloat(price),
      date: new Date().toISOString().split("T")[0],
      returned: false,
    };
    onAdd(newEntry);
    setItem("");
    setQty(1);
    setPrice(7); // Reset to default
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Item name (e.g., Saree, Shirt)"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />
      <div className="flex gap-2 w-full">
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <div className="flex items-center">
          <span className="text-sm mr-1">₹</span>
          <input
            type="number"
            min="0"
            step="0.5"
            placeholder="Price each"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Add Clothes
      </button>
    </form>
  );
}