import { useState } from "react";
import { calculateTotal } from "./expenseUtils";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "College Canteen", amount: 120, category: "Food" },
    { id: 2, name: "Auto Rickshaw", amount: 180, category: "Transport" },
    { id: 3, name: "Movie", amount: 350, category: "Entertainment" },
  ]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const addExpense = (event) => {
    event.preventDefault();

    if (!name.trim() || !amount || Number(amount) <= 0) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    setName("");
    setAmount("");
    setCategory("Food");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = calculateTotal(expenses);

  const categoryIcons = {
    Food: "🍔",
    Transport: "🚌",
    Entertainment: "🎬",
    Education: "📚",
    Other: "📌",
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand-icon">💳</div>
        <h1>Campus Expense Tracker</h1>
        <p>Track your everyday college expenses with ease.</p>
      </header>

      <main className="container">
        <section className="summary-card">
          <div className="summary-icon">₹</div>
          <p>Total Expenses</p>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
          <span>
            {expenses.length}{" "}
            {expenses.length === 1 ? "transaction" : "transactions"} recorded
          </span>
        </section>

        <section className="card">
          <div className="section-heading">
            <div>
              <span className="section-label">TRACK YOUR SPENDING</span>
              <h2>Add New Expense</h2>
            </div>
            <span className="section-icon">＋</span>
          </div>

          <form onSubmit={addExpense} className="expense-form">
            <input
              type="text"
              placeholder="Expense name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              min="1"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit">Add Expense</button>
          </form>
        </section>

        <section className="card">
          <div className="section-heading">
            <div>
              <span className="section-label">YOUR SPENDING</span>
              <h2>Recent Expenses</h2>
            </div>
            <span className="transaction-count">{expenses.length}</span>
          </div>

          {expenses.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🧾</div>
              <p>No expenses recorded yet.</p>
              <span>Add your first expense above.</span>
            </div>
          ) : (
            <div className="expense-list">
              {expenses.map((expense) => (
                <div className="expense-item" key={expense.id}>
                  <div className="expense-info">
                    <div className="category-icon">
                      {categoryIcons[expense.category]}
                    </div>

                    <div>
                      <h3>{expense.name}</h3>
                      <span className={`category-badge ${expense.category.toLowerCase()}`}>
                        {expense.category}
                      </span>
                    </div>
                  </div>

                  <div className="expense-right">
                    <strong>₹{expense.amount.toLocaleString("en-IN")}</strong>
                    <button
                      className="delete-button"
                      onClick={() => deleteExpense(expense.id)}
                      aria-label={`Delete ${expense.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        Campus Expense Tracker • Built with React & Vite
      </footer>
    </div>
  );
}

export default App;