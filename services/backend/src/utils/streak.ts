import { IUser } from '../modules/user/user.model.js';

export const updateUserStreak = async (user: IUser) => {
  try {
    // Use user's timezone or default to UTC
    const timezone = user.timezone || 'UTC';

    // Helper to get YYYY-MM-DD in the specific timezone
    const getDateString = (date: Date, tz: string) => {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    };

    const now = new Date();
    const todayString = getDateString(now, timezone);

    // Initialize streak object if missing
    if (!user.streak) {
      user.streak = {
        current: 1, // First activity
        longest: 1,
        lastActivityDate: now,
      };
      await user.save();
      return;
    }

    const lastActivityDate = user.streak.lastActivityDate
      ? new Date(user.streak.lastActivityDate)
      : null;

    if (!lastActivityDate) {
      // Should normally be covered by init block, but safe fallback
      user.streak.current = 1;
      user.streak.longest = Math.max(user.streak.longest, 1);
      user.streak.lastActivityDate = now;
      await user.save();
      return;
    }

    const lastActivityString = getDateString(lastActivityDate, timezone);

    // 1. If active today, do nothing
    if (lastActivityString === todayString) {
      return;
    }

    // 2. Check if active yesterday
    // Create a date for "yesterday" relative to the user's "now" in their timezone is tricky
    // safely handled by subtracting 24h from 'now' ?? No, that's unsafe for DST.
    // Better: Parse todayString back to date, subtract 1 day, re-format?
    // Robust approach: Check if difference in days is exactly 1.

    // Let's use a simpler heuristic for consecutive days using Date objects constructed from strings
    // 'en-CA' format is YYYY-MM-DD which sorts and parses correctly
    const todayDate = new Date(todayString); // UTC midnight of that local day
    const lastDate = new Date(lastActivityString); // UTC midnight of that local day

    // Difference in milliseconds
    const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Provide grace period? No, strict daily.
      user.streak.current += 1;
    } else {
      // Missed a day (or more)
      user.streak.current = 1;
    }

    // Update longest streak
    if (user.streak.current > user.streak.longest) {
      user.streak.longest = user.streak.current;
    }

    // Update last activity date
    user.streak.lastActivityDate = now;

    await user.save();
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};
