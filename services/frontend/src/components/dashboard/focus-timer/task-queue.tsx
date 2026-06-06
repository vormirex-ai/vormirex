
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const tasks = [
  {
    title: "Partial Fractions — Introduction",
    pomodoros: "~2 pomodoros",
    status: "Active",
  },
  {
    title: "Python: OOP Concepts",
    pomodoros: "~3 pomodoros",
    status: "Next",
  },
  {
    title: "Physics: Wave Motion",
    pomodoros: "~1 pomodoro",
    status: "",
  },
];

export function TaskQueue() {
  return (
    <div className="rounded-3xl custom-surface p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          📋 Task Queue
        </h2>

        <Button className="flex items-center gap-2 ">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className={`rounded-xl border p-4 transition-all duration-300
        ${task.status === "Active"
                ? `
              border-primary/20 
              bg-primary/5 
              shadow-primary
              dark:bg-[#154249]/40
            `
                : `
              border-slate-200 
              bg-white 
              hover:border-cyan-300 
              hover:bg-cyan-50
              
              dark:border-white/10 
              dark:bg-card 
              dark:hover:bg-[#0f2236] 
              dark:hover:border-cyan-400/20
            `
              }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${task.status === "Active"
                    ? "bg-primary shadow-[0_0_10px_rgba(99,231,220,0.9)]"
                    : "bg-slate-400"
                    }`}
                />

                <div>
                  <h3 className="text-sm font-medium md:text-base">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-textColor">
                    {task.pomodoros}
                  </p>
                </div>
              </div>

              {task.status && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${task.status === "Active"
                    ? "bg-primary-gradient text-slateText"
                    : "bg-violet-500/10 text-violet-600 border border-violet-300 dark:text-violet-300 dark:border-violet-500/20"
                    }`}
                >
                  {task.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}