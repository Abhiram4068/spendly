import { useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useFilteredSorted, groupByMonth } from "../utils/hooks";
import { formatMoney } from "../utils/helpers";
import { C } from "../utils/constants";
import Section from "../components/UI/Section";
import SearchSortBar from "../components/UI/SearchSortBar";
import EmptyState from "../components/UI/EmptyState";
import ListRow from "../components/UI/ListRow";
import { Receipt } from "lucide-react";

export default function ExpenseList() {
  const { expenses, categories, setActiveItem, setItemType, setModalState } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("month");
  const [sortDir, setSortDir] = useState("desc");
  const [filterCategory, setFilterCategory] = useState("");
  
  const openModal = (item, type, state) => {
    setActiveItem(item);
    setItemType(type);
    setModalState(state);
  };

  const filtered = useFilteredSorted(expenses, query, sortKey, sortDir, filterCategory);
  const groups = sortKey === "month" ? groupByMonth(filtered) : null;

  return (
    <Section icon={<Receipt size={16} />} title="My expenses">
      <SearchSortBar 
        query={query} setQuery={setQuery} 
        sortKey={sortKey} setSortKey={setSortKey} 
        sortDir={sortDir} setSortDir={setSortDir} 
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      {filtered.length === 0 && <EmptyState label="No expenses match your search." />}
      {groups
        ? groups.map((g) => (
            <div key={g.label}>
              <div className="px-4 py-2 text-xs font-semibold flex items-center justify-between" style={{ background: C.bg }}>
                <div>
                  <span style={{ color: C.textTertiary }}>{g.label}</span>
                  <span className="ml-1 opacity-80" style={{ color: C.textTertiary }}>({g.items.length} {g.items.length === 1 ? "entry" : "entries"})</span>
                </div>
                <span className="font-bold text-[13px]" style={{ color: C.textPrimary }}>₹{formatMoney(g.total)}</span>
              </div>
              {g.items.map((e) => (
                <ListRow 
                  key={e.id} 
                  text={e.expense_text} 
                  date={e.date} 
                  rate={e.rate} 
                  category={e.categories?.name}
                  onView={() => openModal(e, "expense", "view")}
                  onEdit={() => openModal(e, "expense", "edit")}
                  onDelete={() => openModal(e, "expense", "delete")}
                />
              ))}
            </div>
          ))
        : filtered.map((e) => (
            <ListRow 
              key={e.id} 
              text={e.expense_text} 
              date={e.date} 
              rate={e.rate} 
              category={e.categories?.name}
              onView={() => openModal(e, "expense", "view")}
              onEdit={() => openModal(e, "expense", "edit")}
              onDelete={() => openModal(e, "expense", "delete")}
            />
          ))}
    </Section>
  );
}
