import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";
import { expenseService } from "../services/expenseService";
import { owedService } from "../services/owedService";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [owed, setOwed] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showOwedModal, setShowOwedModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(null);
  const [itemType, setItemType] = useState(null); // 'expense' or 'owed'
  const [modalState, setModalState] = useState(null); // 'view', 'edit', 'delete', or null

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setOwed([]);
      setUsersList([]);
      return;
    }

    const fetchData = async () => {
      const [fetchedExpenses, fetchedOwed, fetchedUsers] = await Promise.all([
        expenseService.getExpensesByUserId(user.id),
        owedService.getOwedForUser(user.id),
        authService.getAllUsers()
      ]);
      
      setExpenses(fetchedExpenses);
      setOwed(fetchedOwed);
      setUsersList(fetchedUsers);
    };

    fetchData();
  }, [user]);

  const addExpense = async ({ expense_text, rate, date }) => {
    if (!user) return;
    const newExpense = await expenseService.addExpense(expense_text, rate, date, user.id);
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const editExpense = async (id, updates) => {
    const updated = await expenseService.updateExpense(id, updates);
    setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
  };

  const removeExpense = async (id) => {
    await expenseService.deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addOwed = async ({ expense_text, rate, expense_date, owed_to }) => {
    if (!user) return;
    const newOwed = await owedService.addOwed(expense_text, rate, expense_date, user.id, owed_to);
    setOwed((prev) => [newOwed, ...prev]);
  };

  const editOwed = async (id, updates) => {
    const updated = await owedService.updateOwed(id, updates);
    setOwed((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  const removeOwed = async (id) => {
    await owedService.deleteOwed(id);
    setOwed((prev) => prev.filter((o) => o.id !== id));
  };

  const toggleStatus = async (id) => {
    const currentOwed = owed.find(o => o.id === id);
    if (!currentOwed) return;
    
    const newStatus = currentOwed.status === "paid" ? "pending" : "paid";
    const updated = await owedService.updateOwedStatus(id, newStatus);
    
    setOwed((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o))
    );
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        owed,
        usersList,
        addExpense,
        editExpense,
        removeExpense,
        addOwed,
        editOwed,
        removeOwed,
        toggleStatus,
        showExpenseModal,
        setShowExpenseModal,
        showOwedModal,
        setShowOwedModal,
        drawerOpen,
        setDrawerOpen,
        activeItem,
        setActiveItem,
        itemType,
        setItemType,
        modalState,
        setModalState
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
