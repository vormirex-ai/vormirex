import { Button } from "@/components/ui/button";
import { Check, CalendarDays, Monitor, Infinity } from "lucide-react";

interface TaskCardProps {
  title: string;
  subtitle: string;
  type?: "completed" | "upcoming";
  buttonText?: string;
  icon?: "check" | "calendar" | "monitor" | "math";
}

export function TaskCard({
  title,
  subtitle,
  type = "upcoming",
  buttonText,
  icon = "calendar",
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
        rounded-2xl p-4 flex items-center justify-between gap-4 border
        ${isCompleted
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-primary/5 border-cyan-500/10"
        }
      `}
    >

      <div className="flex items-center gap-4">
        {renderIcon()}

        <div>
          <h4
            className={`font-semibold text-lg ${isCompleted
              ? "line-through text-slate-500"
              : "text-foreground"
              }`}
          >
            {title}
          </h4>

          <p className="text-slate-400 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <Button
        className={`
    rounded-full text-xs !shadow-none hover:!shadow-none border-0 px-5
    ${isCompleted
            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            : ""
          }
  `}
      >
        {buttonText}
      </Button>
    </div>
  );
}