import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function RedirectAuthUser() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default RedirectAuthUser;
