import { C } from "../../utils/constants";

export default function FieldLabel({ children }) {
  return <label className="block text-xs font-medium mb-1.5" style={{ color: C.textSecondary }}>{children}</label>;
}
