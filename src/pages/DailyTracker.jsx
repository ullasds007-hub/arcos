import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, MinusCircle, Save } from "lucide-react";

import { habits } from "../data/habits";
import { loadArcData, saveArcData } from "../utils/storage";
import { calculateDailyScore, getScoreLabel } from "../utils/scoring";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

const createEmptyDay = () => ({
  habits: {},
  wins: {
    academic: "",
    career: "",
    personal: "",
  },
  notes: "",
});

export default function DailyTracker() {
  const todayKey = getTodayKey();

  const [history, setHistory] = useState({});
  const [dayData, setDayData] = useState(createEmptyDay());
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const stored = loadArcData();
    setHistory(stored);

    if (stored[todayKey]) {
      setDayData({
        ...createEmptyDay(),
        ...stored[todayKey],
        habits: stored[todayKey].habits || {},
        wins: {
          ...createEmptyDay().wins,
          ...(stored[todayKey].wins || {}),
        },
      });
    }
  }, [todayKey]);

  const score = useMemo(() => {
    return calculateDailyScore(dayData);
  }, [dayData]);

  const updateHabitStatus = (habitId, status) => {
    setDayData((previous) => ({
      ...previous,
      habits: {
        ...previous.habits,
        [habitId]: {
          ...previous.habits?.[habitId],
          status,
        },
      },
    }));
  };

  const updateHabitValue = (habitId, field, value) => {
    setDayData((previous) => ({
      ...previous,
      habits: {
        ...previous.habits,
        [habitId]: {
          ...previous.habits?.[habitId],
          [field]: value,
        },
      },
    }));
  };

  const updateWin = (field, value) => {
    setDayData((previous) => ({
      ...previous,
      wins: {
        ...previous.wins,
        [field]: value,
      },
    }));
  };

  const saveToday = () => {
    const updatedHistory = {
      ...history,
      [todayKey]: {
        ...dayData,
        score,
        updatedAt: new Date().toISOString(),
      },
    };

    setHistory(updatedHistory);
    saveArcData(updatedHistory);

    setSavedMessage("Today's progress saved.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  return (
    <div className="tracker-page">
      <section className="tracker-header">
        <div>
          <p className="eyebrow">DAILY TRACKER</p>
          <h1>Track Today</h1>
          <p>
            Small wins compound. Log what you actually did today.
          </p>
        </div>

        <div className="score-panel">
          <span>Today's Score</span>
          <strong>{score}/100</strong>
          <small>{getScoreLabel(score)}</small>
        </div>
      </section>

      <section className="habit-list">
        {habits.map((habit) => {
          const current = dayData.habits?.[habit.id] || {};
          const isSleep = habit.id === "sleep";

          return (
            <article className="habit-tracker-card" key={habit.id}>
              <div className="habit-top">
                <div>
                  <h3>{habit.name}</h3>
                  <p>{habit.description}</p>
                </div>

                <div className="habit-weight">
                  {habit.weight} pts
                </div>
              </div>

              <div className="status-buttons">
                <button
                  className={
                    current.status === "none"
                      ? "status-btn active none"
                      : "status-btn"
                  }
                  onClick={() =>
                    updateHabitStatus(habit.id, "none")
                  }
                >
                  <Circle size={17} />
                  Not Done
                </button>

                <button
                  className={
                    current.status === "partial"
                      ? "status-btn active partial"
                      : "status-btn"
                  }
                  onClick={() =>
                    updateHabitStatus(habit.id, "partial")
                  }
                >
                  <MinusCircle size={17} />
                  Partial
                </button>

                <button
                  className={
                    current.status === "complete"
                      ? "status-btn active complete"
                      : "status-btn"
                  }
                  onClick={() =>
                    updateHabitStatus(habit.id, "complete")
                  }
                >
                  <CheckCircle2 size={17} />
                  Complete
                </button>
              </div>

              <div className="habit-input-grid">
                {habit.id !== "discipline" && (
                  <label>
                    {isSleep ? "Hours" : "Minutes"}

                    <input
                      type="number"
                      min="0"
                      step={isSleep ? "0.5" : "5"}
                      placeholder={
                        isSleep
                          ? String(habit.targetHours || 8)
                          : String(habit.targetMinutes || 30)
                      }
                      value={
                        current[isSleep ? "hours" : "minutes"] ?? ""
                      }
                      onChange={(event) =>
                        updateHabitValue(
                          habit.id,
                          isSleep ? "hours" : "minutes",
                          event.target.value
                        )
                      }
                    />
                  </label>
                )}

                <label className="habit-note-field">
                  Notes

                  <input
                    type="text"
                    placeholder="Optional note..."
                    value={current.note || ""}
                    onChange={(event) =>
                      updateHabitValue(
                        habit.id,
                        "note",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>
            </article>
          );
        })}
      </section>

      <section className="wins-card">
        <p className="eyebrow">TODAY'S 3 WINS</p>
        <h2>What moved you forward today?</h2>

        <div className="wins-grid">
          <label>
            Academic Win
            <textarea
              placeholder="Example: Finished chapter 3 revision"
              value={dayData.wins.academic}
              onChange={(event) =>
                updateWin("academic", event.target.value)
              }
            />
          </label>

          <label>
            Career / Skill Win
            <textarea
              placeholder="Example: Practised SQL joins"
              value={dayData.wins.career}
              onChange={(event) =>
                updateWin("career", event.target.value)
              }
            />
          </label>

          <label>
            Personal Win
            <textarea
              placeholder="Example: Completed workout"
              value={dayData.wins.personal}
              onChange={(event) =>
                updateWin("personal", event.target.value)
              }
            />
          </label>
        </div>

        <label className="daily-notes">
          Daily Reflection

          <textarea
            placeholder="What went well? What should improve tomorrow?"
            value={dayData.notes}
            onChange={(event) =>
              setDayData((previous) => ({
                ...previous,
                notes: event.target.value,
              }))
            }
          />
        </label>

        <div className="save-row">
          <div>
            <strong>{score}/100</strong>
            <span>{getScoreLabel(score)}</span>
          </div>

          <button className="save-day-btn" onClick={saveToday}>
            <Save size={18} />
            Save Today
          </button>
        </div>

        {savedMessage && (
          <p className="saved-message">{savedMessage}</p>
        )}
      </section>
    </div>
  );
}