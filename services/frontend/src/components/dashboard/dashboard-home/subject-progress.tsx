import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { subjects } from "@/components/data/dashboard";

export function SubjectProgress() {
  return (
    <Card className="border border-cyan-500/10 ">
      <CardHeader>
        <CardTitle>Subject Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {subjects.map((item) => (
          <div key={item.title}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.title}</span>
              <span>{item.progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}