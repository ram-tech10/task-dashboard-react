import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import CompletedTasks from "./pages/CompletedTasks.jsx";

function navLinkClass({ isActive }) {
  return [
    "rounded px-3 py-1.5 text-sm font-medium",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-semibold text-slate-900">
                Task Dashboard
              </h1>
              <nav className="flex gap-2">
                <NavLink to="/" end className={navLinkClass}>
                  All Tasks
                </NavLink>
                <NavLink to="/completed" className={navLinkClass}>
                  Completed
                </NavLink>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <Routes>
              <Route path="/" element={<AllTasks />} />
              <Route path="/completed" element={<CompletedTasks />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}
