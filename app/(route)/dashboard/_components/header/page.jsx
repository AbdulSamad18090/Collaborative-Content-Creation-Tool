"use client";
import ModeToggle from "@/components/darkModeToggler/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const DahsboardHeader = ({ toggleSidebar }) => {
  const { data: session, status } = useSession();

  const profileImage =
    session?.user?.image ||
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+";

  console.log(profileImage);

  return (
    <header className="bg-white dark:bg-black shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-black placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm dark:border-neutral-800"
                  placeholder="Search documents, tasks, team members..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <ModeToggle/>
          <div className="flex items-center">
            <button className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-neutral-800" />
            </button>
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black items-center">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage}
                    alt="User avatar"
                    width={100}
                    height={100}
                  />
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DahsboardHeader;
