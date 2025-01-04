import { Navigate } from "react-router-dom";

import RootLayout from "../ui/RootLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import PageNotFound from "../pages/PageNotFound";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import RedirectAuthUser from "../components/RedirectAuthUser";
import ProtectedRoute from "../pages/ProtectedRoute";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ErrorBoundaryLayout from "../ui/ErrorBoundaryLayout";

export const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <ErrorBoundaryLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/",
                element: <Navigate to="/dashboard" replace />,
              },
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
            ],
          },

          {
            element: <RedirectAuthUser />,
            children: [
              {
                path: "/login",
                element: <LoginPage />,
              },
              {
                path: "/signup",
                element: <SignUpPage />,
              },
              {
                path: "/verify-email",
                element: <EmailVerificationPage />,
              },
              {
                path: "/forgot-password",
                element: <ForgotPasswordPage />,
              },
              {
                path: "/reset-password/:token",
                element: <ResetPasswordPage />,
              },
            ],
          },
          // {
          //   path: "/login",
          //   element: (
          //     <RedirectAuthUser>
          //       <LoginPage />
          //     </RedirectAuthUser>
          //   ),
          // },
          // {
          //   path: "/signup",
          //   element: (
          //     <RedirectAuthUser>
          //       <SignUpPage />
          //     </RedirectAuthUser>
          //   ),
          // },

          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
];
