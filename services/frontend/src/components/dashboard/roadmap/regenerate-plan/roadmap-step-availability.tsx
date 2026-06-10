import { CalendarDays, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export function RoadmapStepAvailability({
  selectedDay,
  setSelectedDay,
}: Props) {
  const toggleDay = (day: string) => {
    if (selectedDay === day) {
      setSelectedDay("");
    } else {
      setSelectedDay(day);
    }
  };

  const getUpcomingDate = (day: string) => {
    const today = new Date();

    const dayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const targetDay = dayMap[day];
    const currentDay = today.getDay();

    let diff = targetDay - currentDay;

    if (diff < 0) {
      diff += 7;
    }

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Choose your learning day
        </h2>

        <p className="text-sm text-gray-500 dark:text-white/60 mt-2">
          Select the day you are available to study.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const active = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={cn(
                "group relative overflow-hidden rounded-[20px] border min-h-[130px] p-4 transition-all duration-300 flex flex-col items-center justify-center gap-2",

                "bg-white border-gray-200 hover:border-primary hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]",

                "dark:bg-[#0A1625] dark:border-white/10 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]",

                active &&
                "border-primary bg-primary/5 dark:border-primary dark:bg-[linear-gradient(180deg,#11283A_0%,#0A1625_100%)] dark:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
              )}
            >
              {active && (
                <>
                  <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_70%)]" />

                  <div className="absolute inset-0 rounded-[20px] border border-primary/30 pointer-events-none" />

                  <div className="absolute top-3 right-3 z-20">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-primary-gradient shadow-sm">
                      <Check
                        size={10}
                        className="text-white"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                </>
              )}

              <div
                className={cn(
                  "relative z-10 w-11 h-11 rounded-full flex items-center justify-center",
                  active
                    ? "bg-primary-gradient text-white"
                    : "bg-gray-100 border border-gray-200 text-gray-600 dark:bg-white/10 dark:border-white/10 dark:text-white/70"
                )}
              >
                <CalendarDays size={18} strokeWidth={2.2} />
              </div>

              <div className="relative z-10 text-center">
                <h3
                  className={cn(
                    "text-[15px] font-semibold",
                    active
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-white/90"
                  )}
                >
                  {day}
                </h3>

                <p className="text-[11px] text-gray-500 dark:text-white/50 mt-1">
                  {getUpcomingDate(day)}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/5 to-transparent dark:from-cyan-500/5" />
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 dark:text-white/60">
        {selectedDay
          ? `Selected: ${selectedDay}`
          : "No day selected"}
      </p>

      {selectedDay && (
        <div className="rounded-2xl border border-cyan-500/20 p-4 bg-cyan-500/5">
          <p className="text-sm text-white/80 font-medium mb-2">
            Selected Schedule
          </p>

          <div className="inline-flex px-3 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-white">
            {selectedDay} • {getUpcomingDate(selectedDay)}
          </div>
        </div>
      )}
    </div>
  );
}