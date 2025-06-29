// App.jsx
import React, { useState, useEffect } from "react";
import AddClothesForm from "./components/AddClothesForm";
import ClothesList from "./components/ClothesList";
import MonthlySummary from "./components/MonthlySummary";
import { getMonthKey, loadData, saveData } from "./utils/storage";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [rate, setRate] = useState(7);
  const [monthKey, setMonthKey] = useState(getMonthKey());

  useEffect(() => {
    const data = loadData();
    if (data[monthKey]) setEntries(data[monthKey]);
    else setEntries([]);
  }, [monthKey]);

  useEffect(() => {
    const data = loadData();
    data[monthKey] = entries;
    saveData(data);
  }, [entries, monthKey]);

  const handleAdd = (entry) => setEntries([entry, ...entries]);
  
  const handleToggle = (id) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, returned: !e.returned } : e))
    );

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdate = (id, updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedEntry } : e))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4">👚 Mom's Clothes Tracker</h1>
      <AddClothesForm onAdd={handleAdd} />
      <div className="my-4">
        <label className="mr-2">Select Month:</label>
        <input
          type="month"
          value={monthKey}
          onChange={(e) => setMonthKey(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <ClothesList 
        entries={entries} 
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <MonthlySummary entries={entries} rate={rate} setRate={setRate} />
    </div>
  );
}

