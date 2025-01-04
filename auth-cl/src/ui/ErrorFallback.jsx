import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-900 bg-opacity-50 px-5 py-7 shadow-xl backdrop-blur-xl backdrop-filter"
    >
      <p className="mb-6 text-center text-xl tracking-wide text-gray-300">
        Something went wrong 🧐
      </p>
      <p className="mb-6 text-center text-xl tracking-wide text-gray-300">
        {error.message}
      </p>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={resetErrorBoundary}
        className="group mt-5 w-full rounded-lg border-[1px] border-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-border p-[1px] font-bold text-white shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <div className="flex items-center justify-center rounded-md bg-gray-900 bg-opacity-90 px-4 py-3 text-green-500 group-hover:shadow-sm">
          <RotateCcw className="mr-2" size={18} /> Try Again
        </div>
      </motion.button>
    </motion.div>
  );
}

export default ErrorFallback;
