import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { routes } from "./routes/routes.config.jsx";

const router = createBrowserRouter(routes);

// const router = createBrowserRouter([
//   {
//     element: <ErrorBoundaryLayout />,
//     children: [
//       {
//         element: (
//           <ProtectedRoute>
//             <AppLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           {
//             index: true,
//             element: <Navigate to="/dashboard" replace />,
//           },
//           {
//             path: "dashboard",
//             element: <Dashboard />,
//           },
//           {
//             path: "bookings",
//             element: <Bookings />,
//           },
//           {
//             path: "bookings/:bookingId",
//             element: <Booking />,
//           },
//           {
//             path: "checkin/:bookingId",
//             element: <Checkin />,
//           },
//           {
//             path: "cabins",
//             element: <Cabins />,
//           },
//           {
//             path: "users",
//             element: <Users />,
//           },
//           {
//             path: "settings",
//             element: <Settings />,
//           },
//           {
//             path: "account",
//             element: <Account />,
//           },
//         ],
//       },

//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "*",
//         element: <PageNotFound />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
