import { C } from "../../utils/constants";
import { Check } from "lucide-react";

export default function StatusPill({ status, onToggle }) {
  const isPaid = status === "paid";
  return (
    <button onClick={onToggle} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shrink-0" style={{ background: isPaid ? C.successSoft : C.dangerSoft, color: isPaid ? C.success : C.danger }}>
      {isPaid && <Check size={12} />}
      {isPaid ? "Paid" : "Pending"}
    </button>
  );
}
