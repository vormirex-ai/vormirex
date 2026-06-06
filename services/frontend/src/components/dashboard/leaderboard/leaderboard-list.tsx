import React from "react";

interface RowProps {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  isUser?: boolean;
}

export function LeaderboardList({
  listData,
  currentUser,
}: {
  listData: RowProps[];
  currentUser?: RowProps;
}) {
  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();


  const LeaderboardRow = ({ row }: { row: RowProps }) => {
    const isSpecialRank = row.rank <= 6;

    return (
      <div
        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl  cursor-pointer transition-all duration-200
  ${row.isUser
            ? "bg-[#dff4f7] dark:bg-primary/20 border border-primary"
            : `
    hover:border 
    hover:border-primary 
    hover:bg-[#eefbfd]
    
    hover:dark:bg-primary/40
  `
          }`}
      >

        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">

          <div className="w-6 flex justify-center text-center">
            {isSpecialRank ? (
              <span className="inline-flex items-center justify-center font-bold text-xs sm:text-sm w-6 h-6 rounded ">
                {row.rank}
              </span>
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                {row.rank}
              </span>
            )}
          </div>

          <div
            className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white tracking-wide ${row.rank === 4
              ? "bg-pink-500"
              : row.rank === 5
                ? "bg-amber-500"
                : row.rank === 6 || row.rank === 8
                  ? "bg-purple-500"
                  : row.rank === 7
                    ? "bg-cyan-500"
                    : row.rank === 9
                      ? "bg-emerald-500"
                      : "bg-slate-500"
              }`}
          >
            {getInitials(row.name)}
          </div>

          <div className="truncate space-y-0.5">
            <h4 className="text-xs sm:text-sm font-semibold dark:text-slate-200 truncate">
              {row.name} {row.isUser && <span className="text-blue-400 font-normal ml-1">← You</span>}
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span role="img" aria-label="fire">🔥</span> {row.streak} streak
              {row.isUser && <span> · Top 5%</span>}
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0 pl-2">
          <span className={`text-xs sm:text-sm font-bold tracking-wide ${isSpecialRank ? "text-blue-400" : "text-blue-500/80"}`}>
            {row.xp.toLocaleString()} XP
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="custom-surface rounded-2xl p-2 sm:p-3 flex flex-col gap-1 shadow-2xl backdrop-blur-md">
        {listData.map((row) => (
          <LeaderboardRow key={row.rank} row={row} />
        ))}
      </div>

      {currentUser && (
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-xs uppercase font-bold tracking-wider text-blue-400/80 px-2">Your Rank</p>
          <div className="custom-surface rounded-2xl p-2 sm:p-3 shadow-xl ring-1 ring-blue-500/10">
            <LeaderboardRow row={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
}