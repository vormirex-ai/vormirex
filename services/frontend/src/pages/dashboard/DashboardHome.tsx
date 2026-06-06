import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { AIRecommendations } from "@/components/dashboard/dashboard-home/ai-recommondation";
import { ContinueLearning } from "@/components/dashboard/dashboard-home/continue-leraning";
import { RecentActivity } from "@/components/dashboard/dashboard-home/recent-activity";
import { StatsGrid } from "@/components/dashboard/dashboard-home/stats-grid";
import { SubjectProgress } from "@/components/dashboard/dashboard-home/subject-progress";
import { WeeklyActivity } from "@/components/dashboard/dashboard-home/weekly-activity";
import WelcomeBanner from "@/components/dashboard/dashboard-home/welcome-banner";


const DashboardHome = () => {
  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10 text-white"
    >
      <div className="mx-auto space-y-6">
        <motion.div variants={fadeUpItem}>
          <WelcomeBanner />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <StatsGrid />
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <WeeklyActivity />
            <SubjectProgress />

          </div>
        </motion.div>
        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ContinueLearning />
            <AIRecommendations />
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <RecentActivity />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;