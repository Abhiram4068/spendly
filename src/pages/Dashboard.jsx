import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { nameOf } from "../utils/helpers";
import SummaryCard from "../components/UI/SummaryCard";
import Section from "../components/UI/Section";
import ListRow from "../components/UI/ListRow";
import StatusPill from "../components/UI/StatusPill";
import EmptyState from "../components/UI/EmptyState";
import { C } from "../utils/constants";
import { Receipt, HandCoins } from "lucide-react";

export default function Dashboard() {
  const { expenses, owed } = useContext(AppContext);
  const navigate = useNavigate();

  const totalThisMonth = useMemo(() => {
    const now = new Date();
    return expenses.filter((e) => {
      const d = new Date(e.date + "T00:00:00");
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((sum, e) => sum + e.rate, 0);
  }, [expenses]);

  const owedToYou = useMemo(() => owed.filter((o) => o.owedBy === "you" && o.status === "pending"), [owed]);
  const owedByYou = useMemo(() => owed.filter((o) => o.owedTo === "you" && o.status === "pending"), [owed]);
  const totalOwedToYou = owedToYou.reduce((s, o) => s + o.rate, 0);
  const totalOwedByYou = owedByYou.reduce((s, o) => s + o.rate, 0);

  const ViewAll = ({ to }) => (
    <button onClick={() => navigate(to)} className="text-xs font-medium" style={{ color: C.accentText }}>View all</button>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <SummaryCard label="Total expenses this month" value={totalThisMonth} sublabel={`${expenses.length} entries`} />
        <SummaryCard label="Owed to you" value={totalOwedToYou} tone="accent" sublabel="pending only" />
        <SummaryCard label="Owed by you" value={totalOwedByYou} tone="danger" sublabel="pending only" />
      </div>

      <Section icon={<Receipt size={16} />} title="Recent expenses" action={<ViewAll to="/expenses" />}>
        {expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((e) => (
          <ListRow key={e.id} text={e.text} date={e.date} rate={e.rate} />
        ))}
      </Section>

      <Section icon={<HandCoins size={16} />} title="Owed to you" action={<ViewAll to="/owed-to-you" />}>
        {owedToYou.length === 0
          ? <EmptyState label="Nobody owes you right now." />
          : owedToYou.slice(0, 4).map((o) => (
              <ListRow key={o.id} text={`${o.text} · ${nameOf(o.owedTo)}`} date={o.date} rate={o.rate} right={<StatusPill status={o.status} onToggle={() => {}} />} />
            ))}
      </Section>
    </div>
  );
}
