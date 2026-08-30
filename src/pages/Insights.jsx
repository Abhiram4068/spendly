import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { C } from "../utils/constants";
import Section from "../components/UI/Section";
import EmptyState from "../components/UI/EmptyState";
import { BarChart3 } from "lucide-react";
import CategoryPill from "../components/UI/CategoryPill";
import { formatMoney } from "../utils/helpers";

export default function Insights() {
  const { expenses } = useContext(AppContext);

  const categoryTotals = useMemo(() => {
    const totals = {};
    let totalSpend = 0;
    
    expenses.forEach(e => {
      const catName = e.categories?.name || "Uncategorized";
      if (!totals[catName]) {
        totals[catName] = 0;
      }
      totals[catName] += e.rate;
      totalSpend += e.rate;
    });

    // Convert to array and sort by amount descending
    const sorted = Object.entries(totals)
      .map(([name, amount]) => ({ 
        name, 
        amount, 
        percentage: totalSpend > 0 ? (amount / totalSpend) * 100 : 0 
      }))
      .sort((a, b) => b.amount - a.amount);

    return { sorted, totalSpend };
  }, [expenses]);

  return (
    <Section icon={<BarChart3 size={16} />} title="Spending Logs">
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium" style={{ color: C.textTertiary }}>Total Logged Spending</h3>
          <p className="text-3xl font-bold mt-1" style={{ color: C.textPrimary }}>₹{formatMoney(categoryTotals.totalSpend)}</p>
        </div>

        {categoryTotals.sorted.length === 0 ? (
          <EmptyState label="No expenses logged yet." />
        ) : (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold border-b pb-2 mb-4" style={{ color: C.textSecondary, borderColor: C.border }}>
              Spending by Category
            </h4>
            {categoryTotals.sorted.map((cat) => (
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
        )}
      </div>
    </Section>
  );
}
