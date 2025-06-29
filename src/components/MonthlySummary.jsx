import React from "react";

export default function MonthlySummary({ entries, rate, setRate }) {
  const total = entries.reduce((sum, e) => sum + e.qty, 0);

  return (
    <div className="mt-6 border-t pt-4">
      <div className="mb-2">
        <label className="mr-2">Rate per cloth (₹):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      <p>
        Total Clothes: <strong>{total}</strong>
      </p>
      <p>
        Total Amount: <strong>₹{total * rate}</strong>
      </p>
    </div>
  );
}