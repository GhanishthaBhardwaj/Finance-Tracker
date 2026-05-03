import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState("");

  // LOAD
  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    const savedBudget =
      localStorage.getItem("budget") || "";

    setExpenses(savedExpenses);
    setBudget(savedBudget);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  return (
    <AppContext.Provider
      value={{ expenses, setExpenses, budget, setBudget }}
    >
      {children}
    </AppContext.Provider>
  );
}