export const getMonthKey = () => {
    const now = new Date();
    return now.toISOString().slice(0, 7); // "2025-06"
  };
  
  export const loadData = () => {
    try {
      return JSON.parse(localStorage.getItem("clothesData")) || {};
    } catch {
      return {};
    }
  };
  
  export const saveData = (data) => {
    localStorage.setItem("clothesData", JSON.stringify(data));
  };
  