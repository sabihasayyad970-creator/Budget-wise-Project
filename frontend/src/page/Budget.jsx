import React, { useState, useEffect } from "react";
import "../styles/Budget.css";
import { getBudgets, createBudget, deleteBudget } from "../services/budgetService";
import { getSavings } from "../services/savingsService";

function Budget() {

  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);

  const [category, setCategory] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [spentAmount, setSpentAmount] = useState("");

  useEffect(() => {
    loadBudgets();
    loadSavings();
  }, []);

  const loadBudgets = () => {
    getBudgets().then((res) => setBudgets(res.data));
  };

  const loadSavings = () => {
    getSavings().then((res) => setSavingsGoals(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !monthlyLimit || !spentAmount) {
      alert("Please fill all fields");
      return;
    }

    if (Number(spentAmount) > Number(monthlyLimit)) {
      alert("Spent amount cannot exceed monthly limit");
      return;
    }

    const budget = {
      category,
      monthlyLimit: Number(monthlyLimit),
      spentAmount: Number(spentAmount)
    };

    createBudget(budget).then(() => {
      setCategory("");
      setMonthlyLimit("");
      setSpentAmount("");
      loadBudgets();
    });
  };

  const removeBudget = (id) => {
    deleteBudget(id).then(() => loadBudgets());
  };

  return (
    <div className="budget-page">

      <h2>Budget</h2>

      {/* Add Budget Form */}
      <form className="budget-form" onSubmit={handleSubmit}>

        <input
          value={category}
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          value={monthlyLimit}
          placeholder="Monthly Limit"
          type="number"
          onChange={(e) => setMonthlyLimit(e.target.value)}
        />

        <input
          value={spentAmount}
          placeholder="Spent Amount"
          type="number"
          onChange={(e) => setSpentAmount(e.target.value)}
        />

        <button type="submit">Add Budget</button>

      </form>


      {/* Monthly Budget Section */}

      <div className="budget-section">

        <h3>Monthly Budget</h3>

        {budgets.map((b) => {

          const remaining = b.monthlyLimit - b.spentAmount;

          return (

            <div className="budget-card" key={b.id}>

              <div className="budget-info">

                <h4>
                  {b.category.charAt(0).toUpperCase() + b.category.slice(1)}
                </h4>

                <p className="remaining">
                  ₹ {remaining} remaining
                </p>

              </div>

              <button
                className="delete-btn"
                onClick={() => removeBudget(b.id)}
              >
                Delete
              </button>

            </div>

          );

        })}

      </div>


      {/* Savings Goals Section */}

      <div className="budget-section">

        <h3>Savings Goals</h3>

        {savingsGoals.map((goal) => {

          const remaining = goal.targetAmount - goal.savedAmount;

          return (

            <div className="budget-card" key={goal.id}>

              <div className="budget-info">

                <h4>{goal.goalName}</h4>

                <p className="remaining">
                  ₹ {remaining} remaining
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default Budget;