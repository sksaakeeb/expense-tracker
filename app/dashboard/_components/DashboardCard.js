"use client";

import { Pen, PiggyBank, Wallet } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function DashboardCard({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ += element.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  useEffect(() => {
    budgetList && calculateCardInfo();
  }, [budgetList]);

  return (
    <div className="p-4">
      {budgetList?.length > 0 || budgetList?.length == 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href={"/dashboard/budgets"}>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border">
              <h3>
                <Wallet />
              </h3>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Budget
              </h3>
              <h3 className="text-2xl font-bold text-blue-600 mt-2">
                ₹{totalBudget}
              </h3>
            </div>
          </Link>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border">
            <h3>
              <PiggyBank />
            </h3>
            <h3 className="text-lg font-semibold text-gray-700">Total Spend</h3>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">
              ₹{totalSpend}
            </h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border">
            <h3>
              <Pen />
            </h3>
            <h3 className="text-lg font-semibold text-gray-700">
              No. of Budgets
            </h3>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">
              {budgetList.length}
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="bg-slate-200 animate-pulse w-full rounded-lg h-[135px]"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
