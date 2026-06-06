import { stats } from "@/components/data/dashboard";
import { StatCard } from "./dashboard-stats-cards";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}