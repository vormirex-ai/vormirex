import { CustomProgress } from "@/components/common/custom-progress";
import { DeckProps } from "@/interface/flashCrad.interface";

export const DeckCategoryCard = ({ title, totalCards, dueToday, progress, colorClass }: DeckProps) => (
  <div className="custom-surface p-4 rounded-xl flex items-center gap-4 hover:border-primary dark:hover:bg-[#154249]/40 cursor-pointer transition-all">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
      <div className={`w-6 h-6 rounded ${colorClass}`} />
    </div>
    <div className="flex-1">
      <h3 className=" font-semibold">{title}</h3>
      <p className="text-xs text-slate-400">{totalCards} cards • {dueToday} due</p>
      <CustomProgress
        value={progress}
        className="h-1.5 mt-2"
      />
    </div>
  </div>
);