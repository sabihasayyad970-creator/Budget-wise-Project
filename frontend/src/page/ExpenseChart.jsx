import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const ExpenseChart = () => {
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
          value: grouped[key]
        }));

        setData(chartData);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Expense Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;