import { useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useFilteredSorted, groupByMonth } from "../utils/hooks";
import { C } from "../utils/constants";
import { nameOf, formatMoney } from "../utils/helpers";
import Section from "../components/UI/Section";
import SearchSortBar from "../components/UI/SearchSortBar";
import EmptyState from "../components/UI/EmptyState";
import ListRow from "../components/UI/ListRow";
import StatusPill from "../components/UI/StatusPill";

export default function OwedList({ type, title, icon }) {
  const { owed, toggleStatus, usersList, setActiveItem, setItemType, setModalState } = useContext(AppContext);
  const { user } = useAuth();
  
  const openModal = (item, itemType, state) => {
    setActiveItem(item);
    setItemType(itemType);
    setModalState(state);
  };
  
  const items = useMemo(() => {
    if (type === "owedToYou") return owed.filter((o) => o.owed_by === user?.id);
    return owed.filter((o) => o.owed_to === user?.id);
  }, [owed, type, user]);

  const personLabel = (o) => type === "owedToYou" ? nameOf(o.owed_to, usersList) : nameOf(o.owed_by, usersList);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("month");
  const [sortDir, setSortDir] = useState("desc");
  
  const filtered = useFilteredSorted(items, query, sortKey, sortDir);
  const groups = sortKey === "month" ? groupByMonth(filtered) : null;

  const row = (o) => (
    <ListRow 
      key={o.id} 
      text={o.expense_text}
      person={personLabel(o)} 
      date={o.expense_date} 
      rate={o.rate} 
      right={<StatusPill status={o.status} onToggle={() => toggleStatus(o.id)} />} 
      onView={() => openModal(o, "owed", "view")}
      onEdit={() => openModal(o, "owed", "edit")}
      onDelete={() => openModal(o, "owed", "delete")}
    />
  );

  return (
    <Section icon={icon} title={title}>
      <SearchSortBar query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} sortDir={sortDir} setSortDir={setSortDir} />
      {filtered.length === 0 && <EmptyState label="No entries match your search." />}
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
              {g.items.map(row)}
            </div>
          ))
        : filtered.map(row)}
    </Section>
  );
}
