import { cn } from "@/lib/utils";
import {
  Turtle,
  Zap,
  Rocket,
} from "lucide-react";

export type PaceType =
  | "comfortable"
  | "balanced"
  | "fast";

interface Props {
  pace: PaceType;
  setPace: (value: PaceType) => void;
}

const paceOptions = [
  {
    key: "comfortable",
    title: "Comfortable Pace",
    desc: "Steady, no pressure learning",
    icon: Turtle,
    iconColor: "text-green-400",
    iconBg:
      "bg-green-500/15 border border-green-400/20",
  },
  {
    key: "balanced",
    title: "Balanced Pace",
    desc: "Productive and sustainable",
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg:
      "bg-yellow-500/15 border border-yellow-400/20",
  },
  {
    key: "fast",
    title: "Fast Track",
    desc: "Accelerated, intensive plan",
    icon: Rocket,
    iconColor: "text-pink-400",
    iconBg:
      "bg-pink-500/15 border border-pink-400/20",
  },
];

export function RoadmapStepPace({
  pace,
  setPace,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Top */}
      <div>
        <p className="text-sm text-cyan-400 mb-3">
          Step 4 of 7 · Learning Pace
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          Choose your learning speed
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {paceOptions.map((item) => {
          const Icon = item.icon;

          const active =
            pace === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                setPace(
                  item.key as PaceType
                )
              }
              className={cn(
                "relative overflow-hidden",
                "rounded-[28px]",
                "border",
                "p-6",
                "text-left",
                "transition-all duration-300",
                "min-h-[190px]",

                "bg-white border-gray-200 hover:border-cyan-400/50",
                "dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(4,12,28,0.98))]",
                "dark:border-white/10",

                active &&
                `
                  border-cyan-400
                  shadow-[0_0_35px_rgba(34,211,238,0.28)]
                `
              )}
            >
              {active && (
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.20),transparent_70%)] pointer-events-none" />
              )}

              <div
                className={cn(
                  "relative z-10",
                  "w-14 h-14 rounded-2xl",
                  "flex items-center justify-center",
                  "transition-all duration-300",

                  item.iconBg,

                  active &&
                  "scale-110 shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                )}
              >
                <Icon
                  size={30}
                  strokeWidth={2.5}
                  className={cn(
                    item.iconColor,
                    active &&
                    "drop-shadow-lg"
                  )}
                />
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {active && (
                <div className="absolute inset-0 rounded-[28px] border border-cyan-400/60 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}