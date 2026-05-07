import TaskCard from "../components/TaskCard.jsx";
import { useTasks } from "../hooks/useTasks.js";

export default function CompletedTasks() {
  const { tasks, updateTask, deleteTask } = useTasks();

  const completed = tasks.filter((task) => task.status === "completed");

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium">Completed Tasks</h2>
      <p className="text-sm text-slate-500">
        {completed.length} task{completed.length === 1 ? "" : "s"} completed.
      </p>
      {completed.length === 0 ? (
        <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500">
          Nothing completed yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {completed.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} onUpdate={updateTask} onDelete={deleteTask} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
