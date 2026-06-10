import { cn } from "@/lib/utils";

interface Enhancement {
  id: string;
  title: string;
  enabled: boolean;
}

interface Props {
  enhancements: Enhancement[];
  setEnhancements: React.Dispatch<
    React.SetStateAction<Enhancement[]>
  >;
}

export function RoadmapStepEnhancements({
  enhancements,
  setEnhancements,
}: Props) {
  const toggleEnhancement = (id: string) => {
    setEnhancements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            enabled: !item.enabled,
          }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          Enhance your roadmap
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
          Customize additional learning features.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {enhancements.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              toggleEnhancement(item.id)
            }
            className={cn(
              "w-full rounded-2xl sm:rounded-[26px]",
              "border transition-all duration-300",
              "px-3 sm:px-6 lg:px-8",
              "py-3 sm:py-5 lg:py-6",
              "flex items-center justify-between gap-3",
              "bg-card",

              item.enabled
                ? `
                  border-primary
                  shadow-[0_0_20px_hsl(var(--primary)/0.18)]
                `
                : `
                  border-border
                  hover:border-primary/40
                `
            )}
          >

            <span
              className="
                text-sm sm:text-base lg:text-lg
                font-medium sm:font-semibold
                text-foreground
                whitespace-nowrap
                truncate
              "
            >
              {item.title}
            </span>

            <div
              className={cn(
                "relative shrink-0 rounded-full transition-all duration-300",

                "h-5 w-9 sm:h-6 sm:w-11 lg:h-8 lg:w-14",

                item.enabled
                  ? "bg-primary"
                  : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute rounded-full bg-background border border-border transition-all duration-300",

                  "top-[2px] h-4 w-4 sm:top-1 sm:h-4 sm:w-4 lg:h-6 lg:w-6",

                  item.enabled
                    ? "right-[2px] sm:right-1"
                    : "left-[2px] sm:left-1"
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}