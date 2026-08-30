import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { C, MONO_STACK } from "../utils/constants";
import { Menu, Plus, HandCoins, Wallet } from "lucide-react";
import { formatMoney } from "../utils/helpers";

export default function TopBar() {
  const { setDrawerOpen, setShowExpenseModal, setShowOwedModal, userProfile, setShowBalanceModal } = useContext(AppContext);
  const { user } = useAuth();
  
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
      <div className="flex items-center gap-2.5">
        <button onClick={() => setDrawerOpen(true)} className="p-1 -ml-1 rounded-md" style={{ color: C.textPrimary }}>
          <Menu size={20} />
        </button>
        <div className="w-7 h-7 rounded-md flex items-center justify-center hidden sm:flex" style={{ background: C.accent }}>
          <span className="text-white text-sm font-bold">S</span>
        </div>
        <span className="font-semibold text-base hidden sm:inline" style={{ color: C.textPrimary }}>Spendly</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {userProfile && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg mr-1 min-w-0" style={{ background: C.bg }}>
            <Wallet size={14} className="shrink-0" style={{ color: C.textTertiary }} />
            <span className="font-semibold text-sm truncate max-w-[80px] sm:max-w-none" style={{ color: C.textPrimary, fontFamily: MONO_STACK }}>
              ₹{formatMoney(userProfile.balance)}
            </span>
            <button 
              onClick={() => setShowBalanceModal(true)} 
              className="p-0.5 ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
            >
              <Plus size={14} style={{ color: C.textSecondary }} />
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={() => setShowOwedModal(true)} className="flex items-center justify-center gap-1.5 rounded-lg w-8 h-8 sm:w-auto sm:px-3 sm:py-2 text-sm font-medium" style={{ background: C.surface, border: `1px solid ${C.borderStrong}`, color: C.textPrimary }}>
            <HandCoins size={15} />
            <span className="hidden sm:inline">Add Owe</span>
          </button>
          <button onClick={() => setShowExpenseModal(true)} className="flex items-center justify-center gap-1.5 rounded-lg w-8 h-8 sm:w-auto sm:px-3 sm:py-2 text-sm font-medium text-white" style={{ background: C.accent }}>
            <Plus size={15} />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>
        
        {user && (
          <div className="flex items-center gap-2.5 sm:pl-4 sm:border-l" style={{ borderColor: C.border }}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: C.accentText }}>
              {initial}
            </div>
            <div className="flex flex-col hidden md:flex min-w-[80px] max-w-[150px]">
              <span className="text-sm font-semibold truncate leading-tight" style={{ color: C.textPrimary }}>{username}</span>
              <span className="text-xs truncate leading-tight mt-0.5" style={{ color: C.textSecondary }}>{user.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
