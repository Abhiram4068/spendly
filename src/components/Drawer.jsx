import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { C } from "../utils/constants";
import { X, Plus, HandCoins, LayoutDashboard, Receipt, Wallet, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { key: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "/expenses", label: "My Expenses", icon: Receipt },
  { key: "/owed-to-you", label: "Owed to You", icon: HandCoins },
  { key: "/owed-by-you", label: "Owed by You", icon: Wallet },
];

export default function Drawer() {
  const { drawerOpen, setDrawerOpen, setShowExpenseModal, setShowOwedModal } = useContext(AppContext);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!drawerOpen) return null;

  const onClose = () => setDrawerOpen(false);

  const handleSignOut = async () => {
    await signOut();
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-30 flex">
      <div className="absolute inset-0" style={{ background: "rgba(16,24,40,0.45)" }} onClick={onClose} />
      <div className="relative w-72 max-w-[80%] h-full flex flex-col" style={{ background: C.surface }}>
        <div className="flex flex-col p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0" style={{ background: C.accentText }}>
              {user ? (user?.user_metadata?.username || user?.email?.split('@')[0] || "U").charAt(0).toUpperCase() : "U"}
            </div>
            <button onClick={onClose} style={{ color: C.textTertiary }}><X size={20} /></button>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm truncate" style={{ color: C.textPrimary }}>
              {user?.user_metadata?.username || user?.email?.split('@')[0] || "User"}
            </span>
            <span className="text-xs truncate mt-0.5" style={{ color: C.textSecondary }}>
              {user?.email}
            </span>
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => { setShowExpenseModal(true); onClose(); }} className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-white" style={{ background: C.accent }}>
            <Plus size={15} /> Add Expense
          </button>
          <button onClick={() => { setShowOwedModal(true); onClose(); }} className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium" style={{ border: `1px solid ${C.borderStrong}`, color: C.textPrimary }}>
            <HandCoins size={15} /> Add Owe
          </button>
        </div>

        <nav className="p-2 flex flex-col gap-1 flex-1">
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
        
        <div className="p-3" style={{ borderTop: `1px solid ${C.border}` }}>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors hover:bg-gray-50" 
            style={{ color: C.danger }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
