import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { ProfileHeader } from "@/components/dashboard/profile/profile-header";
import { BadgesSection } from "@/components/dashboard/profile/badges-section";
import { ImprovementPanel } from "@/components/dashboard/profile/improvement-panel";
import { AIInsights } from "@/components/dashboard/profile/ai-insights";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { profileStatsConfig } from "@/components/data/dashboard";

const Profile = () => {
  const { data: profileData, isLoading, error } = useGetProfileQuery(undefined);
 const statsCards = profileStatsConfig.map((item) => ({
  ...item,
  value: profileData?.stats?.[item.key],
}));

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
          <ProfileHeader data={profileData?.user} stats={profileData?.stats} />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div>
              <div className="flex mb-4 items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>📊</span>
                Your Stats
              </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {statsCards.map((item, idx) => (
    <StatCard
      key={idx}
      title={item.title}
      value={item.value}
      suffix={item.suffix}
      icon={item.icon}
      iconBg={item.iconBg}
      iconColor={item.iconColor}
    />
  ))}
</div>
              
            </div>

            <div>
              <BadgesSection data={profileData?.badges} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImprovementPanel data={profileData?.topicsToImprove} />
            <AIInsights data={profileData?.insights} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
