import { Edit3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import UserAvatar from "./user-avtar";
import { ProfileStatsBadges } from "./profile-stats-badges";

export function ProfileHeader({ data, stats }: any) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/dashboard/settings?tab=profile");
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-cyan-500/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md dark:shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-5 relative z-10">
        <div className="relative">
          <UserAvatar size="lg" />

          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#090d16]" />
        </div>

        <div className="space-y-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.name || "User"}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-500 font-mono">
              {data?.email}
            </p>
            {data?.bio && (
              <p className="text-xs text-primary-500 line-clamp-2">
                Bio:- <span className="text-textColor">{data?.bio || ""}</span>
              </p>
            )}
          </div>

          <ProfileStatsBadges
            isPro={data?.isPro}
            dayStreak={stats?.dayStreak}
            xpPoints={stats?.xpPoints}
            level={data?.level}
            percentile={data?.percentile}
          />
        </div>
      </div>

      <Button
        onClick={handleEdit}
        variant="secondary"
        className="dark:bg-white/10 dark:text-white
        hover:border hover:border-primary"
      >
        <Edit3 className="w-4 h-4" />
        Edit Profile
      </Button>
    </div>
  );
}
