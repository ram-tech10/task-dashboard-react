import { useTasks } from "../hooks/useTasks.js";
import { STATUSES } from "../constants.js";

export default function FilterBar() {
  const { filter, sort, setFilter, setSort } = useTasks();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="text-sm text-slate-600">
          Status
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border border-slate-300 px-2 py-1 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="all">All</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-slate-600">
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded border border-slate-300 px-2 py-1 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="dueAsc">Due date (earliest)</option>
          <option value="dueDesc">Due date (latest)</option>
          <option value="title">Title (A–Z)</option>
        </select>
      </div>
    </div>
  );
}
