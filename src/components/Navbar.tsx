"use client";

import Link from "next/link";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

type Props = {};

const Navbar = (props: Props) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between h-24 ">
      <div className="md:hidden lg:block w-[20%] ">
        <Link href="/" className="font-bold text-sl text-blue-600">
          LAMASOCIAL
        </Link>
      </div>
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/stories.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="focus:outline outline-gray-700 hidden xl:flex p-2 bg-slate-100 dark:bg-slate-800 items-center rounded-xl">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-black dark:text-gray-500 
            "
          />
          <Image src="/search.png" width={14} height={14} alt="search" />
        </div>
      </div>
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500"></div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" width={24} height={24} alt="People" />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/messages.png"
                width={24}
                height={24}
                alt="Messages"
              />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/notifications.png"
                width={24}
                height={24}
                alt="notifications"
              />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4 text-sm">
              <Image src="/login.png" width={24} height={24} alt="People" />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
