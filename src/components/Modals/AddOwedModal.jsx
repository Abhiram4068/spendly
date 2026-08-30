import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import Modal from "./Modal";
import FieldLabel from "../UI/FieldLabel";
import { C, MONO_STACK } from "../../utils/constants";
import { todayISO } from "../../utils/helpers";
import { ChevronDown } from "lucide-react";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function AddOwedModal() {
  const { setShowOwedModal, addOwed, usersList } = useContext(AppContext);
  const { user } = useAuth();
  
  const availableUsers = usersList.filter((u) => u.id !== user?.id);

  const [expenseText, setExpenseText] = useState("");
  const [rate, setRate] = useState("");
  const [expenseDate, setExpenseDate] = useState(todayISO());
  const [owedTo, setOwedTo] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (availableUsers.length > 0 && !owedTo) {
      setOwedTo(availableUsers[0].id);
    }
  }, [availableUsers, owedTo]);

  const submit = () => { 
    if (!expenseText.trim() || !rate || !owedTo) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    setErrorMsg("");
    addOwed({ expense_text: expenseText.trim(), rate: parseFloat(rate), expense_date: expenseDate, owed_to: owedTo }); 
    setShowOwedModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.activeElement?.blur();
    submit();
  };

  return (
    <Modal title="Add owed" onClose={() => setShowOwedModal(false)}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {errorMsg && (
          <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
            {errorMsg}
          </div>
        )}
        <div><FieldLabel>Expense</FieldLabel>
          <input value={expenseText} onChange={(e) => setExpenseText(e.target.value)} placeholder="e.g. Dinner split" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        <div><FieldLabel>Amount</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: C.textTertiary, fontFamily: MONO_STACK }}>₹</span>
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full rounded-lg pl-6 pr-3 py-2 text-sm outline-none" style={{ ...inputStyle, fontFamily: MONO_STACK }} />
          </div>
        </div>
        <div><FieldLabel>Date</FieldLabel>
          <input value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} type="date" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        <div><FieldLabel>Owed by</FieldLabel>
          <div className="relative">
            <select 
              value={owedTo} 
              onChange={(e) => setOwedTo(e.target.value)} 
              disabled={availableUsers.length === 0}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none appearance-none disabled:opacity-50" 
              style={inputStyle}
            >
              {availableUsers.length === 0 ? (
                <option value="" disabled>No users found</option>
              ) : (
                availableUsers.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)
              )}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <button 
            type="submit"
            disabled={availableUsers.length === 0}
            className="w-full rounded-lg py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:opacity-90 transition-opacity" 
            style={{ background: C.accent }}
          >
            Add owed
          </button>
          <button 
            type="button"
            onClick={() => setShowOwedModal(false)}
            className="w-full rounded-lg py-2.5 text-sm font-medium transition-opacity" 
            style={{ background: C.bg, color: C.textPrimary, border: `1px solid ${C.borderStrong}` }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
