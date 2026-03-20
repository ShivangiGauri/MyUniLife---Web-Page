import { useState } from "react";
import { Outlet } from "react-router-dom";
import ClubSidebar from "./ClubSidebar";
import ClubTopNav from "./ClubTopNav";

export default function ClubLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7CFD8] dark:bg-[#1A1A1D] text-gray-800 dark:text-gray-200 transition-colors duration-300 flex overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Wrapper */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 transform bg-[#F7CFD8] dark:bg-[#1A1A1D] border-r border-[#A6D6D6] dark:border-[#3B1C32]
        transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 md:w-56 lg:w-64`}
      >
        <ClubSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full md:ml-56 lg:ml-64 transition-all duration-300">
        <div className="sticky top-0 z-40">
          <ClubTopNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}