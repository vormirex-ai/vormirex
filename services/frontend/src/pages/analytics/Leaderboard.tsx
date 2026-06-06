import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import LeaderBoardHeader from "@/components/dashboard/leaderboard/leaderboard-header";
import { LeaderboardCard } from "@/components/dashboard/leaderboard/leaderboard-card";

const Leaderboard = () => {
  return (
    <div className="min-h-screen  p-1 lg:p-10">
      <div className=" mx-auto space-y-10">

        <motion.div variants={fadeUpItem}>
          <div className="shrink-0">
            <LeaderBoardHeader />
          </div>
        </motion.div>
      </div>
      <LeaderboardCard />
    </div>
  )
}

export default Leaderboard
