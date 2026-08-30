import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Modal from "./Modal";
import FieldLabel from "../UI/FieldLabel";
import { C, MONO_STACK } from "../../utils/constants";
import { todayISO } from "../../utils/helpers";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function AddExpenseModal() {
  const { setShowExpenseModal, addExpense, userProfile } = useContext(AppContext);
  const [expenseText, setExpenseText] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(todayISO());
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => { 
    if (!expenseText.trim() || !rate) return; 
    setErrorMsg("");
    
    const amount = parseFloat(rate);
    
    if (userProfile && amount > userProfile.balance) {
      setErrorMsg("Insufficient balance for this expense.");
      return;
    }

    try {
      await addExpense({ expense_text: expenseText.trim(), rate: amount, date }); 
      setShowExpenseModal(false);
    } catch (err) {
      setErrorMsg(err.message || "Failed to add expense.");
    }
  };

  return (
    <Modal title="Add expense" onClose={() => setShowExpenseModal(false)}>
      <div className="space-y-3">
        {errorMsg && (
          <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
            {errorMsg}
          </div>
        )}
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
        <button onClick={submit} className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2 hover:opacity-90 transition-opacity" style={{ background: C.accent }}>Add expense</button>
      </div>
    </Modal>
  );
}
