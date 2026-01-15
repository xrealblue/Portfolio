"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <nav
      className="sticky top-0 left-0
      bg-[#131313]
      w-full flex justify-between items-center  text-white z-[999]"
      style={{
        fontSize: "clamp(0.9rem, 1.1vw, 240rem)",
        padding: "clamp(1rem, 0.75vw, 240rem) clamp(0.75rem, 0.75vw, 240rem)",
        gap: "clamp(1rem, 1vw, 240rem)",
      }}
    >
      <div className="flex relative z-[9999] w-[35%] md:w-1/2">
        <Link href="/" className="text-left items-center flex">
          <div className="">{"Heet Vavadiya"}</div>
        </Link>
      </div>
      <div className="flex w-[65%] md:w-1/2 md:justify-start justify-start">
        <div className="text-left w-[85%] md:w-[35%] items-center flex">
          <div className=" ">Web3 Developer</div>
        </div>

        <div className="text-left w-[40%] md:w-[55%] items-center flex">
          <div className="hidden md:block">Ahemdabad,IN</div>
        </div>

        {!isHome && (
          <Link
            href="/"
            className="flex text-white cursor-pointer w-[10%] justify-end"
          >
            <X className="text-white" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
