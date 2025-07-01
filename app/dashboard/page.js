"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import DashboardCard from "./_components/DashboardCard";
import db from "..";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../db/schema";
import BarChart from "./_components/BarChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LineChartDashboard from "./_components/LineChartDashboard";

function DashboardPage() {
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
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Hi, {user?.fullName}</h3>

        <Link href={"/dashboard/budgets"}>
          <div>
            <Button className="cursor-pointer">+ New Budget</Button>
          </div>
        </Link>
      </div>

      <DashboardCard budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        <div>
          <BarChart budgetList={budgetList} />
        </div>

        <LineChartDashboard budgetList={budgetList} />
      </div>
    </div>
  );
}

export default DashboardPage;
