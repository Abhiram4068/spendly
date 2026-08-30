import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { C } from "../utils/constants";
import Section from "../components/UI/Section";
import EmptyState from "../components/UI/EmptyState";
import { BarChart3 } from "lucide-react";
import CategoryPill from "../components/UI/CategoryPill";
import { formatMoney } from "../utils/helpers";
import { groupByMonth } from "../utils/hooks";

export default function Insights() {
  const { expenses } = useContext(AppContext);

  const groupedInsights = useMemo(() => {
    const grouped = groupByMonth(expenses);
    
    return grouped.map(g => {
      const totals = {};
      let totalSpend = 0;
      
      g.items.forEach(e => {
        const catName = e.categories?.name || "Uncategorized";
        if (!totals[catName]) totals[catName] = 0;
        totals[catName] += e.rate;
        totalSpend += e.rate;
      });

      const sorted = Object.entries(totals)
        .map(([name, amount]) => ({ 
          name, 
          amount, 
          percentage: totalSpend > 0 ? (amount / totalSpend) * 100 : 0 
        }))
        .sort((a, b) => b.amount - a.amount);

      return { label: g.label, sorted, totalSpend };
    });
  }, [expenses]);

  return (
    <Section icon={<BarChart3 size={16} />} title="Spending Logs">
      {groupedInsights.length === 0 ? (
        <EmptyState label="No expenses logged yet." />
      ) : (
        groupedInsights.map((group, index) => (
          <div key={group.label} className={index > 0 ? "border-t" : ""} style={{ borderColor: C.border }}>
            <div className="px-4 py-2 text-xs font-semibold flex items-center justify-between" style={{ background: C.bg }}>
              <div>
                <span style={{ color: C.textTertiary }}>{group.label}</span>
              </div>
              <span className="font-bold text-[13px]" style={{ color: C.textPrimary }}>₹{formatMoney(group.totalSpend)}</span>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              {group.sorted.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <CategoryPill category={cat.name} />
                    <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>
                      ₹{formatMoney(cat.amount)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${cat.percentage}%`, 
                        background: C.accent 
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-right mt-0.5" style={{ color: C.textTertiary }}>
                    {cat.percentage.toFixed(1)}% of total
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </Section>
  );
}
