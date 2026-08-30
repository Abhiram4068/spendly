import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { nameOf } from "../utils/helpers";
import SummaryCard from "../components/UI/SummaryCard";
import Section from "../components/UI/Section";
import ListRow from "../components/UI/ListRow";
import StatusPill from "../components/UI/StatusPill";
import EmptyState from "../components/UI/EmptyState";
import { C } from "../utils/constants";
import { Receipt, HandCoins, Plus } from "lucide-react";

export default function Dashboard() {
  const { expenses, owed, usersList, userProfile, setShowBalanceModal, setActiveItem, setItemType, setModalState } = useContext(AppContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalThisMonth = useMemo(() => {
    const now = new Date();
    return expenses.filter((e) => {
      const d = new Date((e.date || e.expense_date) + "T00:00:00");
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((sum, e) => sum + e.rate, 0);
  }, [expenses]);

  const owedToYou = useMemo(() => owed.filter((o) => o.owed_by === user?.id && o.status === "pending"), [owed, user]);
  const owedByYou = useMemo(() => owed.filter((o) => o.owed_to === user?.id && o.status === "pending"), [owed, user]);
  const totalOwedToYou = owedToYou.reduce((s, o) => s + o.rate, 0);
  const totalOwedByYou = owedByYou.reduce((s, o) => s + o.rate, 0);

  const openModal = (item, type, state) => {
    setActiveItem(item);
    setItemType(type);
    setModalState(state);
  };

  const ViewAll = ({ to }) => (
    <button onClick={() => navigate(to)} className="text-xs font-medium" style={{ color: C.accentText }}>View all</button>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard 
          label="Total expenses this month" 
          value={totalThisMonth} 
          sublabel={`${expenses.length} entries`} 
          action={<ViewAll to="/expenses" />}
        />
        <SummaryCard 
          label="Owed to you" 
          value={totalOwedToYou} 
          tone="accent" 
          sublabel="pending only" 
          action={<ViewAll to="/owed-to-you" />}
        />
        <SummaryCard 
          label="Owed by you" 
          value={totalOwedByYou} 
          tone="danger" 
          sublabel="pending only" 
          action={<ViewAll to="/owed-by-you" />}
        />
      </div>

      <Section icon={<Receipt size={16} />} title="Recent expenses" action={<ViewAll to="/expenses" />}>
        {expenses.length === 0 ? (
          <EmptyState label="You haven't added any expenses yet." />
        ) : (
          expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((e) => (
            <ListRow 
              key={e.id} 
              text={e.expense_text} 
              date={e.date} 
              rate={e.rate} 
              onView={() => openModal(e, "expense", "view")}
              onEdit={() => openModal(e, "expense", "edit")}
              onDelete={() => openModal(e, "expense", "delete")}
            />
          ))
        )}
      </Section>

      <Section icon={<HandCoins size={16} />} title="Owed to you" action={<ViewAll to="/owed-to-you" />}>
        {owedToYou.length === 0
          ? <EmptyState label="Nobody owes you right now." />
          : owedToYou.slice(0, 4).map((o) => (
              <ListRow 
                key={o.id} 
                text={o.expense_text} 
                date={o.expense_date} 
                rate={o.rate} 
                person={nameOf(o.owed_to, usersList)}
                right={<StatusPill status={o.status} onToggle={() => {}} />} 
                onView={() => openModal(o, "owed", "view")}
                onEdit={() => openModal(o, "owed", "edit")}
                onDelete={() => openModal(o, "owed", "delete")}
              />
            ))}
      </Section>
    </div>
  );
}
