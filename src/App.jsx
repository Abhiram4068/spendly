import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import OwedList from "./pages/OwedList";
import { HandCoins, Wallet } from "lucide-react";
import { C, FONT_STACK } from "./utils/constants";

export default function App() {
  return (
    <div style={{ fontFamily: FONT_STACK, background: C.bg, minHeight: "100vh" }}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="expenses" element={<ExpenseList />} />
              <Route path="owed-to-you" element={<OwedList type="owedToYou" title="Owed to you" icon={<HandCoins size={16} />} />} />
              <Route path="owed-by-you" element={<OwedList type="owedByYou" title="Owed by you" icon={<Wallet size={16} />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}
