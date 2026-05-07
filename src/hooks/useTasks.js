import { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext.jsx";

const FAR_FUTURE = 8.64e15;

function dueDateValue(task) {
  if (!task.dueDate) return FAR_FUTURE;
  const ts = new Date(task.dueDate).getTime();
  return Number.isNaN(ts) ? FAR_FUTURE : ts;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used inside a TaskProvider");
  }

  const { tasks, filter, sort } = ctx;

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    });

    const sorted = [...filtered];
    if (sort === "dueAsc") {
      sorted.sort((a, b) => dueDateValue(a) - dueDateValue(b));
    } else if (sort === "dueDesc") {
      sorted.sort((a, b) => dueDateValue(b) - dueDateValue(a));
    } else if (sort === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [tasks, filter, sort]);

  return { ...ctx, visibleTasks };
}
