import { cn } from "@/lib/utils";
import { LevelType } from "@/interface/roadmap.interface";

interface Props {
  level: LevelType;
  setLevel: (value: LevelType) => void;
}

const levels = [
  {
    key: "beginner",
    title: "Beginner",
    desc: "Just getting started",
    bars: 1,
  },
  {
    key: "intermediate",
    title: "Intermediate",
    desc: "Familiar with basics",
    bars: 2,
  },
  {
    key: "advanced",
    title: "Advanced",
    desc: "Strong understanding",
    bars: 3,
  },
];

export function RoadmapStepLevel({
  level,
  setLevel,
}: Props) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
        Select your current level
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {levels.map((item) => (
          <button
            type="button"
            key={item.key}
            onClick={() =>
              setLevel(item.key as LevelType)
            }
            className={cn(
              "rounded-2xl sm:rounded-[32px] p-5 sm:p-8 text-left border transition-all duration-300",
              "dark:bg-[#071120]/90 border-cyan-500/30",
              "hover:border-primary",
              level === item.key &&
              "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            )}
          >
            <p className="text-sm text-gray-500 mb-4">
              Level {item.bars}
            </p>

            <h3 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
              {item.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
              {item.desc}
            </p>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((bar) => (
                <div
                  key={bar}
                  className={cn(
                    "h-2 rounded-full flex-1",
                    bar <= item.bars
                      ? "bg-primary-gradient"
                      : "bg-white/10"
                  )}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}