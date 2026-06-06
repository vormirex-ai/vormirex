import React from "react";

interface TopicProps {
  title: string;
  score: number;
  color: string;
}

function TopicRow({ title, score, color }: TopicProps) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-900/80 bg-white dark:bg-[#154249] flex flex-col gap-3 relative overflow-hidden">

      <div className="flex items-center justify-between z-10">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-slate-200">
          {title}
        </h4>

        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${color}`}>
          {score}%
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-900 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${score < 55
            ? "from-rose-500 to-orange-500"
            : score < 60
              ? "from-orange-500 to-amber-500"
              : "from-amber-500 to-yellow-400"
            }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ImprovementPanel() {
  const topics = [
    {
      title: "Integration by Parts",
      score: 52,
      color: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/30",
    },
    {
      title: "Python Decorators",
      score: 58,
      color: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/30",
    },
    {
      title: "Quantum Mechanics",
      score: 64,
      color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/30",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">

      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        <span>⚠️</span> Topics to Improve
      </div>

      <div className="bg-card border border-gray-200 dark:border-cyan-500/10 rounded-2xl p-5 shadow-md dark:shadow-xl flex flex-col gap-3 justify-center h-full">

        {topics.map((topic, idx) => (
          <TopicRow key={idx} {...topic} />
        ))}

      </div>
    </div>
  );
}