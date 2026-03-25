import React, { useEffect, useState } from "react";

const ExpenseBudgetChart = () => {
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/budgets")
      .then(res => res.json())
      .then(data => {
        const totalBudget = data.reduce((sum, b) => sum + (b.amount || b.monthlyLimit || 0), 0);
        setBudget(totalBudget);
      })
      .catch(err => console.error("Budget fetch error:", err));

    fetch("http://localhost:8080/api/expenses")
      .then(res => res.json())
      .then(data => {
        const totalExpense = data.reduce((sum, e) => sum + (e.amount || 0), 0);
        setExpense(totalExpense);
      })
      .catch(err => console.error("Expense fetch error:", err));
  }, []);

  const savings = budget - expense;

  return (
    <div className="chart-box">
      <h3>Budget Overview</h3>

      <p><strong>Total Budget:</strong> ₹{budget}</p>
      <p><strong>Total Expense:</strong> ₹{expense}</p>

      <p style={{ color: savings >= 0 ? "green" : "red", fontWeight: "bold" }}>
        Savings: ₹{savings}
      </p>
    </div>
  );
};

export default ExpenseBudgetChart;