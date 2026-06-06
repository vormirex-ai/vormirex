interface Props {
  step: number;
  total: number;
}

export function RoadmapProgress({
  step,
  total,
}: Props) {
  const progress = (step / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>
          Step {step} of {total}
        </p>

        <p>{Math.round(progress)}%</p>
      </div>

      <div className="h-2 rounded-full dark:bg-white/5 bg-gray-400 overflow-hidden">
        <div
          className="h-full bg-primary-gradient rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}