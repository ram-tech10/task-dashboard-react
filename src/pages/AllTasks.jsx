import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Summary from "../components/Summary.jsx";
import { useTasks } from "../hooks/useTasks.js";

export default function AllTasks() {
  const { visibleTasks, addTask, updateTask, deleteTask } = useTasks();

  return (
    <div className="space-y-8">
      <Summary />

      <section>
        <h2 className="text-lg font-medium mb-4">Add Task</h2>
        <TaskForm onAdd={addTask} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Your Tasks</h2>
        <FilterBar />
        {visibleTasks.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500">
            No tasks to show.
          </div>
        ) : (
          <ul className="space-y-3">
            {visibleTasks.map((task) => (
              <li key={task.id}>
                <TaskCard
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
