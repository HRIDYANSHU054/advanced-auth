import { motion } from "framer-motion";

function FloatingShape({ color, size, top, left, delay }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        delay: delay,
        repeat: Infinity,
      }}
      style={{ top, left }}
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
    ></motion.div>
  );
}

export default FloatingShape;
