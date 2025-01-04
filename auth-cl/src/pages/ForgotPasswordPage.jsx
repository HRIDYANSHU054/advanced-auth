import { motion } from "framer-motion";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
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
        <h1 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Forgot Password
        </h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-6 text-center text-gray-300">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
            <Input
              icon={Mail}
              type="email"
              value={email}
              placeholder="earlyBird@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? (
                <Loader className="mx-auto size-6 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500"
            >
              <Mail className="size-8 text-white" />
            </motion.div>

            <p className="mb-6 text-gray-300">
              If an account exists for {email}, you will receive a password
              reset link shortly
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
        <Link
          to="/login"
          className="flex items-center text-sm text-green-400 hover:underline"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordPage;
