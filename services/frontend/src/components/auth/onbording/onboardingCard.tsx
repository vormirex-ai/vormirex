import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SelectableCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  iconColor?: string;
}

const SelectableCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
  iconColor,
}: SelectableCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative rounded-xl sm:rounded-2xl border p- sm:p-6 md:p-8 text-left transition-all duration-300 w-full overflow-hidden group",
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_25px_rgba(106,236,225,0.15)]"
          : "border-white/10 bg-white/[0.03] hover:border-primary/40"
      )}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary -z-10"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center relative z-10">

        <div
          className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ color: iconColor || "inherit" }}
        >
          {icon}
        </div>

        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-primary transition-colors">
          {title}
        </h3>

        {description?.trim() && (
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-textColor group-hover:text-white/80 transition-colors leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-20 shadow-[inset_0_0_20px_rgba(106,236,225,0.05)]" />
    </motion.button>
  );
};

export default SelectableCard;