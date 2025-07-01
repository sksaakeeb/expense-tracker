import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function LineChartDashboard({ budgetList }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Budget vs Spending Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={budgetList}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Budget"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="totalSpend"
            name="Spent"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartDashboard;
