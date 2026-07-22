import { useState } from "react";
import "./ExpenseTrackerPage.css";

import RecentTransactions from "../components/expense/transactions/RecentTransactions";
import AddExpenseModal from "../components/expense/modal/AddExpenseModal";
import type { Transaction } from "../components/expense/types/transaction";
const ExpenseTrackerPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const handleAddTransaction = (
    transaction: Transaction
  ) => {
    setTransactions((previousTransactions) => [
      transaction,
        ...previousTransactions,
      ]);

      setShowModal(false);
    };

  return (
    <div className="expense-page">
      <RecentTransactions
        onAddExpense={() => setShowModal(true)}
        transactions={transactions}
      />

      <AddExpenseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default ExpenseTrackerPage;