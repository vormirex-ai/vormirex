export const formatToDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getStartOfWeek = (date: Date) => {
  const currentDay = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(date.getDate() - currentDay);

  return start;
};

export interface WeeklyDay {
  day: string;
  dateString: string;
  isCompleted: boolean;
  isToday: boolean;
  score?: number;
  xpEarned?: number;
}

interface CalendarItem {
  date: string;
  score: number;
  xpEarned: number;
}

export const buildWeeklyDays = (
  calendar: CalendarItem[],
  baseDate: Date = new Date(),
): WeeklyDay[] => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const startOfWeek = getStartOfWeek(baseDate);

  return daysOfWeek.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const dateString = formatToDateString(date);
    const todayString = formatToDateString(baseDate);

    const matchedDay = calendar.find((item) => item.date === dateString);

    return {
      day,
      dateString,
      isCompleted: !!matchedDay,
      isToday: dateString === todayString,
      score: matchedDay?.score,
      xpEarned: matchedDay?.xpEarned,
    };
  });
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};
