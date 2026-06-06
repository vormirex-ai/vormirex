import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { weeklyData } from "@/components/data/dashboard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function WeeklyActivity() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Activity</CardTitle>
            <p className="text-sm text-slate-400">
              Time studied per day
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="h-3 w-3 rounded-full bg-cyan-400" />
            This week
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <defs>
                <linearGradient
                  id="barGradient"
                  x1="0"
                  y1="1"
                  x2="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#26BDB3" />
                  <stop offset="45%" stopColor="#46D3C9" />
                  <stop offset="75%" stopColor="#56DCD2" />
                  <stop offset="100%" stopColor="#63E7DC" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tick={{ fill: "#94a3b8", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) =>
                  value < 60
                    ? `${value}m`
                    : `${Math.round(value / 60)}h`
                }
                tick={{ fill: "#94a3b8", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value) => {
                  const numValue = Number(value ?? 0);

                  const hours = Math.floor(numValue / 60);
                  const mins = numValue % 60;

                  let formattedTime = "";

                  if (hours > 0 && mins > 0) {
                    formattedTime = `${hours}h ${mins}m`;
                  } else if (hours > 0) {
                    formattedTime = `${hours}h`;
                  } else {
                    formattedTime = `${mins}m`;
                  }

                  return [formattedTime, "Study Time"] as [string, string];
                }}
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "12px",
                  color: "var(--tooltip-text)",
                }}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[12, 12, 0, 0]}
                barSize={55}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}