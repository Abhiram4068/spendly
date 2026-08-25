import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Modal from "./Modal";
import FieldLabel from "../UI/FieldLabel";
import { C, MONO_STACK, FAMILY } from "../../utils/constants";
import { todayISO } from "../../utils/helpers";
import { ChevronDown } from "lucide-react";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function AddOwedModal() {
  const { setShowOwedModal, addOwed } = useContext(AppContext);
  const [text, setText] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(todayISO());
  const [owedTo, setOwedTo] = useState(FAMILY[1].id);

  const submit = () => { 
    if (!text.trim() || !rate) return; 
    addOwed({ id: Date.now(), text: text.trim(), rate: parseFloat(rate), date, owedBy: "you", owedTo, status: "pending" }); 
    setShowOwedModal(false);
  };

  return (
    <Modal title="Add owed" onClose={() => setShowOwedModal(false)}>
      <div className="space-y-3">
        <div><FieldLabel>Expense</FieldLabel>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Dinner split" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        <div><FieldLabel>Rate</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: C.textTertiary, fontFamily: MONO_STACK }}>$</span>
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full rounded-lg pl-6 pr-3 py-2 text-sm outline-none" style={{ ...inputStyle, fontFamily: MONO_STACK }} />
          </div>
        </div>
        <div><FieldLabel>Date</FieldLabel>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
        </div>
        <div><FieldLabel>Owed by</FieldLabel>
          <div className="relative">
            <select value={owedTo} onChange={(e) => setOwedTo(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none appearance-none" style={inputStyle}>
              {FAMILY.filter((f) => f.id !== "you").map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
          </div>
        </div>
        <button onClick={submit} className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2" style={{ background: C.accent }}>Add owed</button>
      </div>
    </Modal>
  );
}
