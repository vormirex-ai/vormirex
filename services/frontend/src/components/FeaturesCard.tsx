import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  baseColor: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  iconBg,
  baseColor,
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card
        className="
          group relative min-h-[260px] overflow-hidden cursor-pointer
          bg-[#0D1323] backdrop-blur-xl
          border transition-all duration-500
          transform-gpu will-change-transform

          shadow-[0_0_15px_rgba(106,236,225,0.10)]
          hover:shadow-[0_0_35px_rgba(79,209,197,0.30)]
          hover:border-[#4fd1c5]/60
        "
        style={{
          borderColor: baseColor,
        }}
      >
        <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-8 flex flex-col items-center text-center relative z-10">

          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className={`
              w-16 h-16 ${iconBg}
              rounded-2xl flex items-center justify-center text-3xl mb-6
              border border-[#6aece1]/20
              shadow-[0_0_12px_rgba(106,236,225,0.15)]
              group-hover:border-[#4fd1c5]/60
              group-hover:shadow-[0_0_25px_rgba(79,209,197,0.35)]
              transition-all duration-300
            `}
          >
            {icon}
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#6aece1] transition-colors">
            {title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
            <div className="h-[2px] w-0 mx-auto bg-gradient-to-r from-[#6aece1] via-[#4fd1c5] to-[#6aece1] group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(106,236,225,0.4)]" />
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
};