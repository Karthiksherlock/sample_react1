type AddExpenseModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddExpenseModal = ({ open, onClose }: AddExpenseModalProps) => {
  if (!open) return null;

  return (
    <div>
      <h2>Add Expense Modal</h2>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddExpenseModal;
