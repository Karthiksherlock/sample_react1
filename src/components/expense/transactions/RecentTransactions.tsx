import { useState } from "react";
import "./RecentTransactions.css";
import type { Transaction } from "../types/transaction";
import {
  Plus,
  Search,
  UtensilsCrossed,
  Car,
  Receipt,
  ShoppingCart,
  TvMinimal,
  HeartPulse,
  ShoppingBag,
  Ellipsis,
} from "lucide-react";

type RecentTransactionsProps = {
  onAddExpense: () => void;
  transactions: Transaction[];
};

const CATEGORY_STYLES: Record<string, { color: string; background: string }> = {
  Food:          { color: "rgb(249, 115, 22)", background: "#fff2e6" },
  Transport:     { color: "rgb(245, 158, 11)", background: "#fff8e1" },
  Bills:         { color: "rgb(139, 92, 246)", background: "#f3f0ff" },
  Groceries:     { color: "rgb(16, 185, 129)", background: "#e8f9f1" },
  Entertainment: { color: "rgb(14, 165, 233)", background: "#e8f4fe" },
  Health:        { color: "rgb(244, 63, 94)", background: "#ffeef1" },
  Shopping:      { color: "rgb(236, 72, 153)", background: "#fdeef6" },
  Other:         { color: "rgb(148, 163, 184)", background: "#f1f5f9" }, 
};

const CATEGORY_ICONS = {
  Food: UtensilsCrossed,
  Transport: Car,
  Bills: Receipt,
  Groceries: ShoppingCart,
  Entertainment: TvMinimal,
  Health: HeartPulse,
  Shopping: ShoppingBag,
  Other: Ellipsis,
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
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTransactions = transactions.filter((transaction) => {
  const searchValue = searchTerm.toLowerCase().trim();

  if (!searchValue) {
    return true;
  }

  return (
    transaction.merchant.toLowerCase().includes(searchValue) ||
    transaction.category.toLowerCase().includes(searchValue) ||
    transaction.note.toLowerCase().includes(searchValue)
  );
});

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
      <div className="transactionsControls">
        <div className="searchWrapper">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search merchant, category, note..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
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
                  <td>
                    <div className="merchantCell">
                      {(() => {
                        const Icon =
                          CATEGORY_ICONS[
                            transaction.category as keyof typeof CATEGORY_ICONS
                          ] ?? Ellipsis;

                        const style =
                          CATEGORY_STYLES[transaction.category] ??
                          CATEGORY_STYLES.Other;

                        return (
                          <>
                            <div
                              className="merchantIcon"
                              style={{
                                background: style.background,
                                color: style.color,
                              }}
                            >
                              <Icon size={16} />
                            </div>
                            <span>{transaction.merchant}</span>
                          </>
                        );  
                      })()}
                    </div>
                  </td>
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
