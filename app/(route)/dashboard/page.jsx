"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DahsboardHeader from "./_components/header/page";
import DahsboardSideBar from "./_components/sidebar/page";
import MainDashboard from "./_components/main/page";
import Collaborators from "./_components/collaborators/page";
import CalendarTab from "./_components/calendar/page";
import Documents from "./_components/documents/page";
import Comments from "./_components/comments/page";
import SettingsTab from "./_components/settings/page";

export default function AdvancedDashboardComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    if (!session) {
      router.push("/"); // Redirect only if session is unauthenticated
    } else {
      console.log("Session =>", session)
    }
  }, [status, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    session && (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto">
        {/* Sidebar */}
        <DahsboardSideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab} // pass activeTab
          setActiveTab={setActiveTab} // pass setActiveTab
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <DahsboardHeader toggleSidebar={toggleSidebar} />
          {/* Dashboard Content */}
          {activeTab === "dashboard" && <MainDashboard />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "collaborators" && <Collaborators />}
          {/* {activeTab === "calendar" && <CalendarTab />} */}
          {activeTab === "comments" && <Comments />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    )
  );
}
