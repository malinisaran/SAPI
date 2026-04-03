import { Navigate } from "react-router-dom";
import { getCurrentUser, getToken } from "../services/authService";

/**
 * ProtectedRoute - Role-based route protection
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component to render
 * @param {number} props.allowedRole - Role allowed to access (1=admin, 2=user)
 * @param {string} props.fallbackPath - Where to redirect if not authorized
 */
export default function ProtectedRoute({ children, allowedRole, fallbackPath = "/login" }) {
  const token = getToken();
  const user = getCurrentUser();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check role
  if (allowedRole && user?.role !== allowedRole) {
    // Admin trying to access user page -> go to admin dashboard
    if (user?.role === 1) {
      return <Navigate to="/admindashboard" replace />;
    }
    // User trying to access admin page -> go to home
    if (user?.role === 2) {
      return <Navigate to="/home" replace />;
    }
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
