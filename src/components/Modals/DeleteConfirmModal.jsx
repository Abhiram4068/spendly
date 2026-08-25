import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Modal from "./Modal";
import { C } from "../../utils/constants";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal() {
  const { activeItem, itemType, setModalState, removeExpense, removeOwed } = useContext(AppContext);

  if (!activeItem) return null;

  const handleDelete = () => {
    if (itemType === "owed") {
      removeOwed(activeItem.id);
    } else {
      removeExpense(activeItem.id);
    }
    setModalState(null);
  };

  return (
    <Modal title="Delete item" onClose={() => setModalState(null)}>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.dangerSoft, color: C.danger }}>
          <Trash2 size={24} />
        </div>
        <h3 className="text-lg font-semibold text-center mb-2" style={{ color: C.textPrimary }}>Are you sure?</h3>
        <p className="text-sm text-center mb-6" style={{ color: C.textSecondary }}>
          This action cannot be undone. This item will be permanently deleted from your records.
        </p>
        
        <div className="flex w-full gap-3">
          <button 
            onClick={() => setModalState(null)} 
            className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors"
            style={{ background: C.bg, color: C.textPrimary, border: `1px solid ${C.border}` }}
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="flex-1 rounded-lg py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: C.danger }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
