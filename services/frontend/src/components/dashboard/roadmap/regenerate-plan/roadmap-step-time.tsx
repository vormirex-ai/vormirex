import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeLine } from "@/interface/roadmap.interface";
import { Input } from "@/components/ui/input";

interface Props {
  level: TimeLine;
  setLevel: (value: TimeLine) => void;

  customTime: string;
  setCustomTime: (value: string) => void;
}

const times: {
  key: TimeLine;
  label: string;
}[] = [
    { key: "30 Minutes", label: "30 Minutes" },
    { key: "1 Hour", label: "1 Hour" },
    { key: "2 Hours", label: "2 Hours" },
    { key: "3+ Hours", label: "3+ Hours" },
    { key: "Custom", label: "Custom" },
  ];

export function RoadmapStepTime({
  level,
  setLevel,
  customTime,
  setCustomTime,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs text-cyan-600 dark:text-cyan-300/70 mb-3">
          Step 3 of 7 · Daily Study Time
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          How much time can you dedicate each day?
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {times.map((item) => {
          const active = level === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setLevel(item.key)}
              className={cn(
                "group relative overflow-hidden",
                "flex items-center gap-3",
                "px-6 py-4 rounded-full",
                "border transition-all duration-300",
                "min-w-[150px]",
                "bg-white border-cyan-500/30 hover:border-primary",
                "dark:bg-[#071120]/90 dark:border-primary-gradient dark:hover:border-primary",

                active &&
                `
                  border-cyan-500
                  dark:border-primary
                  shadow-[0_0_25px_rgba(34,211,238,0.25)]
                `
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-colors",

                  active
                    ? ` bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/20 dark:text-cyan-300 `
                    : ` bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400 `
                )}
              >
                <Clock3 size={16} />
              </div>

              <span
                className={cn(
                  "text-sm sm:text-base font-medium transition-colors",

                  active
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {item.label}
              </span>

              {active && (
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_70%)] pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {level === "Custom" && (
        <div className="max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Enter custom study time
          </label>

          <Input
            value={customTime}
            onChange={(e) =>
              setCustomTime(e.target.value)
            }
            placeholder="e.g. 90 Minutes"
            className="
              h-14
              rounded-full
              border
              placeholder:text-gray-400
              dark:bg-[#071120]/90
              dark:border-primary
              dark:text-white
              dark:placeholder:text-gray-500
              dark:focus-visible:ring-cyan-400
            "
          />
        </div>
      )}
    </div>
  );
}