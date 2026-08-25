import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { C } from "../utils/constants";
import { X, Plus, HandCoins, LayoutDashboard, Receipt, Wallet } from "lucide-react";

const NAV_ITEMS = [
  { key: "/", label: "Dashboard", icon: LayoutDashboard },
  { key: "/expenses", label: "My Expenses", icon: Receipt },
  { key: "/owed-to-you", label: "Owed to You", icon: HandCoins },
  { key: "/owed-by-you", label: "Owed by You", icon: Wallet },
];

export default function Drawer() {
  const { drawerOpen, setDrawerOpen, setShowExpenseModal, setShowOwedModal } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!drawerOpen) return null;

  const onClose = () => setDrawerOpen(false);

  return (
    <div className="fixed inset-0 z-30 flex">
      <div className="absolute inset-0" style={{ background: "rgba(16,24,40,0.45)" }} onClick={onClose} />
      <div className="relative w-72 max-w-[80%] h-full flex flex-col" style={{ background: C.surface }}>
        <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>Menu</span>
          <button onClick={onClose} style={{ color: C.textTertiary }}><X size={18} /></button>
        </div>

        <div className="p-3 flex flex-col gap-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => { setShowExpenseModal(true); onClose(); }} className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-white" style={{ background: C.accent }}>
            <Plus size={15} /> Add Expense
          </button>
          <button onClick={() => { setShowOwedModal(true); onClose(); }} className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium" style={{ border: `1px solid ${C.borderStrong}`, color: C.textPrimary }}>
            <HandCoins size={15} /> Add Owe
          </button>
        </div>

        <nav className="p-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { navigate(item.key); onClose(); }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-left"
                style={{ background: active ? C.accentSoft : "transparent", color: active ? C.accentText : C.textPrimary }}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
