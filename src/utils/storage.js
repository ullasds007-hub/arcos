const STORAGE_KEY = "arcos-data";

export function loadArcData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return {};
    }

    return JSON.parse(savedData);
  } catch (error) {
    console.error("Failed to load ArcOS data:", error);
    return {};
  }
}

export function saveArcData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save ArcOS data:", error);
  }
}