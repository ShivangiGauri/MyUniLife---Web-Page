import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNav from "./TopNav";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen 
                bg-[#F8F5F2] 
                dark:bg-[#0F172A] 
                text-[#2D2D2D] 
                dark:text-slate-100 
                transition-colors duration-300 
                flex">


      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <TopNav />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
