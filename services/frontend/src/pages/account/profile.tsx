import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { ProfileHeader } from "@/components/dashboard/profile/profile-header";
import { BadgesSection } from "@/components/dashboard/profile/badges-section";
import { ImprovementPanel } from "@/components/dashboard/profile/improvement-panel";
import { AIInsights } from "@/components/dashboard/profile/ai-insights";
import { StatsGrid } from "@/components/dashboard/dashboard-home/stats-grid";
import { useGetDashboardDataQuery } from "@/store/api/dashboardApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";


const Profile = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen p-1 lg:p-10">
        <div className="mx-auto space-y-6">
          <AppSkeletonCard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppSkeletonCard />
            <AppSkeletonCard />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppSkeletonCard />
            <AppSkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile data.
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
      <div className="mx-auto space-y-10">
        <motion.div variants={fadeUpItem}>
          <ProfileHeader data={data?.welcome} />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div>
              <div className="flex mb-4 items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>📊</span>
                Your Stats
              </div>
              <StatsGrid
                data={data?.metrics}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              />
            </div>

            <div>
              <BadgesSection data={data?.welcome} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImprovementPanel data={data?.subjectProgress} />
            <AIInsights />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Profile;