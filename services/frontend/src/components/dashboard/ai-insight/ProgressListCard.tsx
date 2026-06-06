import { CustomProgress } from "@/components/common/custom-progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Item = {
  title: string;
  value: number;
  color: string;
};

type Props = {
  title: string;
  badge: string;
  badgeClass: string;
  items: Item[];
};

const ProgressListCard = ({
  title,
  badge,
  badgeClass,
  items,
}: Props) => {
  return (
    <Card className="custom-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
        >
          {badge}
        </span>
      </CardHeader>

      <CardContent className="space-y-6">
        {items.map((item) => (
          <div key={item.title}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm ">
                {item.title}
              </span>
              <span className="font-semibold text-white">
                {item.value}%
              </span>
            </div>

            <CustomProgress
              value={item.value}
              className="h-2"
              indicatorClassName={item.color}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProgressListCard;