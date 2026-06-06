import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export const CustomProgress = ({
  value,
  className,
  indicatorClassName,
}: CustomProgressProps) => {
  return (
    <Progress
      value={value}
      className={cn(
        "dark:bg-muted bg-gray-400/40",
        className
      )}
      indicatorClassName={cn(
        "[&>div]:bg-primary-gradient",
        indicatorClassName
      )}
    />
  );
};