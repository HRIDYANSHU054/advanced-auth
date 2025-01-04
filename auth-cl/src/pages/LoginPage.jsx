import { motion } from "framer-motion";
import { useState } from "react";
import { Loader, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading: isLoggingIn, error: loginError } = useAuthStore();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log("error in logging in", error.message);
      toast.error(error.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter"
    >
      <div className="p-8">
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Welcome back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="hiHarry@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mb-6 flex items-center">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {loginError && (
            <p className="mb-2 font-semibold text-red-500">{loginError}</p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoggingIn}
            className="mt-5 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {!isLoggingIn ? (
              "Login"
            ) : (
              <Loader className="mx-auto size-6 animate-spin" />
            )}
          </motion.button>
        </form>
      </div>

      <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
        <p className="text-sm text-gray-400">
          Don&apos;t have an account ?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default LoginPage;
