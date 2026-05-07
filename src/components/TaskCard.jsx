import { useState } from "react";
import PropTypes from "prop-types";
import { STATUSES, STATUS_LABELS, STATUS_BADGE } from "../constants.js";

function formatDueDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const [errors, setErrors] = useState({});

  function startEdit() {
    setDraft(task);
    setErrors({});
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function saveEdit() {
    const trimmedTitle = draft.title.trim();
    const next = {};
    if (!trimmedTitle) next.title = "Title is required";
    if (!draft.dueDate) next.dueDate = "Due date is required";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    onUpdate(task.id, {
      title: trimmedTitle,
      description: draft.description.trim(),
      status: draft.status,
      dueDate: draft.dueDate,
    });
    setIsEditing(false);
  }

  function setDraftField(name, value) {
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  if (isEditing) {
    return (
      <article className="rounded-md border border-slate-200 bg-white p-4 space-y-3">
        <div>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraftField("title", e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
          {errors.title ? (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          ) : null}
        </div>

        <textarea
          value={draft.description || ""}
          onChange={(e) => setDraftField("description", e.target.value)}
          rows={2}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={draft.status}
            onChange={(e) => setDraftField("status", e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <div>
            <input
              type="date"
              value={draft.dueDate || ""}
              onChange={(e) => setDraftField("dueDate", e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
            {errors.dueDate ? (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveEdit}
            className="rounded bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </article>
    );
  }

  const isCompleted = task.status === "completed";

  return (
    <article className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 sm:flex-row sm:items-start">
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium ${
            isCompleted ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {task.title}
        </p>
        {task.description ? (
          <p className="mt-1 text-sm text-slate-500">{task.description}</p>
        ) : null}
        <p className="mt-2 text-xs text-slate-500">
          Due {formatDueDate(task.dueDate)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            STATUS_BADGE[task.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {STATUS_LABELS[task.status] || task.status}
        </span>
        <button
          type="button"
          onClick={startEdit}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(["pending", "in-progress", "completed"]).isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
