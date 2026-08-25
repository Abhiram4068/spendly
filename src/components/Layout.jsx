import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import TopBar from "./TopBar";
import Drawer from "./Drawer";
import AddExpenseModal from "./Modals/AddExpenseModal";
import AddOwedModal from "./Modals/AddOwedModal";

export default function Layout() {
  const { showExpenseModal, showOwedModal } = useContext(AppContext);

  return (
    <>
      <TopBar />
      <Drawer />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5">
        <Outlet />
      </div>

      {showExpenseModal && <AddExpenseModal />}
      {showOwedModal && <AddOwedModal />}
    </>
  );
}
