import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center border-b shadow-sm">
     <Link href={'/dashboard'}>
      <Image src="/logo.svg" alt="Logo" height={40} width={40} />
      </Link>

      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
