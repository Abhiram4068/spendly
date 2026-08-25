import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { C } from "../utils/constants";
import { Menu, Plus, HandCoins } from "lucide-react";

export default function TopBar() {
  const { setDrawerOpen, setShowExpenseModal, setShowOwedModal } = useContext(AppContext);
  
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
      <div className="flex items-center gap-2.5">
        <button onClick={() => setDrawerOpen(true)} className="p-1 -ml-1 rounded-md" style={{ color: C.textPrimary }}>
          <Menu size={20} />
        </button>
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: C.accent }}>
          <span className="text-white text-sm font-bold">L</span>
        </div>
        <span className="font-semibold text-base hidden xs:inline" style={{ color: C.textPrimary }}>Ledger</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setShowOwedModal(true)} className="flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-2 text-sm font-medium" style={{ background: C.surface, border: `1px solid ${C.borderStrong}`, color: C.textPrimary }}>
          <HandCoins size={16} />
          <span className="hidden sm:inline">Add Owe</span>
        </button>
        <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-2 text-sm font-medium text-white" style={{ background: C.accent }}>
          <Plus size={16} />
          <span className="hidden sm:inline">Add Expense</span>
        </button>
      </div>
    </div>
  );
}
