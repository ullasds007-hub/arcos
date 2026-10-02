import { useMemo, useState } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

const GOALS_KEY = "arcos-goals";

function loadGoals() {
  try {
    const saved = localStorage.getItem(GOALS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

export default function Goals() {
  const [goals, setGoals] = useState(() => loadGoals());

  const [form, setForm] = useState({
    title: "",
    category: "Academics",
    target: "",
    current: "",
    deadline: "",
  });

  const categories = [
    "Academics",
    "Coding & AI",
    "Project",
    "Fitness",
    "Communication",
    "Reading",
    "Personal",
  ];

  const addGoal = () => {
    if (!form.title.trim() || !form.target) return;

    const newGoal = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      target: Number(form.target),
      current: Number(form.current || 0),
      deadline: form.deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...goals, newGoal];

    setGoals(updated);
    saveGoals(updated);

    setForm({
      title: "",
      category: "Academics",
      target: "",
      current: "",
      deadline: "",
    });
  };

  const updateProgress = (id, value) => {
    const updated = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            current: Math.max(0, Number(value || 0)),
          }
        : goal
    );

    setGoals(updated);
    saveGoals(updated);
  };

  const toggleComplete = (id) => {
    const updated = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            completed: !goal.completed,
            current: !goal.completed ? goal.target : goal.current,
          }
        : goal
    );

    setGoals(updated);
    saveGoals(updated);
  };

  const deleteGoal = (id) => {
    const updated = goals.filter((goal) => goal.id !== id);

    setGoals(updated);
    saveGoals(updated);
  };

  const completedCount = goals.filter(
    (goal) => goal.completed
  ).length;

  const overallProgress = useMemo(() => {
    if (!goals.length) return 0;

    const total = goals.reduce((sum, goal) => {
      const percentage =
        goal.target > 0
          ? Math.min(100, (goal.current / goal.target) * 100)
          : 0;

      return sum + percentage;
    }, 0);

    return Math.round(total / goals.length);
  }, [goals]);

  return (
    <div className="goals-page">
      <section className="goals-header">
        <div>
          <p className="eyebrow">GOALS & MILESTONES</p>

          <h1>Winter Arc Goals</h1>

          <p className="dashboard-subtitle">
            Define what you want to achieve and track your
            progress toward it.
          </p>
        </div>
      </section>

      <section className="goal-stats">
        <div className="goal-stat-card">
          <span>Total Goals</span>
          <strong>{goals.length}</strong>
        </div>

        <div className="goal-stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="goal-stat-card">
          <span>Overall Progress</span>
          <strong>{overallProgress}%</strong>
        </div>
      </section>

      <section className="goal-form-card">
        <p className="card-label">NEW GOAL</p>
        <h2>Add a Goal</h2>

        <div className="goal-form-grid">
          <label>
            Goal Title
            <input
              type="text"
              placeholder="Example: Complete 40 workouts"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Target
            <input
              type="number"
              min="1"
              placeholder="40"
              value={form.target}
              onChange={(e) =>
                setForm({
                  ...form,
                  target: e.target.value,
                })
              }
            />
          </label>

          <label>
            Current Progress
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.current}
              onChange={(e) =>
                setForm({
                  ...form,
                  current: e.target.value,
                })
              }
            />
          </label>

          <label>
            Deadline
            <input
              type="date"
              value={form.deadline}
              onChange={(e) =>
                setForm({
                  ...form,
                  deadline: e.target.value,
                })
              }
            />
          </label>
        </div>

        <button
          className="add-goal-btn"
          onClick={addGoal}
        >
          <Plus size={18} />
          Add Goal
        </button>
      </section>

      <section className="goals-list">
        {goals.length === 0 ? (
          <div className="goals-empty">
            <h3>No goals yet.</h3>
            <p>
              Add your first Winter Arc goal above.
            </p>
          </div>
        ) : (
          goals.map((goal) => {
            const percentage =
              goal.target > 0
                ? Math.min(
                    100,
                    Math.round(
                      (goal.current / goal.target) * 100
                    )
                  )
                : 0;

            return (
              <article
                className={`goal-card ${
                  goal.completed ? "completed" : ""
                }`}
                key={goal.id}
              >
                <div className="goal-card-top">
                  <div>
                    <span className="goal-category">
                      {goal.category}
                    </span>

                    <h3>{goal.title}</h3>

                    {goal.deadline && (
                      <small>
                        Deadline:{" "}
                        {new Date(
                          `${goal.deadline}T00:00:00`
                        ).toLocaleDateString("en-IN")}
                      </small>
                    )}
                  </div>

                  <strong>{percentage}%</strong>
                </div>

                <div className="goal-progress-track">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <div className="goal-progress-row">
                  <label>
                    Progress
                    <input
                      type="number"
                      min="0"
                      max={goal.target}
                      value={goal.current}
                      onChange={(e) =>
                        updateProgress(
                          goal.id,
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <span>
                    {goal.current} / {goal.target}
                  </span>
                </div>

                <div className="goal-actions">
                  <button
                    className="complete-goal-btn"
                    onClick={() =>
                      toggleComplete(goal.id)
                    }
                  >
                    <CheckCircle2 size={17} />

                    {goal.completed
                      ? "Completed"
                      : "Mark Complete"}
                  </button>

                  <button
                    className="delete-goal-btn"
                    onClick={() =>
                      deleteGoal(goal.id)
                    }
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}