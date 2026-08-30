import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Modal from "./Modal";
import FieldLabel from "../UI/FieldLabel";
import { C, MONO_STACK } from "../../utils/constants";
import { addBalance } from "../../services/userService";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function AddBalanceModal() {
  const { setShowBalanceModal, refreshProfile } = useContext(AppContext);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => { 
    if (!amount || isNaN(amount)) return; 
    setLoading(true);
    try {
      await addBalance(amount);
      await refreshProfile();
      setShowBalanceModal(false);
    } catch (error) {
      console.error("Error adding balance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Balance" onClose={() => setShowBalanceModal(false)}>
      <div className="space-y-3">
        <div><FieldLabel>Amount to add</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: C.textTertiary, fontFamily: MONO_STACK }}>₹</span>
            <input 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              className="w-full rounded-lg pl-6 pr-3 py-2 text-sm outline-none" 
              style={{ ...inputStyle, fontFamily: MONO_STACK }} 
            />
          </div>
        </div>
        <button 
          onClick={submit} 
          disabled={loading}
          className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2 disabled:opacity-50" 
          style={{ background: C.accent }}
        >
          {loading ? "Adding..." : "Add balance"}
        </button>
      </div>
    </Modal>
  );
}
