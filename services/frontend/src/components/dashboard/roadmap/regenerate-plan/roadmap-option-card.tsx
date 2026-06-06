import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function RoadmapOptionCard({
  title,
  description,
  icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 p-4 sm:p-5 border-cyan-500/30",
        "",
        "hover:border-primary hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]",
        active &&
        "border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.3)]"
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4 text-left">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-gradient flex items-center justify-center text-black shrink-0">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}