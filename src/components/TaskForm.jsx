import { useState } from "react";
import PropTypes from "prop-types";
import { STATUSES } from "../constants.js";

const emptyForm = {
  title: "",
  description: "",
  status: "pending",
  dueDate: "",
};

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(values) {
    const next = {};
    if (!values.title.trim()) next.title = "Title is required";
    if (!values.dueDate) next.dueDate = "Due date is required";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    };
    const nextErrors = validate(trimmed);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAdd(trimmed);
    setForm(emptyForm);
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-slate-200 bg-white p-4 space-y-3"
    >
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="What needs to be done?"
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        {errors.title ? (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="block text-sm font-medium text-slate-700"
        >
          Description <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="task-description"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="task-status"
            className="block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="task-status"
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="task-due"
            className="block text-sm font-medium text-slate-700"
          >
            Due date
          </label>
          <input
            id="task-due"
            type="date"
            value={form.dueDate}
            onChange={(e) => setField("dueDate", e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
          {errors.dueDate ? (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add task
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
