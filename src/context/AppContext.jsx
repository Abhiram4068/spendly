import { createContext, useState } from "react";
import { initialExpenses, initialOwed } from "../utils/constants";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [owed, setOwed] = useState(initialOwed);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showOwedModal, setShowOwedModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addExpense = (expense) => setExpenses((prev) => [expense, ...prev]);
  const addOwed = (owe) => setOwed((prev) => [owe, ...prev]);

  const toggleStatus = (id) => {
    setOwed((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: o.status === "paid" ? "pending" : "paid" } : o))
    );
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        owed,
        addExpense,
        addOwed,
        toggleStatus,
        showExpenseModal,
        setShowExpenseModal,
        showOwedModal,
        setShowOwedModal,
        drawerOpen,
        setDrawerOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
