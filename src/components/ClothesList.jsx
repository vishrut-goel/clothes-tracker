// components/ClothesList.jsx
import React, { useState } from "react";

export default function ClothesList({ entries, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ item: "", qty: 1, price: 7 });

  if (!entries.length) return <p className="text-gray-500">No entries yet.</p>;

  const handleEditStart = (entry) => {
    setEditingId(entry.id);
    setEditData({ 
      item: entry.item, 
      qty: entry.qty, 
      price: entry.price || 7 // Fallback for old entries without price
    });
  };

  const handleEditSave = (id) => {
    onUpdate(id, {
      item: editData.item || "Clothes",
      qty: parseInt(editData.qty),
      price: parseFloat(editData.price)
    });
    setEditingId(null);
    setEditData({ item: "", qty: 1, price: 7 });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ item: "", qty: 1, price: 7 });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDelete(id);
    }
  };

  return (
    <ul className="text-left space-y-2">
      {entries.map((e) => (
        <li key={e.id} className="border rounded p-3 bg-gray-50">
          {editingId === e.id ? (
            // Edit mode
            <div className="space-y-2">
              <input
                type="text"
                value={editData.item}
                onChange={(evt) => setEditData({ ...editData, item: evt.target.value })}
                placeholder="Item name"
                className="w-full border rounded px-2 py-1 text-sm"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={editData.qty}
                    onChange={(evt) => setEditData({ ...editData, qty: evt.target.value })}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={editData.price}
                    onChange={(evt) => setEditData({ ...editData, price: evt.target.value })}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleEditSave(e.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={e.returned}
                  onChange={() => onToggle(e.id)}
                />
                <div className={e.returned ? "line-through text-gray-500" : ""}>
                  <div className="font-medium">
                    {e.date} | {e.item} × {e.qty}
                  </div>
                  <div className="text-sm text-gray-600">
                    ₹{(e.price || 7).toFixed(1)} each = ₹{((e.price || 7) * e.qty).toFixed(1)} total
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditStart(e)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

