import { studyTimes } from "@/components/data/onboardingData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Clock } from "lucide-react";

const StepStudyTime = ({ formData, updateFormData }: any) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Daily study time ⏳
      </h2>

      <p className="mt-3 text-sm md:text-base text-textColor">
        Choose your preferred learning schedule.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {studyTimes.map((time) => {
          const selected = formData.studyTime === time;

          return (
            <motion.button
              key={time}
              onClick={() => updateFormData({ studyTime: time })}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-6 text-left w-full",
                "transition-all duration-300",
                selected
                  ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(106,236,225,0.18)]"
                  : "border-white/10 bg-white/[0.03] hover:border-primary/40"
              )}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* glow background */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary -z-10"
                  />
                )}
              </AnimatePresence>

              <div className="relative flex items-center justify-center z-10">

                <div className="flex flex-col items-center gap-2 my-3">

                  <div
                    className={cn(
                      "p-2 rounded-lg transition-all flex items-center justify-center",
                      selected
                        ? "bg-primary text-black"
                        : "bg-white/5 text-primary"
                    )}
                  >
                    <Clock size={18} />
                  </div>

                  <h3 className="text-lg font-semibold text-white text-center">
                    {time}
                  </h3>

                </div>

              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default StepStudyTime;


