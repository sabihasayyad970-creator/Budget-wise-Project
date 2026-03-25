import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

const COLORS = [
  "#4CAF50",  // green
  "#2196F3",  // blue
  "#FF9800",  // orange
  "#E91E63",  // pink
  "#9C27B0",  // purple
  "#00BCD4",  // cyan
  "#FFC107",  // yellow
  "#795548",  // brown
  "#3F51B5"   // indigo
];

const ExpenseBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then(res => res.json())
      .then(result => {

        const grouped = {};

        result.forEach(item => {
          const category = item.category || "Other";

          if (!grouped[category]) {
            grouped[category] = 0;
          }

          grouped[category] += item.amount;
        });

        const chartData = Object.keys(grouped).map(key => ({
          name: key,
          amount: grouped[key]
        }));

        setData(chartData);
      })
      .catch(err => console.error("Error fetching expenses:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3>Category-wise Expenses</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip formatter={(value) => `₹${value}`} />

          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;