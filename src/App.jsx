import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import OwedList from "./pages/OwedList";
import Insights from "./pages/Insights";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { HandCoins, Wallet } from "lucide-react";
import { C, FONT_STACK } from "./utils/constants";

export default function App() {
  return (
    <div style={{ fontFamily: FONT_STACK, background: C.bg, minHeight: "100vh" }}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/expenses" element={<ExpenseList />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/owed-to-you" element={<OwedList type="owedToYou" title="Owed to you" icon={<HandCoins size={16} />} />} />
                  <Route path="/owed-by-you" element={<OwedList type="owedByYou" title="Owed by you" icon={<Wallet size={16} />} />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </div>
  );
}
