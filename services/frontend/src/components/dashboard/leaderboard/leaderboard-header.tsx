import React, { useState } from "react";

const LeaderBoardHeader = () => {
  const [filter, setFilter] = useState<"weekly" | "monthly" | "all-time">("all-time");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">
          <h1 className=" text-2xl md:text-4xl  font-bold  flex items-center gap-2">
            🏆 Leaderboard
          </h1>

          <p className="text-slate-400 text-sm md:text-base my-2">
            Top learners this week. Keep grinding to climb the ranks!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="inline-flex items-center p-1 rounded-xl custom-surface backdrop-blur-sm self-start sm:self-center">
            {(["weekly", "monthly", "all-time"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all capitalize ${filter === tab
                  ? "bg-primary-gradient  shadow-sm ring-1 ring-slate-700 text-slateText"
                  : "text-slate-400 dark:hover:text-slate-200 hover:text-primary"
                  }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardHeader;