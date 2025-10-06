"use client";

import Link from "next/link";
import React, { useState } from "react";

type Props = {};
/* Mobile menu Hamburger */
const MobileMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        data-id="open-mobile-menu-btn"
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500 `}
        />
      </div>
      {isOpen && (
        <div
          data-id="open-mobile-menu"
          className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10"
        >
          <Link data-id="home-link" href="/">
            Home
          </Link>
          <Link data-id="friends-link" href="/">
            Friends
          </Link>
          <Link data-id="groups-link" href="/">
            Groups
          </Link>
          <Link data-id="stories-link" href="/">
            Stories
          </Link>
          <Link data-id="login-link" href="/">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
