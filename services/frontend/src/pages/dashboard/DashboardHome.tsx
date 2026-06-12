import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { AIRecommendations } from "@/components/dashboard/dashboard-home/ai-recommondation";
import { ContinueLearning } from "@/components/dashboard/dashboard-home/continue-leraning";
import { RecentActivity } from "@/components/dashboard/dashboard-home/recent-activity";
import { StatsGrid } from "@/components/dashboard/dashboard-home/stats-grid";
import { SubjectProgress } from "@/components/dashboard/dashboard-home/subject-progress";
import { WeeklyActivity } from "@/components/dashboard/dashboard-home/weekly-activity";
import WelcomeBanner from "@/components/dashboard/dashboard-home/welcome-banner";
import { useGetDashboardDataQuery } from "@/store/api/dashboardApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";

const DashboardHome = () => {

  const { data, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen p-1 lg:p-10 space-y-6">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <AppSkeletonCard key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AppSkeletonCard />
          </div>

          <AppSkeletonCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AppSkeletonCard />
          </div>

          <AppSkeletonCard />
        </div>

        <AppSkeletonCard />

      </div>
    );
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10 text-white"
    >
      <div className="mx-auto space-y-6">
        <motion.div variants={fadeUpItem}>
          <WelcomeBanner data={data?.welcome} />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <StatsGrid data={data?.metrics} />
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <WeeklyActivity data={data?.weeklyActivity} />
            <SubjectProgress data={data?.subjectProgress} />
          </div>
        </motion.div>
        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ContinueLearning data={data?.continueLearning} />
            <AIRecommendations data={data?.aiRecommendations} />
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <RecentActivity data={data?.recentActivity} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;