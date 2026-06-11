import { DynamicIcon } from "@/components/iconMapper";

export const DeckCategoryCard = ({
  title,
  totalCards,
  dueToday,
  progress,
  colorClass,
  studied,
  accuracy,
  icon,
  disabled = false,
}: any) => {

  return (
    <div
      className={`
        custom-surface p-4 rounded-xl flex items-center gap-4 transition-all
        ${disabled
          ? "opacity-70 cursor-not-allowed border border-cyan-500/30"
          : "hover:border-primary dark:hover:bg-[#154249]/40 cursor-pointer"}
      `}
    >
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
        <DynamicIcon icon={icon} />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>

        <p className="text-xs dark:text-textColor text-slateText">
          {totalCards} cards • {dueToday} due
        </p>

        <p className="text-[11px] dark:text-textColor text-slateText mt-1">
          Studied: {studied} • Accuracy: {accuracy.toFixed(1)}%
        </p>

        <p className="text-[10px] text-cyan-500 mt-1">
          Progress: {progress}%
        </p>

        <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-primary-gradient transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
