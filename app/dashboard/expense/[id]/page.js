"use client";

import React, { useEffect, useState, use } from "react";
import db from "@/app";
import { Budgets, Expenses } from "@/app/db/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "../../_components/BudgetItem";
import Form from "./_components/Form";
import { Button } from "@/components/ui/button";
import ExpenseList from "./_components/ExpenseList";
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import EditBudget from "./_components/EditBudget";

function ExpensePage(props) {
  const params = use(props.params); // ✅ unwrap the Promise
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();

  const getBudgetInfo = async () => {
    if (!user || !params?.id) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount}::int)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
          eq(Budgets.id, params.id)
        )
      )
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    setExpenseList(result);
  };

  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      route.replace("/dashboard/budgets");
    }
  };

  useEffect(() => {
    getBudgetInfo();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h3 className="text-3xl font-bold flex justify-between items-center mb-8">
        My Expense Details
        <div className="flex items-center gap-2">
          {/* <EditBudget /> */}
          <Dialog>
            <DialogTrigger>
              <Trash className="text-red-600 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget along with it's expenses from our servers.
                </DialogDescription>
                <DialogFooter>
                  <Button onClick={() => deleteBudget()}>Confirm</Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </h3>

      {budgetInfo ? (
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">{budgetInfo.name}</h4>
            <span className="text-sm text-gray-500">
              {new Date(budgetInfo.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-lg text-blue-700">
              <p className="text-sm">Total Budget</p>
              <p className="text-xl font-semibold">₹{budgetInfo.amount}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-red-700">
              <p className="text-sm">Total Spent</p>
              <p className="text-xl font-semibold">₹{budgetInfo.totalSpend}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-green-700">
              <p className="text-sm">Remaining</p>
              <p className="text-xl font-semibold">
                ₹{budgetInfo.amount - budgetInfo.totalSpend}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-purple-700">
              <p className="text-sm">Total Expenses</p>
              <p className="text-xl font-semibold">{budgetInfo.totalItem}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-pulse bg-gray-200 rounded-xl h-40 w-full"></div>
      )}
      <Form
        budgetId={params.id}
        user={user}
        refreshData={() => getBudgetInfo()}
      />

      <div className="mt-5">
        <h3 className="text-2xl font-bold">Latest Expenses</h3>
        <ExpenseList
          expenseList={expenseList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensePage;
