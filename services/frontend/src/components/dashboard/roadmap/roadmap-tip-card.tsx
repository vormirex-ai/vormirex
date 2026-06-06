interface Props {
  title: string;
  description: string;
  icon: string;
}

export function RoadmapTipCard({
  title,
  description,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl custom-surface p-6">
      <div className="flex items-start gap-4">
        <div className="text-2xl">
          {icon}
        </div>

        <div>
          <h3 className="font-bold  mb-3">
            {title}
          </h3>

          <p className="text-textColor leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}