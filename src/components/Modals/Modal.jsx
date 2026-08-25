import { C } from "../../utils/constants";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(16,24,40,0.45)" }}>
      <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5" style={{ background: C.surface }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: C.textPrimary }}>{title}</h2>
          <button onClick={onClose} style={{ color: C.textTertiary }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
