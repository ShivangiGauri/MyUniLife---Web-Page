import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import TopNav from "./TopNav";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <TopNav />

        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;