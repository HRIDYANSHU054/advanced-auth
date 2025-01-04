import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";

function ProtectedRoute({ children }) {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace={true} />;

  if (!user.isVerified) return <Navigate to="/verify-email" replace />;

  return children ?? <Outlet />;
}

export default ProtectedRoute;
