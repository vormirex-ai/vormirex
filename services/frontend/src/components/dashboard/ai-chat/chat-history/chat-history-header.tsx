import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ChatHistoryHeader() {
  return (
    <div className="mb-6">
      <Badge className="mb-4 border border-cyan-500/20 bg-cyan-500/10 dark:text-primary text-primary-500 hover:bg-cyan-500/10 rounded-full">
        <Sparkles className="mr-1 h-3 w-3" />
        AI Tutor Sessions
      </Badge>

      <h1 className="text-3xl md:text-4xl font-bold ">
        Conversation{" "}
        <span className="text-primary-500">
          History
        </span>
      </h1>

      <p className="mt-2 text-sm md:text-base text-slate-400">
        Review and continue your previous AI learning sessions.
      </p>
    </div>
  );
}