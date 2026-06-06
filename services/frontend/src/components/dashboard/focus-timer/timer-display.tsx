import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
} from "lucide-react";

const tabs = [
  {
    label: "Focus",
    time: 25 * 60,
    sub: "25min",
  },
  {
    label: "Short Break",
    time: 5 * 60,
    sub: "5min",
  },
  {
    label: "Long Break",
    time: 15 * 60,
    sub: "15min",
  },
];

export function TimerCard() {
  const [activeTab, setActiveTab] = useState(0);
  const [seconds, setSeconds] = useState(tabs[0].time);
  const [isRunning, setIsRunning] = useState(false);

  const currentTab = tabs[activeTab];

  const progress =
    ((currentTab.time - seconds) /
      currentTab.time) *
    100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      nextTimer();
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(currentTab.time);
  };

  const changeTab = (index: number) => {
    setActiveTab(index);
    setSeconds(tabs[index].time);
    setIsRunning(false);
  };

  const nextTimer = () => {
    const next =
      activeTab === tabs.length - 1
        ? 0
        : activeTab + 1;

    setActiveTab(next);
    setSeconds(tabs[next].time);
    setIsRunning(false);
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="rounded-2xl sm:rounded-3xl custom-surface p-2 md:p-4 sm:p-6 shadow-lg">

      <div className="grid grid-cols-3 overflow-hidden rounded-xl sm:rounded-2xl border border-primary dark:border-white/10 p-1 bg-card dark:bg-[#154249]">

        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => changeTab(index)}
            className={`rounded-lg sm:rounded-xl py-2 sm:py-4 text-center transition-all duration-300 ${activeTab === index
              ? "bg-primary-gradient shadow-inner text-slateText"
              : "text-slate-400 hover:bg-white/5"
              }`}
          >
            <div className="text-[10px] sm:text-sm font-semibold">
              {tab.label}
            </div>

            <div className="text-[9px] sm:text-xs">
              {tab.sub}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center pt-8 pb-4 sm:pt-14">
        <div className="relative flex aspect-square w-full max-w-[180px] sm:max-w-[300px] items-center justify-center">

          <svg
            className="absolute h-full w-full rotate-[-90deg]"
            viewBox="0 0 300 300"
          >
            <circle
              cx="150"
              cy="150"
              r={radius}
              className="stroke-slate-200 dark:stroke-white/10"
              strokeWidth="8"
              fill="transparent"
            />

            <circle
              cx="150"
              cy="150"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(0 150 150)"
              className="drop-shadow-[0_0_10px_rgba(38,189,179,0.35)]"
              style={{
                transition: "stroke-dashoffset 1s linear",
              }}
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#63E7DC" />
                <stop offset="35%" stopColor="#56DCD2" />
                <stop offset="70%" stopColor="#46D3C9" />
                <stop offset="100%" stopColor="#26BDB3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="text-center">
            <h1 className="text-3xl sm:text-6xl font-bold text-primary">
              {formatTime(seconds)}
            </h1>

            <p className="mt-1 sm:mt-3 tracking-[2px] sm:tracking-[6px] text-[10px] sm:text-base text-slate-500">
              {currentTab.label.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 flex items-center gap-3 sm:gap-6">

          <button
            onClick={resetTimer}
            className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-white/5 text-slateText dark:text-slate-300"
          >
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary-gradient shadow-xl shadow-primary/30 transition hover:scale-105"
          >
            {isRunning ? (
              <Pause className="h-6 w-6 sm:h-8 sm:w-8" />
            ) : (
              <Play className="ml-1 h-6 w-6 sm:h-8 sm:w-8 fill-white" />
            )}
          </button>

          <button
            onClick={nextTimer}
            className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-white/5 text-slateText dark:text-slate-300 transition hover:bg-white/10"
          >
            <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="mt-6 sm:mt-10 w-full rounded-xl sm:rounded-2xl border border-primary/30 bg-primary/10 p-3 sm:p-4 flex items-center justify-center text-center">
          <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center flex-wrap">
            Working on: &nbsp;
            <span className="text-sm sm:text-base font-semibold dark:text-white text-slateText">
              Partial Fractions — Introduction
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}