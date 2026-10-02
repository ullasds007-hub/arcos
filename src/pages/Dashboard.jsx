import { useEffect, useState } from "react";
import { Flame, Target, CalendarDays, Brain } from "lucide-react";

import StatCard from "../components/StatCard";
import { loadArcData } from "../utils/storage";
import { calculateDailyScore, getScoreLabel } from "../utils/scoring";
import { calculateStreak } from "../utils/streaks";

export default function Dashboard() {
  const [history, setHistory] = useState({});

  useEffect(() => {
    const saved = loadArcData();
    setHistory(saved);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayData = history[today] || {};

  const score = calculateDailyScore(todayData);
  const streak = calculateStreak(history);

  const startDate = new Date("2026-10-01");
  const endDate = new Date("2026-12-31");

  const totalDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const now = new Date();

  let currentDay = 0;

  if (now >= startDate) {
    currentDay =
      Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) + 1;
  }

  if (currentDay > totalDays) {
    currentDay = totalDays;
  }

  const progress =
    currentDay > 0
      ? Math.round((currentDay / totalDays) * 100)
      : 0;

  return (
    <div className="dashboard-page">

      <section className="dashboard-header">
        <div>
          <p className="eyebrow">WINTER ARC 2026</p>

          <h1>
            Welcome to <span>ArcOS</span>
          </h1>

          <p className="dashboard-subtitle">
            Build yourself. Track everything. Improve every week.
          </p>
        </div>

        <div className="day-badge">
          Day {currentDay} / {totalDays}
        </div>
      </section>

      <section className="stats-grid">

        <StatCard
          title="Today's Score"
          value={`${score}/100`}
          subtitle={getScoreLabel(score)}
        />

        <StatCard
          title="Current Streak"
          value={`${streak} Days`}
          subtitle="Keep the momentum"
        />

        <StatCard
          title="Winter Arc"
          value={`${progress}%`}
          subtitle={`Day ${currentDay} of ${totalDays}`}
        />

        <StatCard
          title="AI Status"
          value="Learning"
          subtitle="Waiting for tracking data"
        />

      </section>

      <section className="dashboard-grid">

        <div className="main-card progress-card">
          <div className="card-heading">
            <div>
              <p className="card-label">OVERALL PROGRESS</p>
              <h2>Winter Arc Progress</h2>
            </div>

            <CalendarDays size={24} />
          </div>

          <div className="progress-number">
            {progress}%
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p>
            {currentDay === 0
              ? "Your Winter Arc begins October 1."
              : `${totalDays - currentDay} days remaining in the Arc.`}
          </p>
        </div>

        <div className="main-card streak-card">

          <div className="card-heading">
            <div>
              <p className="card-label">CONSISTENCY</p>
              <h2>Current Streak</h2>
            </div>

            <Flame size={26} />
          </div>

          <div className="big-stat">
            {streak}
          </div>

          <p>days of consistent progress</p>

        </div>

      </section>

      <section className="main-card ai-card">

        <div className="ai-icon">
          <Brain size={30} />
        </div>

        <div>
          <p className="card-label">
            ARCOS AI
          </p>

          <h2>Your AI Coach is getting ready.</h2>

          <p>
            Start tracking your habits and daily wins.
            Once ArcOS collects enough data, your AI coach
            will begin identifying patterns, strengths,
            weak points and improvement opportunities.
          </p>
        </div>

        <button>
          Ask ArcOS
        </button>

      </section>

    </div>
  );
}