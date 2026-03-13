import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reports.css";

function Reports() {

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const incomeRes = await axios.get("http://localhost:8080/api/income");
      const expenseRes = await axios.get("http://localhost:8080/api/expenses");

      setIncome(incomeRes.data);
      setExpenses(expenseRes.data);

      const incomeTotal = incomeRes.data.reduce((sum, i) => sum + i.amount, 0);
      const expenseTotal = expenseRes.data.reduce((sum, e) => sum + e.amount, 0);

      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);

    } catch (error) {
      console.log("Error loading reports:", error);
    }
  };

  const balance = totalIncome - totalExpense;

  return (

    <div className="reports-container">

      <h2>Financial Reports</h2>

      <div className="report-cards">

        <div className="report-card income">
          <h4>Total Income</h4>
          <p>₹ {totalIncome}</p>
        </div>

        <div className="report-card expense">
          <h4>Total Expenses</h4>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="report-card balance">
          <h4>Remaining Balance</h4>
          <p>₹ {balance}</p>
        </div>

      </div>

      <div className="report-details">

        <h3>Expense Breakdown</h3>

        {expenses.map((e, index) => (

          <div key={index} className="report-item">

            <span>{e.category}</span>
            <span>₹ {e.amount}</span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Reports;