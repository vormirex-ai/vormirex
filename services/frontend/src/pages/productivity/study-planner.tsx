import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { StudyPannerHeader } from '@/components/dashboard/study-palnner/study-planner-header'
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { TaskSection } from "@/components/dashboard/study-palnner/task-section";
import { WeekCalendar } from "@/components/dashboard/study-palnner/week-calendar";


const StudyPlannerPage = () => {
  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className=" mx-auto space-y-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <StudyPannerHeader />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 w-full">
            <StatCard
              title="Completed"
              value={8}
              icon="✅"
              iconBg="bg-green-500/10"
              iconColor="text-white"
            />

            <StatCard
              title="Pending"
              value={5}
              icon="⏳"
              iconBg="bg-blue-500/10"
              iconColor="text-blue-600"
            />

            <StatCard
              title="Studied"
              value={6.2}
              suffix="h"
              icon="⏱️"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
            />

            <StatCard
              title="Week Goal"
              value={76}
              suffix="%"
              icon="🎯"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-400"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <WeekCalendar />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskSection type="completed" />
            <TaskSection type="upcoming" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default StudyPlannerPage
