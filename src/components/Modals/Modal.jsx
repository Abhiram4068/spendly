import { C } from "../../utils/constants";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4" style={{ background: "rgba(16,24,40,0.45)" }}>
      <div className="w-full sm:max-w-sm rounded-2xl p-5 max-h-[90vh] overflow-y-auto flex flex-col" style={{ background: C.surface }}>
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-base font-semibold" style={{ color: C.textPrimary }}>{title}</h2>
          <button onClick={onClose} style={{ color: C.textTertiary }}><X size={20} /></button>
        </div>
        <div className="overflow-y-auto shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
