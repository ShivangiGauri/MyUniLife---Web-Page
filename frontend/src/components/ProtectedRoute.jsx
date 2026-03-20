import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const userString = localStorage.getItem("currentUser");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("token");

  // If no auth tokens/users present at all securely bounce
  if (!user && !token) {
    return <Navigate to="/" />;
  }

  const role = localStorage.getItem("role")?.toLowerCase() || user?.role?.toLowerCase() || "student";

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;