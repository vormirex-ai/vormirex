import { useEffect, useState } from "react";
import { Flame, Trophy, Timer, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { TimerCard } from "@/components/dashboard/focus-timer/timer-display";
import { TaskQueue } from "@/components/dashboard/focus-timer/task-queue";
import FocusTimerHeader from "@/components/dashboard/focus-timer/focus-timer-header";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";

import {
  useDeleteFocusTaskMutation,
  useGetFocusDataQuery,
  useUpdateFocusTaskMutation,
} from "@/store/api/focusApi";
import { toast } from "sonner";

export function PromodoroTimer() {
  const {
    data: focusData,
    isLoading,
    error,
    refetch,
  } = useGetFocusDataQuery({});
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [updateFocusTask] = useUpdateFocusTaskMutation();
  const [deleteFocusTask] = useDeleteFocusTaskMutation();

  useEffect(() => {
    if (focusData?.tasks?.length > 0 && !selectedTask) {
      setSelectedTask(focusData.tasks[0]);
    }
  }, [focusData]);

  const handleSelectTask = (task: any) => {
    setSelectedTask(task);
  };

const handleMarkCompleted = async (task: any) => {
  try {
    const response = await updateFocusTask({
      id: task._id,
      body: {
        status: "completed",
      },
    }).unwrap();
     toast.success(response?.message || "Task marked as completed 🎉");

    refetch();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update task");
  }
};

const handleDeleteTask = async (id: string) => {
  try {
    const response = await deleteFocusTask(id).unwrap();
    if (selectedTask?._id === id) {
      setSelectedTask(null);
    }
    toast.success(response?.message || "Task deleted successfully");
    refetch();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete task");
  }
};

  useEffect(() => {
  if (!focusData?.tasks?.length) return;
  const current = focusData.tasks.find(
    (t: any) => t._id === selectedTask?._id
  );
  if (!current || current.status === "completed") {
    const nextTask =
      focusData.tasks.find((t: any) => t.status !== "completed") || null;
    setSelectedTask(nextTask);
  }
}, [focusData]);

  const statsCards = [
    {
      title: "Sessions Today",
      value: focusData?.stats?.sessionsToday || 0,
      icon: Flame,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Focused Time",
      value: focusData?.stats?.focusedTimeToday || 0,
      suffix: "m",
      icon: Timer,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Day Streak",
      value: focusData?.stats?.dayStreak || 0,
      icon: Trophy,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      title: "XP Earned",
      value: focusData?.stats?.xpEarnedToday || 0,
      suffix: "+",
      icon: Zap,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">
        <FocusTimerHeader />

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <TimerCard activeTask={selectedTask} />
          </motion.div>

          <div className="space-y-3 col-span-1">
            {statsCards.map((card) => (
              <StatCard
                key={card.title}
                title={card.title}
                value={card.value}
                suffix={card.suffix}
                icon={card.icon}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
                compact
              />
            ))}
          </div>
        </div>

        <TaskQueue
          taskData={focusData?.tasks}
          selectedTask={selectedTask}
          onSelectTask={handleSelectTask}
          onCompleteTask={handleMarkCompleted}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
