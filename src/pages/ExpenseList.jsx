import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useFilteredSorted, groupByMonth } from "../utils/hooks";
import { C } from "../utils/constants";
import Section from "../components/UI/Section";
import SearchSortBar from "../components/UI/SearchSortBar";
import EmptyState from "../components/UI/EmptyState";
import ListRow from "../components/UI/ListRow";
import { Receipt } from "lucide-react";

export default function ExpenseList() {
  const { expenses } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  
  const filtered = useFilteredSorted(expenses, query, sortKey, sortDir);
  const groups = sortKey === "month" ? groupByMonth(filtered) : null;

  return (
    <Section icon={<Receipt size={16} />} title="My expenses">
      <SearchSortBar query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} sortDir={sortDir} setSortDir={setSortDir} />
      {filtered.length === 0 && <EmptyState label="No expenses match your search." />}
      {groups
        ? groups.map((g) => (
            <div key={g.label}>
              <div className="px-4 py-2 text-xs font-semibold" style={{ color: C.textTertiary, background: C.bg }}>{g.label}</div>
              {g.items.map((e) => <ListRow key={e.id} text={e.text} date={e.date} rate={e.rate} />)}
            </div>
          ))
        : filtered.map((e) => <ListRow key={e.id} text={e.text} date={e.date} rate={e.rate} />)}
    </Section>
  );
}
