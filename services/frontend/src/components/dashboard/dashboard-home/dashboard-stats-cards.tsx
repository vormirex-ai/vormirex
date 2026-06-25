import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { IoArrowUp } from "react-icons/io5";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: any;
  suffix?: string;
  badge?: string;
  icon?: LucideIcon | string;
  iconBg?: string;
  iconColor?: string;
  compact?: boolean;
};

export function StatCard({
  title,
  value,
  suffix,
  badge,
  icon,
  iconBg,
  iconColor,
  compact = false,
}: Props) {
  const numericValue = parseInt(value.toString().replace(/,/g, ""), 10);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [numericValue]);

  const IconComponent = typeof icon !== "string" ? icon : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden cursor-pointer">
        <div className=" absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#63E7DC] via-[#46D3C9] to-[#26BDB3] transition-all duration-300 ease-out group-hover:w-full " />

        <CardContent className={compact ? "p-3" : "p-5"}>
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className={` flex items-center justify-center rounded-2xl shadow-lg
             ${compact ? "h-10 w-10" : "h-12 w-12"} ${iconBg}`}
            >
              <div
                className={` flex items-center justify-center text-xl [&_svg]:h-5 [&_svg]:w-5
                  ${iconColor}
                `}
              >
                {typeof icon === "string"
                  ? icon
                  : IconComponent && <IconComponent />}
              </div>
            </motion.div>
          </div>

          <div className={compact ? "mt-3" : "mt-6"}>
            <p className="my-1 text-sm text-slate-400">{title}</p>

            <div className="mt-1 flex items-end gap-1">
              <motion.h2
                className={
                  compact ? "text-2xl font-bold" : "text-3xl font-bold"
                }
              >
                {count.toLocaleString()}
              </motion.h2>

              <span className="mb-1 text-sm text-slate-400">{suffix}</span>
            </div>

            {badge && (
              <p className="mt-1 flex gap-1 text-green-500">
                <IoArrowUp className="mt-1" />
                {badge}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
