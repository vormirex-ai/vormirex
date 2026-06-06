import { CalendarDay } from "./calender-day";


const days = [
  {
    day: "MON",
    date: 21,
    tasks: ["Integration", "Practice"],
  },
  {
    day: "TUE",
    date: 22,
    tasks: ["Trig Sub"],
  },
  {
    day: "WED",
    date: 23,
    active: true,
    tasks: ["Partial Fracs", "OOP Python"],
  },
  {
    day: "THU",
    date: 24,
    tasks: ["Improper Integrals"],
  },
  {
    day: "FRI",
    date: 25,
    tasks: ["Quiz Day", "Physics Ch.3"],
  },
  {
    day: "SAT",
    date: 26,
    tasks: ["Review"],
  },
  {
    day: "SUN",
    date: 27,
    tasks: ["Rest Day"],
  },
];

export function WeekCalendar() {
  return (
    <div className="custom-surface shadow-md rounded-3xl p-6 overflow-x-auto">
      <div className="grid grid-cols-7 gap-4 min-w-[1100px]">
        {days.map((item, index) => (
          <CalendarDay key={index} {...item} />
        ))}
      </div>
    </div>
  );
}