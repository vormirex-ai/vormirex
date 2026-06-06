import { roadmapTimeline } from "@/components/data/roadmap-data";
import { Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RoadmapTimeline() {
  return (
    <div>
      <h3 className="font-bold text-lg sm:text-xl mb-6 sm:mb-8">
        📅 THIS WEEK
      </h3>

      <div>
        {roadmapTimeline.map((item, index) => (
          <div key={index} className="flex gap-3 sm:gap-5">

            <div className="flex flex-col items-center">

              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center
                ${item.completed
                    ? "bg-green-500/10 border-green-500 text-green-400"
                    : item.active
                      ? "bg-blue-500/10 border-blue-500 text-blue-400"
                      : "bg-card border-border text-muted-foreground"
                  }`}
              >
                {item.completed ? (
                  <Check size={14} className="sm:w-[18px] sm:h-[18px]" />
                ) : item.active ? (
                  <Play size={14} className="sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground" />
                )}
              </div>

              {index !== roadmapTimeline.length - 1 && (
                <div className="w-[2px] h-14 sm:h-16 bg-border mt-2" />
              )}
            </div>

            <div className="flex-1 pb-5 sm:pb-6 min-w-0">

              <p className="text-[10px] sm:text-xs tracking-widest text-textColor mb-1 sm:mb-2">
                {item.day}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h4
                    className={`text-xs sm:text-sm leading-relaxed break-words ${item.completed
                      ? "line-through text-textColor"
                      : ""
                      }`}
                  >
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center flex-wrap gap-2 sm:gap-4">

                  <span className="text-[10px] sm:text-sm text-textColor whitespace-nowrap">
                    ⏱ {item.duration}
                  </span>

                  {item.completed ? (
                    <Button
                      size="sm"
                      className="h-7 sm:h-8 px-3 text-[10px] sm:text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                    >
                      Done ✓
                    </Button>
                  ) : item.active ? (
                    <Button
                      size="sm"
                      className="h-7 sm:h-8 px-3 text-[10px] sm:text-xs rounded-full bg-primary-gradient text-black"
                    >
                      Start →
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}