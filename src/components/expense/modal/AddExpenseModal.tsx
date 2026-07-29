import { useState } from "react";
import "./AddExpenseModal.css";
import type { Transaction } from "../types/transaction";

import {
  X,
  UtensilsCrossed,
  Car,
  Receipt,
  ShoppingCart,
  Tv,
  HeartPulse,
  ShoppingBag,
  Ellipsis,
} from "lucide-react";

type AddExpenseModalProps = {
  open: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void;
};

const categories = [
  {
    name: "Food",
    icon: UtensilsCrossed,
    color: "#F97316",
    background: "#FFF7ED",
  },
  {
    name: "Transport",
    icon: Car,
    color: "#F59E0B",
    background: "#FFFBEB",
  },
  {
    name: "Bills",
    icon: Receipt,
    color: "#8B5CF6",
    background: "#F5F3FF",
  },
  {
    name: "Groceries",
    icon: ShoppingCart,
    color: "#10B981",
    background: "#ECFDF5",
  },
  {
    name: "Entertainment",
    icon: Tv,
    color: "#0EA5E9",
    background: "#EFF6FF",
  },
  {
    name: "Health",
    icon: HeartPulse,
    color: "#F43F5E",
    background: "#FFF1F2",
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
    color: "#EC4899",
    background: "#FDF2F8",
  },
  {
    name: "Other",
    icon: Ellipsis,
    color: "#94A3B8",
    background: "#F8FAFC",
  },
];

const AddExpenseModal = ({open, onClose, onAddTransaction}: AddExpenseModalProps) => {
  const [amount, setAmount] = useState("");

  const [merchant, setMerchant] = useState("");

  const [note, setNote] = useState("");

  const [date, setDate] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [errors, setErrors] = useState({
    amount: "",
    merchant: "",
    date: "",
  });
  if (!open) {
    return null;
  }
  const resetForm = () => {
    setAmount("");
    setMerchant("");
    setNote("");
    setDate("");
    setSelectedCategory("Food");
    setErrors({
      amount:"",
      merchant:"",
      date:"",
    });
  };
  const handleLogExpense = () => {
    const validationErrors = {
      amount: "",
      merchant: "",
      date: "",
    };

    if (!amount.trim()) {
      validationErrors.amount = "Amount is required";
    }

    if (!merchant.trim()) {
      validationErrors.merchant = "Merchant is required";
    }

    if (!date.trim()) {
      validationErrors.date = "Date is required";
    }

    setErrors(validationErrors);

    if (
      validationErrors.amount ||
      validationErrors.merchant ||
      validationErrors.date
    ) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      merchant: merchant.trim(),
      category: selectedCategory,
      note: note.trim(),
      date,
      amount: Number(amount),
    };

    onAddTransaction(newTransaction);

    resetForm();
  };

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>Add New Expense</h2>

          <button
            className="closeButton"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="formGroup">
          <label>
            Amount <span>*</span>
          </label>

          <p className="fieldDescription">Enter the expense amount in USD</p>

          <div className="amountInputWrapper">
            <div className="currencyBox">$</div>

            <input
              className="amountInput"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e)=>{
                setAmount(e.target.value);

                setErrors(previous=>({
                  ...previous,
                  amount:""
                }));
              }}
            />
            {errors.amount && (
              <p className="fieldError">
                {errors.amount}
              </p>
        )}
          </div>
        </div>

        <div className="formGroup">
          <label>
            Category <span>*</span>
          </label>

          <div className="categoryGrid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  type="button"
                  className={`categoryCard ${
                    selectedCategory === category.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div
                    className="iconCircle"
                    style={{
                      background: category.background,
                    }}
                  >
                    <Icon size={24} color={category.color} />
                  </div>

                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="formGroup">
          <label>
            Merchant / Payee <span>*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Whole Foods, Uber, Netflix"
            value={merchant}
            onChange={(e)=>{
              setMerchant(e.target.value);

              setErrors(previous=>({
                ...previous,
                merchant:""
              }));
          }}
          />
          {errors.merchant && (
            <p className="fieldError">
              {errors.merchant}
            </p>
          )}
        </div>

        <div className="formGroup">
          <label>
            Date <span>*</span>
          </label>

          <input
            type="date"
            value={date}
            onChange={(e)=>{
              setDate(e.target.value);

              setErrors(previous=>({
                ...previous,
                date:""
              }));
            }}
          />
          {errors.date && (
            <p className="fieldError">
              {errors.date}
            </p>
          )}
        </div>

        <div className="formGroup">
          <label>
            Note <small>(optional)</small>
          </label>

          <textarea
            rows={3}
            placeholder="What was this expense for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="modalFooter">
          <button
            className="cancelButton"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </button>

          <button className="saveButton" onClick={handleLogExpense}>
            Log Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
