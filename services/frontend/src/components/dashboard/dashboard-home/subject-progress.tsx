import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SubjectProgress({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar">
        {data?.map((item: any) => (
          <div key={item.subject}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.subject}</span>
              <span>{item.percent}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-primary-gradient"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}