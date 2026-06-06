import {
  Flame,
  Trophy,
  Timer,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";
import { TimerCard } from "@/components/dashboard/focus-timer/timer-display";
import { TaskQueue } from "@/components/dashboard/focus-timer/task-queue";
import FocusTimerHeader from "@/components/dashboard/focus-timer/focus-timer-header";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";

export function PromodoroTimer() {
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
            <TimerCard />
          </motion.div>


          <div className="space-y-6 lg:col-span-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <StatCard
                title="Sessions Today"
                value={3}
                icon={Flame}
                iconBg="bg-orange-500/10"
                iconColor="text-orange-400"
              />

              <StatCard
                title="Focused Time"
                value={75}
                suffix="m"
                icon={Timer}
                iconBg="bg-cyan-500/10"
                iconColor="text-cyan-400"
              />

              <StatCard
                title="Day Streak"
                value={12}
                icon={Trophy}
                iconBg="bg-yellow-500/10"
                iconColor="text-yellow-400"
              />

              <StatCard
                title="XP Earned"
                value={120}
                suffix="+"
                icon={Star}
                iconBg="bg-violet-500/10"
                iconColor="text-violet-400"
              />
            </div>

            <TaskQueue />
          </div>
        </div>
      </div>
    </div>
  );
}