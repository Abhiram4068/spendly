export const nameOf = (id, usersList = []) => {
  const user = usersList.find((u) => u.id === id);
  return user ? user.username : "Unknown";
};

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function formatMoney(n) {
  if (typeof n !== 'number') return "0.00";
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getCategoryColor(str) {
  if (!str) return { bg: '#f3f4f6', text: '#4b5563' }; // fallback gray
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return {
    bg: `hsl(${hue}, 80%, 94%)`,
    text: `hsl(${hue}, 85%, 35%)`
  };
}
