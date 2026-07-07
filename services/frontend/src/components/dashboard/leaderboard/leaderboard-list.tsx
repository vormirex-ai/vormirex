import { ListProps, RowProps } from "@/interface/leaderboard.interface";

export function LeaderboardList({
  listData,
  currentUser,
  userPercentile,
}: ListProps) {
  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const LeaderboardRow = ({ row }: { row: RowProps }) => {
    const isSpecialRank = row.rank <= 6;

    return (
      <div
        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all
        ${row.isUser
            ? "bg-[#dff4f7] dark:bg-primary/20 border border-primary"
            : "hover:border hover:border-primary hover:bg-[#eefbfd] hover:dark:bg-primary/40"
          }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="w-6 flex justify-center">
            <span
              className={`font-semibold ${isSpecialRank
                  ? "text-base font-bold text-primary-500"
                  : "text-slate-500 text-xs"
                }`}
            >
              #{row.rank}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-600 text-white font-bold">
            {row.profilePhoto ? (
              <img
                src={row.profilePhoto}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(row.name)
            )}
          </div>

          <div className="truncate">
            <h4 className="text-sm font-semibold truncate">
              {row.name}
              {row.isUser && (
                <span className="text-blue-500 ml-1 font-normal">← You</span>
              )}
            </h4>

            <div className="text-xs text-yellow-500 flex items-center gap-1">
              🔥 {row.streak} streak
              {row.isUser && userPercentile && <span> · {userPercentile}</span>}
            </div>
          </div>
        </div>

        <div className="font-bold text-sm text-yellow-600">
          {row.xp.toLocaleString()} XP
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {listData.length > 0 && (
        <div className="custom-surface rounded-2xl p-2 sm:p-3 flex flex-col gap-2 max-h-[700px] overflow-y-auto custom-scrollbar">
          {listData.map((row) => (
            <LeaderboardRow key={row.rank} row={row} />
          ))}
        </div>
      )}

      {currentUser && (
        <div className="space-y-2">
          <p className="text-xs uppercase font-bold tracking-wider text-blue-400">
            Your Rank
          </p>

          <div className="custom-surface rounded-2xl p-2 sm:p-3">
            <LeaderboardRow row={{ ...currentUser, isUser: true }} />
          </div>
        </div>
      )}
    </div>
  );
}
