import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { StudyPannerHeader } from "@/components/dashboard/study-palnner/study-planner-header";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { TaskSection } from "@/components/dashboard/study-palnner/task-section";
import { WeekCalendar } from "@/components/dashboard/study-palnner/week-calendar";
import { useGetPlannerQuery } from "@/store/api/studyPlannerApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";

const StudyPlannerPage = () => {
 const { data: studyPlannerData, isLoading } = useGetPlannerQuery();

 if (isLoading) {
  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="space-y-10">
        <AppSkeletonCard />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <AppSkeletonCard key={i}  />
          ))}
        </div>

        <AppSkeletonCard  />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppSkeletonCard />
          <AppSkeletonCard  />
        </div>
      </div>
    </div>
  );
}

  return (
    
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className=" mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <StudyPannerHeader />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 w-full">
            <StatCard
              title="Completed"
              value={studyPlannerData?.stats?.completed ?? 0}
              icon="✅"
              iconBg="bg-green-500/10"
              iconColor="text-white"
            />

            <StatCard
              title="Pending"
              value={studyPlannerData?.stats?.pending ?? 0}
              icon="⏳"
              iconBg="bg-blue-500/10"
              iconColor="text-blue-600"
            />

            <StatCard
              title="Studied"
              value={studyPlannerData?.stats?.studiedHours ?? 0}
              suffix="h"
              icon="⏱️"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
            />

            <StatCard
              title="Week Goal"
              value={studyPlannerData?.stats?.weekGoal ?? 0}
              suffix="%"
              icon="🎯"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-400"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <WeekCalendar data={studyPlannerData?.weeklyCalendar} />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskSection
              type="completed"
              completedTasksData={studyPlannerData?.completedTasks}
            />
            <TaskSection
              type="upcoming"
              upcomingTaskData={studyPlannerData?.upcomingTasks}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudyPlannerPage;
