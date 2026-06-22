import { Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const insightIcons: Record<string, string> = {
  percentile: "⭐",
  strength: "📝",
  opportunity: "⚡",
  prediction: "🎯",
};

const insightLabels: Record<string, string> = {
  percentile: "Percentile",
  strength: "Strength",
  opportunity: "Opportunity",
  prediction: "Prediction",
};

function InsightItem({
  icon,
  type,
  text,
}: {
  icon: string;
  type: string;
  text: string;
}) {
  const cleanText = text.replace(
    new RegExp(`^${type}:\\s*`, "i"),
    ""
  );

  return (
    <div className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed dark:text-slate-300">
      <span className="text-sm mt-0.5">{icon}</span>

      <p>
        <span className="font-bold dark:text-slate-100">
          {insightLabels[type] || type}:
        </span>{" "}
        {cleanText}
      </p>
    </div>
  );
}

export function AIInsights({ data = [] }: { data?: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-textColor">
        <span>🤖</span>
        AI Insights
      </div>

      <div className="custom-surface rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-6 h-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-4 h-4" />
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold">
              AI Insights
            </h4>

            <p className="text-[11px] text-slateText">
              Personalized analysis
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {data?.map((item, index) => (
            <InsightItem
              key={index}
              icon={insightIcons[item.type] || "💡"}
              type={item.type}
              text={item.text}
            />
          ))}
        </div>

        <Button
          className="w-full flex items-center justify-center gap-2 shadow-inner"
          onClick={() => navigate("/dashboard/ai-chat")}
        >
          <MessageSquare className="w-4 h-4" />
          Chat with AI about my progress
        </Button>
      </div>
    </div>
  );
}