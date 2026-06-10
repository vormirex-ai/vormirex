interface Props {
  step: number;
  total: number;
  label: string;
}

export function RoadmapProgress({ step, total, label }: Props) {
  const progress = (step / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-primary-500 mb-3 ">
        <p>
          Step {step} of {total} · {label}
        </p>
        <p>{Math.round(progress)}%</p>
      </div>

      <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-primary-gradient transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}