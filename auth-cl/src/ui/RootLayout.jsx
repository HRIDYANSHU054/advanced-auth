import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import FloatingShape from "../components/FloatingShape";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../store/authStore";

function RootLayout() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(
    function () {
      checkAuth();
    },
    [checkAuth],
  );

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Outlet />
    </div>
  );
}

export default RootLayout;
