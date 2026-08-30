import { C } from "../../utils/constants";
import Money from "./Money";

export default function SummaryCard({ label, value, tone, sublabel, action }) {
  const toneColor = tone === "accent" ? C.accentText : tone === "danger" ? C.danger : C.textPrimary;
  const barColor = tone === "accent" ? C.accent : tone === "danger" ? C.danger : C.borderStrong;
  return (
    <div className="rounded-xl p-5 flex-1 min-w-0" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between mb-3 min-w-0">
        <p className="text-sm truncate pr-2" style={{ color: C.textSecondary, fontWeight: 500 }}>{label}</p>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <Money value={value} size="xl" color={toneColor} symbol="₹" />
      <div className="mt-2 h-px w-8 shrink-0" style={{ background: barColor }} />
      {sublabel && <p className="text-xs mt-2 truncate" style={{ color: C.textTertiary }}>{sublabel}</p>}
    </div>
  );
}
