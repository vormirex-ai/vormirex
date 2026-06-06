import { Search, Zap } from "lucide-react";

export const ChallengesHeaders = () => {
  return (
    <div className="space-y-6 mb-6 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>

          <h1 className=" text-2xl md:text-4xl  font-bold  flex items-center gap-2">
            <Zap className="text-amber-400 fill-amber-400 w-6 h-6" /> Daily Challenge
          </h1>
          <p className="text-slate-400 text-sm">
            One question every day. Earn bonus XP and maintain your streak!
          </p>       <p className="text-textColor mt-1">Explore and continue your learning journey across all subjects.</p>
        </div>
      </div>
    </div>
  );
};