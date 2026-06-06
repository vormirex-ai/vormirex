import { motion } from "framer-motion";

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <div className="flex items-center justify-between gap-1 sm:gap-2 max-w-2xl mx-auto px-2 sm:px-4 w-full">
      {[1, 2, 3, 4].map((item, index) => {
        const isCompleted = step > item;
        const isActive = step === item;

        return (
          <div
            key={item}
            className="flex items-center flex-1 last:flex-none min-w-0"
          >
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isCompleted
                  ? "rgba(20, 88, 55, 0.2)"
                  : isActive
                    ? "rgba(20, 88, 55, 0.1)"
                    : "rgba(255, 255, 255, 0.05)",

                borderColor:
                  isCompleted || isActive
                    ? "#145837"
                    : "rgba(255, 255, 255, 0.1)",

                color: isCompleted
                  ? "#145837"
                  : isActive
                    ? "#6aecff"
                    : "#8e8e93",

                boxShadow: isActive
                  ? "0 0 20px rgba(106, 236, 225, 0.4)"
                  : "0 0 0px rgba(0, 0, 0, 0)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="
                relative z-10
                flex shrink-0 items-center justify-center
                rounded-full border font-bold
                h-8 w-8 text-xs
                sm:h-10 sm:w-10 sm:text-sm
                md:h-11 md:w-11
              "
            >
              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.span>
              ) : (
                <span>{item}</span>
              )}
            </motion.div>

            {index !== 3 && (
              <div className="h-[2px] flex-1 bg-white/10 mx-1 sm:mx-2 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: step > item ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="h-full bg-[#145837]"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;