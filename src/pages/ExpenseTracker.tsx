import { useState } from "react";
import "./ExpenseTrackerPage.css";

import RecentTransactions from "../components/expense/transactions/RecentTransactions";
import AddExpenseModal from "../components/expense/modal/AddExpenseModal";

const ExpenseTrackerPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="expense-page">
      <RecentTransactions
        onAddExpense={() => setShowModal(true)}
      />

      <AddExpenseModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ExpenseTrackerPage;