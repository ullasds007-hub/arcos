import { useEffect, useMemo, useRef, useState } from "react";



import { AnimatePresence, motion } from "framer-motion";







import {



  Activity,



  BarChart3,



  Brain,



  CalendarDays,



  CheckCircle2,



  ChevronRight,



  Circle,



  Clock3,



  Code2,



  Flame,



  FolderKanban,



  Gauge,



  Goal,



  Home,



  Layers3,



  Menu,



  Plus,



  Search,



  Settings,



  Sparkles,



  Target,



  TimerReset,



  TrendingUp,



  Zap,



  X, 



} from "lucide-react";







import { supabase } from "../lib/supabaseClient.js";

import "./ArcOSV6.css";











/* =========================================================



   NAVIGATION



========================================================= */







const navigation = [



  {



    name: "Command",



    icon: Home,



  },



  {



    name: "Today",



    icon: CalendarDays,



  },



  {



    name: "Workspace",



    icon: Layers3,



  },



  {



    name: "Intelligence",



    icon: Brain,



  },



  {



    name: "My System",



    icon: Settings,



  },



  {



    name: "Goals",



    icon: Target,



  },



  {



    name: "Timeline",



    icon: Activity,



  },



];







/* =========================================================



   HABITS



========================================================= */







const habits = [



  {



    id: "study",



    name: "Deep Study",



    category: "Academics",



    current: 74,



    target: 90,



    unit: "min",



    color: "lime",



  },



  {



    id: "coding",



    name: "Coding & AI",



    category: "Career",



    current: 60,



    target: 60,



    unit: "min",



    color: "cyan",



  },



  {



    id: "fitness",



    name: "Fitness",



    category: "Health",



    current: 29,



    target: 45,



    unit: "min",



    color: "orange",



  },



  {



    id: "reading",



    name: "Reading",



    category: "Growth",  



    current: 18,



    target: 20,



    unit: "pages",



    color: "violet",



  },



];







/* =========================================================



   COMMAND MODULES



========================================================= */







const commandModules = [



  {



    id: "today",



    title: "Today",



    description: "Plan, focus and execute your day.",



    icon: CalendarDays,



    color: "lime",



    destination: "Today",



  },



  {



    id: "workspace",



    title: "Workspace",



    description: "Projects, notes and creative space.",



    icon: Layers3,



    color: "blue",



    destination: "Workspace",



  },



  {



    id: "intelligence",



    title: "Intelligence",



    description: "Your AI thinking partner.",



    icon: Brain,



    color: "violet",



    destination: "Intelligence",



  },



  {



    id: "system",



    title: "My System",



    description: "Track habits, health and routines.",



    icon: Settings,



    color: "green",



    destination: "My System",



  },



  {



    id: "goals",



    title: "Goals",



    description: "Turn ambition into action.",



    icon: Goal,



    color: "cyan",



    destination: "Goals",



  },



  {



    id: "timeline",



    title: "Timeline",



    description: "See your journey unfold.",



    icon: BarChart3,



    color: "pink",



    destination: "Timeline",



  },



];







/* =========================================================



   TASKS



========================================================= */







const initialTodayTasks = [



  {



    id: 1,



    title: "Finish ArcOS V6 design",



    completed: true,



  },



  {



    id: 2,



    title: "Study DSA for 1 hour",



    completed: true,



  },



  {



    id: 3,



    title: "Workout",



    completed: false,



  },



  {



    id: 4,



    title: "Plan content for week",



    completed: false,



  },



  {



    id: 5,



    title: "Read 20 pages",



    completed: false,



  },



  {



    id: 6,



    title: "Review today's progress",



    completed: false,



  },



];







/* =========================================================



   GOALS



========================================================= */



const goals = [

  {

    id: "academics",

    name: "Academics",

    progress: 78,

    description: "Build a strong semester performance.",

    color: "lime",

    deadline: "",

  },

  {

    id: "career",

    name: "Career",

    progress: 91,

    description: "Strengthen AI, ML and coding skills.",

    color: "cyan",

    deadline: "",

  },

  {

    id: "fitness",

    name: "Fitness",

    progress: 67,

    description: "Improve daily strength and consistency.",

    color: "orange",

    deadline: "",

  },

  {

    id: "growth",

    name: "Growth",

    progress: 54,

    description: "Build reading and reflection habits.",

    color: "violet",

    deadline: "",

  },

];







/* =========================================================
   WORKSPACE PROJECTS
========================================================= */

const defaultProjects = [
  {
    id: "project-arcos",
    name: "ArcOS",
    description: "Personal operating system development and design.",
    status: "ACTIVE PROJECT",
    color: "lime",
    milestones: [
      { id: "arcos-today", title: "Today module", completed: true },
      { id: "arcos-goals", title: "Goals module", completed: true },
      { id: "arcos-timeline", title: "Timeline module", completed: true },
      { id: "arcos-workspace", title: "Workspace module", completed: true },
      { id: "arcos-intelligence", title: "Intelligence module", completed: false },
      { id: "arcos-auth", title: "Login and multi-user support", completed: false },
      { id: "arcos-deploy", title: "Deployment", completed: false },
    ],
  },
  {
    id: "project-coding",
    name: "Coding & AI",
    description: "Building technical skills and practical projects.",
    status: "LEARNING",
    color: "cyan",
    milestones: [],
  },
  {
    id: "project-ai-learning",
    name: "AI Learning",
    description: "Track concepts, experiments and learning momentum.",
    status: "INTELLIGENCE",
    color: "violet",
    milestones: [],
  },
];


/* =========================================================



   TIMELINE



========================================================= */







const timelineItems = [
  { id: "timeline-study", time: "08:00", title: "Deep Study", subtitle: "Academics", completed: false },
  { id: "timeline-coding", time: "10:30", title: "Coding & AI", subtitle: "Career", completed: false },
  { id: "timeline-fitness", time: "16:00", title: "Fitness", subtitle: "Health", completed: false },
  { id: "timeline-reading", time: "20:00", title: "Reading", subtitle: "Growth", completed: false },
];







/* =========================================================



   COMPONENT



========================================================= */







export default function ArcOSV6({ user }) {



  const [activeNav, setActiveNav] = useState("Command");

  // Always start each ArcOS section at the top when navigating.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeNav]);



  const [editingSystemId, setEditingSystemId] = useState(null);

  const [goalItems, setGoalItems] = useState(() => {

  const saved = localStorage.getItem("arcos-goals");



  if (saved) {

    try {

      const parsed = JSON.parse(saved);
      return parsed.map((goal) => ({
        ...goal,
        linkedSystemIds: Array.isArray(goal.linkedSystemIds) ? goal.linkedSystemIds : [],
        linkedProjectIds: Array.isArray(goal.linkedProjectIds) ? goal.linkedProjectIds : [],
      }));

    } catch {

      return goals.map((goal) => ({
        ...goal,
        linkedSystemIds: [],
        linkedProjectIds: [],
      }));

    }

  }



  return goals.map((goal) => ({
    ...goal,
    linkedSystemIds: [],
    linkedProjectIds: [],
  }));

});



const [showGoalModal, setShowGoalModal] = useState(false);



const [editingGoalId, setEditingGoalId] = useState(null);



const [newGoal, setNewGoal] = useState({

  name: "",

  description: "",

  progress: 0,

  color: "lime",

  deadline: "",

  linkedSystemIds: [],

  linkedProjectIds: [],

});

const [scheduleItems, setScheduleItems] = useState(() => {
  const saved = localStorage.getItem("arcos-timeline");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((item, index) => ({
        id: item.id || `timeline-${index + 1}`,
        time: item.time || "08:00",
        title: item.title || "Untitled",
        subtitle: item.subtitle || "Personal",
        completed: Boolean(item.completed),
      }));
    } catch {
      return timelineItems;
    }
  }
  return timelineItems;
});

const [showTimelineModal, setShowTimelineModal] = useState(false);
const [editingTimelineId, setEditingTimelineId] = useState(null);
const [newTimelineItem, setNewTimelineItem] = useState({
  time: "08:00",
  title: "",
  subtitle: "Personal",
});

const [projectItems, setProjectItems] = useState(() => {
  const saved = localStorage.getItem("arcos-projects");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((project) => ({
        ...project,
        milestones: Array.isArray(project.milestones)
          ? project.milestones
          : [],
      }));
    } catch {
      return defaultProjects;
    }
  }

  return defaultProjects;
});

const [showProjectModal, setShowProjectModal] = useState(false);
const [editingProjectId, setEditingProjectId] = useState(null);
const [selectedProjectId, setSelectedProjectId] = useState(null);
const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

const [newProject, setNewProject] = useState({
  name: "",
  description: "",
  status: "ACTIVE PROJECT",
  color: "lime",
});

const [taskItems, setTaskItems] = useState(() => {
  const saved = localStorage.getItem("arcos-today-tasks");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialTodayTasks;
    }
  }

  return initialTodayTasks;
});

const [showTaskModal, setShowTaskModal] = useState(false);
const [editingTaskId, setEditingTaskId] = useState(null);
const [newTaskTitle, setNewTaskTitle] = useState("");

const [showProgressModal, setShowProgressModal] = useState(false);
const [progressValue, setProgressValue] = useState("");



  const [selectedHabit, setSelectedHabit] = useState(habits[0]);



  const [systems, setSystems] = useState(() => {



  const saved = localStorage.getItem("arcos-systems");











  if (saved) {



    try {



      return JSON.parse(saved);



    } catch {



      return habits;



    }



  }







  return habits;



});







const [showAddSystem, setShowAddSystem] = useState(false);







const [newSystem, setNewSystem] = useState({



  name: "",



  category: "Academics",



  target: 60,



  unit: "min",



  color: "lime",



});







useEffect(() => {



  localStorage.setItem(



    "arcos-systems",



    JSON.stringify(systems)



  );



}, [systems]);



useEffect(() => {

  localStorage.setItem(

    "arcos-goals",

    JSON.stringify(goalItems)

  );

}, [goalItems]);

useEffect(() => {
  localStorage.setItem(
    "arcos-timeline",
    JSON.stringify(scheduleItems)
  );
}, [scheduleItems]);

useEffect(() => {
  localStorage.setItem(
    "arcos-projects",
    JSON.stringify(projectItems)
  );
}, [projectItems]);

useEffect(() => {
  localStorage.setItem(
    "arcos-today-tasks",
    JSON.stringify(taskItems)
  );
}, [taskItems]);

/* =========================================================
   SUPABASE CLOUD SYNC
   The signed-in user's profile stores the full ArcOS state.
   localStorage remains only as an offline/local fallback.
========================================================= */

const [cloudReady, setCloudReady] = useState(false);
const [cloudStatus, setCloudStatus] = useState("loading");
const [cloudError, setCloudError] = useState("");
const loadedUserRef = useRef(null);

const buildArcOSState = () => ({
  version: 1,
  systems,
  goals: goalItems,
  timeline: scheduleItems,
  projects: projectItems,
  tasks: taskItems,
});

const getDefaultArcOSState = () => ({
  version: 1,
  systems: habits,
  goals: goals.map((goal) => ({
    ...goal,
    linkedSystemIds: [],
    linkedProjectIds: [],
  })),
  timeline: timelineItems,
  projects: defaultProjects,
  tasks: initialTodayTasks,
});

const applyArcOSState = (state) => {
  const nextSystems = Array.isArray(state?.systems) ? state.systems : habits;
  const nextGoals = Array.isArray(state?.goals)
    ? state.goals.map((goal) => ({
        ...goal,
        linkedSystemIds: Array.isArray(goal.linkedSystemIds) ? goal.linkedSystemIds : [],
        linkedProjectIds: Array.isArray(goal.linkedProjectIds) ? goal.linkedProjectIds : [],
      }))
    : goals.map((goal) => ({ ...goal, linkedSystemIds: [], linkedProjectIds: [] }));
  const nextTimeline = Array.isArray(state?.timeline) ? state.timeline : timelineItems;
  const nextProjects = Array.isArray(state?.projects)
    ? state.projects.map((project) => ({
        ...project,
        milestones: Array.isArray(project.milestones) ? project.milestones : [],
      }))
    : defaultProjects;
  const nextTasks = Array.isArray(state?.tasks) ? state.tasks : initialTodayTasks;

  setSystems(nextSystems);
  setGoalItems(nextGoals);
  setScheduleItems(nextTimeline);
  setProjectItems(nextProjects);
  setTaskItems(nextTasks);
  setSelectedHabit(nextSystems[0] || habits[0]);
};

useEffect(() => {
  if (!user?.id) return;

  let cancelled = false;
  loadedUserRef.current = null;
  setCloudReady(false);
  setCloudStatus("loading");
  setCloudError("");

  const loadCloudState = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("arcos_state")
      .eq("id", user.id)
      .single();

    if (cancelled) return;

    if (error) {
      console.error("ArcOS cloud load failed:", error);
      setCloudError(error.message || "Could not load cloud data.");
      setCloudStatus("error");
      return;
    }

    const cloudState = data?.arcos_state;
    const hasCloudState =
      cloudState &&
      typeof cloudState === "object" &&
      Object.keys(cloudState).length > 0;

    if (hasCloudState) {
      applyArcOSState(cloudState);
    } else {
      // Migrate the existing local ArcOS data to the first account only.
      // New accounts start from clean defaults instead of inheriting another
      // user's browser data.
      const migrationOwner = localStorage.getItem("arcos-cloud-migration-owner");
      const seedState = migrationOwner ? getDefaultArcOSState() : buildArcOSState();

      if (!migrationOwner) {
        localStorage.setItem("arcos-cloud-migration-owner", user.id);
      } else {
        applyArcOSState(seedState);
      }

      const { error: seedError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split("@")[0] || "",
            arcos_state: seedState,
          },
          { onConflict: "id" }
        );

      if (seedError) {
        console.error("ArcOS cloud seed failed:", seedError);
        setCloudError(seedError.message || "Could not create cloud data.");
        setCloudStatus("error");
        return;
      }
    }

    loadedUserRef.current = user.id;
    setCloudReady(true);
    setCloudStatus("synced");
  };

  loadCloudState();

  return () => {
    cancelled = true;
  };
  // user.id intentionally controls account switching.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user?.id]);

useEffect(() => {
  if (!cloudReady || !user?.id || loadedUserRef.current !== user.id) return;

  setCloudStatus("syncing");

  const timer = window.setTimeout(async () => {
    const state = buildArcOSState();

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "",
          arcos_state: state,
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("ArcOS cloud sync failed:", error);
      setCloudError(error.message || "Cloud sync failed.");
      setCloudStatus("error");
      return;
    }

    setCloudError("");
    setCloudStatus("synced");
  }, 500);

  return () => window.clearTimeout(timer);
  // Each data collection is intentionally watched for cloud persistence.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  cloudReady,
  user?.id,
  systems,
  goalItems,
  scheduleItems,
  projectItems,
  taskItems,
]);





const handleSaveSystem = (event) => {



  event.preventDefault();







  const cleanName = newSystem.name.trim();







  if (!cleanName) {



    return;



  }







  if (editingSystemId) {



    const updatedSystem = {



      id: editingSystemId,



      name: cleanName,



      category: newSystem.category,



      target: Number(newSystem.target) || 1,



      unit: newSystem.unit,



      color: newSystem.color,



    };







    setSystems((previous) =>



      previous.map((system) =>



        system.id === editingSystemId



          ? {



              ...system,



              ...updatedSystem,



            }



          : system



      )



    );







    if (selectedHabit.id === editingSystemId) {



      setSelectedHabit((previous) => ({



        ...previous,



        ...updatedSystem,



      }));



    }



  } else {



    const system = {



      id: `${Date.now()}`,



      name: cleanName,



      category: newSystem.category,



      current: 0,



      target: Number(newSystem.target) || 1,



      unit: newSystem.unit,



      color: newSystem.color,



    };







    setSystems((previous) => [



      ...previous,



      system,



    ]);







    setSelectedHabit(system);



  }







  setNewSystem({



    name: "",



    category: "Academics",



    target: 60,



    unit: "min",



    color: "lime",



  });







  setEditingSystemId(null);



  setShowAddSystem(false);



};



const handleEditSystem = (system) => {



  setEditingSystemId(system.id);







  setNewSystem({



    name: system.name,



    category: system.category,



    target: system.target,



    unit: system.unit,



    color: system.color || "lime",



  });







  setShowAddSystem(true);



};

const handleSaveGoal = (event) => {

  event.preventDefault();



  const cleanName = newGoal.name.trim();



  if (!cleanName) {

    return;

  }



  if (editingGoalId) {

    setGoalItems((previous) =>

      previous.map((goal) =>

        goal.id === editingGoalId

          ? {

              ...goal,

              name: cleanName,

              description: newGoal.description.trim(),

              progress: Math.min(

                100,

                Math.max(0, Number(newGoal.progress) || 0)

              ),

              color: newGoal.color,

              deadline: newGoal.deadline,

              linkedSystemIds: newGoal.linkedSystemIds || [],

              linkedProjectIds: newGoal.linkedProjectIds || [],

            }

          : goal

      )

    );

  } else {

    const goal = {

      id: `${Date.now()}`,

      name: cleanName,

      description: newGoal.description.trim(),

      progress: Math.min(

        100,

        Math.max(0, Number(newGoal.progress) || 0)

      ),

      color: newGoal.color,

      deadline: newGoal.deadline,

      linkedSystemIds: newGoal.linkedSystemIds || [],

      linkedProjectIds: newGoal.linkedProjectIds || [],

    };



    setGoalItems((previous) => [

      ...previous,

      goal,

    ]);

  }



  setNewGoal({

    name: "",

    description: "",

    progress: 0,

    color: "lime",

    deadline: "",

    linkedSystemIds: [],

    linkedProjectIds: [],

  });



  setEditingGoalId(null);

  setShowGoalModal(false);

};



const handleEditGoal = (goal) => {

  setEditingGoalId(goal.id);



  setNewGoal({

    name: goal.name,

    description: goal.description || "",

    progress: goal.progress,

    color: goal.color || "lime",

    deadline: goal.deadline || "",

    linkedSystemIds: Array.isArray(goal.linkedSystemIds) ? goal.linkedSystemIds : [],

    linkedProjectIds: Array.isArray(goal.linkedProjectIds) ? goal.linkedProjectIds : [],

  });



  setShowGoalModal(true);

};

const handleSaveTimelineItem = (event) => {
  event.preventDefault();
  const cleanTitle = newTimelineItem.title.trim();
  if (!cleanTitle) return;

  const itemData = {
    time: newTimelineItem.time || "08:00",
    title: cleanTitle,
    subtitle: newTimelineItem.subtitle.trim() || "Personal",
  };

  if (editingTimelineId) {
    setScheduleItems((previous) =>
      previous
        .map((item) =>
          item.id === editingTimelineId ? { ...item, ...itemData } : item
        )
        .sort((a, b) => a.time.localeCompare(b.time))
    );
  } else {
    const item = {
      id: `${Date.now()}`,
      ...itemData,
      completed: false,
    };
    setScheduleItems((previous) =>
      [...previous, item].sort((a, b) => a.time.localeCompare(b.time))
    );
  }

  setEditingTimelineId(null);
  setNewTimelineItem({ time: "08:00", title: "", subtitle: "Personal" });
  setShowTimelineModal(false);
};

const handleEditTimelineItem = (item) => {
  setEditingTimelineId(item.id);
  setNewTimelineItem({
    time: item.time,
    title: item.title,
    subtitle: item.subtitle || "Personal",
  });
  setShowTimelineModal(true);
};

const handleDeleteTimelineItem = (id) => {
  setScheduleItems((previous) =>
    previous.filter((item) => item.id !== id)
  );
};

const handleToggleTimelineItem = (id) => {
  setScheduleItems((previous) =>
    previous.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  );
};

const handleSaveProject = (event) => {
  event.preventDefault();

  const cleanName = newProject.name.trim();
  if (!cleanName) return;

  const cleanProject = {
    name: cleanName,
    description: newProject.description.trim(),
    status: newProject.status.trim() || "ACTIVE PROJECT",
    color: newProject.color || "lime",
  };

  if (editingProjectId) {
    setProjectItems((previous) =>
      previous.map((project) =>
        project.id === editingProjectId
          ? { ...project, ...cleanProject }
          : project
      )
    );
  } else {
    setProjectItems((previous) => [
      ...previous,
      {
        id: `${Date.now()}`,
        ...cleanProject,
        milestones: [],
      },
    ]);
  }

  setEditingProjectId(null);
  setNewProject({
    name: "",
    description: "",
    status: "ACTIVE PROJECT",
    color: "lime",
  });
  setShowProjectModal(false);
};

const handleEditProject = (project) => {
  setEditingProjectId(project.id);
  setNewProject({
    name: project.name,
    description: project.description || "",
    status: project.status || "ACTIVE PROJECT",
    color: project.color || "lime",
  });
  setShowProjectModal(true);
};

const handleDeleteProject = (id) => {
  setProjectItems((previous) =>
    previous.filter((project) => project.id !== id)
  );

  if (selectedProjectId === id) {
    setSelectedProjectId(null);
  }
};

const getProjectProgress = (project) => {
  const milestones = Array.isArray(project.milestones)
    ? project.milestones
    : [];

  if (milestones.length === 0) return 0;

  const completed = milestones.filter(
    (milestone) => milestone.completed
  ).length;

  return Math.round((completed / milestones.length) * 100);
};

const getSystemProgress = (system) => {
  const target = Number(system?.target) || 0;
  const current = Number(system?.current) || 0;
  if (target <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
};

const getGoalProgress = (goal) => {
  const scores = [];

  (goal.linkedSystemIds || []).forEach((systemId) => {
    const system = systems.find((item) => item.id === systemId);
    if (system) scores.push(getSystemProgress(system));
  });

  (goal.linkedProjectIds || []).forEach((projectId) => {
    const project = projectItems.find((item) => item.id === projectId);
    if (project) scores.push(getProjectProgress(project));
  });

  if (scores.length > 0) {
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  return Math.min(100, Math.max(0, Number(goal.progress) || 0));
};

const getGoalLinkCount = (goal) =>
  (goal.linkedSystemIds || []).length + (goal.linkedProjectIds || []).length;

const handleAddMilestone = (event) => {
  event.preventDefault();

  const cleanTitle = newMilestoneTitle.trim();
  if (!cleanTitle || !selectedProjectId) return;

  setProjectItems((previous) =>
    previous.map((project) =>
      project.id === selectedProjectId
        ? {
            ...project,
            milestones: [
              ...(project.milestones || []),
              {
                id: `${Date.now()}`,
                title: cleanTitle,
                completed: false,
              },
            ],
          }
        : project
    )
  );

  setNewMilestoneTitle("");
};

const handleToggleMilestone = (projectId, milestoneId) => {
  setProjectItems((previous) =>
    previous.map((project) =>
      project.id === projectId
        ? {
            ...project,
            milestones: (project.milestones || []).map(
              (milestone) =>
                milestone.id === milestoneId
                  ? {
                      ...milestone,
                      completed: !milestone.completed,
                    }
                  : milestone
            ),
          }
        : project
    )
  );
};

const handleDeleteMilestone = (projectId, milestoneId) => {
  setProjectItems((previous) =>
    previous.map((project) =>
      project.id === projectId
        ? {
            ...project,
            milestones: (project.milestones || []).filter(
              (milestone) => milestone.id !== milestoneId
            ),
          }
        : project
    )
  );
};

const selectedProject = projectItems.find(
  (project) => project.id === selectedProjectId
) || null;

const handleOpenProgressModal = () => {
  setProgressValue(String(selectedHabit.current ?? 0));
  setShowProgressModal(true);
};

const handleSaveProgress = (event) => {
  event.preventDefault();

  const numericValue = Number(progressValue);
  if (!Number.isFinite(numericValue) || numericValue < 0) return;

  const target = Number(selectedHabit.target) || numericValue;
  const updatedCurrent = Math.min(numericValue, target);

  setSystems((previous) =>
    previous.map((system) =>
      system.id === selectedHabit.id
        ? { ...system, current: updatedCurrent }
        : system
    )
  );

  setSelectedHabit((previous) => ({
    ...previous,
    current: updatedCurrent,
  }));

  setShowProgressModal(false);
};

const handleOpenAddTask = () => {
  setEditingTaskId(null);
  setNewTaskTitle("");
  setShowTaskModal(true);
};

const handleEditTask = (task) => {
  setEditingTaskId(task.id);
  setNewTaskTitle(task.title);
  setShowTaskModal(true);
};

const handleSaveTask = (event) => {
  event.preventDefault();

  const cleanTitle = newTaskTitle.trim();
  if (!cleanTitle) return;

  if (editingTaskId) {
    setTaskItems((previous) =>
      previous.map((task) =>
        task.id === editingTaskId
          ? { ...task, title: cleanTitle }
          : task
      )
    );
  } else {
    setTaskItems((previous) => [
      ...previous,
      {
        id: `${Date.now()}`,
        title: cleanTitle,
        completed: false,
      },
    ]);
  }

  setEditingTaskId(null);
  setNewTaskTitle("");
  setShowTaskModal(false);
};

const handleToggleTask = (id) => {
  setTaskItems((previous) =>
    previous.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

const handleDeleteTask = (id) => {
  setTaskItems((previous) =>
    previous.filter((task) => task.id !== id)
  );
};





  const [query, setQuery] = useState("");
  const [commandReply, setCommandReply] = useState(
    "Try: add task revise physics, open workspace, show weakest system, or show project progress."
  );



  const [sidebarOpen, setSidebarOpen] = useState(false);







 const averageProgress = useMemo(() => {



  if (systems.length === 0) {



    return 0;



  }







  const total = systems.reduce(



    (sum, habit) => {



      const progress = Math.min(



        100,



        Math.round(



          (habit.current / habit.target) * 100



        )



      );







      return sum + progress;



    },



    0



  );







  return Math.round(



    total / systems.length



  );



}, [systems]);







  const selectedProgress = Math.min(



    100,



    Math.round(



      (selectedHabit.current / selectedHabit.target) * 100



    )



  );







  const remaining = Math.max(



    0,



    selectedHabit.target - selectedHabit.current



  );







  const completedTasks = taskItems.filter(
    (task) => task.completed
  ).length;

  /* =======================================================
     DYNAMIC INTELLIGENCE
  ======================================================= */

  const intelligence = useMemo(() => {
    const systemMetrics = systems.map((system) => {
      const target = Number(system.target) || 0;
      const current = Number(system.current) || 0;
      const progress = target > 0
        ? Math.min(100, Math.max(0, Math.round((current / target) * 100)))
        : 0;

      return { ...system, progress };
    });

    const strongestSystem = systemMetrics.length
      ? systemMetrics.reduce((best, item) =>
          item.progress > best.progress ? item : best
        )
      : null;

    const attentionSystem = systemMetrics.length
      ? systemMetrics.reduce((lowest, item) =>
          item.progress < lowest.progress ? item : lowest
        )
      : null;

    const taskCompletion = taskItems.length
      ? Math.round(
          (taskItems.filter((task) => task.completed).length /
            taskItems.length) * 100
        )
      : 0;

    const goalAverage = goalItems.length
      ? Math.round(
          goalItems.reduce(
            (sum, goal) => sum + getGoalProgress(goal),
            0
          ) / goalItems.length
        )
      : 0;

    const attentionGoal = goalItems.length
      ? goalItems.reduce((lowest, goal) =>
          getGoalProgress(goal) < getGoalProgress(lowest)
            ? goal
            : lowest
        )
      : null;

    const projectMetrics = projectItems
      .filter((project) => (project.milestones || []).length > 0)
      .map((project) => {
        const milestones = project.milestones || [];
        const completed = milestones.filter(
          (milestone) => milestone.completed
        ).length;

        return {
          ...project,
          completedMilestones: completed,
          totalMilestones: milestones.length,
          progress: Math.round((completed / milestones.length) * 100),
        };
      });

    const projectAverage = projectMetrics.length
      ? Math.round(
          projectMetrics.reduce((sum, project) => sum + project.progress, 0) /
            projectMetrics.length
        )
      : 0;

    const leadingProject = projectMetrics.length
      ? projectMetrics.reduce((best, project) =>
          project.progress > best.progress ? project : best
        )
      : null;

    const timelineCompletion = scheduleItems.length
      ? Math.round(
          (scheduleItems.filter((item) => item.completed).length /
            scheduleItems.length) * 100
        )
      : 0;

    const scoreParts = [];
    if (systemMetrics.length) scoreParts.push(averageProgress);
    if (taskItems.length) scoreParts.push(taskCompletion);
    if (goalItems.length) scoreParts.push(goalAverage);
    if (projectMetrics.length) scoreParts.push(projectAverage);
    if (scheduleItems.length) scoreParts.push(timelineCompletion);

    const overallScore = scoreParts.length
      ? Math.round(
          scoreParts.reduce((sum, value) => sum + value, 0) /
            scoreParts.length
        )
      : 0;

    return {
      strongestSystem,
      attentionSystem,
      taskCompletion,
      goalAverage,
      attentionGoal,
      projectAverage,
      leadingProject,
      timelineCompletion,
      overallScore,
    };
  }, [
    systems,
    taskItems,
    goalItems,
    projectItems,
    scheduleItems,
    averageProgress,
  ]);







  const handleCommand = (input = query) => {
    const raw = String(input || "").trim();
    const command = raw.toLowerCase().replace(/\s+/g, " ");

    if (!command) {
      setCommandReply("Type a command first. Try “help” to see what ArcOS understands.");
      return;
    }

    const navigationCommands = [
      ["today", "Today"],
      ["workspace", "Workspace"],
      ["intelligence", "Intelligence"],
      ["my system", "My System"],
      ["system", "My System"],
      ["goals", "Goals"],
      ["goal", "Goals"],
      ["timeline", "Timeline"],
      ["command", "Command"],
    ];

    if (command.startsWith("open ") || command.startsWith("go to ")) {
      const destinationText = command.replace(/^(open|go to)\s+/, "");
      const match = navigationCommands.find(([name]) =>
        destinationText.includes(name)
      );

      if (match) {
        setQuery("");
        setCommandReply(`Opening ${match[1]}.`);
        changePage(match[1]);
        return;
      }
    }

    const taskMatch = raw.match(/^add\s+task\s+(.+)$/i);
    if (taskMatch) {
      const title = taskMatch[1].trim();
      if (title) {
        setTaskItems((previous) => [
          ...previous,
          { id: `${Date.now()}`, title, completed: false },
        ]);
        setCommandReply(`Added “${title}” to Today.`);
        setQuery("");
        return;
      }
    }

    const projectMatch = raw.match(/^add\s+project\s+(.+)$/i);
    if (projectMatch) {
      const name = projectMatch[1].trim();
      setEditingProjectId(null);
      setNewProject({
        name,
        description: "",
        status: "ACTIVE PROJECT",
        color: "lime",
      });
      setShowProjectModal(true);
      setCommandReply(`Project form opened for “${name}”. Add the details and save it.`);
      setQuery("");
      return;
    }

    const goalMatch = raw.match(/^add\s+goal\s+(.+)$/i);
    if (goalMatch) {
      const name = goalMatch[1].trim();
      setEditingGoalId(null);
      setNewGoal({
        name,
        description: "",
        progress: 0,
        color: "lime",
        deadline: "",
        linkedSystemIds: [],
        linkedProjectIds: [],
      });
      setShowGoalModal(true);
      setCommandReply(`Goal form opened for “${name}”. You can link systems or projects before saving.`);
      setQuery("");
      return;
    }

    const systemMatch = raw.match(/^add\s+system\s+(.+)$/i);
    if (systemMatch) {
      const name = systemMatch[1].trim();
      setEditingSystemId(null);
      setNewSystem({
        name,
        category: "Academics",
        target: 60,
        unit: "min",
        color: "lime",
      });
      setShowAddSystem(true);
      setCommandReply(`System form opened for “${name}”. Set its target and save it.`);
      setQuery("");
      return;
    }

    if (
      command.includes("strongest system") ||
      command === "strongest system"
    ) {
      setCommandReply(
        intelligence.strongestSystem
          ? `${intelligence.strongestSystem.name} is currently your strongest system at ${intelligence.strongestSystem.progress}% of target.`
          : "There is not enough system data yet."
      );
      setQuery("");
      return;
    }

    if (
      command.includes("weakest system") ||
      command.includes("needs attention")
    ) {
      const systemText = intelligence.attentionSystem
        ? `${intelligence.attentionSystem.name} is your lowest system at ${intelligence.attentionSystem.progress}%.`
        : "No system needs attention yet.";
      const goalText = intelligence.attentionGoal
        ? ` Lowest goal: ${intelligence.attentionGoal.name} at ${getGoalProgress(intelligence.attentionGoal)}%.`
        : "";
      setCommandReply(`${systemText}${goalText}`);
      setQuery("");
      return;
    }

    if (
      command.includes("project progress") ||
      command === "projects"
    ) {
      if (!projectItems.length) {
        setCommandReply("You do not have any projects yet.");
      } else {
        const summary = projectItems
          .map((project) => `${project.name} ${getProjectProgress(project)}%`)
          .join(" · ");
        setCommandReply(summary);
      }
      setQuery("");
      return;
    }

    if (
      command.includes("goal progress") ||
      command === "goals progress"
    ) {
      if (!goalItems.length) {
        setCommandReply("You do not have any goals yet.");
      } else {
        const summary = goalItems
          .map((goal) => `${goal.name} ${getGoalProgress(goal)}%`)
          .join(" · ");
        setCommandReply(summary);
      }
      setQuery("");
      return;
    }

    if (
      command.includes("review progress") ||
      command.includes("overall progress") ||
      command.includes("status")
    ) {
      setCommandReply(
        `Overall ${intelligence.overallScore}% · Tasks ${intelligence.taskCompletion}% · Systems ${averageProgress}% · Projects ${intelligence.projectAverage}% · Goals ${intelligence.goalAverage}% · Timeline ${intelligence.timelineCompletion}%.`
      );
      setQuery("");
      return;
    }

    if (
      command.includes("focus time") ||
      command.includes("what next") ||
      command.includes("next task")
    ) {
      const nextTimelineItem = [...scheduleItems]
        .filter((item) => !item.completed)
        .sort((a, b) => a.time.localeCompare(b.time))[0];
      const nextTask = taskItems.find((task) => !task.completed);

      if (nextTimelineItem) {
        setCommandReply(
          `Next scheduled focus: ${nextTimelineItem.title} at ${nextTimelineItem.time}.`
        );
      } else if (nextTask) {
        setCommandReply(`Your next unfinished task is “${nextTask.title}”.`);
      } else {
        setCommandReply("Your current tasks and timeline are clear. Nice work.");
      }
      setQuery("");
      return;
    }

    if (command.includes("plan my day")) {
      setCommandReply("Opening Today so you can plan and execute your day.");
      setQuery("");
      changePage("Today");
      return;
    }

    if (command.includes("analyze my week")) {
      setCommandReply("Opening Intelligence with your live ArcOS metrics.");
      setQuery("");
      changePage("Intelligence");
      return;
    }

    if (command.includes("break down a goal")) {
      setCommandReply("Opening Goals. Edit a goal to connect it with systems and project milestones.");
      setQuery("");
      changePage("Goals");
      return;
    }

    if (command === "help" || command.includes("what can you do")) {
      setCommandReply(
        "Commands: open today/workspace/goals/intelligence/system/timeline · add task <name> · add project <name> · add goal <name> · add system <name> · show strongest system · show weakest system · show project progress · show goal progress · review progress · give me focus time."
      );
      setQuery("");
      return;
    }

    setCommandReply(
      "I don’t recognize that command yet. Type “help” to see the commands available in this MVP."
    );
  };

  const changePage = (page) => {



    setActiveNav(page);



    setSidebarOpen(false);



    window.scrollTo({



      top: 0,



      behavior: "smooth",



    });



  };







  if (!cloudReady) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#07111d",
          color: "#f5f7fb",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="arcos-auth-loader" style={{ margin: "0 auto 14px" }} />
          <strong style={{ display: "block", marginBottom: 6 }}>Loading your ArcOS cloud…</strong>
          <span style={{ color: "#8c9caf", fontSize: 13 }}>Syncing this account's private workspace</span>
          {cloudError ? (
            <div style={{ marginTop: 16, color: "#ff8f95", maxWidth: 440 }}>{cloudError}</div>
          ) : null}
        </div>
      </div>
    );
  }

  return (



    <div className="arcos-shell">



      {/* =====================================================



          BACKGROUND



      ===================================================== */}







      <div className="arcos-background">



        <div



          className="arcos-background-image"



          style={{



            backgroundImage:'url("/arcos-mountain.png")',



          }}



        />







        <div className="arcos-background-overlay" />



        <div className="arcos-background-vignette" />



      </div>







      {/* =====================================================



          SIDEBAR



      ===================================================== */}







      <aside



        className={



          sidebarOpen



            ? "arcos-sidebar open"



            : "arcos-sidebar"



        }



      >



        <div className="arcos-brand">



          <div className="arcos-brand-mark">



            <span />



          </div>







          <div>



            <strong>ArcOS</strong>



            <small>Your Life Operating System</small>



          </div>



        </div>







        <nav className="arcos-sidebar-nav">



          {navigation.map((item) => {



            const Icon = item.icon;



            const active = activeNav === item.name;







            return (



              <button



                type="button"



                key={item.name}



                className={



                  active



                    ? "arcos-nav-item active"



                    : "arcos-nav-item"



                }



                onClick={() =>



                  changePage(item.name)



                }



              >



                <span className="arcos-nav-icon">



                  <Icon size={18} />



                </span>







                <span>{item.name}</span>







                {active && (



                  <ChevronRight



                    size={16}



                    className="arcos-nav-arrow"



                  />



                )}



              </button>



            );



          })}



        </nav>







        <div className="arcos-sidebar-user">



          <div className="arcos-user-avatar">



            U



          </div>







          <div>



            <strong>Ullas</strong>



            <span>Keep building</span>



          </div>



        </div>



      </aside>







      {/* =====================================================



          MOBILE MENU



      ===================================================== */}







      <button



        type="button"



        className="arcos-mobile-menu"



        aria-label="Toggle menu"



        onClick={() =>



          setSidebarOpen((value) => !value)



        }



      >



        <Menu size={20} />



      </button>







      {/* =====================================================



          MAIN



      ===================================================== */}







      <main className="arcos-main">



        {/* ===================================================



            TOP BAR



        =================================================== */}







        <header className="arcos-topbar">



          <div className="arcos-topbar-search">



            <Search size={17} />







            <span>



              Search anything...



            </span>



          </div>







          <div className="arcos-topbar-right">



            <div className="arcos-date-time">



              <span>THU, 01 OCT</span>



              <strong>ARCOS</strong>



            </div>







            <button



              type="button"



              className="arcos-round-button"



            >



              <Search size={18} />



            </button>







            <button



              type="button"



              className="arcos-round-button"



            >



              <Brain size={18} />



            </button>



          </div>



        </header>







        {/* ===================================================



            CONTENT



        =================================================== */}







        <AnimatePresence mode="wait">



          {/* =================================================



              COMMAND



          ================================================= */}







          {activeNav === "Command" && (



            <motion.div



              key="command"



              className="arcos-page arcos-command-page"



              initial={{



                opacity: 0,



                y: 14,



              }}



              animate={{



                opacity: 1,



                y: 0,



              }}



              exit={{



                opacity: 0,



                y: -10,



              }}



            >



              <section className="arcos-command-hero">



                <div className="arcos-greeting">



                  <span>



                    Good evening, Ullas



                  </span>







                  <h1>



                    Clarity today.



                    <br />



                    A bigger{" "}



                    <em>tomorrow.</em>



                  </h1>







                  <p>



                    Build deliberately. Let ArcOS



                    connect your habits, goals and



                    daily actions.



                  </p>



                </div>







                <div className="arcos-quote-card">



                  <Sparkles size={20} />







                  <blockquote>



                    Small, consistent steps create



                    extraordinary results.



                  </blockquote>







                  <span>— ArcOS</span>



                </div>



              </section>







              {/* ASK ARCOS */}







              <section className="arcos-command-input-wrap">



                <div className="arcos-command-input">



                  <Sparkles size={20} />







                  <input



                    type="text"



                    value={query}



                    onChange={(event) =>



                      setQuery(



                        event.target.value



                      )



                    }

                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleCommand();
                      }
                    }}



                    placeholder="Try: add task revise physics..."



                  />







                  <button type="button" onClick={() => handleCommand()}>
                    <ChevronRight size={17} />
                  </button>



                </div>

                <div className="arcos-command-response" aria-live="polite">
                  <Brain size={15} />
                  <span>{commandReply}</span>
                </div>



                <div className="arcos-quick-actions">



                  <button type="button" onClick={() => handleCommand("plan my day")}>



                    <CalendarDays size={15} />



                    Plan my day



                  </button>







                  <button type="button" onClick={() => handleCommand("review progress")}>



                    <TrendingUp size={15} />



                    Review progress



                  </button>







                  <button type="button" onClick={() => handleCommand("break down a goal")}>



                    <Target size={15} />



                    Break down a goal



                  </button>







                  <button type="button" onClick={() => handleCommand("give me focus time")}>



                    <TimerReset size={15} />



                    Give me focus time



                  </button>







                  <button type="button" onClick={() => handleCommand("analyze my week")}>



                    <Brain size={15} />



                    Analyze my week



                  </button>



                </div>



              </section>







              {/* MODULE CARDS */}







              <section className="arcos-module-grid">



                {commandModules.map((module) => {



                  const Icon = module.icon;







                  return (



                    <motion.button



                      type="button"



                      key={module.id}



                      className={`arcos-module-card ${module.color}`}



                      whileHover={{



                        y: -6,



                      }}



                      onClick={() =>



                        changePage(



                          module.destination



                        )



                      }



                    >



                      <Icon size={25} />







                      <strong>



                        {module.title}



                      </strong>







                      <p>



                        {module.description}



                      </p>







                      <span className="arcos-module-arrow">



                        <ChevronRight



                          size={15}



                        />



                      </span>



                    </motion.button>



                  );



                })}



              </section>







              {/* LOWER COMMAND */}







              <section className="arcos-command-lower">



                <div className="arcos-focus-card">



                  <div className="arcos-section-title">



                    <div>



                      <span>



                        TODAY'S FOCUS



                      </span>







                      <h2>



                        Keep moving.



                      </h2>



                    </div>







                    <button



                      type="button"



                      onClick={() =>



                        changePage("Today")



                      }



                    >



                      View all



                      <ChevronRight



                        size={15}



                      />



                    </button>



                  </div>







                  <div className="arcos-focus-content">



                    <div



                      className="arcos-task-ring"



                      style={{



                        "--task-progress": `${



                          (completedTasks / Math.max(taskItems.length, 1)) *



                          360



                        }deg`,



                      }}



                    >



                      <div>



                        <strong>



                          {completedTasks}/



                          {



                            taskItems.length



                          }



                        </strong>



                        <span>Tasks</span>



                      </div>



                    </div>







                    <div className="arcos-task-list">



                      {taskItems.slice(0, 5)



                        .map((task) => (



                          <div



                            key={task.id}



                            className={



                              task.completed



                                ? "arcos-task completed"



                                : "arcos-task"



                            }



                          >



                            {task.completed ? (



                              <CheckCircle2



                                size={18}



                              />



                            ) : (



                              <Circle



                                size={18}



                              />



                            )}







                            <span>



                              {task.title}



                            </span>



                          </div>



                        ))}



                    </div>



                  </div>



                </div>







                <div className="arcos-stats-card">



                  <div className="arcos-section-title">



                    <div>



                      <span>



                        QUICK STATS



                      </span>







                      <h2>



                        Your momentum.



                      </h2>



                    </div>



                  </div>







                  <div className="arcos-stat-grid">



                    <div>



                      <Clock3 />



                      <span>



                        Focus Time



                      </span>



                      <strong>



                        2.5h



                      </strong>



                      <small>



                        +12%



                      </small>



                    </div>







                    <div>



                      <BarChart3 />



                      <span>



                        Productivity



                      </span>



                      <strong>



                        {averageProgress}%



                      </strong>



                      <small>



                        +8%



                      </small>



                    </div>







                    <div>



                      <Target />



                      <span>



                        Goals



                      </span>



                      <strong>



                        4/6



                      </strong>



                      <small>



                        On track



                      </small>



                    </div>







                    <div>



                      <Flame />



                      <span>



                        Streak



                      </span>



                      <strong>



                        12



                      </strong>



                      <small>



                        days



                      </small>



                    </div>



                  </div>



                </div>



              </section>



            </motion.div>



          )}







          {/* =================================================



              TODAY



          ================================================= */}







          {activeNav === "Today" && (



            <motion.div



              key="today"



              className="arcos-page"



              initial={{ opacity: 0 }}



              animate={{ opacity: 1 }}



              exit={{ opacity: 0 }}



            >



              <section className="arcos-page-heading">
                <span>TODAY</span>







                <h1>



                  Own today.



                  <br />



                  Build momentum.



                </h1>







                <p>



                  Track today's systems and keep



                  your progress intentional.



                </p>



              </section>







              <section className="arcos-today-grid">



                {/* HABITS */}







                <div className="arcos-glass-panel arcos-habits-panel">



                  <div className="arcos-panel-heading">



                    <div>



                      <span>



                        TODAY'S SYSTEM



                      </span>







                      <h2>



                        Active habits



                      </h2>



                    </div>







                    <strong>



                      {systems.length}



                    </strong>



                  </div>







                  <div className="arcos-habit-list">



                    {systems.map((habit) => {



                      const progress =



                        Math.min(



                          100,



                          Math.round(



                            (habit.current /



                              habit.target) *



                              100



                          )



                        );







                      const active =



                        selectedHabit.id ===



                        habit.id;







                      return (



                        <button



                          type="button"



                          key={habit.id}



                          className={



                            active



                              ? `arcos-habit active ${habit.color}`



                              : `arcos-habit ${habit.color}`



                          }



                          onClick={() =>



                            setSelectedHabit(



                              habit



                            )



                          }



                        >



                          <div



                            className="arcos-habit-ring"



                            style={{



                              "--habit-progress": `${



                                progress * 3.6



                              }deg`,



                            }}



                          >



                            <span>



                              {progress}%



                            </span>



                          </div>







                          <div className="arcos-habit-info">



                            <div>



                              <strong>



                                {



                                  habit.name



                                }



                              </strong>







                              <span>



                                {



                                  habit.category



                                }



                              </span>



                            </div>







                            <div className="arcos-habit-track">



                              <span



                                style={{



                                  width: `${progress}%`,



                                }}



                              />



                            </div>



                          </div>







                          <div className="arcos-habit-value">



                            <strong>



                              {



                                habit.current



                              }



                            </strong>







                            <small>



                              /{" "}



                              {



                                habit.target



                              }{" "}



                              {habit.unit}



                            </small>



                          </div>



                        </button>



                      );



                    })}



                  </div>



                </div>







                {/* SELECTED HABIT */}







                <motion.div



                  key={selectedHabit.id}



                  className={`arcos-glass-panel arcos-selected-panel ${selectedHabit.color}`}



                  initial={{



                    opacity: 0,



                    scale: 0.98,



                  }}



                  animate={{



                    opacity: 1,



                    scale: 1,



                  }}



                >



                  <div className="arcos-selected-top">



                    <div>



                      <span>



                        SELECTED MODULE



                      </span>







                      <h2>



                        {selectedHabit.name}



                      </h2>







                      <small>



                        {



                          selectedHabit.category



                        }



                      </small>



                    </div>







                    <span className="arcos-status-pill">



                      {selectedProgress >= 100



                        ? "COMPLETE"



                        : "ON TRACK"}



                    </span>



                  </div>







                  <div className="arcos-selected-score">



                    {selectedProgress}%



                  </div>







                  <div className="arcos-selected-progress">



                    <span



                      style={{



                        width: `${selectedProgress}%`,



                      }}



                    />



                  </div>







                  <div className="arcos-selected-values">



                    <div>



                      <span>TODAY</span>







                      <strong>



                        {



                          selectedHabit.current



                        }{" "}



                        {selectedHabit.unit}



                      </strong>



                    </div>







                    <div>



                      <span>



                        REMAINING



                      </span>







                      <strong>



                        {remaining}{" "}



                        {selectedHabit.unit}



                      </strong>



                    </div>



                  </div>







                  <button



                    type="button"



                    className="arcos-primary-button"
                    onClick={handleOpenProgressModal}



                  >



                    <span>



                      {selectedProgress >= 100



                        ? "TARGET COMPLETE"



                        : "LOG PROGRESS"}



                    </span>







                    <ChevronRight



                      size={17}



                    />



                  </button>



                </motion.div>







                {/* AI */}







                <div className="arcos-glass-panel arcos-ai-panel">



                  <div className="arcos-ai-icon">



                    <Brain size={23} />



                  </div>







                  <span>



                    ARCOS INTELLIGENCE



                  </span>







                  <h2>



                    Pattern detected.



                  </h2>







                  <p>



                    Your strongest focus window



                    today is currently between{" "}



                    <strong>



                      18:00–21:00



                    </strong>



                    .



                  </p>







                  <div className="arcos-ai-signals">



                    <div>



                      <span>Coding</span>



                      <strong>



                        +14%



                      </strong>



                    </div>







                    <div>



                      <span>



                        Academics



                      </span>



                      <strong>



                        -7%



                      </strong>



                    </div>



                  </div>







                  <button



                    type="button"



                    onClick={() =>



                      changePage(



                        "Intelligence"



                      )



                    }



                  >



                    Open intelligence



                    <ChevronRight



                      size={15}



                    />



                  </button>



                </div>



              </section>

              <section
                className="arcos-glass-panel"
                style={{
                  marginTop: "16px",
                  padding: "22px",
                }}
              >
                <div
                  className="arcos-panel-heading"
                  style={{ marginBottom: "14px" }}
                >
                  <div>
                    <span>DAILY TASKS</span>
                    <h2>Today's checklist</h2>
                  </div>

                  <button
                    type="button"
                    className="arcos-primary-button compact"
                    onClick={handleOpenAddTask}
                  >
                    <Plus size={16} />
                    Add task
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  {taskItems.length === 0 ? (
                    <div
                      style={{
                        padding: "18px",
                        border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: "14px",
                        color: "var(--muted)",
                        fontSize: "12px",
                      }}
                    >
                      No tasks yet. Add your first task for today.
                    </div>
                  ) : (
                    taskItems.map((task) => (
                      <div
                        key={task.id}
                        className={
                          task.completed
                            ? "arcos-task completed"
                            : "arcos-task"
                        }
                        style={{
                          minHeight: "48px",
                          padding: "10px 12px",
                          border: "1px solid rgba(255,255,255,.07)",
                          borderRadius: "13px",
                          background: "rgba(255,255,255,.025)",
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleTask(task.id)}
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: 0,
                            display: "grid",
                            placeItems: "center",
                            border: "none",
                            background: "transparent",
                            color: task.completed
                              ? "var(--lime)"
                              : "#91a1b1",
                            cursor: "pointer",
                          }}
                        >
                          {task.completed ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Circle size={18} />
                          )}
                        </button>

                        <span>{task.title}</span>

                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="arcos-goal-edit"
                            onClick={() => handleEditTask(task)}
                            title="Edit task"
                          >
                            <ChevronRight size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            style={{
                              minHeight: "30px",
                              padding: "0 10px",
                              border: "1px solid rgba(255,255,255,.08)",
                              borderRadius: "999px",
                              background: "rgba(255,255,255,.035)",
                              color: "var(--muted)",
                              fontSize: "10px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>



            </motion.div>



          )}







          {/* =================================================



              WORKSPACE



          ================================================= */}







          {activeNav === "Workspace" && (
            <motion.div
              key="workspace"
              className="arcos-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="arcos-page-heading">
                <span>WORKSPACE</span>

                <h1>Build what matters.</h1>

                <p>
                  Your active projects and focused work in one place.
                </p>
              </section>

              <div className="arcos-goals-toolbar">
                <div>
                  <strong>{projectItems.length}</strong>
                  <span>active projects</span>
                </div>

                <button
                  type="button"
                  className="arcos-primary-button compact"
                  onClick={() => {
                    setEditingProjectId(null);
                    setNewProject({
                      name: "",
                      description: "",
                      status: "ACTIVE PROJECT",
                      color: "lime",
                    });
                    setShowProjectModal(true);
                  }}
                >
                  <Plus size={17} />
                  Add project
                </button>
              </div>

              <section className="arcos-project-grid">
                {projectItems.map((project) => {
                  const progress = getProjectProgress(project);
                  const milestones = project.milestones || [];
                  const completedMilestones = milestones.filter(
                    (milestone) => milestone.completed
                  ).length;

                  return (
                    <article
                      key={project.id}
                      className={`arcos-project-card ${project.color}`}
                    >
                      <FolderKanban />

                      <span>{project.status}</span>

                      <h2>{project.name}</h2>

                      <p>{project.description}</p>

                      <div>
                        <strong>{progress}%</strong>
                        <span>
                          {milestones.length === 0
                            ? "no milestones"
                            : `${completedMilestones}/${milestones.length} milestones`}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "5px",
                          marginTop: "14px",
                          overflow: "hidden",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,.09)",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            width: `${progress}%`,
                            height: "100%",
                            borderRadius: "inherit",
                            background: "currentColor",
                            opacity: 0.85,
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          className="arcos-primary-button compact"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setNewMilestoneTitle("");
                          }}
                          style={{ minHeight: "34px", margin: 0 }}
                        >
                          Milestones
                          <ChevronRight size={15} />
                        </button>

                        <button
                          type="button"
                          className="arcos-goal-edit"
                          onClick={() => handleEditProject(project)}
                          title="Edit project"
                        >
                          <Settings size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project.id)}
                          style={{
                            minHeight: "30px",
                            padding: "0 10px",
                            border: "1px solid rgba(255,255,255,.08)",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,.035)",
                            color: "var(--muted)",
                            fontSize: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>
            </motion.div>
          )}



          {/* =================================================



              INTELLIGENCE



          ================================================= */}







          {activeNav === "Intelligence" && (

            <motion.div

              key="intelligence"

              className="arcos-page"

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

            >

              <section className="arcos-page-heading intelligence-heading">

                <span>ARCOS INTELLIGENCE</span>

                <h1>
                  Your patterns,
                  <br />
                  made visible.
                </h1>

                <p>
                  Live insights calculated from your systems, tasks, goals,
                  projects and timeline.
                </p>

              </section>

              <section className="arcos-intelligence-grid">

                <article>
                  <Gauge />
                  <span>OVERALL SIGNAL</span>
                  <strong>{intelligence.overallScore}%</strong>
                  <small>Combined progress across active ArcOS data</small>
                </article>

                <article>
                  <Code2 />
                  <span>STRONGEST SYSTEM</span>
                  <strong>
                    {intelligence.strongestSystem?.name || "No data"}
                  </strong>
                  <small>
                    {intelligence.strongestSystem
                      ? `${intelligence.strongestSystem.progress}% of target`
                      : "Add a system to begin analysis"}
                  </small>
                </article>

                <article>
                  <Target />
                  <span>NEEDS ATTENTION</span>
                  <strong>
                    {intelligence.attentionSystem?.name || "No data"}
                  </strong>
                  <small>
                    {intelligence.attentionSystem
                      ? `${intelligence.attentionSystem.progress}% of target`
                      : "No active system data"}
                  </small>
                </article>

                <article>
                  <CheckCircle2 />
                  <span>TASK COMPLETION</span>
                  <strong>{intelligence.taskCompletion}%</strong>
                  <small>
                    {completedTasks} of {taskItems.length} daily tasks complete
                  </small>
                </article>

                <article>
                  <FolderKanban />
                  <span>PROJECT PROGRESS</span>
                  <strong>{intelligence.projectAverage}%</strong>
                  <small>
                    {intelligence.leadingProject
                      ? `${intelligence.leadingProject.name} leads at ${intelligence.leadingProject.progress}%`
                      : "Add project milestones to calculate progress"}
                  </small>
                </article>

                <article>
                  <Goal />
                  <span>GOAL HEALTH</span>
                  <strong>{intelligence.goalAverage}%</strong>
                  <small>
                    {intelligence.attentionGoal
                      ? `${intelligence.attentionGoal.name} needs the most attention`
                      : "Add goals to begin analysis"}
                  </small>
                </article>

                <article>
                  <Clock3 />
                  <span>TIMELINE EXECUTION</span>
                  <strong>{intelligence.timelineCompletion}%</strong>
                  <small>
                    {scheduleItems.filter((item) => item.completed).length} of {scheduleItems.length} scheduled items complete
                  </small>
                </article>

                <article>
                  <TrendingUp />
                  <span>SYSTEM AVERAGE</span>
                  <strong>{averageProgress}%</strong>
                  <small>Average completion across your active systems</small>
                </article>

              </section>

            </motion.div>

          )}



          {/* =================================================



              MY SYSTEM



          ================================================= */}







          {activeNav === "My System" && (



            <motion.div



              key="system"



              className="arcos-page"



              initial={{ opacity: 0 }}



              animate={{ opacity: 1 }}



              exit={{ opacity: 0 }}



            >



              <section className="arcos-page-heading">



                <span>MY SYSTEM</span>







                <h1>



                  Design your system.



                </h1>







                <p>



                  Control the routines that shape



                  your daily progress.



                </p>



              </section>











              <div className="arcos-system-header">



                <div>



                  <strong>



                    {systems.length}



                  </strong>



                  <span>



                    active systems



                  </span>



                </div>



<button



  type="button"



  className="arcos-primary-button compact"



  onClick={() => {



    setEditingSystemId(null);







    setNewSystem({



      name: "",



      category: "Academics",



      target: 60,



      unit: "min",



      color: "lime",



    });







    setShowAddSystem(true);



  }}



>



  <Plus size={17} />



  Add system



</button>



</div>



              <section className="arcos-system-grid">



                {systems.map((habit) => {



                  const progress = Math.min(



                    100,



                    Math.round(



                      (habit.current /



                        habit.target) *



                        100



                    )



                  );







                  return (



                    <article



                      key={habit.id}



                      className={`arcos-system-card ${habit.color}`}



                    >



                      <div className="arcos-system-card-top">



                        <div>



                          <span>



                            {



                              habit.category



                            }



                          </span>







                          <h2>



                            {habit.name}



                          </h2>



                        </div>







                        <Gauge size={23} />



                      </div>







                      <div className="arcos-system-progress">



                        <span



                          style={{



                            width: `${progress}%`,



                          }}



                        />



                      </div>







                      <div className="arcos-system-card-bottom">



                        <strong>



                          {progress}%



                        </strong>







                        <span>



                          {habit.current} /{" "}



                          {habit.target}{" "}



                          {habit.unit}



                        </span>



                      </div>







                      <button



  type="button"



  onClick={() => handleEditSystem(habit)}



>



  Edit system



  <ChevronRight size={15} />



</button>











                    </article>



                  );



                })}



              </section>



            </motion.div>



          )}







          {/* =================================================



              GOALS



          ================================================= */}







          {activeNav === "Goals" && (



            <motion.div



              key="goals"



              className="arcos-page"



              initial={{ opacity: 0 }}



              animate={{ opacity: 1 }}



              exit={{ opacity: 0 }}



            >



              <section className="arcos-page-heading">



                <span>GOALS</span>







                <h1>



                  Direction creates momentum.



                </h1>







                <p>



                  Keep your long-term goals



                  connected to everyday action.



                </p>



              </section>








              <div className="arcos-goals-toolbar arcos-timeline-toolbar">
              
                <div>
                  <strong>{goalItems.length}</strong>
                  <span>active goals</span>
                </div>

                <button
                  type="button"
                  className="arcos-primary-button compact"
                  onClick={() => {
                    setEditingGoalId(null);
                    setNewGoal({
                      name: "",
                      description: "",
                      progress: 0,
                      color: "lime",
                      deadline: "",
                      linkedSystemIds: [],
                      linkedProjectIds: [],
                    });
                    setShowGoalModal(true);
                  }}
                >
                  <Plus size={17} />
                  Add goal
                </button>
              </div>

              <section className="arcos-goal-grid">



                {goalItems.map((goal) => {
                  const goalProgress = getGoalProgress(goal);
                  const linkCount = getGoalLinkCount(goal);

                  return (
                    <article
                      key={goal.id}
                      className={`arcos-goal-card ${goal.color}`}
                    >
                      <Target size={24} />

                      <span>
                        {linkCount > 0 ? "LINKED GOAL · AUTO" : "MANUAL GOAL"}
                      </span>

                      <h2>{goal.name}</h2>

                      <p>{goal.description}</p>

                      {linkCount > 0 && (
                        <div className="arcos-goal-links-summary">
                          {goal.linkedSystemIds?.length > 0 && (
                            <span>{goal.linkedSystemIds.length} system{goal.linkedSystemIds.length === 1 ? "" : "s"}</span>
                          )}
                          {goal.linkedProjectIds?.length > 0 && (
                            <span>{goal.linkedProjectIds.length} project{goal.linkedProjectIds.length === 1 ? "" : "s"}</span>
                          )}
                        </div>
                      )}

                      <div className="arcos-goal-progress">
                        <span style={{ width: `${goalProgress}%` }} />
                      </div>

                      <div className="arcos-goal-footer">
                        <strong>{goalProgress}%</strong>
                        <button
                          type="button"
                          className="arcos-goal-edit"
                          onClick={() => handleEditGoal(goal)}
                          aria-label={`Edit ${goal.name}`}
                        >
                          <ChevronRight size={17} />
                        </button>
                      </div>
                    </article>
                  );
                })}



              </section>



            </motion.div>



          )}







          {/* =================================================



              TIMELINE



          ================================================= */}







          {activeNav === "Timeline" && (
            <motion.div
              key="timeline"
              className="arcos-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="arcos-page-heading">
                <span>TIMELINE</span>
                <h1>See your journey unfold.</h1>
                <p>One day at a time, your system becomes your story.</p>
              </section>

              <div className="arcos-goals-toolbar">
                <div>
                  <strong>{scheduleItems.length}</strong>
                  <span>scheduled items</span>
                </div>

                <button
                  type="button"
                  className="arcos-primary-button compact"
                  onClick={() => {
                    setEditingTimelineId(null);
                    setNewTimelineItem({
                      time: "08:00",
                      title: "",
                      subtitle: "Personal",
                    });
                    setShowTimelineModal(true);
                  }}
                >
                  <Plus size={17} />
                  Add item
                </button>
              </div>

              <section className="arcos-timeline-panel">
                <div className="arcos-timeline-date">
                  <CalendarDays size={20} />
                  <div>
                    <span>TODAY</span>
                    <strong>Your schedule</strong>
                  </div>
                </div>

                <div className="arcos-timeline-list">
                  {scheduleItems.map((item, index) => (
                    <article
                      key={item.id}
                      style={{ opacity: item.completed ? 0.58 : 1 }}
                    >
                      <span className="arcos-timeline-time">
                        {item.time}
                      </span>

                      <div className="arcos-timeline-line">
                        <span />
                      </div>

                      <div>
                        <strong
                          style={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.title}
                        </strong>

                        <span>{item.subtitle}</span>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            type="button"
                            className="arcos-goal-edit"
                            onClick={() => handleToggleTimelineItem(item.id)}
                            title={item.completed ? "Mark incomplete" : "Mark complete"}
                          >
                            {item.completed ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <Circle size={16} />
                            )}
                          </button>

                          <button
                            type="button"
                            className="arcos-goal-edit"
                            onClick={() => handleEditTimelineItem(item)}
                            title="Edit item"
                          >
                            <ChevronRight size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteTimelineItem(item.id)}
                            style={{
                              border: "1px solid rgba(255,255,255,.10)",
                              borderRadius: "999px",
                              padding: "7px 11px",
                              background: "rgba(255,255,255,.04)",
                              color: "rgba(255,255,255,.72)",
                              cursor: "pointer",
                              fontSize: "11px",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <small>
                        {String(index + 1).padStart(2, "0")}
                      </small>
                    </article>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>





      </main>



      <AnimatePresence>



  {showAddSystem && (



    <motion.div



      className="arcos-modal-backdrop"



      initial={{ opacity: 0 }}



      animate={{ opacity: 1 }}



      exit={{ opacity: 0 }}



      onMouseDown={() =>



        setShowAddSystem(false)



      }



    >



      <motion.form



        className="arcos-system-modal"



        initial={{



          opacity: 0,



          scale: 0.96,



          y: 18,



        }}



        animate={{



          opacity: 1,



          scale: 1,



          y: 0,



        }}



        exit={{



          opacity: 0,



          scale: 0.97,



          y: 12,



        }}



        transition={{



          duration: 0.25,



        }}



        onSubmit={handleSaveSystem}



        onMouseDown={(event) =>



          event.stopPropagation()



        }



      >



        <div className="arcos-modal-header">



          <div>



            <span>



  {editingSystemId



    ? "EDIT SYSTEM"



    : "NEW SYSTEM"}



</span>







<h2>



  {editingSystemId



    ? "Update your system."



    : "Add to your ArcOS."}



</h2>







<p>



  {editingSystemId



    ? "Adjust this routine and save your changes."



    : "Create a routine you want to track."}



</p>



          </div>







          <button



            type="button"



            className="arcos-modal-close"



            onClick={() =>



              setShowAddSystem(false)



            }



          >



            <X size={18} />



          </button>



        </div>







        <div className="arcos-modal-fields">



          <label className="arcos-field arcos-field-wide">



            <span>System name</span>







            <input



              autoFocus



              type="text"



              placeholder="Example: Meditation"



              value={newSystem.name}



              onChange={(event) =>



                setNewSystem({



                  ...newSystem,



                  name: event.target.value,



                })



              }



            />



          </label>







          <label className="arcos-field">



            <span>Category</span>







            <select



              value={newSystem.category}



              onChange={(event) =>



                setNewSystem({



                  ...newSystem,



                  category:



                    event.target.value,



                })



              }



            >



              <option>Academics</option>



              <option>Career</option>



              <option>Health</option>



              <option>Growth</option>



              <option>Personal</option>



              <option>Productivity</option>



            </select>



          </label>







          <label className="arcos-field">



            <span>Daily target</span>







            <input



              type="number"



              min="1"



              value={newSystem.target}



              onChange={(event) =>



                setNewSystem({



                  ...newSystem,



                  target:



                    event.target.value,



                })



              }



            />



          </label>







          <label className="arcos-field">



            <span>Unit</span>







            <select



              value={newSystem.unit}



              onChange={(event) =>



                setNewSystem({



                  ...newSystem,



                  unit:



                    event.target.value,



                })



              }



            >



              <option value="min">



                Minutes



              </option>







              <option value="pages">



                Pages



              </option>







              <option value="sessions">



                Sessions



              </option>







              <option value="km">



                Kilometres



              </option>







              <option value="tasks">



                Tasks



              </option>



            </select>



          </label>







          <div className="arcos-field">



            <span>Accent</span>







            <div className="arcos-color-picker">



              {[



                "lime",



                "cyan",



                "orange",



                "violet",



              ].map((color) => (



                <button



                  type="button"



                  key={color}



                  aria-label={color}



                  className={



                    newSystem.color === color



                      ? `arcos-color-option ${color} active`



                      : `arcos-color-option ${color}`



                  }



                  onClick={() =>



                    setNewSystem({



                      ...newSystem,



                      color,



                    })



                  }



                />



              ))}



            </div>



          </div>



        </div>







        <div className="arcos-modal-preview">



          <div



            className={`arcos-preview-accent ${newSystem.color}`}



          />







          <div>



            <span>PREVIEW</span>







            <strong>



              {newSystem.name ||



                "Your new system"}



            </strong>







            <small>



              {newSystem.category} ·{" "}



              {newSystem.target}{" "}



              {newSystem.unit}



            </small>



          </div>



        </div>







        <div className="arcos-modal-actions">



          <button



            type="button"



            className="arcos-modal-cancel"



            onClick={() =>



              setShowAddSystem(false)



            }



          >



            Cancel



          </button>







          <button



  type="submit"



  className="arcos-modal-submit"



>



  {editingSystemId ? (



    <>



      <CheckCircle2 size={17} />



      Save changes



    </>



  ) : (



    <>



      <Plus size={17} />



      Add system



    </>



  )}



</button>



        </div>



      </motion.form>



    </motion.div>



  )}



</AnimatePresence>

<AnimatePresence>

  {showGoalModal && (

    <motion.div

      className="arcos-modal-backdrop"

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      onMouseDown={() =>

        setShowGoalModal(false)

      }

    >

      <motion.form

        className="arcos-system-modal"

        initial={{

          opacity: 0,

          scale: 0.96,

          y: 18,

        }}

        animate={{

          opacity: 1,

          scale: 1,

          y: 0,

        }}

        exit={{

          opacity: 0,

          scale: 0.97,

          y: 12,

        }}

        onSubmit={handleSaveGoal}

        onMouseDown={(event) =>

          event.stopPropagation()

        }

      >

        <div className="arcos-modal-header">

          <div>

            <span>

              {editingGoalId

                ? "EDIT GOAL"

                : "NEW GOAL"}

            </span>



            <h2>

              {editingGoalId

                ? "Update your goal."

                : "Create a new goal."}

            </h2>



            <p>

              Define what you want to achieve.

            </p>

          </div>



          <button

            type="button"

            className="arcos-modal-close"

            onClick={() =>

              setShowGoalModal(false)

            }

          >

            <X size={18} />

          </button>

        </div>



        <div className="arcos-modal-fields">

          <label className="arcos-field arcos-field-wide">

            <span>Goal name</span>



            <input

              type="text"

              placeholder="Example: Improve semester performance"

              value={newGoal.name}

              onChange={(event) =>

                setNewGoal({

                  ...newGoal,

                  name: event.target.value,

                })

              }

            />

          </label>



          <label className="arcos-field arcos-field-wide">

            <span>Description</span>



            <input

              type="text"

              placeholder="What does success look like?"

              value={newGoal.description}

              onChange={(event) =>

                setNewGoal({

                  ...newGoal,

                  description: event.target.value,

                })

              }

            />

          </label>



          <label className="arcos-field">

            <span>Manual progress</span>

            <input
              type="number"
              min="0"
              max="100"
              value={newGoal.progress}
              disabled={(newGoal.linkedSystemIds?.length || 0) + (newGoal.linkedProjectIds?.length || 0) > 0}
              onChange={(event) =>
                setNewGoal({
                  ...newGoal,
                  progress: event.target.value,
                })
              }
            />

            <small className="arcos-field-hint">
              {(newGoal.linkedSystemIds?.length || 0) + (newGoal.linkedProjectIds?.length || 0) > 0
                ? "Calculated automatically from linked items."
                : "Used only when nothing is linked."}
            </small>

          </label>



          <label className="arcos-field">

            <span>Deadline</span>



            <input

              type="date"

              value={newGoal.deadline}

              onChange={(event) =>

                setNewGoal({

                  ...newGoal,

                  deadline: event.target.value,

                })

              }

            />

          </label>



          <div className="arcos-field arcos-field-wide arcos-goal-link-field">
            <span>Link systems</span>
            <small className="arcos-field-hint">Choose routines that should drive this goal.</small>
            <div className="arcos-link-options">
              {systems.map((system) => {
                const active = (newGoal.linkedSystemIds || []).includes(system.id);
                return (
                  <button
                    type="button"
                    key={system.id}
                    className={active ? "arcos-link-option active" : "arcos-link-option"}
                    onClick={() =>
                      setNewGoal((previous) => ({
                        ...previous,
                        linkedSystemIds: active
                          ? previous.linkedSystemIds.filter((id) => id !== system.id)
                          : [...(previous.linkedSystemIds || []), system.id],
                      }))
                    }
                  >
                    <span>{system.name}</span>
                    <strong>{getSystemProgress(system)}%</strong>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="arcos-field arcos-field-wide arcos-goal-link-field">
            <span>Link projects</span>
            <small className="arcos-field-hint">Project progress comes from completed milestones.</small>
            <div className="arcos-link-options">
              {projectItems.map((project) => {
                const active = (newGoal.linkedProjectIds || []).includes(project.id);
                return (
                  <button
                    type="button"
                    key={project.id}
                    className={active ? "arcos-link-option active" : "arcos-link-option"}
                    onClick={() =>
                      setNewGoal((previous) => ({
                        ...previous,
                        linkedProjectIds: active
                          ? previous.linkedProjectIds.filter((id) => id !== project.id)
                          : [...(previous.linkedProjectIds || []), project.id],
                      }))
                    }
                  >
                    <span>{project.name}</span>
                    <strong>{getProjectProgress(project)}%</strong>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="arcos-field">

            <span>Accent</span>



            <div className="arcos-color-picker">

              {[

                "lime",

                "cyan",

                "orange",

                "violet",

              ].map((color) => (

                <button

                  type="button"

                  key={color}

                  className={

                    newGoal.color === color

                      ? `arcos-color-option ${color} active`

                      : `arcos-color-option ${color}`

                  }

                  onClick={() =>

                    setNewGoal({

                      ...newGoal,

                      color,

                    })

                  }

                />

              ))}

            </div>

          </div>

        </div>



        <div className="arcos-modal-actions">

          <button

            type="button"

            className="arcos-modal-cancel"

            onClick={() =>

              setShowGoalModal(false)

            }

          >

            Cancel

          </button>



          <button

            type="submit"

            className="arcos-modal-submit"

          >

            {editingGoalId ? (

              <>

                <CheckCircle2 size={17} />

                Save changes

              </>

            ) : (

              <>

                <Plus size={17} />

                Add goal

              </>

            )}

          </button>

        </div>

      </motion.form>

    </motion.div>

  )}

</AnimatePresence>

<AnimatePresence>
  {showTimelineModal && (
    <motion.div
      className="arcos-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => setShowTimelineModal(false)}
    >
      <motion.form
        className="arcos-system-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        onSubmit={handleSaveTimelineItem}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="arcos-modal-header">
          <div>
            <span>
              {editingTimelineId ? "EDIT TIMELINE ITEM" : "NEW TIMELINE ITEM"}
            </span>
            <h2>
              {editingTimelineId ? "Update your schedule." : "Add to your day."}
            </h2>
            <p>Set the time, activity and category.</p>
          </div>

          <button
            type="button"
            className="arcos-modal-close"
            onClick={() => setShowTimelineModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="arcos-modal-fields">
          <label className="arcos-field">
            <span>Time</span>
            <input
              type="time"
              value={newTimelineItem.time}
              onChange={(event) =>
                setNewTimelineItem({
                  ...newTimelineItem,
                  time: event.target.value,
                })
              }
            />
          </label>

          <label className="arcos-field arcos-field-wide">
            <span>Activity</span>
            <input
              autoFocus
              type="text"
              placeholder="Example: Project work"
              value={newTimelineItem.title}
              onChange={(event) =>
                setNewTimelineItem({
                  ...newTimelineItem,
                  title: event.target.value,
                })
              }
            />
          </label>

          <label className="arcos-field arcos-field-wide">
            <span>Category</span>
            <input
              type="text"
              placeholder="Example: Career"
              value={newTimelineItem.subtitle}
              onChange={(event) =>
                setNewTimelineItem({
                  ...newTimelineItem,
                  subtitle: event.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="arcos-modal-actions">
          <button
            type="button"
            className="arcos-modal-cancel"
            onClick={() => setShowTimelineModal(false)}
          >
            Cancel
          </button>

          <button type="submit" className="arcos-modal-submit">
            {editingTimelineId ? (
              <>
                <CheckCircle2 size={17} />
                Save changes
              </>
            ) : (
              <>
                <Plus size={17} />
                Add item
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showProgressModal && (
    <motion.div
      className="arcos-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => setShowProgressModal(false)}
    >
      <motion.form
        className="arcos-system-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        onSubmit={handleSaveProgress}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="arcos-modal-header">
          <div>
            <span>LOG PROGRESS</span>
            <h2>{selectedHabit.name}</h2>
            <p>Enter your total progress for today.</p>
          </div>

          <button
            type="button"
            className="arcos-modal-close"
            onClick={() => setShowProgressModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="arcos-modal-fields">
          <label className="arcos-field arcos-field-wide">
            <span>Today's {selectedHabit.unit}</span>
            <input
              autoFocus
              type="number"
              min="0"
              max={selectedHabit.target}
              value={progressValue}
              onChange={(event) =>
                setProgressValue(event.target.value)
              }
              placeholder={`0 - ${selectedHabit.target}`}
            />
          </label>
        </div>

        <div className="arcos-modal-preview">
          <div
            className={`arcos-preview-accent ${selectedHabit.color}`}
          />
          <div>
            <span>TARGET</span>
            <strong>
              {progressValue || 0} / {selectedHabit.target}{" "}
              {selectedHabit.unit}
            </strong>
            <small>
              ArcOS will update your progress immediately.
            </small>
          </div>
        </div>

        <div className="arcos-modal-actions">
          <button
            type="button"
            className="arcos-modal-cancel"
            onClick={() => setShowProgressModal(false)}
          >
            Cancel
          </button>

          <button type="submit" className="arcos-modal-submit">
            <CheckCircle2 size={17} />
            Save progress
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showTaskModal && (
    <motion.div
      className="arcos-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => setShowTaskModal(false)}
    >
      <motion.form
        className="arcos-system-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        onSubmit={handleSaveTask}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="arcos-modal-header">
          <div>
            <span>{editingTaskId ? "EDIT TASK" : "NEW TASK"}</span>
            <h2>
              {editingTaskId
                ? "Update today's task."
                : "Add a task for today."}
            </h2>
            <p>Keep today's checklist focused and practical.</p>
          </div>

          <button
            type="button"
            className="arcos-modal-close"
            onClick={() => setShowTaskModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="arcos-modal-fields">
          <label className="arcos-field arcos-field-wide">
            <span>Task</span>
            <input
              autoFocus
              type="text"
              placeholder="Example: Revise DSA for 45 minutes"
              value={newTaskTitle}
              onChange={(event) =>
                setNewTaskTitle(event.target.value)
              }
            />
          </label>
        </div>

        <div className="arcos-modal-actions">
          <button
            type="button"
            className="arcos-modal-cancel"
            onClick={() => setShowTaskModal(false)}
          >
            Cancel
          </button>

          <button type="submit" className="arcos-modal-submit">
            {editingTaskId ? (
              <>
                <CheckCircle2 size={17} />
                Save changes
              </>
            ) : (
              <>
                <Plus size={17} />
                Add task
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {selectedProject && (
    <motion.div
      className="arcos-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => setSelectedProjectId(null)}
    >
      <motion.div
        className="arcos-system-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="arcos-modal-header">
          <div>
            <span>PROJECT MILESTONES</span>
            <h2>{selectedProject.name}</h2>
            <p>
              Progress is calculated automatically from completed milestones.
            </p>
          </div>

          <button
            type="button"
            className="arcos-modal-close"
            onClick={() => setSelectedProjectId(null)}
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="arcos-modal-preview"
          style={{ marginBottom: "14px" }}
        >
          <div
            className={`arcos-preview-accent ${selectedProject.color}`}
          />
          <div>
            <span>AUTOMATIC PROGRESS</span>
            <strong>{getProjectProgress(selectedProject)}%</strong>
            <small>
              {(selectedProject.milestones || []).filter(
                (milestone) => milestone.completed
              ).length}
              /{(selectedProject.milestones || []).length} milestones complete
            </small>
          </div>
        </div>

        <form
          onSubmit={handleAddMilestone}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <input
            type="text"
            placeholder="Add a milestone..."
            value={newMilestoneTitle}
            onChange={(event) =>
              setNewMilestoneTitle(event.target.value)
            }
            style={{
              minHeight: "44px",
              padding: "0 13px",
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: "12px",
              background: "rgba(255,255,255,.04)",
              color: "white",
            }}
          />

          <button
            type="submit"
            className="arcos-modal-submit"
            style={{ padding: "0 15px" }}
          >
            <Plus size={16} />
            Add
          </button>
        </form>

        <div
          style={{
            display: "grid",
            gap: "8px",
            maxHeight: "330px",
            overflowY: "auto",
          }}
        >
          {(selectedProject.milestones || []).length === 0 ? (
            <div
              style={{
                padding: "18px",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: "13px",
                color: "var(--muted)",
                fontSize: "12px",
              }}
            >
              No milestones yet. Add the main stages of this project.
            </div>
          ) : (
            (selectedProject.milestones || []).map((milestone) => (
              <div
                key={milestone.id}
                style={{
                  minHeight: "46px",
                  padding: "9px 10px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,.025)",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleToggleMilestone(
                      selectedProject.id,
                      milestone.id
                    )
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    padding: 0,
                    display: "grid",
                    placeItems: "center",
                    border: "none",
                    background: "transparent",
                    color: milestone.completed
                      ? "var(--lime)"
                      : "#91a1b1",
                    cursor: "pointer",
                  }}
                >
                  {milestone.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>

                <span
                  style={{
                    color: milestone.completed
                      ? "var(--muted)"
                      : "var(--text)",
                    textDecoration: milestone.completed
                      ? "line-through"
                      : "none",
                    fontSize: "12px",
                  }}
                >
                  {milestone.title}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteMilestone(
                      selectedProject.id,
                      milestone.id
                    )
                  }
                  style={{
                    minHeight: "28px",
                    padding: "0 9px",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.035)",
                    color: "var(--muted)",
                    fontSize: "9px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {showProjectModal && (
    <motion.div
      className="arcos-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => setShowProjectModal(false)}
    >
      <motion.form
        className="arcos-system-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        onSubmit={handleSaveProject}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="arcos-modal-header">
          <div>
            <span>
              {editingProjectId
                ? "EDIT PROJECT"
                : "NEW PROJECT"}
            </span>

            <h2>
              {editingProjectId
                ? "Update your project."
                : "Create a project."}
            </h2>

            <p>
              Track focused work and keep progress visible.
            </p>
          </div>

          <button
            type="button"
            className="arcos-modal-close"
            onClick={() => setShowProjectModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="arcos-modal-fields">
          <label className="arcos-field arcos-field-wide">
            <span>Project name</span>
            <input
              autoFocus
              type="text"
              placeholder="Example: Portfolio Website"
              value={newProject.name}
              onChange={(event) =>
                setNewProject({
                  ...newProject,
                  name: event.target.value,
                })
              }
            />
          </label>

          <label className="arcos-field arcos-field-wide">
            <span>Description</span>
            <input
              type="text"
              placeholder="What are you building?"
              value={newProject.description}
              onChange={(event) =>
                setNewProject({
                  ...newProject,
                  description: event.target.value,
                })
              }
            />
          </label>

          <label className="arcos-field">
            <span>Status</span>
            <input
              type="text"
              placeholder="ACTIVE PROJECT"
              value={newProject.status}
              onChange={(event) =>
                setNewProject({
                  ...newProject,
                  status: event.target.value,
                })
              }
            />
          </label>

          <div className="arcos-field">
            <span>Accent</span>

            <div className="arcos-color-picker">
              {["lime", "cyan", "orange", "violet"].map(
                (color) => (
                  <button
                    type="button"
                    key={color}
                    aria-label={color}
                    className={
                      newProject.color === color
                        ? `arcos-color-option ${color} active`
                        : `arcos-color-option ${color}`
                    }
                    onClick={() =>
                      setNewProject({
                        ...newProject,
                        color,
                      })
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div className="arcos-modal-preview">
          <div
            className={`arcos-preview-accent ${newProject.color}`}
          />

          <div>
            <span>PREVIEW</span>
            <strong>
              {newProject.name || "Your new project"}
            </strong>
            <small>
              {newProject.status || "ACTIVE PROJECT"} · milestones set after creation
            </small>
          </div>
        </div>

        <div className="arcos-modal-actions">
          <button
            type="button"
            className="arcos-modal-cancel"
            onClick={() => setShowProjectModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="arcos-modal-submit"
          >
            {editingProjectId ? (
              <>
                <CheckCircle2 size={17} />
                Save changes
              </>
            ) : (
              <>
                <Plus size={17} />
                Add project
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>





    </div>



  );

}
