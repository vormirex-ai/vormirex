import React from "react";
import { Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsightRowProps {
  icon: string;
  boldText: string;
  regularText: string;
}

function InsightItem({ icon, boldText, regularText }: InsightRowProps) {
  return (
    <div className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed dark:text-slate-300">
      <span className="text-sm mt-0.5 select-none">{icon}</span>
      <p>
        <span className="font-bold dark:text-slate-100">{boldText}</span>
        {regularText}
      </p>
    </div>
  );
}

export function AIInsights() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-textColor">
        <span>🤖</span> AI Insights
      </div>
      <div className="custom-surface rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-6 h-full">


        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold">AI Insights</h4>
            <p className="text-[11px] text-slateText">Personalized analysis</p>
          </div>
        </div>


        <div className="flex flex-col gap-4">
          <InsightItem
            icon="⭐"
            boldText="You're in the top 5% "
            regularText="of learners this week! Your consistency is impressive — you haven't missed a single day in 12 days."
          />
          <InsightItem
            icon="📝"
            boldText="Strength: "
            regularText="You excel at theoretical concepts and multiple-choice questions (avg 82% score)."
          />
          <InsightItem
            icon="⚡"
            boldText="Opportunity: "
            regularText="Practice more applied problems in Integration. Your concept understanding is strong but application needs work."
          />
          <InsightItem
            icon="🎯"
            boldText="Prediction: "
            regularText="At your current pace, you'll complete the Calculus course in 3 weeks."
          />
        </div>

        {/* Action Trigger chat bar */}
        <Button className="w-full  flex items-center justify-center gap-2 shadow-inner">
          <MessageSquare className="w-4 h-4 " />
          Chat with AI about my progress
        </Button>

      </div>
    </div>
  );
}