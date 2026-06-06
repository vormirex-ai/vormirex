import React from "react";

interface Participant {
  rank: number;
  name: string;
  xp: number;
}

export function LeaderboardPodium({ topThree }: { topThree: Participant[] }) {
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="grid grid-cols-3 items-end max-w-2xl mx-auto w-full pt-10 pb-6 gap-2 sm:gap-4">
      {podiumOrder.map((player) => {
        if (!player) return null;

        const isFirst = player.rank === 1;
        const isSecond = player.rank === 2;

        return (
          <div
            key={player.rank}
            className={`flex flex-col items-center flex-1 transition-all duration-300`}
          >
            <div className="relative mb-3 flex flex-col items-center">
              {isFirst && (
                <span className="absolute -top-7 text-2xl animate-bounce" role="img" aria-label="crown">
                  👑
                </span>
              )}
              <div
                className={`flex items-center justify-center rounded-full text-xl font-bold tracking-wider font-mono shadow-xl ${isFirst
                  ? "w-16 h-16 sm:w-20 sm:h-20 bg-primary-gradient ring-4 ring-amber-400 text-white"
                  : isSecond
                    ? "w-14 h-14 sm:w-16 sm:h-16 bg-slate-600 border-2 border-slate-400 text-textColor"
                    : "w-12 h-12 sm:w-14 sm:h-14 bg-amber-800 border-2 border-amber-600 text-amber-100"
                  }`}
              >
                {getInitials(player.name)}
              </div>
            </div>


            <div className="text-center w-full px-1 mb-2">
              <p className="text-xs sm:text-sm font-semibold truncate dark:text-textColor">
                {player.name}
              </p>
              <p className={`text-[11px] sm:text-xs font-bold ${isFirst ? "text-amber-400" : "text-slate-400"}`}>
                {player.xp.toLocaleString()} XP
              </p>
            </div>

            <div
              className={`w-full flex items-center justify-center rounded-t-xl font-black text-2xl sm:text-4xl shadow-inner ${isFirst
                ? "h-28 sm:h-36 bg-gradient-to-b from-amber-500/15 to-amber-500/5 border border-amber-500/30 text-amber-400"
                : isSecond
                  ? "h-20 sm:h-24 bg-gradient-to-b from-slate-700/20 to-slate-700/5 border border-slate-700/30 text-slate-400"
                  : "h-16 sm:h-20 bg-gradient-to-b from-amber-900/20 to-amber-900/5 border border-amber-900/30 text-amber-700"
                }`}
            >
              {player.rank}
            </div>
          </div>
        );
      })}
    </div>
  );
}