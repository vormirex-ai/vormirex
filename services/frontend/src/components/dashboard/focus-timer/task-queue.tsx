import {
  CheckCircle2,
  Clock,
  Clock3,
  Layers3,
  Play,
  Target,
  Trash2,
} from "lucide-react";

import { TaskFormModal } from "./add-task-form";

export function TaskQueue({
  taskData = [],
  selectedTask,
  onSelectTask,
  onCompleteTask,
  onDeleteTask,
}: any) {
  return (
    <div className="rounded-3xl custom-surface p-3">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">📋 Task Queue</h2>
        <TaskFormModal />
      </div>

      <div className="space-y-4 max-h-[400px] md:max-h-[350px] overflow-y-auto custom-scrollbar">
        {taskData?.length > 0 ? (
          taskData.map((task: any, index: number) => {
            const isActive =
              selectedTask?._id === task?._id && task.status !== "completed";

            return (
              <div
                key={task?._id}
                onClick={() => onSelectTask(task)}
                className={`rounded-2xl border p-3 transition-all duration-300 cursor-pointer
                  ${isActive ? ` border-primary bg-primary/5 shadow-lg shadow-primary/10 dark:bg-[#154249]/30 `
                    : ` border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:bg-card dark:hover:bg-[#0f2236]
                    `
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 items-start gap-3">
                    <div
                      className={`mt-2 h-2 w-2 rounded-full ${isActive
                          ? "bg-primary shadow-[0_0_10px_rgba(99,231,220,0.9)]"
                          : "bg-slate-400"
                        }`}
                    />

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-semibold md:text-base">
                          {task?.title}
                        </h3>

                        <p className="text-xs line-clamp-2 text-textColor">
                          {task?.description}
                        </p>

                        <p className="mt-1 text-xs text-textColor">
                          Created{" "}
                          {new Date(task?.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {task?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 text-xs">
                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>{task?.estimatedPomodoros} Pomodoros</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">
                          <Layers3 className="h-3.5 w-3.5" />
                          <span>{task?.taskType}</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">
                          <Target className="h-3.5 w-3.5" />

                          <span>{task?.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {task.status === "completed" ? (
                      <span className="flex items-center gap-1 border border-green-300 bg-green-500/10 text-green-600 rounded-full px-3 py-1 text-xs font-medium capitalize">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    ) : isActive ? (
                      <span className="flex items-center gap-1 bg-primary-gradient text-slateText rounded-full px-3 py-1 text-xs font-medium capitalize">
                        <Play size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 border border-yellow-300 bg-yellow-500/10 text-yellow-600 rounded-full px-3 py-1 text-xs font-medium capitalize">
                        <Clock size={14} />
                        Upcoming
                      </span>
                    )}

                    <span className="text-xs text-textColor">
                      Done: {task?.completedPomodoros}/
                      {task?.estimatedPomodoros}
                    </span>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        disabled={task.status === "completed"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCompleteTask(task);
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition
                        ${task.status === "completed"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-500/10 text-green-500 hover:scale-105"
                          }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTask(task._id);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="text-sm text-textColor">No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
}
