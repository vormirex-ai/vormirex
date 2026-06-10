import {
  Sparkles,
  Rocket,
  Clock3,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Target,
} from "lucide-react";

interface Props {
  goal: string;
  goalDescription?: string;
  level: string;
  dailyStudy: string;
  pace: string;
  preferences: string[];
  selectedDay: string;
}

export function RoadmapStepSummary({
  goal,
  level,
  dailyStudy,
  pace,
  preferences,
  selectedDay,
}: Props) {
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

  const cards = [
    {
      label: "Goal",
      value: goal,
      icon: Target,
    },
    {
      label: "Skill Level",
      value: level,
      icon: GraduationCap,
    },
    {
      label: "Daily Study",
      value: dailyStudy,
      icon: Clock3,
    },
    {
      label: "Learning Pace",
      value: pace,
      icon: Rocket,
    },
    {
      label: "Preferences",
      value:
        preferences.length > 0
          ? preferences.slice(0, 2).join(", ")
          : "Not Selected",
      icon: BookOpen,
    },
    {
      label: "Available Day",
      value: selectedDay
        ? `${selectedDay} • ${getUpcomingDate(selectedDay)}`
        : "Not Selected",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.30)]">
        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-black" />
      </div>

      <div className="mt-4 sm:mt-6 text-center px-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
          Your New Learning Roadmap Is Ready
        </h2>

        <p className="text-xs sm:text-sm dark:text-textColor text-slateText mt-2">
          Tailored to your goals, pace, and schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full mt-6 sm:mt-8 lg:mt-10">
        {cards.map((item) => (
          <div
            key={item.label}
            className="
            rounded-2xl sm:rounded-[24px]
            border border-cyan-500/20
            dark:bg-[linear-gradient(180deg,rgba(10,22,37,0.95),rgba(6,16,30,0.98))]
            bg-white
            p-3 sm:p-4 lg:p-5
            min-h-[85px] sm:min-h-[95px] lg:min-h-[105px]
            transition-all duration-300
            hover:border-cyan-400/40
            hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]
          "
          >

            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 shrink-0" />

              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider dark:text-textColor text-slateText truncate">
                {item.label}
              </span>
            </div>

            <p className="font-semibold text-xs sm:text-sm lg:text-[15px] leading-relaxed break-words">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}