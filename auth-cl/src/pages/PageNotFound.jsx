import { motion } from "framer-motion";

import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-900 bg-opacity-50 px-5 py-7 shadow-xl backdrop-blur-xl backdrop-filter"
    >
      <p className="mb-2 text-center text-xl tracking-wide text-gray-300">
        You have reached nowhere, the land of null
      </p>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={moveBack}
        className="group mt-5 w-full rounded-lg border-[1px] border-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-border p-[1px] font-bold text-white shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <div className="rounded-md bg-gray-900 bg-opacity-90 px-4 py-3 text-green-500 group-hover:shadow-sm">
          &larr; Go back
        </div>
      </motion.button>
    </motion.div>
  );
}

export default PageNotFound;
