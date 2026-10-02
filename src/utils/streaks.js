import { calculateDailyScore } from "./scoring";

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

export function calculateStreak(history = {}) {
  let streak = 0;

  const date = new Date();

  for (let i = 0; i < 365; i++) {
    const key = getDateKey(date);

    const dayData = history[key];

    if (!dayData) {
      if (i === 0) {
        date.setDate(date.getDate() - 1);
        continue;
      }

      break;
    }

    const score = calculateDailyScore(dayData);

    if (score >= 60) {
      streak++;
    } else {
      break;
    }

    date.setDate(date.getDate() - 1);
  }

  return streak;
}