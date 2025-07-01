import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  return (
    <Link
      href={"/dashboard/expense/" + budget?.id}
      className="m-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 cursor-pointer"
    >
      <div className="space-y-4">
        {/* Budget Name and Label */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{budget.name}</h3>
          <p className="text-sm text-gray-500">Planned Budget</p>
        </div>

        {/* Budget Amount */}
        <div>
          <p className="text-2xl font-bold text-green-600">₹{budget.amount}</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Spend: ₹{budget.totalSpend}</span>
          <span>Items: {budget.totalItem}</span>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
