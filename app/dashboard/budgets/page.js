import React from "react";
import BudgetList from "../_components/BudgetList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="p-10">
      <div className="flex gap-3 items-center">
        <Link href={"/dashboard"}>
          <ArrowLeft />
        </Link>
        <h3 className="font-medium text-3xl">Budget Lists</h3>
      </div>

      <BudgetList />
    </div>
  );
}

export default Dashboard;
