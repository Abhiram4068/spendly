import { C, MONO_STACK } from "../../utils/constants";
import { formatMoney } from "../../utils/helpers";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ListRow({ text, date, rate, right, onView, onEdit, onDelete }) {
  const d = new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0" style={{ borderColor: C.border }}>
      <div className="flex flex-col min-w-0 pr-2">
        <span className="font-medium text-sm truncate" style={{ color: C.textPrimary }}>{text}</span>
        <span className="text-xs mt-0.5" style={{ color: C.textTertiary }}>{d}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <span className="font-semibold text-sm whitespace-nowrap" style={{ color: C.textPrimary, fontFamily: MONO_STACK }}>
          ₹{formatMoney(rate)}
        </span>
        {right}
        {(onView || onEdit || onDelete) && (
          <div className="flex items-center gap-0.5 sm:gap-1.5 ml-1 pl-1.5 sm:ml-2 sm:pl-3 border-l" style={{ borderColor: C.border }}>
            {onView && (
              <button onClick={onView} className="p-1 rounded hover:bg-gray-200 transition-colors" style={{ color: C.textSecondary }}>
                <Eye size={14} />
              </button>
            )}
            {onEdit && (
              <button onClick={onEdit} className="p-1 rounded hover:bg-gray-200 transition-colors" style={{ color: C.textSecondary }}>
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="p-1 rounded hover:bg-red-50 transition-colors" style={{ color: C.danger }}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
