import { FAMILY } from "./constants";

export const nameOf = (id) => FAMILY.find((f) => f.id === id)?.name || id;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function formatMoney(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
