import { useMemo } from "react";

export function useFilteredSorted(items, query, sortKey, sortDir, filterCategory = "") {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    
    let out = items.filter((i) => {
      // First check text match
      const text = i.expense_text || i.text || "";
      const textMatch = text.toLowerCase().includes(q);
      if (!textMatch) return false;
      
      // Then check category match if filter is set
      if (filterCategory) {
        // Handle case where category is an object (from DB join) or a string ID
        const catId = i.category_id || i.categories?.id;
        if (catId !== filterCategory) return false;
      }
      
      return true;
    });
    
    const dir = sortDir === "asc" ? 1 : -1;
    out = out.slice().sort((a, b) => {
      if (sortKey === "rate") return (a.rate - b.rate) * dir;
      
      const dateA = new Date(a.expense_date || a.date);
      const dateB = new Date(b.expense_date || b.date);
      return (dateA - dateB) * dir;
    });
    return out;
  }, [items, query, sortKey, sortDir, filterCategory]);
}

export function groupByMonth(items) {
  const order = [];
  const map = new Map();
  items.forEach((item) => {
    const dateVal = item.expense_date || item.date;
    const key = new Date(dateVal + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!map.has(key)) { map.set(key, { items: [], total: 0 }); order.push(key); }
    const group = map.get(key);
    group.items.push(item);
    group.total += item.rate || 0;
  });
  return order.map((label) => ({ label, items: map.get(label).items, total: map.get(label).total }));
}
