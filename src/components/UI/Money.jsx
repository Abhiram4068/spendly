import { C, MONO_STACK } from "../../utils/constants";
import { formatMoney } from "../../utils/helpers";

export default function Money({ value, size = "base", color }) {
  const sizes = { sm: "14px", base: "16px", lg: "28px", xl: "32px" };
  return (
    <span style={{ 
      fontFamily: MONO_STACK, 
      fontVariantNumeric: "tabular-nums", 
      fontSize: sizes[size], 
      fontWeight: 600, 
      color: color || C.textPrimary, 
      letterSpacing: "-0.01em" 
    }}>
      ₹{formatMoney(value)}
    </span>
  );
}
