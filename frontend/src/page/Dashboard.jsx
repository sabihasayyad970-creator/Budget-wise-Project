import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";
import Profile from "./Profile";
import Reports from "./Reports";
import Budget from "./Budget";
import TransactionHistory from "./TransactionHistory";
import AIAdvisor from "./AIAdvisor";
import FinancialReport from "./FinancialReport";

import ExpenseBarChart from "./charts/ExpenseBarChart";
import ExpenseBudgetChart from "./charts/ExpenseBudgetChart";
import TrendChart from "./charts/TrendChart";

function Dashboard() {

  const [activeModule, setActiveModule] = useState("dashboard");

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [prediction, setPrediction] = useState(0);

  useEffect(() => {
    loadData();
    loadPrediction();
  }, []);

  const loadData = async () => {
    try {
      const incomeRes = await axios.get("http://localhost:8080/api/income");
      const expenseRes = await axios.get("http://localhost:8080/api/expenses");

      const income = incomeRes.data.reduce((sum, i) => sum + i.amount, 0);
      const expense = expenseRes.data.reduce((sum, e) => sum + e.amount, 0);

      setTotalIncome(income);
      setTotalExpense(expense);
      setRemainingBudget(income - expense);

    } catch (err) {
      console.log("Data load error", err);
    }
  };

  const loadPrediction = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5001/predict-expense");

      if (res.data.status === "success") {
        setPrediction(res.data.predicted_expense);
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction(0);
    }
  };

  const getSuggestion = () => {
    if (totalExpense > totalIncome)
      return "⚠️ You are overspending!";
    if (remainingBudget < totalIncome * 0.2)
      return "⚠️ Savings are low";
    return "✅ Good financial condition";
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>BudgetWise</h2>
        <ul>
          <li onClick={() => setActiveModule("dashboard")}>📊 Dashboard</li>
          <li onClick={() => setActiveModule("profile")}>👤 Profile</li>
          <li onClick={() => setActiveModule("income")}>💰 Income</li>
          <li onClick={() => setActiveModule("expense")}>💳 Expense</li>
          <li onClick={() => setActiveModule("budget")}>🏦 Budget</li>
          <li onClick={() => setActiveModule("transactions")}>📜 Transactions</li>
          <li onClick={() => setActiveModule("advisor")}>🤖 AI Advisor</li>
          <li onClick={() => setActiveModule("reports")}>📄 Report</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main-content">

        {activeModule === "dashboard" && (
          <>
            {/* SUMMARY */}
            <div className="card-container">
              <div className="summary-card income">
                <h4>Total Income</h4>
                <h2>₹ {totalIncome}</h2>
              </div>

              <div className="summary-card expense">
                <h4>Total Expense</h4>
                <h2>₹ {totalExpense}</h2>
              </div>

              <div className="summary-card budget">
                <h4>Remaining</h4>
                <h2>₹ {remainingBudget}</h2>
              </div>
            </div>

            {/* TREND */}
            <div className="module-box">
              <TrendChart />
            </div>

            {/* 🔥 FIXED ALIGNMENT ROW */}
            <div className="chart-row">
              <div className="module-box">
                <ExpenseBarChart />
              </div>

              <div className="module-box">
                <ExpenseBudgetChart />
              </div>
            </div>

            {/* AI SECTION */}
            <div className="ai-section">
              <div className="ai-box">
                <h3>🤖 AI Suggestion</h3>
                <p>{getSuggestion()}</p>
              </div>

              <div className="ai-box">
                <h3>📈 Next Month Prediction</h3>
                <p>₹ {prediction}</p>
              </div>
            </div>
          </>
        )}

        {activeModule === "profile" && <Profile />}
        {activeModule === "income" && <AddIncome />}
        {activeModule === "expense" && <AddExpense />}
        {activeModule === "budget" && <Budget />}
        {activeModule === "transactions" && <TransactionHistory />}
        {activeModule === "advisor" && <AIAdvisor />}
        {activeModule === "reports" && <FinancialReport />}

      </div>
    </div>
  );
}

export default Dashboard;