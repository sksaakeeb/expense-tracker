import { Edit } from "lucide-react";
import React from "react";
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
import { Input, Button } from "@/components/ui/input";

function EditBudget() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div>
            <Edit />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <Input type="text" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Amount</label>
                <Input type="number" />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
