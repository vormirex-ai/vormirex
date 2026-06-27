interface CalendarDayProps {
  day: string;
  date: number;
  dateString?: string;
  tasks: any[];
  active?: boolean;
}
export function CalendarDay({ day, date, tasks, active }: CalendarDayProps) {
  return (
    <div>
      <p
        className={`text-center font-semibold mb-2 ${
          active ? "text-primary" : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {day}
      </p>

      <div
        className={`rounded-2xl border p-2 h-[170px] flex flex-col transition-all duration-300
    ${
      active
        ? "border-primary bg-primary/20 shadow-lg shadow-primary/10"
        : "border-gray-200 dark:border-cyan-500/10 bg-white dark:bg-[#0B1324]"
    }`}
      >
        <div className="font-bold mb-2 text-gray-900 dark:text-white shrink-0">
          {date}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
          {tasks.map((task: any, index) => (
            <div
              key={task._id || index}
              className="bg-primary/10 dark:bg-cyan-500/10 text-slateText dark:text-primary border border-primary/10 dark:border-cyan-500/10 p-2 rounded-lg text-sm  backdrop-blur-sm"
            >
              <p className="text-sm line-clamp-1 font-medium">{task.title}</p>
              <p
                className={`text-xs capitalize ${
                  task?.status === "completed"
                    ? "text-green-500"
                    : task?.status === "upcoming"
                      ? "text-yellow-500"
                      : "text-textColor"
                }`}
              >
                {task?.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
