import { defaultHabits } from "../data/defaultHabits";

const HABITS_KEY = "arcos-user-habits";

export function loadUserHabits() {
  try {
    const saved = localStorage.getItem(HABITS_KEY);

    if (!saved) {
      const initialHabits = structuredClone(defaultHabits);

      localStorage.setItem(
        HABITS_KEY,
        JSON.stringify(initialHabits)
      );

      return initialHabits;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load habits:", error);

    return structuredClone(defaultHabits);
  }
}

export function saveUserHabits(habits) {
  try {
    localStorage.setItem(
      HABITS_KEY,
      JSON.stringify(habits)
    );
  } catch (error) {
    console.error("Failed to save habits:", error);
  }
}