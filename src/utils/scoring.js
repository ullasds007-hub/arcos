import { loadUserHabits } from "./habitStorage.js";

function getHabitProgress(habit, habitData) {
  if (!habitData) return 0;

  if (habit.trackingType === "boolean") {
    return habitData.completed ? 1 : 0;
  }

  const target = Number(habit.target || 0);
  const actual = Number(habitData.value || 0);

  if (target <= 0) return 0;

  return Math.min(1, actual / target);
}

export function calculateDailyScore(dayData = {}) {
  const habits =
    dayData.habitSnapshot?.length > 0
      ? dayData.habitSnapshot
      : loadUserHabits().filter(
          (habit) =>
            habit.active &&
            !habit.archived
        );

  if (!habits.length) return 0;

  let earnedWeight = 0;
  let totalWeight = 0;

  habits.forEach((habit) => {
    const weight = Number(habit.weight || 1);

    totalWeight += weight;

    const progress = getHabitProgress(
      habit,
      dayData.habits?.[habit.id]
    );

    earnedWeight += progress * weight;
  });

  if (totalWeight === 0) return 0;

  return Math.round(
    (earnedWeight / totalWeight) * 100
  );
}

export function getScoreLabel(score) {
  if (score >= 90) return "Elite";
  if (score >= 75) return "Strong";
  if (score >= 60) return "Building";
  if (score >= 40) return "Recovery";

  return "Reset";
}

export function getHabitCompletion(
  habit,
  habitData
) {
  return Math.round(
    getHabitProgress(habit, habitData) * 100
  );
}