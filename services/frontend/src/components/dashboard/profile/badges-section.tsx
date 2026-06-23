interface BadgeProps {
  emoji: string;
  title: string;
  description?:string;
  unlocked: boolean;
}

function AchievementBadge({ emoji, title, unlocked ,description}: BadgeProps) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 border transition-all duration-200 aspect-square ${unlocked
        ? "dark:bg-[#154249]  border border-cyan-500/10 shadow-md dark:text-slate-200 text-slateText "
        : "dark:bg-[#154249]/100 border-slate-900/40 opacity-30 dark:text-slate-300  text-slateText select-none"
        }`}
    >
      <span className={`text-2xl filter ${!unlocked && "grayscale saturate-0"}`}>
        {emoji}
      </span>
      <span className="text-[10px] font-bold tracking-wider uppercase max-w-[80px] leading-tight">
        {title}
      </span>
      <p className="text-xs line-clamp-1 text-textColor">{description}</p>
    </div>
  );
}

export function BadgesSection({ data }: { data: any[] }) {
  if (!data?.length) return null;

  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
        <span>🥇</span> Badges Earned
      </div>

      <div className="custom-surface rounded-2xl p-5 shadow-xl grid  grid-cols-2 md:grid-cols-4 gap-3 flex-1 items-center">
        {data.map((badge) => (
          <AchievementBadge
            key={badge.id}
            emoji={badge?.icon}
            title={badge?.name}
            description={badge?.description}
            unlocked={badge?.unlocked}
          />
        ))}
        
      </div>
    </div>
  );
}


