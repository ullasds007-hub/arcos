import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { loadArcData } from "../utils/storage";
import { habits } from "../data/habits";
import { calculateDailyScore } from "../utils/scoring";

function formatShortDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function Analytics() {
  const history = loadArcData();

  const trackedEntries = useMemo(() => {
    return Object.entries(history)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, data]) => ({
        date,
        ...data,
        score: calculateDailyScore(data),
      }));
  }, [history]);

  const scoreData = trackedEntries.map((entry) => ({
    date: formatShortDate(entry.date),
    score: entry.score,
  }));

  const categoryData = habits.map((habit) => {
    const completedEntries = trackedEntries.filter(
      (entry) =>
        entry.habits?.[habit.id]?.status === "complete" ||
        entry.habits?.[habit.id]?.status === "partial"
    );

    let earned = 0;

    trackedEntries.forEach((entry) => {
      const status = entry.habits?.[habit.id]?.status;

      if (status === "complete") {
        earned += 1;
      }

      if (status === "partial") {
        earned += 0.5;
      }
    });

    const percentage = trackedEntries.length
      ? Math.round((earned / trackedEntries.length) * 100)
      : 0;

    return {
      category: habit.name,
      percentage,
      sessions: completedEntries.length,
    };
  });

  const totalTrackedDays = trackedEntries.length;

  const averageScore = totalTrackedDays
    ? Math.round(
        trackedEntries.reduce(
          (total, entry) => total + entry.score,
          0
        ) / totalTrackedDays
      )
    : 0;

  const bestDay =
    trackedEntries.length > 0
      ? trackedEntries.reduce((best, current) =>
          current.score > best.score ? current : best
        )
      : null;

  const totalStudyMinutes = trackedEntries.reduce(
    (total, entry) =>
      total +
      Number(entry.habits?.academics?.minutes || 0),
    0
  );

  const totalCodingMinutes = trackedEntries.reduce(
    (total, entry) =>
      total +
      Number(entry.habits?.coding?.minutes || 0),
    0
  );

  const totalProjectMinutes = trackedEntries.reduce(
    (total, entry) =>
      total +
      Number(entry.habits?.project?.minutes || 0),
    0
  );

  const totalFitnessMinutes = trackedEntries.reduce(
    (total, entry) =>
      total +
      Number(entry.habits?.fitness?.minutes || 0),
    0
  );

  return (
    <div className="analytics-page">
      <section className="analytics-header">
        <div>
          <p className="eyebrow">ANALYTICS</p>

          <h1>Your Progress</h1>

          <p className="dashboard-subtitle">
            See how your habits, consistency and performance
            change over time.
          </p>
        </div>
      </section>

      <section className="analytics-stats">
        <div className="analytics-stat-card">
          <span>Tracked Days</span>
          <strong>{totalTrackedDays}</strong>
          <small>Total logged days</small>
        </div>

        <div className="analytics-stat-card">
          <span>Average Score</span>
          <strong>{averageScore}%</strong>
          <small>Across tracked days</small>
        </div>

        <div className="analytics-stat-card">
          <span>Best Day</span>
          <strong>
            {bestDay ? `${bestDay.score}%` : "--"}
          </strong>
          <small>
            {bestDay
              ? formatShortDate(bestDay.date)
              : "No data yet"}
          </small>
        </div>

        <div className="analytics-stat-card">
          <span>Study + Coding</span>
          <strong>
            {Math.round(
              (totalStudyMinutes + totalCodingMinutes) / 60
            )}h
          </strong>
          <small>Total focused time</small>
        </div>
      </section>

      <section className="analytics-grid">
        <div className="analytics-card large">
          <div className="analytics-card-header">
            <div>
              <p className="card-label">SCORE TREND</p>
              <h2>Daily Performance</h2>
            </div>
          </div>

          {scoreData.length > 0 ? (
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={scoreData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="date"
                    stroke="#7f8ba3"
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    stroke="#7f8ba3"
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6ea8ff"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#7c6cff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="analytics-empty">
              Track a few days to start seeing your score trend.
            </p>
          )}
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="card-label">TIME LOGGED</p>
              <h2>Focus Hours</h2>
            </div>
          </div>

          <div className="focus-time-list">
            <div>
              <span>Academics</span>
              <strong>
                {(totalStudyMinutes / 60).toFixed(1)}h
              </strong>
            </div>

            <div>
              <span>Coding & AI</span>
              <strong>
                {(totalCodingMinutes / 60).toFixed(1)}h
              </strong>
            </div>

            <div>
              <span>Project Work</span>
              <strong>
                {(totalProjectMinutes / 60).toFixed(1)}h
              </strong>
            </div>

            <div>
              <span>Fitness</span>
              <strong>
                {(totalFitnessMinutes / 60).toFixed(1)}h
              </strong>
            </div>
          </div>
        </div>

        <div className="analytics-card large">
          <div className="analytics-card-header">
            <div>
              <p className="card-label">
                CATEGORY PERFORMANCE
              </p>

              <h2>Consistency by Area</h2>
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={categoryData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 45,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />

                <XAxis
                  dataKey="category"
                  stroke="#7f8ba3"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  stroke="#7f8ba3"
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="percentage"
                  fill="#6c83ff"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="card-label">
                CATEGORY SUMMARY
              </p>

              <h2>Current Performance</h2>
            </div>
          </div>

          <div className="category-summary-list">
            {categoryData.map((item) => (
              <div
                className="category-summary-row"
                key={item.category}
              >
                <div>
                  <span>{item.category}</span>
                  <small>
                    {item.sessions} tracked sessions
                  </small>
                </div>

                <strong>{item.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}