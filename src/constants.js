export const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const STATUS_LABELS = Object.fromEntries(
  STATUSES.map((s) => [s.value, s.label])
);

export const STATUS_BADGE = {
  pending: "bg-amber-100 text-amber-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
};
