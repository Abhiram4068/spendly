import { C } from "../../utils/constants";
import Money from "./Money";

export default function ListRow({ text, date, rate, right }) {
  return (
    <div className="flex items-center justify-between py-3 px-4" style={{ borderBottom: `1px solid ${C.border}` }}>
      <div className="min-w-0 pr-3">
        <p className="text-sm font-medium truncate" style={{ color: C.textPrimary }}>{text}</p>
        <p className="text-xs mt-0.5" style={{ color: C.textTertiary }}>
          {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Money value={rate} size="sm" />
        {right}
      </div>
    </div>
  );
}
