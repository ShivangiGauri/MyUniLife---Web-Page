import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleHierarchy = {
  student: 1,
  club: 2,
  admin: 3,
  superadmin: 4,
};

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userLevel = roleHierarchy[user.role] || 0;
  
  // If no allowedRoles specified, just need to be logged in
  if (!allowedRoles) return <Outlet />;

  const allowedLevels = allowedRoles.map(role => roleHierarchy[role] || 0);
  const hasAccess = allowedLevels.some(level => userLevel >= level);

  // ❌ Unauthorized (already logged in but insufficient rank)
  if (!hasAccess) {
    console.warn(`⛔ Access Denied: Role ${user.role} (Level ${userLevel}) attempted to access routes for ${allowedRoles}`);
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return <Outlet />;
};

export default ProtectedRoute;
