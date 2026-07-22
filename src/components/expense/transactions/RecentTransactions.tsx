import "./RecentTransactions.css";
import type { Transaction } from "../types/transaction";
type RecentTransactionsProps = {
  onAddExpense: () => void;
  transactions: Transaction[];
};

const RecentTransactions = ({
  onAddExpense,
  transactions,
}: RecentTransactionsProps) => {
  return (
    <section className="recentTransactionsCard">
      <div className="transactionsHeader">
        <div className="transactionsTitle">
          <h2>Recent Transactions</h2>

          <p>{transactions.length} transaction(s) • This Month</p>
        </div>

        <button
          className="addExpenseBtn"
          onClick={onAddExpense}
        >
          + Add Expense
        </button>
      </div>

      <div className="transactionsTablePlaceholder">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <p>{transactions.length} transaction(s)</p>
        )}
      </div>
    </section>
  );
};

export default RecentTransactions;