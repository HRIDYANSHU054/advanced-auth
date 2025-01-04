import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error: signUpError, isLoading: isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log("error in signing up", error.message);
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
        {/* gradient heading */}
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Create Account
        </h2>

        {/* signup form */}
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Harry McLaren"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {signUpError && (
            <p className="mt-2 font-semibold text-red-500">{signUpError}</p>
          )}
          <PasswordStrengthMeter password={password} />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSigningUp}
            className="mt-5 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {!isSigningUp ? (
              "Sign Up"
            ) : (
              <Loader size={24} className="mx-auto animate-spin" />
            )}
          </motion.button>
        </form>
      </div>

      <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
        <p className="text-sm text-gray-400">
          Already have an account{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUpPage;
