interface CalendarDayProps {
  day: string;
  date: number;
  tasks: string[];
  active?: boolean;
}

export function CalendarDay({
  day,
  date,
  tasks,
  active,
}: CalendarDayProps) {
  return (
    <div>
      <p className="text-center text-slate-500 dark:text-slate-400 font-semibold mb-4">
        {day}
      </p>

      <div
        className={`rounded-2xl border p-4 min-h-[160px] transition-all duration-300
        ${active
            ? "border-primary bg-primary/5 dark:bg-[#154249]/40"
            : "border-gray-200 dark:border-cyan-500/10 bg-white dark:bg-[#0B1324]"
          }
      `}
      >
        <div className="font-bold mb-4 text-gray-900 dark:text-white">
          {date}
        </div>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="
                bg-primary/10 
                dark:bg-cyan-500/10
                text-slateText
                dark:text-primary
                border border-primary/10
                dark:border-cyan-500/10
                px-3 py-2 rounded-lg text-sm font-medium
                backdrop-blur-sm
              "
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}