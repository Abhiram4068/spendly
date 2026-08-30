import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import Modal from "./Modal";
import FieldLabel from "../UI/FieldLabel";
import { C, MONO_STACK } from "../../utils/constants";
import { ChevronDown } from "lucide-react";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function EditModal() {
  const { activeItem, itemType, setModalState, editExpense, editOwed, usersList } = useContext(AppContext);
  const { user } = useAuth();

  const [expenseText, setExpenseText] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [status, setStatus] = useState("pending");

  const isOwed = itemType === "owed";
  const availableUsers = usersList.filter((u) => u.id !== user?.id);

  useEffect(() => {
    if (activeItem) {
      setExpenseText(activeItem.expense_text);
      setRate(activeItem.rate);
      setDate(activeItem.expense_date || activeItem.date);
      if (isOwed) {
        setOtherUser(activeItem.owed_by === user?.id ? activeItem.owed_to : activeItem.owed_by);
        setStatus(activeItem.status || "pending");
      }
    }
  }, [activeItem, isOwed, user]);

  if (!activeItem) return null;

  const submit = () => {
    if (!expenseText.trim() || !rate || (isOwed && !otherUser)) return;
    
    if (isOwed) {
      editOwed(activeItem.id, {
        expense_text: expenseText.trim(),
        rate: parseFloat(rate),
        expense_date: date,
        owed_by: activeItem.owed_by === user?.id ? user?.id : otherUser,
        owed_to: activeItem.owed_to === user?.id ? user?.id : otherUser,
        status: status,
      });
    } else {
      editExpense(activeItem.id, {
        expense_text: expenseText.trim(),
        rate: parseFloat(rate),
        date: date
      });
    }
    setModalState(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.activeElement?.blur();
    submit();
  };

  return (
    <Modal title={isOwed ? "Edit owed" : "Edit expense"} onClose={() => setModalState(null)}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><FieldLabel>Expense</FieldLabel>
          <input value={expenseText} onChange={(e) => setExpenseText(e.target.value)} placeholder="e.g. Groceries" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        <div><FieldLabel>Amount</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: C.textTertiary, fontFamily: MONO_STACK }}>₹</span>
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full rounded-lg pl-6 pr-3 py-2 text-sm outline-none" style={{ ...inputStyle, fontFamily: MONO_STACK }} />
          </div>
        </div>
        <div><FieldLabel>Date</FieldLabel>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        
        {isOwed && (
          <>
            <div><FieldLabel>Person involved</FieldLabel>
              <div className="relative">
                <select value={otherUser} onChange={(e) => setOtherUser(e.target.value)} disabled={availableUsers.length === 0} className="w-full rounded-lg px-3 py-2 text-sm outline-none appearance-none disabled:opacity-50" style={inputStyle}>
                  {availableUsers.length === 0 ? (
                    <option value="" disabled>No users found</option>
                  ) : (
                    availableUsers.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)
                  )}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
              </div>
            </div>
            
            <div><FieldLabel>Status</FieldLabel>
              <div className="relative">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none appearance-none" style={inputStyle}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
              </div>
            </div>
          </>
        )}

        <button type="submit" className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2 hover:opacity-90 transition-opacity" style={{ background: C.accent }}>Save changes</button>
      </form>
    </Modal>
  );
}
