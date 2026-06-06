import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileHeader() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-cyan-500/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md dark:shadow-xl relative overflow-hidden">

      <div className="flex items-center gap-5 relative z-10">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-gradient text-white font-bold text-2xl sm:text-3xl flex items-center justify-center rounded-full tracking-wider shadow-md ring-2 ring-gray-200 dark:ring-indigo-500/20">
            S
          </div>

          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#090d16]" />
        </div>

        <div className="space-y-2">

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sandhya
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-500 font-mono">
              sandhya@gmail.com
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">

            <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400">
              Pro Member
            </span>

            <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-500">
              🔥 12-Day Streak
            </span>

            <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/30 text-purple-600 dark:text-purple-400">
              🏆 Level 8
            </span>

            <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              Top 5%
            </span>

          </div>
        </div>
      </div>

      <Button variant="secondary" className="dark:bg-white/10 dark:text-white">
        <Edit3 className="w-4 h-4" />
        Edit Profile
      </Button>

    </div>
  );
}