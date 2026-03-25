import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const TrendChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/expenses"),
      fetch("http://localhost:8080/api/income")
    ])
      .then(async ([expenseRes, incomeRes]) => {
        const expenses = await expenseRes.json();
        const incomes = await incomeRes.json();

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Initialize all months
        const monthlyExpense = {};
        const monthlyIncome = {};

        months.forEach(m => {
          monthlyExpense[m] = 0;
          monthlyIncome[m] = 0;
        });

        // Process Expenses
        expenses.forEach(item => {
          if (item.date) {
            const month = new Date(item.date).toLocaleString("default", {
              month: "short"
            });

            if (monthlyExpense[month] !== undefined) {
              monthlyExpense[month] += item.amount;
            }
          }
        });

        // Process Income
        incomes.forEach(item => {
          if (item.date) {
            const month = new Date(item.date).toLocaleString("default", {
              month: "short"
            });

            if (monthlyIncome[month] !== undefined) {
              monthlyIncome[month] += item.amount;
            }
          }
        });

        // Combine both
        const chartData = months.map(m => ({
          name: m,
          income: monthlyIncome[m],
          expense: monthlyExpense[m]
        }));

        setData(chartData);
      })
      .catch(err => console.error("Trend chart error:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3>📈 Income vs Expense Trend (Yearly)</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* Show all months */}
          <XAxis dataKey="name" interval={0} />

          <YAxis />

          <Tooltip formatter={(value) => `₹${value}`} />

          {/* 🟢 Income Line */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="green"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          {/* 🔵 Expense Line */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="blue"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;