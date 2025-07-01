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
import { Budgets } from "@/app/db/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateNewBudget({ refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { user } = useUser();

  const handleSubmit = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast.success("Budget Created");
    }
  };

  return (
    <div className="m-2 bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer">
      <Dialog>
        <DialogTrigger>
          <div>
            <h3 className="text-2xl">+</h3>
            <h3 className="text-lg">Create New Budget</h3>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Amount</label>
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
                className="cursor-pointer"
                onClick={handleSubmit}
                disabled={!(name && amount)}
              >
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateNewBudget;
