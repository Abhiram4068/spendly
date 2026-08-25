import { C } from "../../utils/constants";
import Money from "./Money";

export default function SummaryCard({ label, value, tone, sublabel }) {
  const toneColor = tone === "accent" ? C.accentText : tone === "danger" ? C.danger : C.textPrimary;
  const barColor = tone === "accent" ? C.accent : tone === "danger" ? C.danger : C.borderStrong;
  return (
    <div className="rounded-xl p-5 flex-1" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <p className="text-sm mb-3" style={{ color: C.textSecondary, fontWeight: 500 }}>{label}</p>
      <Money value={value} size="xl" color={toneColor} />
      <div className="mt-2 h-px w-8" style={{ background: barColor }} />
      {sublabel && <p className="text-xs mt-2" style={{ color: C.textTertiary }}>{sublabel}</p>}
    </div>
  );
}
