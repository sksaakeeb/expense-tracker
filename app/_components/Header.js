import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center border-b shadow-sm">
      <Image src="/logo.svg" alt="" height={50} width={50} />

      <Link href={"/dashboard"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Header;
