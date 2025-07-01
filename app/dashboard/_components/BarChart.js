import React from "react";
import {
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  ResponsiveContainer,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Budget vs Spend Overview
      </h2>
      <div className="w-full">
        <ResponsiveContainer height={300} width="100%">
          <BarChart data={budgetList}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" name="Spent" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" name="Budget" stackId="a" fill="#C3C2FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartDashboard;
