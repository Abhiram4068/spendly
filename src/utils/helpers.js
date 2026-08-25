export const nameOf = (id, usersList = []) => {
  const user = usersList.find((u) => u.id === id);
  return user ? user.username : "Unknown";
};

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function formatMoney(n) {
  if (typeof n !== 'number') return "0.00";
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
