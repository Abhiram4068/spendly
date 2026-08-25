import { C } from "../../utils/constants";

export default function Section({ icon, title, children, action }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-2">
          <div style={{ color: C.textSecondary }}>{icon}</div>
          <h3 className="text-sm font-semibold" style={{ color: C.textPrimary }}>{title}</h3>
        </div>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
