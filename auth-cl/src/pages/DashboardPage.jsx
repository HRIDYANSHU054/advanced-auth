import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/Dates";
import { Loader } from "lucide-react";

function DashboardPage() {
  const { user, logout, isLoading: isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success(`We hope to see you soon, ${user.name}!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-10 w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 bg-opacity-80 p-8 shadow-2xl backdrop-blur-lg backdrop-filter"
    >
      <h1 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-center text-3xl font-bold text-transparent">
        Dashboard
      </h1>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 p-4"
        >
          <h3 className="mb-3 text-xl font-semibold text-green-400">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 p-4"
        >
          <h2 className="mb-3 text-xl font-semibold text-green-400">
            Account Activity
          </h2>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {user.lastLogin
              ? formatDate(user.lastLogin)
              : "You just signed up!"}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {isLoggingOut ? (
            <Loader className="mx-auto size-6 animate-spin" />
          ) : (
            "Logout"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default DashboardPage;
