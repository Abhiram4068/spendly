import { useMemo } from "react";

export function useFilteredSorted(items, query, sortKey, sortDir) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    
    let out = items.filter((i) => {
      const text = i.expense_text || i.text || "";
      return text.toLowerCase().includes(q);
    });
    
    const dir = sortDir === "asc" ? 1 : -1;
    out = out.slice().sort((a, b) => {
      if (sortKey === "rate") return (a.rate - b.rate) * dir;
      
      const dateA = new Date(a.expense_date || a.date);
      const dateB = new Date(b.expense_date || b.date);
      return (dateA - dateB) * dir;
    });
    return out;
  }, [items, query, sortKey, sortDir]);
}

export function groupByMonth(items) {
  const order = [];
  const map = new Map();
  items.forEach((item) => {
    const dateVal = item.expense_date || item.date;
    const key = new Date(dateVal + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!map.has(key)) { map.set(key, []); order.push(key); }
    map.get(key).push(item);
  });
  return order.map((label) => ({ label, items: map.get(label) }));
}
