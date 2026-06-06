import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";

export function GlobalLoader() {
  const { isLoading, message } = useSelector((state: RootState) => state.loader);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020817]/70 backdrop-blur-md text-white"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex items-center justify-center">
              {/* Outer gradient ring */}
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400"></div>
              {/* Inner glowing/pulsing circle */}
              <div className="absolute h-10 w-10 animate-pulse rounded-full bg-cyan-400/20"></div>
            </div>
            {message && (
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-semibold tracking-wide text-cyan-200 animate-pulse"
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default GlobalLoader;
