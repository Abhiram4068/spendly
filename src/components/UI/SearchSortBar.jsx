import { C } from "../../utils/constants";
import { Search, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

const SORT_OPTIONS = [
  { key: "date", label: "Date" },
  { key: "rate", label: "Amount" },
  { key: "month", label: "Month" },
];

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function SearchSortBar({ query, setQuery, sortKey, setSortKey, sortDir, setSortDir, categories, filterCategory, setFilterCategory }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
      <div className="relative flex-1 min-w-0">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: C.textTertiary }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-full rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none" style={inputStyle} />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {categories && setFilterCategory && (
          <div className="relative flex-1 sm:flex-none">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full rounded-lg pl-2.5 pr-6 py-1.5 text-sm outline-none appearance-none truncate" style={inputStyle}>
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
          </div>
        )}
        <div className="relative flex-1 sm:flex-none">
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="w-full rounded-lg pl-2.5 pr-6 py-1.5 text-sm outline-none appearance-none truncate" style={inputStyle}>
            {SORT_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }} />
        </div>
        <button onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))} className="rounded-lg p-1.5 shrink-0" style={{ border: `1px solid ${C.borderStrong}`, color: C.textSecondary }}>
          {sortDir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </button>
      </div>
    </div>
  );
}
