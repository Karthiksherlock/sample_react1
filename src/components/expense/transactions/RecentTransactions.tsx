import "./RecentTransactions.css";
import type { Transaction } from "../types/transaction";
import { Plus } from "lucide-react";

type RecentTransactionsProps = {
  onAddExpense: () => void;
  transactions: Transaction[];
};
const CATEGORY_STYLES: Record<string, { color: string; background: string }> = {
  Food:          { color: "#c2410c", background: "#fff2e6" },
  Transport:     { color: "#b45309", background: "#fff8e1" },
  Bills:         { color: "#6d28d9", background: "#f3f0ff" },
  Groceries:     { color: "#047857", background: "#e8f9f1" },
  Entertainment: { color: "#0369a1", background: "#e8f4fe" },
  Health:        { color: "#be123c", background: "#ffeef1" },
  Shopping:      { color: "#be185d", background: "#fdeef6" },
  Other:         { color: "#64748b", background: "#f1f5f9" },
};
const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
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
          <Plus size={16} /> Add Expense
        </button>
      </div>

      <div className="transactionsTablePlaceholder">
        {transactions.length === 0 ? (
          <p className="emptyState">No transactions yet.</p>
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
                  <td>
                    <span className="categoryPill" style={CATEGORY_STYLES[transaction.category] ?? CATEGORY_STYLES.Other}>
                      {transaction.category}
                    </span>
                  </td>
                  <td>
                    {transaction.note.trim() === "" ? "—" : transaction.note}
                  </td> 
                  <td>{formatDate(transaction.date)}</td>
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
