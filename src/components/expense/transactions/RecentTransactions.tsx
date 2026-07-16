type RecentTransactionsProps = {
  onAddExpense: () => void;
};

const RecentTransactions = ({
  onAddExpense,
}: RecentTransactionsProps) => {
  return (
    <section>
      <h2>Recent Transactions</h2>

      <button onClick={onAddExpense}>
        Add Expense
      </button>
    </section>
  );
};

export default RecentTransactions;