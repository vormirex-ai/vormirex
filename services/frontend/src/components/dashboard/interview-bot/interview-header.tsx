import { Sparkles, Zap } from "lucide-react";

export const InterviewBotHeader = () => {
  return (
    <div className="space-y-6 mb-6 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className=" text-2xl md:text-4xl  font-bold  flex items-center gap-2">
            🎤 Interview Bot
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Paste your resume, pick the job — AI generates real interview questions and coaches you.
          </p>
        </div>

        <div className="inline-flex items-center text-black gap-1.5 bg-primary-gradient px-3 py-1.5 rounded-full text-xs font-medium self-start md:self-center">
          <Sparkles className="w-3.5 h-3.5" /> AI Powered
        </div>

      </div>
    </div>
  );
};