import { Button } from "@/components/ui/button";
import { Check, CalendarDays, Monitor, Infinity } from "lucide-react";

interface TaskCardProps {
  title: string;
  subtitle: string;
  xpAwarded?: string;
  type?: "completed" | "upcoming";
  buttonText?: string;
  icon?: "check" | "calendar" | "monitor" | "math";
  onAction?: () => void;
  actions?: React.ReactNode;
}

export function TaskCard({
  title,
  subtitle,
  type = "upcoming",
  buttonText,
  icon = "calendar",
  onAction,
  xpAwarded,
  actions,
}: TaskCardProps) {
  const isCompleted = type === "completed";

  const renderIcon = () => {
    switch (icon) {
      case "check":
        return (
          <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-400" />
          </div>
        );

      case "monitor":
        return <Monitor className="w-4 h-4 text-slate-400" />;

      case "math":
        return <Infinity className="w-4 h-4 text-slate-400" />;

      default:
        return <CalendarDays className="w-4 h-4 text-blue-400" />;
    }
  };

return (
  <div
    className={`
      rounded-2xl p-3 sm:p-4 border
      ${
        isCompleted
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-primary/5 border-cyan-500/10"
      }
    `}
  >
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3 sm:gap-4 ">
        {renderIcon()}

        <div className="min-w-0 flex-1">
          <h4
            className={`text-sm sm:text-base lg:text-lg font-medium break-words ${
              isCompleted
                ? "line-through text-slate-500"
                : "text-foreground"
            }`}
          >
            {title}
          </h4>

          <p className="text-slate-400 text-xs sm:text-sm mt-1 break-words">
            {subtitle}
          </p>
        </div>
      </div>

      {isCompleted && (
        <Button className="w-fit self-start rounded-full text-[10px] sm:text-xs !shadow-none hover:!shadow-none border-0 px-3 sm:px-5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
          +{xpAwarded} XP
        </Button>
      )}
    </div>

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-3">
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}

      {!isCompleted && buttonText && (
        <Button
          onClick={onAction}
          className="w-full sm:w-auto rounded-full text-[10px] sm:text-xs !shadow-none hover:!shadow-none border-0 px-4 sm:px-5"
        >
          {buttonText}
        </Button>
      )}
    </div>
  </div>
);
}



