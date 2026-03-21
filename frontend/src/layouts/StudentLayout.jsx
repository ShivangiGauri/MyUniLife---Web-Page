import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import TopNav from "./TopNav";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF8E8] dark:bg-[#49243E] text-[#333333] dark:text-[#F5F5F5] transition-colors duration-300 flex overflow-x-hidden">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper (Fixed Navigation) */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 transform bg-[#DEE8CE] dark:bg-[#704264] border-r border-[#E9E5E1] dark:border-[#49243E]
        transition-transform duration-300 ease-in-out 
        md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        w-64 md:w-56 lg:w-64`}
      >
        <StudentSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Area (Leaves space for fixed sidebar on md and up) */}
      <div className="flex-1 flex flex-col min-h-screen w-full md:ml-56 lg:ml-64 transition-all duration-300">

        {/* Top Navigation */}
        <TopNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
