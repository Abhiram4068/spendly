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

  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => { 
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setErrorMsg("Please enter a valid amount greater than 0.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      await addBalance(amount);
      await refreshProfile();
      setShowBalanceModal(false);
    } catch (error) {
      console.error("Error adding balance:", error);
      setErrorMsg("Failed to add balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.activeElement?.blur();
    submit();
  };

  return (
    <Modal title="Add Balance" onClose={() => setShowBalanceModal(false)}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {errorMsg && (
          <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
            {errorMsg}
          </div>
        )}
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
        <div className="flex flex-col gap-2 mt-4">
          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:opacity-90 transition-opacity" 
            style={{ background: C.accent }}
          >
            {loading ? "Adding..." : "Add balance"}
          </button>
          <button 
            type="button"
            disabled={loading}
            onClick={() => setShowBalanceModal(false)}
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
