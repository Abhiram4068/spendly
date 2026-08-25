import { useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useFilteredSorted, groupByMonth } from "../utils/hooks";
import { C } from "../utils/constants";
import { nameOf } from "../utils/helpers";
import Section from "../components/UI/Section";
import SearchSortBar from "../components/UI/SearchSortBar";
import EmptyState from "../components/UI/EmptyState";
import ListRow from "../components/UI/ListRow";
import StatusPill from "../components/UI/StatusPill";

export default function OwedList({ type, title, icon }) {
  const { owed, toggleStatus } = useContext(AppContext);
  
  const items = useMemo(() => {
    if (type === "owedToYou") return owed.filter((o) => o.owedBy === "you");
    return owed.filter((o) => o.owedTo === "you");
  }, [owed, type]);

  const personLabel = (o) => type === "owedToYou" ? nameOf(o.owedTo) : nameOf(o.owedBy);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  
  const filtered = useFilteredSorted(items, query, sortKey, sortDir);
  const groups = sortKey === "month" ? groupByMonth(filtered) : null;

  const row = (o) => (
    <ListRow key={o.id} text={`${o.text} · ${personLabel(o)}`} date={o.date} rate={o.rate} right={<StatusPill status={o.status} onToggle={() => toggleStatus(o.id)} />} />
  );

  return (
    <Section icon={icon} title={title}>
      <SearchSortBar query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} sortDir={sortDir} setSortDir={setSortDir} />
      {filtered.length === 0 && <EmptyState label="No entries match your search." />}
      {groups
        ? groups.map((g) => (
            <div key={g.label}>
              <div className="px-4 py-2 text-xs font-semibold" style={{ color: C.textTertiary, background: C.bg }}>{g.label}</div>
              {g.items.map(row)}
            </div>
          ))
        : filtered.map(row)}
    </Section>
  );
}
