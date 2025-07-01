"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import db from "@/app";
import { Budgets, Expenses } from "@/app/db/schema";
import { toast } from "sonner";
import moment from "moment/moment";

function Form({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name,
          amount: Number(amount),
          budgetId,
          createdBy: moment().format("DD-MM-YYYY"),
        })
        .returning({ insertedId: Expenses.id });
      if (result) {
        refreshData();
        toast.success("New Expense Added");
      }

      // Reset
      setName("");
      setAmount("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-slate-950 p-2 rounded-lg mt-2">
            <h3 className="text-lg text-white font-semibold">+ Add</h3>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Budget Details</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Expense Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Expense Amount
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => addNewExpense()}
                className="cursor-pointer"
              >
                + Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Form;
