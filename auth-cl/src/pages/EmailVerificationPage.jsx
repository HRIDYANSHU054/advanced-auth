import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../store/authStore";

function EmailVerificationPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const {
    verifyEmail,
    isLoading: isVerifyingEmail,
    error: verificationError,
  } = useAuthStore();
  const navigate = useNavigate();

  function handleChange(ind, value) {
    const newCode = [...code];
    // if user has pasted the entire code in one cell
    if (value.length > 1) {
      //slice(0, 6) means starting from 0th idnex and having length 6
      const pastedCode = value.slice(0, 6 - ind).split("");
      for (let i = 0; i < 6 - ind; i++) {
        newCode[ind + i] = pastedCode[i] ?? "";
      }
      setCode(newCode);

      //Now Focus on the last non empty input or the first empty one
      const firstEmptyInd = newCode.findIndex((digit) => digit === "");
      const focusInd =
        firstEmptyInd === -1 ? newCode.length - 1 : firstEmptyInd;
      inputRefs.current[focusInd].focus();
    } else {
      newCode[ind] = value;
      setCode(newCode);

      //move focus to the next digit box if value is entered
      if (value && ind < 5) {
        inputRefs.current[ind + 1].focus();
      }
    }
  }

  function handleKeyDown(ind, el) {
    if (el.key === "Backspace" && !code[ind] && ind > 0) {
      inputRefs.current[ind - 1].focus();
    }
  }

  const handleSubmit = useCallback(
    async function (e) {
      e?.preventDefault();
      if (!code.every((digit) => digit !== ""))
        return toast.error("Please completely fill the verification code");

      const verificationCode = code.join("");

      try {
        await verifyEmail(verificationCode);
        navigate("/login");
        toast.success("Email verified Successfully");
      } catch (error) {
        console.log(error.message);
      }
    },
    [code, navigate, verifyEmail],
  );

  useEffect(
    function () {
      if (code.every((digit) => digit !== "")) handleSubmit(null);
      //   if (code.every((digit) => digit !== "")) handleSubmit(new Event("submit"));
    },
    [code, handleSubmit],
  );

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-gray-800 bg-opacity-50 p-8 shadow-2xl backdrop-blur-xl backdrop-filter"
      >
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, ind) => (
              <input
                key={ind}
                ref={(el) => (inputRefs.current[ind] = el)}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(ind, e.target.value)}
                onKeyDown={(e) => handleKeyDown(ind, e)}
                className="size-12 rounded-lg border-2 border-gray-600 bg-gray-700 text-center text-2xl font-bold text-white focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {verificationError && (
            <p className="mt-2 font-semibold text-red-500">
              {verificationError}
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isVerifyingEmail || code.some((digit) => !digit)}
            className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isVerifyingEmail ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default EmailVerificationPage;
