import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import Modal from "./Modal";
import { C, MONO_STACK } from "../../utils/constants";
import { formatMoney, nameOf } from "../../utils/helpers";
import StatusPill from "../UI/StatusPill";

export default function ViewModal() {
  const { activeItem, itemType, setModalState, toggleStatus, usersList } = useContext(AppContext);
  const { user } = useAuth();

  if (!activeItem) return null;

  const isOwed = itemType === "owed";

  const InfoRow = ({ label, value, render }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 sm:py-2 border-b last:border-0 gap-1 sm:gap-4" style={{ borderColor: C.border }}>
      <span className="text-sm font-medium shrink-0" style={{ color: C.textSecondary }}>{label}</span>
      <div className="text-sm sm:text-right font-medium max-h-32 overflow-y-auto break-words" style={{ color: C.textPrimary }}>
        {render ? render() : value}
      </div>
    </div>
  );

  return (
    <Modal title={isOwed ? "Owed Details" : "Expense Details"} onClose={() => setModalState(null)}>
      <div className="flex flex-col gap-4 mt-2">
        <div className="p-4 rounded-xl flex items-center justify-center flex-col" style={{ background: C.bg }}>
          <span className="text-sm font-medium" style={{ color: C.textTertiary }}>Amount</span>
          <span className="text-3xl font-bold mt-1" style={{ color: C.textPrimary, fontFamily: MONO_STACK }}>₹{formatMoney(activeItem.rate)}</span>
        </div>
        
        <div className="border rounded-xl px-4 py-1" style={{ borderColor: C.border }}>
          <InfoRow label="Expense" value={activeItem.expense_text} />
          {!isOwed && activeItem.categories?.name && (
            <InfoRow label="Category" value={activeItem.categories.name} />
          )}
          <InfoRow label="Date" value={new Date((activeItem.expense_date || activeItem.date) + "T00:00:00").toLocaleDateString()} />
          
          {isOwed && (
            <>
              <InfoRow label="Creditor (Owed to)" value={activeItem.owed_by === user?.id ? "You" : nameOf(activeItem.owed_by, usersList)} />
              <InfoRow label="Debtor (Owed by)" value={activeItem.owed_to === user?.id ? "You" : nameOf(activeItem.owed_to, usersList)} />
              <InfoRow 
                label="Status" 
                render={() => <StatusPill status={activeItem.status} onToggle={() => toggleStatus(activeItem.id)} />} 
              />
            </>
          )}
        </div>

        <button 
          onClick={() => setModalState(null)} 
          className="w-full rounded-lg py-2.5 text-sm font-medium transition-colors"
          style={{ background: C.bg, color: C.textPrimary }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
