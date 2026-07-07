import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";
import LeaderBoardHeader from "@/components/dashboard/leaderboard/leaderboard-header";
import { LeaderboardCard } from "@/components/dashboard/leaderboard/leaderboard-card";
import { useGetLeaderboardQuery } from "@/store/api/leaderboardApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";


const Leaderboard = () => {
  const [filter, setFilter] = useState<"weekly" | "monthly" | "all-time">("weekly");
  const { data: leaderboardData, isLoading, isError, } = useGetLeaderboardQuery(filter);


  if (isLoading) {
    return <AppSkeletonCard variant="leaderboard" />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">
        <motion.div variants={fadeUpItem}>
          <LeaderBoardHeader
            filter={filter}
            setFilter={setFilter}
          />
        </motion.div>

        <LeaderboardCard
          topThree={leaderboardData?.top3 || []}
          listData={leaderboardData?.rankings || []}
          currentUser={leaderboardData?.userRank}
          userPercentile={leaderboardData?.userPercentile}
        />
      </div>
    </div>
  );
};

export default Leaderboard;