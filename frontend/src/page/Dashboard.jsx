import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";
import Profile from "./Profile";
import Reports from "./Reports";
import Budget from "./Budget";
import TransactionHistory from "./TransactionHistory";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Food", value: 6700 },
  { name: "Travel", value: 4000 },
  { name: "Shopping", value: 6500 },
  { name: "Bills", value: 5800 }
];

const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336"];

function Dashboard() {

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [activeModule, setActiveModule] = useState("dashboard");

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  const username =
    user?.name ||
    user?.username ||
    user?.email ||
    "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {

    try {

      const budgetRes = await axios.get("http://localhost:8080/api/budgets");
      const savingsRes = await axios.get("http://localhost:8080/api/savings");

      const budgets = budgetRes.data;
      const goals = savingsRes.data;

      const totalBudgetLimit = budgets.reduce(
        (sum, b) => sum + b.monthlyLimit,
        0
      );

      const totalSpent = budgets.reduce(
        (sum, b) => sum + b.spentAmount,
        0
      );

      const savedAmount = goals.reduce(
        (sum, g) => sum + g.savedAmount,
        0
      );

      setTotalIncome(totalBudgetLimit);
      setTotalExpense(totalSpent);
      setRemainingBudget(totalBudgetLimit - totalSpent);
      setTotalSaved(savedAmount);

    } catch (error) {
      console.error("Dashboard loading error:", error);
    }
  };

  const getSuggestion = () => {

    if (totalExpense > totalIncome)
      return "⚠️ You are spending more than your budget!";

    if (remainingBudget < totalIncome * 0.2)
      return "⚠️ Your remaining budget is low.";

    if (totalSaved > 0)
      return "✅ Good job! Your savings are improving.";

    return "💡 Try allocating some income to savings.";
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>BudgetWise</h2>

        <ul>

          <li
            className={activeModule === "dashboard" ? "active" : ""}
            onClick={() => setActiveModule("dashboard")}
          >
            📊 Dashboard
          </li>

          <li
            className={activeModule === "profile" ? "active" : ""}
            onClick={() => setActiveModule("profile")}
          >
            👤 Profile
          </li>

          <li
            className={activeModule === "income" ? "active" : ""}
            onClick={() => setActiveModule("income")}
          >
            💰 Income
          </li>

          <li
            className={activeModule === "expense" ? "active" : ""}
            onClick={() => setActiveModule("expense")}
          >
            💳 Expense
          </li>

          <li
            className={activeModule === "budget" ? "active" : ""}
            onClick={() => setActiveModule("budget")}
          >
            🏦 Budget
          </li>

          <li
            className={activeModule === "reports" ? "active" : ""}
            onClick={() => setActiveModule("reports")}
          >
            📈 Reports
          </li>

          <li
            className={activeModule === "ai" ? "active" : ""}
            onClick={() => setActiveModule("ai")}
          >
            🤖 AI Advisor
          </li>

          <li onClick={handleLogout}>
            🚪 Logout
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">

        {activeModule === "dashboard" && (
          <>

            <div className="top-bar">
              <h3>Welcome back, {username} 👋</h3>
            </div>

            <div className="card-container">

              <div className="summary-card income">
                <h4>Total Budget Limit</h4>
                <h2>₹ {totalIncome}</h2>
              </div>

              <div className="summary-card expense">
                <h4>Total Spent</h4>
                <h2>₹ {totalExpense}</h2>
              </div>

              <div className="summary-card budget">
                <h4>Remaining Budget</h4>
                <h2>₹ {remainingBudget}</h2>
              </div>

              <div className="summary-card budget">
                <h4>Total Savings</h4>
                <h2>₹ {totalSaved}</h2>
              </div>

            </div>

            <div className="section">

              <h4>Expense Breakdown</h4>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={90}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="ai-box">
                <strong>AI Suggestion:</strong>
                <p>{getSuggestion()}</p>
              </div>

            </div>

            {/* Transaction History */}
            <TransactionHistory />

          </>
        )}

        {activeModule === "profile" && <Profile />}
        {activeModule === "income" && <AddIncome />}
        {activeModule === "expense" && <AddExpense />}
        {activeModule === "budget" && <Budget />}
        {activeModule === "reports" && <Reports />}

        {activeModule === "ai" && (
          <div className="section">
            <h4>AI Financial Advisor</h4>
            <p>{getSuggestion()}</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;