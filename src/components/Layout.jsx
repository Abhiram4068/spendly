import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import TopBar from "./TopBar";
import Drawer from "./Drawer";
import AddExpenseModal from "./Modals/AddExpenseModal";
import AddOwedModal from "./Modals/AddOwedModal";
import ViewModal from "./Modals/ViewModal";
import EditModal from "./Modals/EditModal";
import DeleteConfirmModal from "./Modals/DeleteConfirmModal";
import { C } from "../utils/constants";

export default function Layout() {
  const { showExpenseModal, showOwedModal, modalState } = useContext(AppContext);

  return (
    <>
      <TopBar />
      <Drawer />
      <main className="max-w-3xl mx-auto px-4 pt-20 pb-8 min-h-screen" style={{ background: C.bg }}>
        <Outlet />
      </main>
      
      {showExpenseModal && <AddExpenseModal />}
      {showOwedModal && <AddOwedModal />}
      {modalState === "view" && <ViewModal />}
      {modalState === "edit" && <EditModal />}
      {modalState === "delete" && <DeleteConfirmModal />}
    </>
  );
}
