import { useNavigate } from "react-router-dom";
import { C } from "../utils/constants";
import { Receipt, HandCoins, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: C.bg }}>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm" style={{ background: C.accent }}>
          <span className="text-white text-3xl font-bold">S</span>
        </div>
        <span className="text-4xl font-bold tracking-tight" style={{ color: C.textPrimary }}>Spendly</span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: C.textPrimary }}>
        Family finance,<br />simplified.
      </h1>
      
      <p className="text-base sm:text-lg mb-10 max-w-md" style={{ color: C.textSecondary }}>
        Track shared expenses, see exactly who owes who, and settle up without the awkward conversations.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => navigate("/signup")}
          className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: C.accent }}
        >
          Get Started <ArrowRight size={18} />
        </button>
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors"
          style={{ background: C.surface, border: `1px solid ${C.borderStrong}`, color: C.textPrimary }}
        >
          Log In
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl w-full">
        <div className="p-5 rounded-2xl" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: C.accentSoft, color: C.accentText }}>
            <Receipt size={20} />
          </div>
          <h3 className="font-semibold mb-2" style={{ color: C.textPrimary }}>Track Expenses</h3>
          <p className="text-sm" style={{ color: C.textSecondary }}>Log your daily spending and keep a clear history of where the money goes.</p>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: C.successSoft, color: C.success }}>
            <HandCoins size={20} />
          </div>
          <h3 className="font-semibold mb-2" style={{ color: C.textPrimary }}>Settle Up</h3>
          <p className="text-sm" style={{ color: C.textSecondary }}>Easily record debts between family members and track when they are paid.</p>
        </div>
      </div>
    </div>
  );
}
