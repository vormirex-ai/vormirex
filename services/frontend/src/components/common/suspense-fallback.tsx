import { motion } from "framer-motion";

export function SuspenseFallback() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500/10 border-t-cyan-500"></div>
        <div className="absolute h-6 w-6 animate-pulse rounded-full bg-cyan-500/20"></div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xs text-cyan-500/70 tracking-widest uppercase font-semibold animate-pulse"
      >
        Loading experience
      </motion.p>
    </div>
  );
}

export default SuspenseFallback;
