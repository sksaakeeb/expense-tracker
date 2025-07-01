import db from "@/app";
import { Expenses } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseList({ expenseList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast.success("Expense Deleted");
      refreshData();
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Header Row */}
      <div className="grid grid-cols-4 bg-slate-200 p-4 font-semibold text-gray-700 border border-slate-300 rounded-t-md">
        <h3 className="text-center">Name</h3>
        <h3 className="text-center">Amount</h3>
        <h3 className="text-center">Date</h3>
        <h3 className="text-center">Action</h3>
      </div>

      {/* Expense Rows */}
      {expenseList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-4 bg-white p-4 border-x border-b border-slate-300 items-center hover:bg-slate-100 transition-all"
        >
          <h2 className="text-center">{item.name}</h2>
          <h2 className="text-center">₹{item.amount}</h2>
          <h2 className="text-center">{item.createdBy}</h2>
          <div className="flex justify-center">
            <Trash
              className="text-red-600 cursor-pointer hover:text-red-800 transition"
              onClick={() => deleteExpense(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
