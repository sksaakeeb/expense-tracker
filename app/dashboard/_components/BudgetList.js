"use client";

import React, { useState } from "react";
import CreateNewBudget from "./CreateNewBudget";
import db from "@/app";
import { Budgets, Expenses } from "@/app/db/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  const [budgetList, setBudgetList] = useState();

  const { user } = useUser();

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount}::int)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateNewBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 || budgetList?.length == 0
          ? budgetList?.map((budget, index) => (
              <BudgetItem key={index} budget={budget} />
            ))
          : [1, 2].map((item, index) => (
              <div
                key={index}
                className="m-2 bg-slate-200 p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300 cursor-pointer animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
