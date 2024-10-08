import { signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  Pen,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  X,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const DahsboardSideBar = ({ isSidebarOpen, toggleSidebar, activeTab, setActiveTab }) => {

  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <Pen className="h-8 w-6 text-black" />
            <span className="text-xl font-bold">ContentCollab</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation - Make this section scrollable */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
              { icon: FileText, label: "Documents", id: "documents" },
              { icon: Users, label: "Collaborators", id: "collaborators" },
              // { icon: Calendar, label: "Calendar", id: "calendar" },
              { icon: MessageSquare, label: "Comments", id: "comments" },
              { icon: Settings, label: "Settings", id: "settings" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? "bg-black text-white bg-opacity-90"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at the bottom */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => {
              signOut({
                callbackUrl: "/",
                redirect: false,
              });
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DahsboardSideBar;
