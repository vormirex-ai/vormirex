import React from "react";

const FocusTimerHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <h1 className=" text-2xl md:text-4xl  font-bold  flex items-center gap-2">

            ⏱ Focus Timer
          </h1>

          <p className="mt-2 text-sm md:text-base leading-relaxed text-textColor ">
            Stay in deep focus with Pomodoro technique —
            25 min work, 5 min break.
          </p>
        </div>


        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm font-medium text-orange-300 sm:px-5">
            🔥 3 sessions today
          </div>

          <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            ⚙ Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerHeader;