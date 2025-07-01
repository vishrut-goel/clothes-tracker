import React from "react";

export default function MonthlySummary({ entries }) {
  const totalClothes = entries.reduce((sum, e) => sum + e.qty, 0);

  // Calculate total using individual prices
  const totalWithIndividualPrices = entries.reduce((sum, e) => {
    return sum + (e.price * e.qty);
  }, 0);

  // Check if any entries have individual prices
  const hasIndividualPrices = entries.some(e => e.price !== undefined);

  return (
    <div className="mt-6 border-t pt-4">
      {/* Summary */}
      <div className="space-y-2">
        <p className="flex justify-between">
          <span>Total Clothes:</span>
          <strong>{totalClothes}</strong>
        </p>
        
        {hasIndividualPrices ? (
          <p className="flex justify-between text-green-600">
            <span>Total Amount (Individual Prices):</span>
            <strong>₹{totalWithIndividualPrices.toFixed(1)}</strong>
          </p>
        ) : (
          <p className="flex justify-between">
            <span>Total Amount:</span>
            <strong>₹{totalWithIndividualPrices.toFixed(1)}</strong>
          </p>
        )}
      </div>

      {/* Price breakdown by item type */}
      {hasIndividualPrices && entries.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h4 className="text-sm font-medium mb-2">Price Breakdown:</h4>
          <div className="space-y-1 text-sm">
            {Object.values(entries.reduce((acc, entry) => {
              const key = `${entry.item}-${entry.price}`;
              if (!acc[key]) {
                acc[key] = { 
                  item: entry.item, 
                  price: entry.price, 
                  qty: 0, 
                  total: 0 
                };
              }
              acc[key].qty += entry.qty;
              acc[key].total += entry.price * entry.qty;
              return acc;
            }, {}))
            .map((group, index) => (
              <div key={index} className="flex justify-between">
                <span>{group.item} (₹{group.price}) × {group.qty}:</span>
                <span>₹{group.total.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}