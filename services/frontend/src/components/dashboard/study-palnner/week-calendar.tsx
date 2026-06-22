import { CalendarDay } from "./calender-day";

export function WeekCalendar({ data }: any) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="custom-surface shadow-md rounded-3xl p-6 overflow-x-auto custom-scrollbar">
      <div className="grid grid-cols-7 gap-4 min-w-[1100px]">
        {data?.map((item: any, index: number) => (
          <CalendarDay
            key={index}
            day={item.dayName}
            date={item.dayOfMonth}
            dateString={item.dateString}
            tasks={item.tasks || []}
            active={item.dateString === today}
          />
        ))}
      </div>
    </div>
  );
}