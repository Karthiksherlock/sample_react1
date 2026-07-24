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

        <button className="addExpenseBtn" onClick={onAddExpense}>
          + Add Expense
        </button>
      </div>

      <div className="transactionsTablePlaceholder">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table className="transactionsTable">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Note</th>
                <th>Date</th>
                <th className="amountColumn">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.merchant}</td>
                  <td>{transaction.category}</td>
                  <td>
                    {transaction.note.trim() === "" ? "-" : transaction.note}
                  </td>
                  <td>{transaction.date}</td>
                  <td className="amountColumn">
                    ${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default RecentTransactions;
