import { C } from "../../utils/constants";

export default function EmptyState({ label }) {
  return <p className="text-sm text-center py-8" style={{ color: C.textTertiary }}>{label}</p>;
}
