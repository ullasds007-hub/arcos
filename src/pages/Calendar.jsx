import { useMemo } from "react";
import { loadArcData } from "../utils/storage";
import { calculateDailyScore } from "../utils/scoring";

function formatDateKey(date) {
  return date.toISOString().split("T")[0];
}

function getScoreClass(score) {
  if (score >= 90) return "score-5";
  if (score >= 75) return "score-4";
  if (score >= 60) return "score-3";
  if (score >= 40) return "score-2";
  if (score > 0) return "score-1";

  return "score-0";
}

export default function Calendar() {
  const history = loadArcData();

  const arcDays = useMemo(() => {
    const days = [];

    const start = new Date("2026-10-01T00:00:00");
    const end = new Date("2026-12-31T00:00:00");

    const cursor = new Date(start);

    while (cursor <= end) {
      const key = formatDateKey(cursor);

      const dayData = history[key];

      const score = dayData
        ? calculateDailyScore(dayData)
        : 0;

      days.push({
        key,
        date: new Date(cursor),
        score,
        tracked: Boolean(dayData),
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return days;
  }, [history]);

  const trackedDays = arcDays.filter(
    (day) => day.tracked
  ).length;

  const averageScore = trackedDays
    ? Math.round(
        arcDays
          .filter((day) => day.tracked)
          .reduce((total, day) => total + day.score, 0) /
          trackedDays
      )
    : 0;

  const months = [
    {
      name: "October",
      days: arcDays.filter(
        (day) => day.date.getMonth() === 9
      ),
    },
    {
      name: "November",
      days: arcDays.filter(
        (day) => day.date.getMonth() === 10
      ),
    },
    {
      name: "December",
      days: arcDays.filter(
        (day) => day.date.getMonth() === 11
      ),
    },
  ];

  return (
    <div className="calendar-page">
      <section className="calendar-header">
        <div>
          <p className="eyebrow">90-DAY ARC</p>

          <h1>Winter Arc Calendar</h1>

          <p className="dashboard-subtitle">
            Every square represents one day of your Winter Arc.
          </p>
        </div>

        <div className="calendar-summary">
          <div>
            <span>Tracked Days</span>
            <strong>{trackedDays}</strong>
          </div>

          <div>
            <span>Average Score</span>
            <strong>{averageScore}%</strong>
          </div>
        </div>
      </section>

      <section className="calendar-months">
        {months.map((month) => (
          <div className="month-card" key={month.name}>
            <div className="month-heading">
              <h2>{month.name}</h2>

              <span>
                {
                  month.days.filter(
                    (day) => day.tracked
                  ).length
                }{" "}
                tracked
              </span>
            </div>

            <div className="week-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="calendar-grid">
              {Array.from({
                length:
                  (month.days[0].date.getDay() + 6) % 7,
              }).map((_, index) => (
                <div
                  className="calendar-empty"
                  key={`empty-${index}`}
                />
              ))}

              {month.days.map((day) => (
                <div
                  key={day.key}
                  className={`calendar-day ${getScoreClass(
                    day.score
                  )}`}
                  title={`${day.date.toLocaleDateString(
                    "en-IN"
                  )} — ${
                    day.tracked
                      ? `${day.score}/100`
                      : "Not tracked"
                  }`}
                >
                  <span>
                    {day.date.getDate()}
                  </span>

                  {day.tracked && (
                    <small>{day.score}</small>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="calendar-legend">
        <span>Score:</span>

        <div className="legend-item">
          <div className="legend-box score-0" />
          <small>No data</small>
        </div>

        <div className="legend-item">
          <div className="legend-box score-1" />
          <small>1–39</small>
        </div>

        <div className="legend-item">
          <div className="legend-box score-2" />
          <small>40–59</small>
        </div>

        <div className="legend-item">
          <div className="legend-box score-3" />
          <small>60–74</small>
        </div>

        <div className="legend-item">
          <div className="legend-box score-4" />
          <small>75–89</small>
        </div>

        <div className="legend-item">
          <div className="legend-box score-5" />
          <small>90–100</small>
        </div>
      </section>
    </div>
  );
}