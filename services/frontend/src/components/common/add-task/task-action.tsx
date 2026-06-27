import { CheckCircle2, Trash2 } from "lucide-react";

interface TaskActionsProps {
  onComplete: () => void;
  onDelete: () => void;
  completeDisabled?: boolean;
  loading?: boolean;
}

export function TaskActions({
  onComplete,
  onDelete,
  completeDisabled = false,
  loading = false,
}: TaskActionsProps) {
  const isCompleteDisabled = completeDisabled || loading;

  return (
<div className="flex items-center gap-2 sm:gap-3">
  <button
    disabled={isCompleteDisabled}
    onClick={(e) => {
      e.stopPropagation();
      onComplete();
    }}
    className={`
      h-9 w-9 sm:h-11 sm:w-11
      rounded-full
      flex items-center justify-center
      transition-all duration-200
      ${
        isCompleteDisabled
          ? "border border-slate-500/20 bg-slate-500/5 opacity-50 cursor-not-allowed"
          : "border border-green-500/20 bg-green-500/5 hover:bg-green-500/15 cursor-pointer"
      }
    `}
  >
    <CheckCircle2
      className={`h-4 w-4 sm:h-5 sm:w-5 ${
        isCompleteDisabled ? "text-slate-500" : "text-green-400"
      }`}
    />
  </button>

  <button
    disabled={loading}
    onClick={(e) => {
      e.stopPropagation();
      onDelete();
    }}
    className={`
      h-9 w-9 sm:h-11 sm:w-11
      rounded-full
      border border-red-500/20
      bg-red-500/5
      hover:bg-red-500/15
      transition-all duration-200
      flex items-center justify-center
      ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }
    `}
  >
    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
  </button>
</div>
  );
}