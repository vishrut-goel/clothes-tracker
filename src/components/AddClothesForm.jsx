import React, { useState } from "react";

export default function AddClothesForm({ onAdd }) {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      item: item || "Clothes",
      qty: parseInt(qty),
      date: new Date().toISOString().split("T")[0],
      returned: false,
    };
    onAdd(newEntry);
    setItem("");
    setQty(1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <input
        type="text"
        placeholder="Item (optional)"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Clothes
      </button>
    </form>
  );
}