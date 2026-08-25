import { useMemo } from "react";

export function useFilteredSorted(items, query, sortKey, sortDir) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = items.filter((i) => i.text.toLowerCase().includes(q));
    const dir = sortDir === "asc" ? 1 : -1;
    out = out.slice().sort((a, b) => {
      if (sortKey === "rate") return (a.rate - b.rate) * dir;
      return (new Date(a.date) - new Date(b.date)) * dir;
    });
    return out;
  }, [items, query, sortKey, sortDir]);
}

export function groupByMonth(items) {
  const order = [];
  const map = new Map();
  items.forEach((item) => {
    const key = new Date(item.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!map.has(key)) { map.set(key, []); order.push(key); }
    map.get(key).push(item);
  });
  return order.map((label) => ({ label, items: map.get(label) }));
}
