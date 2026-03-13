import React, { useState, useEffect } from "react";
import "../styles/SavingsGoal.css";
import { getGoals, createGoal, deleteGoal } from "../services/savingsService.js";

function SavingsGoal() {

  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    getGoals()
      .then((res) => {
        setGoals(res.data);
      })
      .catch((error) => {
        console.error("Error loading goals:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const goal = {
      goalName: goalName,
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount)
    };

    createGoal(goal)
      .then(() => {
        setGoalName("");
        setTargetAmount("");
        setSavedAmount("");
        loadGoals();
      })
      .catch((error) => {
        console.error("Error creating goal:", error);
      });
  };

  const removeGoal = (id) => {
    deleteGoal(id)
      .then(() => loadGoals())
      .catch((error) => {
        console.error("Error deleting goal:", error);
      });
  };

  return (
    <div className="goal-container">

      <h2>Savings Goals</h2>

      <form className="goal-form" onSubmit={handleSubmit}>

        <input
          value={goalName}
          placeholder="Goal Name"
          onChange={(e) => setGoalName(e.target.value)}
        />

        <input
          type="number"
          value={targetAmount}
          placeholder="Target Amount"
          onChange={(e) => setTargetAmount(e.target.value)}
        />

        <input
          type="number"
          value={savedAmount}
          placeholder="Saved Amount"
          onChange={(e) => setSavedAmount(e.target.value)}
        />

        <button type="submit">Add Goal</button>

      </form>

      <ul className="goal-list">

        {goals.map((g) => (
          <li key={g.id} className="goal-item">

            <span>
              {g.goalName} | Target: ₹{g.targetAmount} | Saved: ₹{g.savedAmount}
            </span>

            <button onClick={() => removeGoal(g.id)}>
              Delete
            </button>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default SavingsGoal;