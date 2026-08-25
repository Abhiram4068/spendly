import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { C } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import FieldLabel from "../components/UI/FieldLabel";

const inputStyle = { border: `1px solid ${C.borderStrong}`, color: C.textPrimary, background: C.surface };

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: signUpError } = await signUp(trimmedEmail, password, trimmedUsername);

    if (signUpError) {
      setError(signUpError.message);
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
        
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: C.textPrimary }}>Create an account</h2>
        <p className="text-sm text-center mb-6" style={{ color: C.textSecondary }}>Sign up to start tracking expenses.</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium" style={{ background: C.dangerSoft, color: C.danger }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Username</FieldLabel>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="e.g. jessica" 
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent" 
              style={inputStyle} 
            />
          </div>
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
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent" 
              style={inputStyle} 
            />
          </div>
          <div>
            <FieldLabel>Confirm Password</FieldLabel>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent" 
              style={inputStyle} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-medium text-white mt-2 transition-opacity hover:opacity-90 disabled:opacity-50" 
            style={{ background: C.accent }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: C.textSecondary }}>
          Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: C.accentText }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
