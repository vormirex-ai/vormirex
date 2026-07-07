import { LeaderboardPodium } from "./leaderboard-podium";
import { LeaderboardList } from "./leaderboard-list";
import { Props } from "@/interface/leaderboard.interface";


export function LeaderboardCard({
  topThree,
  listData,
  currentUser,
  userPercentile,
}: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen p-4 md:p-8 flex flex-col gap-6">
      <LeaderboardPodium topThree={topThree} />

      <LeaderboardList
        listData={listData}
        currentUser={currentUser}
        userPercentile={userPercentile}
      />
    </div>
  );
}