import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Plus,
  Pencil,
  Eye,
  EyeOff,
  Archive,
  X,
  Save,
} from "lucide-react";

import {
  loadUserHabits,
  saveUserHabits,
} from "../utils/habitStorage";

const getEmptyForm = () => ({
  name: "",
  description: "",
  category: "Personal Development",
  trackingType: "time",
  target: "",
  unit: "minutes",
  weight: 10,
});

const categories = [
  "Academics",
  "Career",
  "Fitness",
  "Health",
  "Reading",
  "Discipline",
  "Personal Development",
  "Custom",
];

const trackingTypes = [
  {
    value: "time",
    label: "Time",
  },
  {
    value: "quantity",
    label: "Quantity",
  },
  {
    value: "sessions",
    label: "Sessions",
  },
  {
    value: "boolean",
    label: "Done / Not Done",
  },
];

export default function HabitManager() {
  const [habits, setHabits] = useState(() =>
    loadUserHabits()
  );

  const [form, setForm] = useState(() =>
    getEmptyForm()
  );

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const visibleHabits = useMemo(() => {
    return habits.filter(
      (habit) => !habit.archived
    );
  }, [habits]);

  const activeCount = visibleHabits.filter(
    (habit) => habit.active
  ).length;

  function updateAndSave(updatedHabits) {
    setHabits(updatedHabits);
    saveUserHabits(updatedHabits);
  }

  function openAddHabitForm() {
    setEditingId(null);
    setForm(getEmptyForm());
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }

  function closeForm() {
    setEditingId(null);
    setForm(getEmptyForm());
    setShowForm(false);
  }

  function handleTrackingTypeChange(type) {
    let unit = "minutes";
    let target = "";

    if (type === "quantity") {
      unit = "units";
    }

    if (type === "sessions") {
      unit = "sessions";
    }

    if (type === "boolean") {
      unit = "completion";
      target = 1;
    }

    setForm((previous) => ({
      ...previous,
      trackingType: type,
      unit,
      target,
    }));
  }

  function saveHabit() {
    if (!form.name.trim()) {
      alert("Please enter a habit name.");
      return;
    }

    if (
      form.trackingType !== "boolean" &&
      (!form.target || Number(form.target) <= 0)
    ) {
      alert("Please enter a valid target.");
      return;
    }

    if (editingId) {
      const updatedHabits = habits.map((habit) => {
        if (habit.id !== editingId) {
          return habit;
        }

        return {
          ...habit,

          name: form.name.trim(),

          description: form.description.trim(),

          category: form.category,

          trackingType: form.trackingType,

          target:
            form.trackingType === "boolean"
              ? 1
              : Number(form.target),

          unit: form.unit,

          weight: Math.max(
            1,
            Number(form.weight || 1)
          ),
        };
      });

      updateAndSave(updatedHabits);
    } else {
      const newHabit = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `habit-${Date.now()}`,

        name: form.name.trim(),

        description: form.description.trim(),

        category: form.category,

        trackingType: form.trackingType,

        target:
          form.trackingType === "boolean"
            ? 1
            : Number(form.target),

        unit: form.unit,

        weight: Math.max(
          1,
          Number(form.weight || 1)
        ),

        active: true,

        archived: false,

        createdAt: new Date().toISOString(),
      };

      updateAndSave([
        ...habits,
        newHabit,
      ]);
    }

    closeForm();
  }

  function editHabit(habit) {
    setEditingId(habit.id);

    setForm({
      name: habit.name || "",

      description:
        habit.description || "",

      category:
        habit.category ||
        "Personal Development",

      trackingType:
        habit.trackingType || "time",

      target: habit.target ?? "",

      unit:
        habit.unit || "minutes",

      weight:
        habit.weight ?? 10,
    });

    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }

  function toggleHabit(id) {
    const updatedHabits = habits.map(
      (habit) =>
        habit.id === id
          ? {
              ...habit,
              active: !habit.active,
            }
          : habit
    );

    updateAndSave(updatedHabits);
  }

  function archiveHabit(id) {
    const confirmed = window.confirm(
      "Archive this habit?"
    );

    if (!confirmed) return;

    const updatedHabits = habits.map(
      (habit) =>
        habit.id === id
          ? {
              ...habit,
              active: false,
              archived: true,
            }
          : habit
    );

    updateAndSave(updatedHabits);
  }

  return (
    <div className="habit-manager-page">
      <section className="habit-manager-header">
        <div>
          <p className="eyebrow">
            MY SYSTEM
          </p>

          <h1>Habit Manager</h1>

          <p className="dashboard-subtitle">
            Build a tracking system that fits your goals
            and lifestyle.
          </p>
        </div>

        <motion.button
          type="button"
          className="primary-habit-btn"
          onClick={openAddHabitForm}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
        >
          <Plus size={18} />

          Add Habit
        </motion.button>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.section
            ref={formRef}
            className="habit-form-card habit-form-highlight"
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
          >
            <div className="habit-form-title">
              <div>
                <p className="card-label">
                  {editingId
                    ? "EDIT HABIT"
                    : "NEW HABIT"}
                </p>

                <h2>
                  {editingId
                    ? "Update Habit"
                    : "Create Habit"}
                </h2>
              </div>

              <button
                type="button"
                className="close-form-btn"
                onClick={closeForm}
              >
                <X size={20} />
              </button>
            </div>

            <div className="habit-manager-form">
              <label>
                Habit Name

                <input
                  type="text"
                  placeholder="Example: DSA Practice"
                  value={form.name}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Category

                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      category:
                        event.target.value,
                    }))
                  }
                >
                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="wide-field">
                Description

                <input
                  type="text"
                  placeholder="What does this habit mean?"
                  value={form.description}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      description:
                        event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Tracking Type

                <select
                  value={form.trackingType}
                  onChange={(event) =>
                    handleTrackingTypeChange(
                      event.target.value
                    )
                  }
                >
                  {trackingTypes.map(
                    (type) => (
                      <option
                        key={type.value}
                        value={type.value}
                      >
                        {type.label}
                      </option>
                    )
                  )}
                </select>
              </label>

              {form.trackingType !==
                "boolean" && (
                <>
                  <label>
                    Daily Target

                    <input
                      type="number"
                      min="1"
                      value={form.target}
                      placeholder="60"
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          target:
                            event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Unit

                    <input
                      type="text"
                      value={form.unit}
                      placeholder="minutes"
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          unit:
                            event.target.value,
                        }))
                      }
                    />
                  </label>
                </>
              )}

              <label>
                Importance Weight

                <input
                  type="number"
                  min="1"
                  max="100"
                  value={form.weight}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      weight:
                        event.target.value,
                    }))
                  }
                />

                <small>
                  Higher weight means this habit has more
                  influence on the daily score.
                </small>
              </label>
            </div>

            <motion.button
              type="button"
              className="save-habit-btn"
              onClick={saveHabit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <Save size={18} />

              {editingId
                ? "Save Changes"
                : "Create Habit"}
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="habit-manager-stats">
        <div>
          <span>Total Habits</span>

          <strong>
            {visibleHabits.length}
          </strong>
        </div>

        <div>
          <span>Active</span>

          <strong>
            {activeCount}
          </strong>
        </div>

        <div>
          <span>Disabled</span>

          <strong>
            {visibleHabits.length -
              activeCount}
          </strong>
        </div>
      </section>

      <section className="managed-habits-list">
        {visibleHabits.map((habit) => (
          <article
            className={`managed-habit-card ${
              !habit.active
                ? "disabled"
                : ""
            }`}
            key={habit.id}
          >
            <div className="managed-habit-main">
              <div>
                <span className="managed-category">
                  {habit.category}
                </span>

                <h3>
                  {habit.name}
                </h3>

                <p>
                  {habit.description ||
                    "No description"}
                </p>
              </div>

              <div className="habit-status-pill">
                {habit.active
                  ? "Active"
                  : "Disabled"}
              </div>
            </div>

            <div className="managed-habit-details">
              <div>
                <span>Target</span>

                <strong>
                  {habit.trackingType ===
                  "boolean"
                    ? "Complete"
                    : `${habit.target} ${habit.unit}`}
                </strong>
              </div>

              <div>
                <span>Tracking</span>

                <strong>
                  {habit.trackingType}
                </strong>
              </div>

              <div>
                <span>Weight</span>

                <strong>
                  {habit.weight}
                </strong>
              </div>
            </div>

            <div className="managed-habit-actions">
              <button
                type="button"
                onClick={() =>
                  editHabit(habit)
                }
              >
                <Pencil size={16} />

                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleHabit(habit.id)
                }
              >
                {habit.active ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}

                {habit.active
                  ? "Disable"
                  : "Enable"}
              </button>

              <button
                type="button"
                className="archive-btn"
                onClick={() =>
                  archiveHabit(habit.id)
                }
              >
                <Archive size={16} />

                Archive
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}