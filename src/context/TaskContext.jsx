import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "task-dashboard:tasks";

function isoDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

const initialTasks = [
  {
    id: "1",
    title: "Review pull request for auth flow",
    description: "Focus on error handling and edge cases.",
    status: "in-progress",
    dueDate: isoDate(2),
  },
  {
    id: "2",
    title: "Draft weekly standup notes",
    description: "",
    status: "pending",
    dueDate: isoDate(5),
  },
  {
    id: "3",
    title: "Sync with design on dashboard mockups",
    description: "Tuesday 2pm — bring open questions from engineering.",
    status: "completed",
    dueDate: isoDate(-1),
  },
];

function migrateTask(task) {
  if (task.status) return task;
  return {
    id: task.id,
    title: task.title,
    description: task.description || "",
    status: task.completed ? "completed" : "pending",
    dueDate: task.dueDate || "",
  };
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialTasks;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialTasks;
    return parsed.map(migrateTask);
  } catch {
    return initialTasks;
  }
}

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("dueAsc");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask({ title, description, status, dueDate }) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      dueDate,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function updateTask(id, updates) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const value = {
    tasks,
    filter,
    sort,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSort,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node,
};
