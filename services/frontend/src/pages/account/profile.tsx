import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { ProfileHeader } from "@/components/dashboard/profile/profile-header";
import { BadgesSection } from "@/components/dashboard/profile/badges-section";
import { ImprovementPanel } from "@/components/dashboard/profile/improvement-panel";
import { AIInsights } from "@/components/dashboard/profile/ai-insights";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { Clock, Flame, BookOpen, Trophy } from "lucide-react";

const Profile = () => {
  return (

    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >

      <div className=" mx-auto space-y-10">
        <motion.div variants={fadeUpItem}>
          <ProfileHeader />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

            <div>
              <div className="flex mb-4 items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>📊</span> Your Stats</div>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title="Total Study Time"
                  value={124}
                  suffix="h"
                  icon={Clock}
                  iconBg="bg-gray-500/10"
                  iconColor="text-white-600"
                />

                <StatCard
                  title="Day Streak"
                  value={12}
                  suffix="days"
                  icon={Flame}
                  iconBg="bg-orange-500/10"
                  iconColor="text-orange-600"
                />

                <StatCard
                  title="Active Subjects"
                  value={3}
                  icon={BookOpen}
                  iconBg="bg-emerald-500/10"
                  iconColor="text-emerald-400"
                />

                <StatCard
                  title="XP Points"
                  value={2840}
                  icon={Trophy}
                  iconBg="bg-yellow-500/10"
                  iconColor="text-yellow-400"
                />
              </div>
            </div>

            <div>
              <BadgesSection />
            </div>

          </div>
        </motion.div>

        <motion.div variants={fadeUpItem}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImprovementPanel />
            <AIInsights />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Profile