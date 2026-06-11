export interface WeeklyDay {
  day: string;
  dateString: string;
  isCompleted: boolean;
  isToday: boolean;
}

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

export const buildWeeklyDays = (
  pastChallenges: { dateString: string }[],
  baseDate: Date = new Date(),
): WeeklyDay[] => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const startOfWeek = getStartOfWeek(baseDate);

  const completedDates = pastChallenges.map((item) => item.dateString);

  return daysOfWeek.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const dateString = formatToDateString(date);
    const todayString = formatToDateString(baseDate);

    return {
      day,
      dateString,
      isCompleted: completedDates.includes(dateString),
      isToday: dateString === todayString,
    };
  });
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};
