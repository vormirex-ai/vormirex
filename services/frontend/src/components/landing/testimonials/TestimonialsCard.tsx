import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  initials: string;
  avatarColor: string;
}

const TestimonialCard = ({
  name,
  role,
  content,
  initials,
  avatarColor,
}: TestimonialProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-[220px]"
    >
      <Card
        className="
          group relative min-h-[220px] overflow-hidden cursor-pointer
          bg-[#0E1424] backdrop-blur-xl
          border border-white/10
          transition-all duration-500
          transform-gpu will-change-transform

          shadow-[0_0_15px_rgba(106,236,225,0.08)]
          hover:shadow-[0_0_40px_rgba(106,236,225,0.35)]
          hover:border-[#6aece1]/60

          rounded-2xl
        "
      >
        <CardContent className="p-6 flex flex-col gap-5 h-full">

          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#6aece1] text-[#6aece1]"
              />
            ))}
          </div>

          {/* Content */}
          <p className="text-gray-300 text-[15px] leading-relaxed italic flex-grow">
            "{content}"
          </p>

          {/* User */}
          <div className="flex items-center gap-3 pt-2">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-white text-sm font-bold shadow-lg
                border border-white/10
                group-hover:border-[#6aece1]/60
                group-hover:shadow-[0_0_20px_rgba(106,236,225,0.4)]
                transition-all duration-300
                ${avatarColor}
              `}
            >
              {initials}
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-semibold text-sm leading-none group-hover:text-[#6aece1] transition-colors">
                {name}
              </h4>
              <p className="text-gray-500 text-xs mt-1">{role}</p>
            </div>
          </div>
        </CardContent>

        {/* Bottom Glow */}
        <div
          className="
            absolute bottom-0 left-0 w-full h-[2px]
            bg-gradient-to-r from-transparent via-[#6aece1] to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;