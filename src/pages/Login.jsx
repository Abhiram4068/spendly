import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { C } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import FieldLabel from "../components/UI/FieldLabel";
import { Eye, EyeOff } from "lucide-react";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: signInError } = await signIn(trimmedEmail, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: C.bg }}>
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-2xl shadow-sm" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: C.accent }}>
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight" style={{ color: C.textPrimary }}>Spendly</span>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: C.textPrimary }}>Welcome back</h2>
        <p className="text-sm text-center mb-6" style={{ color: C.textSecondary }}>Enter your details to log in.</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium" style={{ background: C.dangerSoft, color: C.danger }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Email</FieldLabel>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent" 
              style={inputStyle} 
            />
          </div>
          <div>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full rounded-lg pl-3 pr-10 py-2.5 text-sm outline-none transition-colors focus:border-accent" 
                style={inputStyle} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: C.textTertiary }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2 transition-opacity hover:opacity-90 disabled:opacity-50" 
            style={{ background: C.accent }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: C.textSecondary }}>
          Don't have an account? <Link to="/signup" className="font-semibold hover:underline" style={{ color: C.accentText }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
